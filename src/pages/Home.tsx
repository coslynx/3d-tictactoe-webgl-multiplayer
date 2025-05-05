import React from 'react';
import Board from '@/components/Board';

const Home: React.FC = () => {
  try {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-primary text-secondary font-body">
        <h1 className="text-4xl font-heading mb-8">3D Tic-Tac-Toe</h1>
        <Board />
      </div>
    );
  } catch (error: any) {
    console.error('Error rendering Home:', error);
    return (
      <div className="text-red-500 font-bold text-center font-body">
        An error occurred while loading the game. Please check the console for details.
      </div>
    );
  }
};

Home.displayName = 'Home';

export default Home;