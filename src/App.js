import * as THREE from "three";
import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import styled from "styled-components";

export default function App() {
  return (
    <WrapperSC>
      <div>
        <div className="anim-container">
          <div class="middle">
            <h2>For we walk by faith, not by sight.</h2>
            <h1>APOSTLE DAO</h1>

            <a
              href="https://www.dextools.io/app/ether/pair-explorer/0x246ec743270318a1ee3a5ad9c5a4146ebb7310a7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Leap of Faith</button>
            </a>
            <div
              style={{ height: 35, width: 35, margin: "auto", marginTop: 40 }}
            >
              <a
                href="https://t.me/apostleportal"
                target="_blank"
                rel="noopener noreferrer"
                className="tg"
              >
                <img src="/tg.svg" alt="Telegram" />
              </a>
            </div>
          </div>

          <Canvas shadows camera={{ position: [0, 1.5, 14], fov: 50 }}>
            <fog attach="fog" args={["black", 0, 20]} />
            <pointLight position={[0, 10, -10]} intensity={1} />
            <Suspense fallback={null}>
              <Model position={[0, -6, 0]} rotation={[0, -0.2, 0]} />
              <Zoom />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </WrapperSC>
  );
}

function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/apostle.glb");
  useFrame(
    ({ pointer }) =>
      (group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * (Math.PI / 5),
        0.005
      ))
  );
  return (
    <group ref={group} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node_3.geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.2, 0.224, 0.224]}
        dispose={null}
      >
        <meshStandardMaterial roughness={0.9} metalness={0.5} color="#474747" />
      </mesh>
      <Lights />
    </group>
  );
}

function Lights() {
  const groupL = useRef();
  const groupR = useRef();
  const front = useRef();
  useFrame(({ pointer }) => {
    groupL.current.rotation.y = THREE.MathUtils.lerp(
      groupL.current.rotation.y,
      -pointer.x * (Math.PI / 2),
      0.1
    );
    groupR.current.rotation.y = THREE.MathUtils.lerp(
      groupR.current.rotation.y,
      pointer.x * (Math.PI / 2),
      0.1
    );
    front.current.position.x = THREE.MathUtils.lerp(
      front.current.position.x,
      pointer.x * 12,
      0.05
    );
    front.current.position.y = THREE.MathUtils.lerp(
      front.current.position.y,
      7 + pointer.y * 4,
      0.05
    );
  });
  return (
    <>
      <group ref={groupL}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <group ref={groupR}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <spotLight
        castShadow
        ref={front}
        penumbra={0.75}
        angle={Math.PI / 4}
        position={[0, 0, 8]}
        distance={10}
        intensity={15}
        shadow-mapSize={[2048, 2048]}
      />
    </>
  );
}

function Zoom() {
  useFrame((state) => {
    state.camera.position.lerp({ x: 0, y: 0, z: 12 }, 0.005);
    state.camera.lookAt(0, 0, 0);
  });
}

const WrapperSC = styled.div`
  background: black;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    font-family: "Josefin Sans", sans-serif;
    font-weight: 900;
  }

  .anim-container {
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .middle {
    font-size: 2em;
    letter-spacing: 0.5em;
    text-align: center;
    width: 100%;
    position: absolute;
    z-index: 9999;

    .tg {
      transition: 0.3s;
      :hover {
        opacity: 0.8;
      }
    }
  }

  .middle > h1 {
    line-height: 1em;
    font-weight: 100;
  }

  .middle > h2 {
    font-size: 1em;
    line-height: 0px;
    font-weight: 100;
    letter-spacing: 0.25em;
    font-style: italic;
  }

  button {
    background: white;
    border: none;
    padding: 8px 24px;
    cursor: pointer;
    transition: 0.3s;
    font-size: 20px;
    border-radius: 4px;
    font-family: "Amiri", serif;
    :hover {
      background: rgba(255, 255, 255, 0.85);
    }
  }

  @media only screen and (max-width: 1024px) {
    .middle > h2 {
      line-height: 135%;
      font-size: 0.75em;
    }
    .middle > h1 {
      font-size: 1.5em !important;
      margin-top: 0px;
    }
  }
`;
