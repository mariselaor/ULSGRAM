@extends('layauts.app')

@section('titulo')
    Inicia sesión en Ulsgram
@endsection

@section('contenido')
    <div class="md:flex md:justify-center md:gap-10">

        <div class="md:w-6/12 p-5">
            <img src="{{ asset('img/inicio2.png') }}" alt="Imagen login de usuarios">
        </div>

        <div class="md:w-4/12 bg-white p-6 rounded-lg shadow-xl">

            <form method="POST" action="{{ route('login') }}" novalidate>
                @csrf

                @if (session('mensaje'))
                    <p class="bg-red-500 text-white my-2 rounded-lg text-sm p-2 text-center">
                        {{ session('mensaje') }}
                    </p>
                @endif

                <div class="mb-5">
                    <label for="email" class="mb-2 block uppercase text-gray-500 font-bold"> 
                        Email
                    </label>
                    <input id="email" name="email" type="email" placeholder="Correo Electrónico" 
                        class="border p-3 w-full rounded-lg focus:outline-none focus:border-blue-500 @error('email') border-red-500 @enderror" 
                        value="{{ old('email') }}">
                    
                    @error('email')
                        <p class="bg-red-500 text-white my-2 rounded-lg text-sm p-2 text-center">
                            {{$message}}
                        </p>
                    @enderror
                </div>

                <div class="mb-5">
                    <label for="password" class="mb-2 block uppercase text-gray-500 font-bold"> 
                        Password
                    </label>
                    <input id="password" name="password" type="password" placeholder="Contraseña" 
                        class="border p-3 w-full rounded-lg focus:outline-none focus:border-blue-500 @error('password') border-red-500 @enderror">
                   
                    @error('password')
                        <p class="bg-red-500 text-white my-2 rounded-lg text-sm p-2 text-center">
                            {{$message}}
                        </p>
                    @enderror
                </div>

                <div class="mb-5">
                    <input type="checkbox" name="remember" id="remember" class="mr-2">
                    <label for="remember" class="text-gray-500 text-sm">
                        Mantener la sesión abierta
                    </label>
                </div>

                <button type="submit" class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    </div>
@endsection
