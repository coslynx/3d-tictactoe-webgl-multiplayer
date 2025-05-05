import React, { useCallback, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial, PlaneGeometry } from 'three';
import { Cell } from '@/components/Cell';
import { useGame } from '@/hooks/useGame';

type BoardProps = {};

const Board: React.FC<BoardProps> = React.memo(() => {
  const { board, makeMove } = useGame();
  const boardRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (boardRef.current) {
      // This is intentionally left blank, but keeps the component active and responsive.
    }
  });

  const renderBoard = useCallback(() => {
    const cells = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        cells.push(
          <Cell
            key={`${row}-${col}`}
            row={row}
            col={col}
            piece={board[row][col]}
            makeMove={makeMove}
          />
        );
      }
    }
    return cells;
  }, [board, makeMove]);

  try {
    return (
      <group>
        <mesh
          ref={boardRef}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
          aria-label="Tic-Tac-Toe Board"
        >
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial color="#282c34" roughness={0.7} metalness={0.2} />
        </mesh>
        {renderBoard()}
      </group>
    );
  } catch (error: any) {
    console.error('Error rendering Board:', error);
    return (
      <div className="text-red-500 font-bold text-center font-body">
        An error occurred while rendering the board. Please check the console for details.
      </div>
    );
  }
});

Board.displayName = 'Board';

export default Board;