import React, { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTF } from 'three-stdlib';

type PieceProps = {
  piece: string | null;
};

type GLTFResult = GLTF & {
  nodes: {
    [name: string]: THREE.Mesh
  }
}

const Piece: React.FC<PieceProps> = React.memo(({ piece }) => {
  const url = piece === 'X' ? '/models/x.glb' : piece === 'O' ? '/models/o.glb' : null;

  const { nodes } = useLoader(
    GLTFLoader,
    url,
    (loader) => {
    }
  ) as GLTFResult;

  if (!url) {
    return null;
  }

  const meshName = piece === 'X' ? 'X' : piece === 'O' ? 'O' : null;

  const mesh = meshName && nodes[meshName];

  try {
    return (
      <Suspense fallback={null}>
        {mesh ? (
          <mesh
            geometry={mesh.geometry}
            scale={0.5}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.2, 0]}
            receiveShadow
            castShadow
            aria-label={piece === 'X' ? 'X Piece' : 'O Piece'}
          >
            <meshStandardMaterial
              color={piece === 'X' ? '#61dafb' : '#98c379'}
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>
        ) : null}
      </Suspense>
    );
  } catch (error: any) {
    console.error('Error rendering Piece:', error);
    return (
      <div className="text-red-500 font-bold text-center font-body">
        An error occurred while rendering the piece.
      </div>
    );
  }
});

Piece.displayName = 'Piece';

export default Piece;