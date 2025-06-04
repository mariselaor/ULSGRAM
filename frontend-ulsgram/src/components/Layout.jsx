import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">Mi Aplicación</h1>
      </header>

      <main className="py-8">
        <Outlet />
      </main>

      <footer className="bg-white shadow p-4 text-center mt-10">
        © {new Date().getFullYear()} Mi Aplicación
      </footer>
    </div>
  );
}

export default Layout;
