import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import PortfolioScreen from "@/../public/img/portfolio_screen.jpg"

export const projects = [
    {
        title: "Resume Website",
        url: "someurl",
        image: PortfolioScreen?.src,
        desc: "My resume"
    },
   {
        title: "Google Cybersecurity",
        url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
        image: "https://img.icons8.com/color/480/google-logo.png",
        desc: "A cybersec cert"
    }
]

const Project = (props) => {
    const {project, highlighted} = props;
    const bg = useRef();
    const bgOpacity = useMotionValue(.4);

    useEffect(() => {
        animate(bgOpacity, highlighted ? .7 : .4);
    }, [highlighted])

    useFrame(() =>{
        bg.current.material.opacity = bgOpacity.get();
    })
    
    return (
        <group {...props}>
            <mesh ref={bg} position-z={-.001} onClick={() => window.open(project.url, "_blank")}>
                <planeGeometry args={[2.2, 2]}/>
                <meshBasicMaterial color="black" transparent opacity={.4}/>
            </mesh>
            <Image scale={[2, 1.2, 1]} url={project.image} toneMapped={false} position-y={.3}/>
            <Text maxWidth={2} anchorX={"left"} anchorY={"top"} fontSize={.2} position={[-1,  -.4, 0]}>{project.title}</Text>
            <Text maxWidth={2} anchorX={"left"} anchorY={"top"} fontSize={.1} position={[-1,  -.6, 0]}>{project.desc}</Text>
        </group>
    )
}

export const currProjectAtom = atom(Math.floor(projects.length) / 2);

export const ProjectSlider = (props) => {
    const { viewport } = useThree();
    const [currProject] = useAtom(currProjectAtom);

    return (
        <>
        <group position-y={-viewport.height * 2 + 1}>
            {
            projects.map((project, index) => (
                <motion.group key={"project_" + index} position={[index * 2.5, 0, -3]}
                animate={{
                    x: 0 + (index - currProject) * 2.5,
                    y: currProject === index ? 0 : -.1,
                    z: currProject === index ? -2 : -3,
                    rotateX: currProject === index ? 0 : -Math.PI / 3,
                    rotateZ: currProject === index ? 0 : -.1 * Math.PI,
                }}>
                    <Project project={project} highlighted={index===currProject}/>
                </motion.group>
            ))
            }
        </group>
        </>
    );
}