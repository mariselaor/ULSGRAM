<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Usuario</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 font-sans">

    <div class="min-h-screen flex items-center justify-center px-4">
        <div class="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">✏️ Editar Usuario</h1>

            @if ($errors->any())
                <div class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                    <ul class="list-disc list-inside">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('users.update', $user->id) }}" method="POST" class="space-y-4">
                @csrf
                @method('PUT')

                <div>
                    <label class="block text-sm font-semibold text-gray-700">Nombre:</label>
                    <input type="text" name="name" value="{{ old('name', $user->name) }}"
                           class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700">Email:</label>
                    <input type="email" name="email" value="{{ old('email', $user->email) }}"
                           class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>

                <div class="flex justify-between items-center">
                    <a href="{{ route('dashboard') }}" class="text-sm text-blue-500 hover:underline">← Volver al Dashboard</a>
                    <button type="submit"
                            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Guardar</button>
                </div>
            </form>
        </div>
    </div>

</body>
</html>
