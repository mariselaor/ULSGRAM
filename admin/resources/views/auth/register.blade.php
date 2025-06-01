<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Registro - Panel de Administración</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">

    <div class="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <div class="flex justify-center mb-6">
            <img src="https://via.placeholder.com/100x100?text=Logo" alt="Logo" class="h-20" />
        </div>

        <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Crear cuenta</h2>

        @if ($errors->any())
            <div class="bg-red-100 text-red-700 p-4 rounded-md mb-4">
                <ul class="list-disc list-inside text-sm">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST" action="{{ route('register.submit') }}" class="space-y-5">
            @csrf

            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nombre completo</label>
                <input id="name" type="text" name="name" value="{{ old('name') }}" required autofocus
                       class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required
                       class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input id="password" type="password" name="password" required
                       class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div>
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
                <input id="password_confirmation" type="password" name="password_confirmation" required
                       class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div>
                <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                    Registrarse
                </button>
            </div>
        </form>

        <p class="text-sm text-center mt-6">
            ¿Ya tienes cuenta?
            <a href="{{ route('login') }}" class="text-blue-600 hover:underline">Inicia sesión</a>
        </p>
    </div>

</body>
</html>
