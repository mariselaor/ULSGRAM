<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Publicacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function toggleLike($publicacionId)
    {
        try {
            $publicacion = Publicacion::findOrFail($publicacionId);
            $like = $publicacion->likes()->where('user_id', Auth::id())->first();

            if ($like) {
                $like->delete();
                $action = 'removed';
            } else {
                Like::create([
                    'user_id' => Auth::id(),
                    'publicacion_id' => $publicacionId
                ]);
                $action = 'added';
            }

            // Obtener el nuevo conteo de likes
            $likesCount = $publicacion->likes()->count();

            return response()->json([
                'success' => true,
                'action' => $action,
                'likes_count' => $likesCount
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al procesar el like',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}