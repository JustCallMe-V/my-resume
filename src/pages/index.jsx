import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Menu } from "./components/Menu";
import { ScrollManager } from "./components/ScrollManager";
import { Interface } from "./components/Interface";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { framerMotionConfig } from "./config";
import './index.css'

export default function Resume() {
    const [section, setSection] = useState(0);
    const [menuOpened, setMenuOpened] = useState(false);
      
    useEffect(() => {
        setMenuOpened(false);
    }, [section])
    
    return (
        <>
            <MotionConfig transition={{ ...framerMotionConfig }}>
            <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
      
              <ScrollControls pages={4} damping={0.1}>
              <ScrollManager section={section} onSectionChange={setSection}/>
              <Scroll>
                <Experience section={section} menuOpened={menuOpened}/>
              </Scroll>
                <Scroll html>
                  <Interface setSection={setSection}/>
                </Scroll>  
              </ScrollControls>
            </Canvas>
            <Menu onSectionChange={setSection} setMenuOpened={setMenuOpened} menuOpened={menuOpened}/>
            </MotionConfig>
            <Leva hidden/>
        </>
    );
}