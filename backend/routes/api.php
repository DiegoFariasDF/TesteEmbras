<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EstadoController;
use App\Http\Controllers\Api\PublicidadeController;

Route::apiResource('estados', EstadoController::class);

Route::apiResource('publicidade', PublicidadeController::class);