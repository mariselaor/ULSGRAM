<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store(Request $request, Post $post)
    {
        // Evitar que un usuario le dé like más de una vez
        if ($post->likes()->where('user_id', $request->user()->id)->exists()) {
            return response()->json([
                'message' => 'Ya le diste like a este post.'
            ], 409);
        }

        $post->likes()->create([
            'user_id' => $request->user()->id
        ]);

        return response()->json([
            'message' => 'Like agregado correctamente.',
            'post_id' => $post->id
        ], 201);
    }

    public function destroy(Request $request, Post $post)
    {
        $like = $request->user()->likes()->where('post_id', $post->id)->first();

        if (!$like) {
            return response()->json([
                'message' => 'No tienes like en este post.'
            ], 404);
        }

        $like->delete();

        return response()->json([
            'message' => 'Like eliminado correctamente.',
            'post_id' => $post->id
        ], 200);
    }
}
