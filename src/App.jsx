import { Vector3 } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  OrbitControls,
  Sparkles,
  Environment,
  Billboard,
  Text,
  Stars,
  FlyControls,
  FirstPersonControls,
  PerspectiveCamera,
  Merged,
} from '@react-three/drei';
import { getProject } from '@theatre/core';

import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
} from '@react-three/postprocessing';
import { KernelSize, BlendFunction } from 'postprocessing';
import { proxy, useSnapshot } from 'valtio';
import useMeasure from 'react-use-measure';
import { useState, useEffect, useRef, useMemo } from 'react';
const modes = ['translate', 'rotate', 'scale'];
const state = proxy({ current: null, mode: 0 });
import { useLayoutEffect } from 'react';
import { SheetProvider } from '@theatre/r3f';
function Helmet(...props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/helmet-transformed.glb');

  useFrame(({ camera }) => {
    group.current.quaternion.copy(camera.quaternion);
    group.current.position.copy(camera.position);
    group.current.translateZ(-1);
    return null;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Helmet_1.geometry} material={materials.Helmet} />
      <mesh geometry={nodes.Helmet_2.geometry} material={materials.Window} />
    </group>
  );
}

function BigPlanetSpotlight({ vec = new Vector3(), ...props }) {
  const light = useRef();
  // const viewport = useThree((state) => state.viewport)

  useFrame((state) => {
    light.current.target.position.set(-20, 70, -300);
    light.current.target.updateMatrixWorld();
  });
  return (
    <spotLight
      position={[-100, 340, -10]}
      ref={light}
      penumbra={1}
      distance={400}
      angle={Math.PI / 3}
      intensity={100}
      power={200}
      shadow-mapSize-width={4096}
      shadow-mapSize-height={4096}
      {...props}
    />
  );
}

function Controls() {
  useFrame(({ camera }) => {
    camera.rotation.order = 'XYZ';
    return null;
  });

  // Get notified on changes to state
  const snap = useSnapshot(state);
  const scene = useThree((state) => state.scene);
  return (
    <>
      {snap.current && (
        <TransformControls
          object={scene.getObjectByName(snap.current)}
          mode={modes[snap.mode]}
        />
      )}
      <OrbitControls rotateSpeed={0.2} />
      {/* <FirstPersonControls lookSpeed={0.05}/> */}
    </>
  );
}

function Space({ instances, ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/earth.glb');

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Earth001.geometry}
        material={materials['earth.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.smallPlanet.geometry}
        material={materials.smallPlanetMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_1.geometry}
        material={materials.Rock_set}
        position={[8.59, -7.46, -5.85]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_1001.geometry}
        material={materials.Rock_set}
        position={[16.4, -3.15, -9.34]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.13}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_1002.geometry}
        material={materials.Rock_set}
        position={[8.43, -7.55, -2.49]}
        rotation={[1.58, 0.82, -2.97]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_2.geometry}
        material={materials.Rock_set}
        position={[4.33, -8.93, -1.73]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_3.geometry}
        material={materials.Rock_set}
        position={[2.9, -7.35, -1.73]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_4.geometry}
        material={materials.Rock_set}
        position={[-3.51, -7.35, -3.52]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5.geometry}
        material={materials.Rock_set}
        position={[-0.7, -7.35, -10.22]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5001.geometry}
        material={materials.Rock_set}
        position={[-5.34, -7.64, 2.58]}
        rotation={[-0.41, -0.96, -1.55]}
        scale={0.15}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5002.geometry}
        material={materials.Rock_set}
        position={[8.81, -1.68, -1.37]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5003.geometry}
        material={materials.Rock_set}
        position={[28.59, 1.44, -28.34]}
        rotation={[-0.03, -0.2, 0.03]}
        scale={[0.11, 0.06, 0.11]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5004.geometry}
        material={materials.Rock_set}
        position={[4.95, -7.3, -6.31]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.03}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5005.geometry}
        material={materials.Rock_set}
        position={[9.94, -7.3, 0.81]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.03}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5006.geometry}
        material={materials.Rock_set}
        position={[-2.63, 3.23, 4.81]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.03}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5007.geometry}
        material={materials.Rock_set}
        position={[-2.86, -7.3, -5.72]}
        rotation={[Math.PI / 2, 0, -1.53]}
        scale={0.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5008.geometry}
        material={materials.Rock_set}
        position={[3.41, -7.3, -11.45]}
        rotation={[Math.PI / 2, 0, 2.35]}
        scale={0.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5009.geometry}
        material={materials.Rock_set}
        position={[2.78, -7.3, -4.07]}
        rotation={[Math.PI / 2, 0, -1.87]}
        scale={0.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5010.geometry}
        material={materials.Rock_set}
        position={[0.67, -7.3, -6.65]}
        rotation={[Math.PI / 2, 0, 2.27]}
        scale={0.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5011.geometry}
        material={materials.Rock_set}
        position={[-3.01, -7.3, -6.03]}
        rotation={[Math.PI / 2, 0, 0.76]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5012.geometry}
        material={materials.Rock_set}
        position={[-3.82, -9.78, 11.04]}
        rotation={[0.84, 0.82, -1.89]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5013.geometry}
        material={materials.Rock_set}
        position={[-18.45, 0.3, 10.7]}
        rotation={[-0.41, -0.96, -1.55]}
        scale={[-0.03, -0.07, -0.07]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5014.geometry}
        material={materials.Rock_set}
        position={[-5.96, -7.74, -12.53]}
        rotation={[-0.03, -0.2, 0.03]}
        scale={[0.04, 0.02, 0.04]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5015.geometry}
        material={materials.Rock_set}
        position={[-28.69, -11.28, 2.55]}
        rotation={[-3, 1.36, 3.04]}
        scale={[-0.21, -0.11, -0.21]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5016.geometry}
        material={materials.Rock_set}
        position={[-6.87, -7.6, -8.79]}
        rotation={[Math.PI / 2, 0, 0.76]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5017.geometry}
        material={materials.Rock_set}
        position={[-25.26, -7.61, 6.61]}
        rotation={[2.63, 0.57, 2.61]}
        scale={0.15}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5018.geometry}
        material={materials.Rock_set}
        position={[17.9, -0.01, 6.71]}
        rotation={[0.45, 0.36, -1]}
        scale={[0.2, 0.19, 0.14]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5019.geometry}
        material={materials.Rock_set}
        position={[28.19, -2.85, 0.23]}
        rotation={[-2.73, 0.68, 1.63]}
        scale={[0.12, 0.11, 0.08]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5020.geometry}
        material={materials.Rock_set}
        position={[-10.88, -5.08, 13.25]}
        rotation={[-0.78, 0.42, -2.59]}
        scale={[0.12, 0.11, 0.08]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5021.geometry}
        material={materials.Rock_set}
        position={[4.9, -4.25, 13.57]}
        rotation={[-0.78, 0.42, -2.59]}
        scale={[0.1, 0.1, 0.07]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5022.geometry}
        material={materials.Rock_set}
        position={[9.76, -7.82, 8.32]}
        rotation={[-0.78, 0.42, -2.59]}
        scale={[0.03, 0.03, 0.02]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5023.geometry}
        material={materials.Rock_set}
        position={[12.85, -7.96, 4.43]}
        rotation={[-0.78, 0.42, -2.59]}
        scale={[0.03, 0.03, 0.02]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5024.geometry}
        material={materials.Rock_set}
        position={[4.83, -5.14, 2.86]}
        rotation={[-2.88, -1.29, -2.36]}
        scale={-0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5025.geometry}
        material={materials.Rock_set}
        position={[5.41, -3.17, 2.47]}
        rotation={[2.95, 0.28, -3.03]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5026.geometry}
        material={materials.Rock_set}
        position={[4.36, -3.17, -0.79]}
        rotation={[2.95, 0.28, -3.03]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5027.geometry}
        material={materials.Rock_set}
        position={[5.5, -3.17, -3.51]}
        rotation={[0.43, 0.97, -3.13]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5028.geometry}
        material={materials.Rock_set}
        position={[1.17, -4.77, -4.38]}
        rotation={[0.43, 0.97, -3.13]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5029.geometry}
        material={materials.Rock_set}
        position={[5.1, -6.47, 2.92]}
        rotation={[-0.72, 0.64, 2.51]}
        scale={0.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5030.geometry}
        material={materials.Rock_set}
        position={[-2.77, -4.89, -2.06]}
        rotation={[-1.01, -0.44, 1.49]}
        scale={[0.03, 0.01, 0.03]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5031.geometry}
        material={materials.Rock_set}
        position={[-6.39, -5.11, -4.05]}
        rotation={[-1.01, -0.44, 1.49]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5032.geometry}
        material={materials.Rock_set}
        position={[-0.77, -5.02, -10.83]}
        rotation={[-1.01, -0.44, 1.49]}
        scale={[0.01, 0, 0.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5033.geometry}
        material={materials.Rock_set}
        position={[4.39, -5.58, -8.66]}
        rotation={[-1.01, -0.44, 1.49]}
        scale={[0.01, 0, 0.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5034.geometry}
        material={materials.Rock_set}
        position={[6.72, -5, -2.64]}
        rotation={[-1.01, -0.44, 1.49]}
        scale={[0.01, 0, 0.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5035.geometry}
        material={materials.Rock_set}
        position={[1.79, -5.94, 0.59]}
        rotation={[-1.01, -0.44, 1.49]}
        scale={[0.01, 0, 0.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5036.geometry}
        material={materials.Rock_set}
        position={[3.96, -5.15, 2.98]}
        rotation={[-1.01, -0.44, 1.49]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5037.geometry}
        material={materials.Rock_set}
        position={[2.04, -5.81, -1]}
        rotation={[-1.01, -0.44, 1.49]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5038.geometry}
        material={materials.Rock_set}
        position={[2.04, -5.81, -1]}
        rotation={[-1.01, -0.44, 1.49]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5039.geometry}
        material={materials.Rock_set}
        position={[8.67, -6.03, -18.66]}
        rotation={[0.65, -1.18, 1.23]}
        scale={[0.1, 0.04, 0.12]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5040.geometry}
        material={materials.Rock_set}
        position={[-3.51, -7.25, -3.59]}
        rotation={[-3.14, -0.5, -3.13]}
        scale={[0.11, 0.04, 0.13]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5041.geometry}
        material={materials.Rock_set}
        position={[-10.47, -12.97, 13.35]}
        rotation={[-0.97, 0.4, -2.06]}
        scale={[0.08, 0.18, 0.17]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_5042.geometry}
        material={materials.Rock_set}
        position={[35.58, -10.95, -20.34]}
        rotation={[-0.13, 0.73, 2.21]}
        scale={[0.06, 0.14, 0.13]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['milky-way'].geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RightBayDoor.geometry}
        material={materials.EndeavourSub}
        position={[26.62, 2.61, 0.31]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LeftBayDoor.geometry}
        material={materials.EndeavourSub}
        position={[24.38, 2.64, -1.38]}
      />
      <group position={[23.06, 2.35, 2.67]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh009.geometry}
          material={materials.InteriorSub}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh009_1.geometry}
          material={materials.EndeavourSub}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Capsule.geometry}
        material={materials['Material.001']}
        position={[24.05, 4.29, 1.49]}
      />
    </group>
  );
}

export default function App() {
  const sheet = getProject('Earth').sheet('Scene');

  return (
    <Canvas
      camera={{ fov: 60, near: 0.01, far: 4000 }}
      gl={{ alpha: false }}
      shadows
    >
      <SheetProvider sheet={sheet}>
        <Space />
        <Helmet></Helmet>

        <Stars
          radius={400}
          depth={50}
          count={5000}
          factor={10}
          saturation={0}
          fade
          speed={1}
        />

        <color attach="background" args={['#000000']} />
        <BigPlanetSpotlight />

        <Controls />

        <EffectComposer>
          <Bloom
            kernelSize={4}
            luminanceThreshold={0.1}
            luminanceSmoothing={0}
            intensity={4}
            opacity={0.04}
          />

          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.001, 0.001]}
            opacity={0.1}
          />

          <Noise
            premultiply // enables or disables noise premultiplication
            blendFunction={BlendFunction.SCREEN} // blend mode
            opacity={0.5}
          />

          <Vignette
            offset={0.5}
            darkness={0.6}
            eskil={false}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </SheetProvider>
    </Canvas>
  );
}
