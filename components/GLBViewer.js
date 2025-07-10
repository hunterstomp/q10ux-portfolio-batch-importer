// GLBViewer.js is deprecated and not used. The 3D avatar implementation has been removed.
// If you need to restore this component, uncomment and refactor as needed.

// import React, { Suspense, useRef, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useGLTF, useAnimations, ContactShadows } from '@react-three/drei';
//
// function Model({ url, pose = {}, playAnimation = true, ...props }) {
//   const group = useRef();
//   const { scene, animations } = useGLTF(url);
//   const { actions } = useAnimations(animations, group);
//
//   // Play first animation if available
//   useEffect(() => {
//     if (playAnimation && actions && Object.keys(actions).length > 0) {
//       actions[Object.keys(actions)[0]].reset().fadeIn(0.3).play();
//     }
//   }, [actions, playAnimation]);
//
//   // Custom pose: upright, leaning left (user's left)
//   useEffect(() => {
//     if (group.current) {
//       group.current.rotation.set(
//         (pose.x || 0),
//         (pose.y || 0),
//         (pose.z !== undefined ? pose.z : 0.18) // ~10deg lean to left
//       );
//       group.current.position.set(
//         (pose.px || 0),
//         (pose.py !== undefined ? pose.py : -1.1), // lower to ground
//         (pose.pz || 0)
//       );
//     }
//   }, [pose]);
//
//   return <group ref={group}><primitive object={scene} {...props} /></group>;
// }
//
// const GLBViewer = ({ url, height = 400, ...props }) => (
//   <div style={{ width: '100%', height }}>
//     <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} shadows>
//       <ambientLight intensity={0.7} />
//       <Suspense fallback={null}>
//         <Model url={url} {...props} />
//         <OrbitControls enablePan={false} />
//         <ContactShadows position={[0, -0.8, 0]} opacity={0.3} width={4} height={4} blur={1.5} far={1.5} />
//       </Suspense>
//     </Canvas>
//   </div>
// );
//
// export default GLBViewer;

// Required for GLTF loading
// useGLTF.preload = (url) => {}; 