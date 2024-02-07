import { Room } from "./Room";
import { motion } from "framer-motion-3d";
import { animate, useMotionValue } from "framer-motion";
import { Avatar } from "./Avatar";
import { useScroll } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useEffect} from "react";
import { useRef } from "react";
import { useState } from "react";
import * as THREE from "three";
import { framerMotionConfig } from "../config";
import { ProjectSlider } from "./ProjectSlider";

export const Experience = (props) => {
  const {menuOpened} = props;
  const { viewport } = useThree();

  const cameraPosX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const characterContainerAboutSectionRef = useRef();
  const [characterAnimation, setCharacterAnimation] = useState("Typing");



  const data = useScroll();
  const [section, setSection]  = useState(0);

  useEffect(() => {
    setCharacterAnimation("FallingIdle");
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Typing" : "NeutralIdle")
    }, 600);
  }, [section]);

  useEffect(()=> {
    animate(cameraPosX, menuOpened ? -5 : 0, { ...framerMotionConfig });
    animate(cameraLookAtX, menuOpened ? 5 : 0, { ...framerMotionConfig});
  }, [menuOpened]);

  useFrame( (state) => {
    state.camera.position.x = cameraPosX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
    let curSection = Math.floor(data.scroll.current * data.pages);
    if (curSection > 3){
      curSection = 3;
    }
    if (curSection !== section){
      setSection(curSection);
    }
  })

  return (
    <>
      <motion.group 
      position={[1.6387343504688006, 0.1323, 2.2121416244019487]} 
      rotation={[-3.141592653589793, 1.0953981633974483, 3.141592653589793]}
      animate= {"" + section}
      transition={{
        duration: .6
      }}
      variants={{
        0: {
          scaleX: .9,
          scaleY: .9,
          scaleZ: .9
        },
        1: {
          y: -viewport.height + .5,
          x: 0,
          z: 7,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scaleX: 1.5,
          scaleY: 1.5,
          scaleZ: 1.5
        },
        2: {
          x: -2,
          y: -viewport.height * 2 + 0.5,
          z: 0,
          rotateX: 0,
          rotateY: Math.PI / 2,
          rotateZ: 0,
        },
        3: {
          y: -viewport.height * 3 + 1.3,
          x: 0.1,
          z: 8.5,
          rotateX: 0,
          rotateY: -Math.PI / 4,
          rotateZ: 0,
          scaleX: .9,
          scaleY: .9,
          scaleZ: .9,
        },
      }}
      >
        <Avatar animation={characterAnimation}/>
      </motion.group>
      <ambientLight intensity={1}></ambientLight>
      <motion.group 
      position={[1.5, 2, 3]} scale={[.9, .9, .9]} rotation-y={-Math.PI / 4}
      animate={{
        y: section === 0 ? 0 : -1,
      }}>
        <Room section={section}/>
        <group ref={characterContainerAboutSectionRef} name="Empty" position={[-0.51, 0.147, -0.728]} rotation={[-Math.PI, 0.31, -Math.PI]}>
        </group>
      </motion.group>
      <motion.group 
      position={[0, -1.5, -10]}
      animate={{
        z: section === 1 ? 0 : -10,
        y: section === 1 ? -viewport.height : -1.5,
      }}
      >
      </motion.group>
      <ProjectSlider/>
    </>
  );
};
