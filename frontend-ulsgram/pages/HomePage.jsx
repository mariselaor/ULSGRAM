import React from 'react';
import Posts from './components/Posts';

function HomePage() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Página Principal</h1>
      <Posts />
    </main>
  );
}

export default HomePage;
