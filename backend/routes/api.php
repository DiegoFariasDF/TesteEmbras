<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EstadoController;

Route::apiResource('estados', EstadoController::class);