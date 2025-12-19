import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// import { useScroll } from '@react-three/drei';

export default function NeuralBackground() {
    const meshRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    // Parameters for the "Loss Surface"
    const geometry = useMemo(() => {
        return new THREE.PlaneGeometry(30, 30, 60, 60);
    }, []);

    // Animate the surface to simulate "training" or "entropy"
    useFrame((state) => {
        const { clock } = state;
        const t = clock.getElapsedTime();

        if (meshRef.current) {
            // Gentle rotation or movement
            // meshRef.current.rotation.x = -Math.PI / 2.5 + Math.sin(t * 0.1) * 0.05;
        }

        // Animate vertices (CPU side heavy, but okay for low poly)
        // For better performance, we should ideally use a Vertex Shader.
        // Here we use a simple simulation for the "Loss Surface"

        const count = geometry.attributes.position.count;
        const positions = geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            const x = positions[i * 3];
            const y = positions[i * 3 + 1]; // This is actually our Z in 2D plane logic before rotation
            // We calculate Z displacement based on X, Y
            const z = Math.sin(x * 0.3 + t * 0.5) * Math.cos(y * 0.3 + t * 0.3) * 1.5;
            // In PlaneGeometry standard, it's laid out on XY plane. We displace Z.
            // But we will rotate the mesh -90deg on X, so Z becomes Y (height).
            positions[i * 3 + 2] = z;
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();

        // Move the "Optimizer" light
        if (lightRef.current) {
            lightRef.current.position.x = Math.sin(t * 0.7) * 8;
            lightRef.current.position.z = Math.cos(t * 0.5) * 8;
            lightRef.current.position.y = 2 + Math.sin(t * 2) * 0.5; // Hover above
        }
    });

    return (
        <>
            {/* Dark Ambient Atmosphere */}
            <ambientLight intensity={0.1} color="#020617" />
            {/* The glowing optimizer pulse */}
            <pointLight ref={lightRef} intensity={2} distance={15} decay={2} color="#22d3ee" />

            {/* The Loss Surface Mesh */}
            <mesh
                ref={meshRef}
                geometry={geometry}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -2, 0]}
            >
                <meshStandardMaterial
                    color="#0a1025"
                    wireframe={true}
                    roughness={0.4}
                    metalness={0.8}
                    emissive="#1e1b4b"
                    emissiveIntensity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Add a secondary mesh for the 'fill' to hide below elements if any, or just aesthetic */}
            <mesh
                geometry={geometry}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -2.05, 0]} // Slightly below
            >
                <meshBasicMaterial color="#020617" side={THREE.DoubleSide} transparent opacity={0.9} />
            </mesh>
        </>
    );
}
