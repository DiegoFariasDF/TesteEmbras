<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{   
    protected $table = 'cad_estado';
    protected $fillable = ['descricao', 'sigla'];

    public function publicidades(){
        return $this->belongsToMany(
            Publicidade::class,
            'cad_publicidade_estado',
            'id_estado',
            'id_publicidade'
        );
    }
}
