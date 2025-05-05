import React, { useCallback, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { MeshStandardMaterial, PlaneGeometry } from 'three';

type CellProps = {
  row: number;
  col: number;
  piece: string | null;
  makeMove: (row: number, col: number) => void;
};

const Cell: React.FC<CellProps> = React.memo(({ row, col, piece, makeMove }) => {
  const { scene } = useThree();
  const material = useMemo(() => {
    try {
      return new MeshStandardMaterial({ color: '#282c34', roughness: 0.7, metalness: 0.2 });
    } catch (materialError: any) {
      console.error('Error creating MeshStandardMaterial:', materialError);
      return null;
    }
  }, []);

  const handleClick = useCallback(() => {
    makeMove(row, col);
  }, [row, col, makeMove]);

  try {
    return (
      <mesh
        position={[col - 1, 0.1, row - 1]}
        onClick={handleClick}
        receiveShadow
        aria-label={`Cell at row ${row}, column ${col}`}
      >
        <planeGeometry args={[1, 1]} />
        {material && <meshStandardMaterial attach="material" color="#282c34" roughness={0.7} metalness={0.2} />}
      </mesh>
    );
  } catch (error: any) {
    console.error('Error rendering Cell:', error);
    return (
      <div className="text-red-500 font-bold text-center font-body">
        An error occurred while rendering the cell.
      </div>
    );
  }
});

Cell.displayName = 'Cell';

export default Cell;