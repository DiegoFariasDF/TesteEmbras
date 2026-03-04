<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publicidade extends Model
{
    protected $table = 'cad_publicidade';

    public function estados(){
        return $this->belongsToMany(
            Estado::class,
            'cad_publicidade_estado',
            'id_publicidade',
            'id_estado'
        );
    }
}
