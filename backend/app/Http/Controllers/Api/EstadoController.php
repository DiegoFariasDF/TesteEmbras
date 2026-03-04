<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Estado;
use Illuminate\Http\Request;

class EstadoController extends Controller
{
    /**
     * Listar todos os estados
     */
    public function index()
    {
        return response()->json(Estado::all(), 200);
    }

    /**
     * Criar novo estado
     */
    public function store(Request $request)
    {
        $request->validate([
            'descricao' => 'required|string|max:255',
            'sigla' => 'required|string|max:2',
        ]);

        $estado = Estado::create($request->all());

        return response()->json($estado, 201);
    }

    /**
     * Mostrar estado específico
     */
    public function show(string $id)
    {
        $estado = Estado::find($id);

        if (!$estado) {
            return response()->json([
                'message' => 'Estado não encontrado'
            ], 404);
        }

        return response()->json($estado, 200);
    }

    /**
     * Atualizar estado
     */
    public function update(Request $request, string $id)
    {
        $estado = Estado::find($id);

        if (!$estado) {
            return response()->json([
                'message' => 'Estado não encontrado'
            ], 404);
        }

        $request->validate([
            'descricao' => 'sometimes|required|string|max:255',
            'sigla' => 'sometimes|required|string|max:2',
        ]);

        $estado->update($request->all());

        return response()->json($estado, 200);
    }

    /**
     * Remover estado
     */
    public function destroy(string $id)
    {
        $estado = Estado::find($id);

        if (!$estado) {
            return response()->json([
                'message' => 'Estado não encontrado'
            ], 404);
        }

        $estado->delete();

        return response()->json([
            'message' => 'Estado removido com sucesso'
        ], 200);
    }
}