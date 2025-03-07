@extends('layauts.app')

@section('titulo')
    Editar perfil: {{auth()->user()->username}}
@endsection

@section('contenido')
    <div class="md:flex md:justify-center">
        <div class="md:w-1/2 bg-white shadow p-6">

            <form class="mt-10 md:mt-0" action="{{route('perfil.store')}}" enctype="multipart/form-data" method="POST">
                @csrf
                <div class="mb-5">

                    <label for="username" class="mb-2 block uppercase text-gray-500 font-bold"> 
                        Username 
                    </label>

                    <input id="username" name="username" type="text" placeholder="Tu Nombre de Usuario" 
                    class="border p-3 w-full rounded-lg @error('username') border-red-500 @enderror" value="{{ auth()->user()->username }}">

                    @error('username')
                        <p class="bg-red-500 text-white my-2 rounded-lg text-sm p-2 text-center">
                            {{$message}}
                        </p>
                    @enderror

                </div>

                <div class="mb-5">

                    <label for="imagen" class="mb-2 block uppercase text-gray-500 font-bold"> 
                        Imagen de perfil 
                    </label>

                    <input id="imagen" name="imagen" type="file"
                    class="border p-3 w-full rounded-lg" value="" accept=".jpg, .jpeg, .png">

                </div>

                <input
                    type="submit"
                    value="Guardar cambios"
                    class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg"
                />
                
            </form>
        </div>
    </div>
@endsection