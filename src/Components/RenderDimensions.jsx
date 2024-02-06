import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { useWebSocket } from 'react-use-websocket';
import * as THREE from 'three';
import {
  DefaultFurnitureCatalog,
  DefaultTexturesCatalog,
  DefaultUserPreferences,
  HomeFileRecorder,
  HomeXMLExporter,
  HomeXMLHandler,
  ContentRecording,
  DamagedHomeIOException,
} from 'home-3d-sdk';

const Model = ({ position, text }) => {
  const group = useRef();

  useFrame(() => {
    group.current.rotation.y += 0.005;
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={new THREE.Color(0x00ff00)} />
        <DefaultFurnitureCatalog>{Model.blueprint}</DefaultFurnitureCatalog>
      </mesh>

      <mesh position={[0, -0.75, 0]}>
        <textGeometry attach="geometry" args={[text, { size: 0.1, height: 0.01 }]} />
        <meshStandardMaterial attach="material" color={new THREE.Color(0xffffff)} />
        <DefaultTexturesCatalog onMessage={HomeXMLExporter}>{Model.model}</DefaultTexturesCatalog>
      </mesh>
    </group>
  );
};

const DynamicModel = () => {
  const [position, setPosition] = useState([0, 0, 0]);

  const { sendJsonMessage } = useWebSocket('wss://example.com/ws', {
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      setPosition(data.position);
    },
    shouldReconnect: () => true,
  });

  useEffect(() => {
    sendJsonMessage({ position: position });
  }, [sendJsonMessage, position]);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model position={position} text="Dynamic Model" />
      <HomeXMLExporter homewire core = {Model.stack}/>
    </Canvas>
  );
};

export default DynamicModel;
