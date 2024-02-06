import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const Model = ({ position, text }) => {
  const group = useRef();

  // Rotate the model
  useFrame(() => {
    group.current.rotation.y += 0.005;
  });

  return (
    <div className="relative">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <group ref={group} position={position}>
          {/* Your 3D model goes here */}
          <mesh>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={new THREE.Color(0x00ff00)} />
          </mesh>

          {/* Text mapped to the bottom of the model */}
          <mesh position={[0, -0.75, 0]}>
            <textGeometry attach="geometry" args={[text, { size: 0.1, height: 0.01 }]} />
            <meshStandardMaterial attach="material" color={new THREE.Color(0xffffff)} />
          </mesh>
        </group>
      </Canvas>
      <div className="absolute bottom-0 left-0 bg-gray-800 text-white p-4">
        {/* Additional information or controls */}
      </div>
    </div>
  );
};

const ModelColumn = () => {
  const models = [
    { text: 'Model 1', position: [0, 0, 0] },
    { text: 'Model 2', position: [0, -2, 0] },
    { text: 'Model 3', position: [0, -4, 0] },
    { text: 'Model 4', position: [0, -4, 0] },
    { text: 'Model 5', position: [0, -4, 0] },
    { text: 'Model 6', position: [0, -4, 0] },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {models.map((model, index) => (
        <Model key={index} {...model} />
      ))}
    </div>
  );
};

export default ModelColumn;
