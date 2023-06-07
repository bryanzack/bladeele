'use client';
import {Canvas, useFrame, useLoader, useThree} from '@react-three/fiber';
import {STLLoader} from "three-stdlib";
import {ReactNode, useEffect, useRef, useState} from "react";
import {OrbitControls, PerspectiveCamera, useTexture} from "@react-three/drei";
import * as THREE from 'three';
import { useSpring, animated} from "@react-spring/three";
import { MeshTransmissionMaterial } from "@react-three/drei"
import { Howl } from "howler";
import EnterDialogue from "@/app/components/EnterDialogue";
import {useAtom} from "jotai";
import {acceptedAtom} from "@/jotai/atoms";
import Input from "@/app/components/Input";
import {Material, Mesh, TextureLoader} from "three";
import {cameraPosition} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import convertRange from "@/lib/convertRange";

const covers = [
    '/covers/333.jpg',
    '/covers/crest.jpg',
    '/covers/eversince.jpg',
    '/covers/exeter.jpg',
    '/covers/redlight.jpg',
    '/covers/thefool.jpg',
]



const AnimatedTransmission = animated(MeshTransmissionMaterial);

function Rig({ children }: {children: ReactNode }) {
    const ref = useRef();
    useFrame((state) => {
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (state.mouse.x * Math.PI) / 7, 0.05);
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, (state.mouse.y * Math.PI) / 7, 0.05);
    })
    return <group ref={ref}>{children}</group>

}



function Sphere({sound}: {sound: Howl}) {
    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    let material_ref = useRef();

    const mouseEnter = () => {
        document.body.style.cursor = 'pointer';
        setHover(true);
        sound.volume(0.1);
        sound.play();
    }
    const mouseLeave = () => {
        document.body.style.cursor = 'auto';
        setHover(false);
        sound.stop();
    }

    const handleClick = () => {
        //TODO: if user clicks off the sphere, sound will p[lay twice when hovered then when clicked
        if (!clicked) {
            sound.play();
            sound.volume(0.05);
            setClicked(true);
        }
    }

    const ctx = Howler.ctx;
    const analyser = ctx.createAnalyser();
    Howler.masterGain.connect(analyser);

    const props = useSpring({
        thickness: hover ? 100 : 65,
        chromatic: hover ? .5 : 0.01,
    });



    const chromatic_max = 1;
    const chromatic_min = .01;


    let data = new Uint8Array(analyser.frequencyBinCount);


    useFrame(() => {
        analyser.getByteFrequencyData(data);
        material_ref.current.thickness = data[100];
        console.log(material_ref.thickness);
    });


    return (
        <mesh position={[0, 0, 0]} onPointerEnter={() => mouseEnter()} onPointerLeave={() => mouseLeave()} onClick={() => handleClick()}>
            <icosahedronGeometry args={[55, 50]} />
            <MeshTransmissionMaterial ref={material_ref}
                anisotropy={0}
                anisotropicBlur={0}
                transmission={1}
                roughness={0.05}
                metalness={0}
                distortionScale={0}
                chromaticAberration={.4}
                temporalDistortion={0}/>
        </mesh>
    );
}

function Logo() {
    const geom = useLoader(STLLoader, '/untitled.stl');
    geom.computeVertexNormals();
    const ref = useRef();
    useFrame(({ clock }) => {
        ref.current!.rotation.z = clock.getElapsedTime()/10;
        ref.current!.rotation.y = clock.getElapsedTime()/100
        geom.center();
    });


    return (
        <mesh ref={ref} position={[1, 1, 0.8]}
              rotation={[180.7, 0, 0]}>
            <primitive object={geom} attach={'geometry'}/>
            <meshPhysicalMaterial color={'white'} flatShading={false}
            />
        </mesh>
    )
}

function AlbumSphere({x, y, texture}: {x: number, y: number, texture: THREE.Texture}) {
    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);

    const mouseEnter = () => {
        document.body.style.cursor = 'pointer';
        setHover(true);
    }
    const mouseLeave = () => {
        document.body.style.cursor = 'auto';
        setHover(false);
    }

    const handleClick = () => {
        //TODO: if user clicks off the sphere, sound will p[lay twice when hovered then when clicked
        if (!clicked) {
            setClicked(true);
        }
    }
    const props = useSpring({
        thickness: hover ? 35 : 15,
        chromatic: hover ? 0.01 : 0,
    });

    const camera = useThree((state) => state.camera)
    const camera_ref = useRef(camera.position)

    useFrame((state) => {
        camera_ref.current = state.camera.position;
    })

    return (
        <>
            <mesh position={[x, y , 0]} onUpdate={self => self.lookAt(camera_ref.current)}>
                <circleBufferGeometry attach={'geometry'} args={[18, 28]}/>
                <meshBasicMaterial attach={'material'} map={texture} />
            </mesh>
            <mesh position={[x, y, 0]} onPointerEnter={() => mouseEnter()} onPointerLeave={() => mouseLeave()}>
                <icosahedronGeometry args={[20, 50]} />
                <AnimatedTransmission
                    anisotropy={0}
                    anisotropicBlur={0}
                    transmission={1}
                    roughness={0.0}
                    thickness={props.thickness}
                    chromaticAberration={props.chromatic}
                    distortionScale={0} temporalDistortion={0}/>
            </mesh>
        </>
    );
}

export function AlbumSpheres() {
    let n = 6;
    let max = 100;
    let coords: {x: number, y: number}[] = [];
    for (let i = 0; i < n; i++) {
        let angle = i * (2 * Math.PI / n);
        let x = ( max ) * Math.cos( angle );
        let y = ( max ) * Math.sin( angle );
        coords.push({x: x, y: y});
    }

    const texture = useLoader(TextureLoader, covers[0]);
    return (
        <group>
            {coords.map((coord, i) => {
                return (
                    <group key={i} rotation={[5, 0, 0]} >
                        <AlbumSphere x={coord.x} y={coord.y} texture={texture} />
                    </group>
                )
            })}
        </group>
    )
}

export default async function Landing({json_string}: {json_string: string}) {
    const sound = new Howl({
        src: ['cut_file.mp3'],
        volume: .1,
        onload: function() {
            console.log('loaded sound')
        }
    });

    return (
        <div className={'w-screen h-screen flex items-center justify-center bg-black absolute'}>
            <div className={'z-50 fixed w-screen h-screen flex flex-col items-start justify-start p-[100px] selection:text-black selection:bg-white bg-blend-difference pointer-events-none'}>
                <div className={'w-fit h-fit flex flex-col'}>
                    <span className={'relative text-white text-[35px] selection:text-black selection:bg-white'}>BLADEELE</span>
                    <span className={'relative text-white text-[20px] self-end'}>B_ZY</span>
                </div>
            </div>

            <Canvas camera={{position: [100, 0, 140]}} dpr={4}>
                {/*<Background /> */}
                <OrbitControls />
                <Rig>
                    <Logo />
                    {/*<AlbumSpheres />*/}
                    <Sphere sound={sound} />
                </Rig>
                <directionalLight
                    intensity={0.4} color={'white'}/>
                <ambientLight
                    color={'white'}
                    intensity={0.09}
                />
            </Canvas>
        </div>
    );
}