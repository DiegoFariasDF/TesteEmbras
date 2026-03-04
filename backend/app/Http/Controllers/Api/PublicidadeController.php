<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Publicidade;
use Illuminate\Http\Request;

class PublicidadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Publicidade::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo'                => 'required|string|max:255',
            'descricao'             => 'required|string',
            'imagem'                => 'required|image|mimes:jpeg,png,jpg|max:2048', // Validação de arquivo
            'botao_link'            => 'required|url',
            'titulo_botao_link'     => 'required|string|max:100',
            'id_publicidade_estado' => 'required|integer|exists:cad_estado,id', // Tabela correta
            'dt_inicio'             => 'required|date',
            'dt_fim'                => 'required|date|after_or_equal:dt_inicio',
        ]);

        // 1. Verifica se existe o arquivo
        if ($request->hasFile('imagem')) {
            // 2. Salva na pasta 'storage/app/public/publicidades'
            $caminhoArquivo = $request->file('imagem')->store('publicidades', 'public');
            
            // 3. Substitui o objeto do arquivo pelo caminho (ex: publicidades/nome.jpg)
            $validated['imagem'] = $caminhoArquivo;
        }

        $publicidade = Publicidade::create($validated);

        return response()->json($publicidade, 201);
    }

    /*
    id (inteiro): Identificador único da publicidade – obrigatório
    titulo (texto): Título da publicidade – obrigatório
    descricao (texto): Descrição da publicidade – obrigatório
    imagem (arquivo): Imagem da publicidade – obrigatório
    botao_link (texto): Link do botão – obrigatório
    titulo_botao_link (texto): Título do botão – obrigatório
    id_publicidade_estado (inteiro): IDs dos estados vinculados à publicidade – obrigatório
    dt_inicio (data): Data de início da publicação – obrigatório
    dt_fim (data): Data de fim da publicação – obrigatório
    */

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $Publicidade = Publicidade::find($id);

        if (!$Publicidade) {
            return response()->json([
                'message' => 'Publicidade não encontrada'
            ], 404);
        }

        return response()->json($Publicidade, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $Publicidade = Publicidade::find($id);

        if (!$Publicidade) {
            return response()->json([
                'message' => 'Publicidade não encontrada'
            ], 404);
        }

        $request->validate([
            'titulo'                => 'required|string|max:255',
            'descricao'             => 'required|string',
            'imagem'                => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'botao_link'            => 'required|url',
            'titulo_botao_link'     => 'required|string|max:100',
            'id_publicidade_estado' => 'required|integer|exists:estados,id',
            'dt_inicio'             => 'required|date',
            'dt_fim'                => 'required|date|after_or_equal:dt_inicio',
        ]);

        $Publicidade->update($request->all());

        return response()->json($Publicidade, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Publicidade = Publicidade::find($id);

        if (!$Publicidade) {
            return response()->json([
                'message' => 'Publicidade não encontrada'
            ], 404);
        }

        $Publicidade->delete();

        return response()->json([
            'message' => 'Publicidade removida com sucesso'
        ], 200);
    }
}
