'use client';
import {Canvas, useFrame, useLoader, useThree} from '@react-three/fiber';
import {STLLoader} from "three-stdlib";
import {ReactNode, startTransition, useEffect, useRef, useState} from "react";
import {OrbitControls, PerspectiveCamera, useTexture} from "@react-three/drei";
import * as THREE from 'three';
import { useSpring, animated} from "@react-spring/three";
import { animated as a } from '@react-spring/web'
import { MeshTransmissionMaterial } from "@react-three/drei"
import { Howl } from "howler";
import {Material, Mesh, TextureLoader} from "three";
import convertRange from "@/lib/convertRange";
import {gsap} from 'gsap-trial';
import Link from "next/link";
import BurgerMenu from "@/app/components/BurgerMenu";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {ListInfo} from "@/utils/types";
import {setMainHovered, setTrackList} from "@/lib/redux/mainSlice";
import {RootState} from "@/lib/redux/store";

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
    const hovered = useAppSelector((state: RootState) => state.main.main_hovered);
    const dispatch = useAppDispatch();

    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    let material_ref = useRef();

    const mouseEnter = () => {
        document.body.style.cursor = 'pointer';
        dispatch(setMainHovered(true));
        setHover(true);
        sound.volume(0.1);
        sound.play();
    }
    const mouseLeave = () => {
        document.body.style.cursor = 'auto';
        //setHover(false);
        sound.stop();
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

    const roughness_max = 0.1;
    const roughness_min = 0;


    let data = new Uint8Array(analyser.frequencyBinCount);

    const vec = new THREE.Vector3();
    useFrame((state) => {
        analyser.getByteFrequencyData(data);
        const getAvg = (array: Uint8Array) => array.reduce((a, b) => a + b) / array.length;
        //console.log(avg(data.slice(0,20)));
        const avg_low = getAvg(data.slice(0,20));
        const avg_high = getAvg(data.slice(400,1023));
        const high = convertRange({
            params: {
                old_value: avg_high,
                old_min: 0,
                old_max: 255,
                new_min: 0.01,
                new_max: 1,
            }
        });
        const low = convertRange({
            params: {
                old_value: avg_low,
                old_min: 0,
                old_max: 255,
                new_min: 60,
                new_max: 100,
            }
        });
        const low_rough = convertRange({
            params: {
                old_value: avg_low,
                old_min: 0,
                old_max: 255,
                new_min: 0.02,
                new_max: 0.08
            }
        })
        //console.log(low);
        material_ref.current!.thickness = low;
        material_ref.current!.chromaticAberration = high;
        material_ref.current!.roughness = low_rough;

        if (hovered) {
            state.camera.position.lerp(vec.set(250, 0, 140), .008);
        } else {
            state.camera.position.lerp(vec.set(100, 0, 140), 0.008);
        }

    });


    return (
        <mesh position={[0, 0, 0]} onPointerEnter={() => mouseEnter()} onPointerLeave={() => mouseLeave()} onClick={() => handleClick()}>
            <icosahedronGeometry args={[55, 50]} />
            <AnimatedTransmission
                thickness={props.thickness}
                ref={material_ref}
                anisotropy={0}
                anisotropicBlur={0}
                transmission={1}
                metalness={0}
                distortionScale={0}
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
        ref.current!.rotation.y = clock.getElapsedTime()/100;
        geom.center();
    });


    return (
        <mesh ref={ref} position={[1, -1, 0]}
              rotation={[180.7, 0, 0]}>
            <primitive object={geom} attach={'geometry'}/>
            <meshPhysicalMaterial color={'white'} flatShading={false}
            />
        </mesh>
    )
}

function AlbumSphere({x, y, texture, album_name, list_info}: {x: number, y: number, texture: THREE.Texture, album_name: string, list_info: ListInfo}) {
    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    const dispatch = useAppDispatch();
    const main_hovered = useAppSelector((state: RootState) => state.main.main_hovered);

    const mouseEnter = () => {
        document.body.style.cursor = 'pointer';
        setHover(true);
    }
    const mouseLeave = () => {
        document.body.style.cursor = 'auto';
        setHover(false);
    }

    const handleClick = () => {
        const album_obj = list_info.albums.filter(a => a.album_name === album_name)[0];
        dispatch(setTrackList(album_obj.track_list));
    }
    const props = useSpring({
        thickness: hover ? 55 : 45,
        chromatic: hover ? 0.09 : 0,
    });

    const scale_props = useSpring({
        scale: main_hovered ? 1 : 0,
        config: {
            duration: 1000,
        }
    });

    const camera = useThree((state) => state.camera)
    const camera_ref = useRef(camera.position)

    useFrame((state) => {
        camera_ref.current = state.camera.position;
    })

    return (
        <>
            <animated.mesh scale={scale_props.scale} position={[x, y , 0]} onUpdate={self => self.lookAt(camera_ref.current)}>
                <circleBufferGeometry attach={'geometry'} args={[18, 28]}/>
                <meshBasicMaterial attach={'material'} map={texture} />
            </animated.mesh>
            <animated.mesh scale={scale_props.scale} position={[x, y, 0]} onPointerEnter={() => mouseEnter()} onPointerLeave={() => mouseLeave()} onClick={() => handleClick()}>
                <icosahedronGeometry args={[20, 50]} />
                <AnimatedTransmission
                    anisotropy={0}
                    anisotropicBlur={0}
                    transmission={1}
                    roughness={0.0}
                    thickness={props.thickness}
                    chromaticAberration={props.chromatic}
                    distortionScale={0} temporalDistortion={0}/>
            </animated.mesh>
        </>
    );
}

export function AlbumSpheres({list_info}: {list_info: ListInfo}) {
    let n = 6;
    let max = 100;
    let coords: {x: number, y: number}[] = [];
    for (let i = 0; i < n; i++) {
        let angle = i * (2 * Math.PI / n);
        let x = ( max ) * Math.cos( angle );
        let y = ( max ) * Math.sin( angle );
        coords.push({x: x, y: y});
    }

    const three = useLoader(TextureLoader, covers[0]);
    const crest = useLoader(TextureLoader, covers[1]);
    const eversince = useLoader(TextureLoader, covers[2]);
    const exeter = useLoader(TextureLoader, covers[3]);
    const redlight = useLoader(TextureLoader, covers[4]);
    const thefool = useLoader(TextureLoader, covers[5]);
    const albums = ['333', 'Crest [with Ecco2k]', 'Eversince', 'Exeter', 'Red Light', 'The Fool'];
    const textures = [three, crest, eversince, exeter, redlight, thefool];
    return (
        <group>
            {coords.map((coord, i) => {
                return (
                    <group key={i} rotation={[0, 70, 0]} >
                        <AlbumSphere x={coord.x} y={coord.y} texture={textures[i]} album_name={albums[i]} list_info={list_info}/>
                    </group>
                )
            })}
        </group>
    )
}

export default async function Landing({list_info}: {list_info: ListInfo}) {
    const sound = new Howl({
        src: ['cut_file.mp3'],
        volume: .1,
        onload: function() {
            console.log('loaded sound')
        }
    });

    const [active, setActive] = useState(true);

    const props = useSpring({
        to: {
            opacity: active ? 1 : 0,
            pointerEvents: active ? 'auto' : 'none',
        },
        config: {
            duration: 700,
        }
    });

    return (
        <div className={'w-screen h-screen flex items-center justify-center bg-black absolute'}>
            {/*
            <div className={'z-50 fixed w-screen h-screen flex flex-col items-start justify-start p-[100px] selection:text-black selection:bg-white bg-blend-difference pointer-events-none'}>
                <div className={'w-fit h-fit flex flex-col'}>
                    <span className={'relative text-white text-[35px] selection:text-black selection:bg-white'}>BLADEELE</span>
                    <span className={'relative text-white text-[20px] self-end'}>B_ZY</span>
                </div>
            </div>
            */}
            <a.div style={props}
                className={`w-screen h-screen flex items-center justify-center fixed z-50 bg-black`}
                onClick={() => startTransition(() => setActive(false))}>
                <span className={'text-white font-montserrat text-2xl cursor-pointer'}>Enter.</span>
            </a.div>

            <Canvas camera={{position: [100, 0, 140]}} dpr={4}>
                {/*<Background /> */}
                <OrbitControls />
                <Rig>
                    <Logo />
                    <AlbumSpheres list_info={list_info} />
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