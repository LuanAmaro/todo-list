<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use SoftDeletes, HasUuids;

    protected $fillable = [
        "user_id",
        "title",
        "description",
        "status",
        "due_date",
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
