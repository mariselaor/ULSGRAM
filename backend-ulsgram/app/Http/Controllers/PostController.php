<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $ids = $request->user()->followings->pluck('id')->toArray();
        $posts = Post::whereIn('user_id', $ids)->latest()->paginate(20);
        return response()->json($posts);
    }
}
