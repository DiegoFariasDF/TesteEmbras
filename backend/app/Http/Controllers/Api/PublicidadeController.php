<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Publicidade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PublicidadeController extends Controller
{
    /**
     * Listagem de publicidades.
     * Requisito: Mostrar o nome dos estados vinculados.
     */
    public function index()
    {
        // O with('estados') carrega os dados da tabela cad_estado via relacionamento
        $publicidades = Publicidade::with('estados')->get();
        return response()->json($publicidades, 200);
    }

    /**
     * Cadastro de nova publicidade.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo'                => 'required|string|max:255',
            'descricao'             => 'required|string',
            'imagem'                => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'botao_link'            => 'required|url',
            'titulo_botao_link'     => 'required|string|max:100',
            // Requisito: Múltiplos estados (recebe um array de IDs)
            'id_publicidade_estado' => 'required|array',
            'id_publicidade_estado.*' => 'integer|exists:cad_estado,id',
            'dt_inicio'             => 'required|date',
            'dt_fim'                => 'required|date|after_or_equal:dt_inicio',
        ]);

        // REQUISITO: Validação para garantir apenas uma publicidade ativa no período
        $conflito = Publicidade::where(function ($query) use ($request) {
            $query->where(function ($q) use ($request) {
                $q->whereBetween('dt_inicio', [$request->dt_inicio, $request->dt_fim])
                  ->orWhereBetween('dt_fim', [$request->dt_inicio, $request->dt_fim])
                  ->orWhere(function ($sub) use ($request) {
                      $sub->where('dt_inicio', '<=', $request->dt_inicio)
                          ->where('dt_fim', '>=', $request->dt_fim);
                  });
            });
        })->exists();

        if ($conflito) {
            return response()->json([
                'message' => 'Já existe uma publicidade ativa que conflita com este período de datas.'
            ], 422);
        }

        // Processamento do Upload da Imagem
        if ($request->hasFile('imagem')) {
            $path = $request->file('imagem')->store('publicidades', 'public');
            $validated['imagem'] = $path;
        }

        // Cria a publicidade
        $publicidade = Publicidade::create($validated);

        // REQUISITO: Associação de publicidades a múltiplos estados (tabela pivô)
        $publicidade->estados()->attach($request->id_publicidade_estado);

        return response()->json($publicidade->load('estados'), 201);
    }

    /**
     * Exibe uma publicidade específica com seus estados.
     */
    public function show(string $id)
    {
        $publicidade = Publicidade::with('estados')->find($id);

        if (!$publicidade) {
            return response()->json(['message' => 'Publicidade não encontrada'], 404);
        }

        return response()->json($publicidade, 200);
    }

    
    public function update(Request $request, string $id)
    {
        $publicidade = Publicidade::findOrFail($id);

        $validated = $request->validate([
            'titulo'                => 'required|string|max:255',
            'descricao'             => 'required|string',
            'imagem'                => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'botao_link'            => 'required|url',
            'titulo_botao_link'     => 'required|string|max:100',
            'id_publicidade_estado' => 'required|array',
            'id_publicidade_estado.*' => 'integer|exists:cad_estado,id',
            'dt_inicio'             => 'required|date',
            'dt_fim'                => 'required|date|after_or_equal:dt_inicio',
        ]);

        // Validação de conflito ignorando a própria publicidade que está sendo editada
        $conflito = Publicidade::where('id', '!=', $id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('dt_inicio', [$request->dt_inicio, $request->dt_fim])
                      ->orWhereBetween('dt_fim', [$request->dt_inicio, $request->dt_fim]);
            })->exists();

        if ($conflito) {
            return response()->json(['message' => 'Conflito de datas com outra publicidade ativa'], 422);
        }

        if ($request->hasFile('imagem')) {
            // Remove a imagem antiga se quiser manter o storage limpo
            Storage::disk('public')->delete($publicidade->imagem);
            
            $path = $request->file('imagem')->store('publicidades', 'public');
            $validated['imagem'] = $path;
        }

        $publicidade->update($validated);

        // Sincroniza os estados (remove os antigos e adiciona os novos na tabela pivô)
        $publicidade->estados()->sync($request->id_publicidade_estado);

        return response()->json($publicidade->load('estados'), 200);
    }

    /**
     * Remove (encerra) a publicidade.
     */
    public function destroy(string $id)
    {
        $publicidade = Publicidade::find($id);

        if (!$publicidade) {
            return response()->json(['message' => 'Publicidade não encontrada'], 404);
        }

        // Remove o arquivo físico da imagem
        Storage::disk('public')->delete($publicidade->imagem);
        
        $publicidade->delete();

        return response()->json(['message' => 'Publicidade removida com sucesso'], 200);
    }
}