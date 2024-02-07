//Avatar Component

import React, { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";

export function Avatar(props) {
  const group = useRef();
  const { animation } = props;
  const { nodes, materials } = useGLTF("models/65ab1ea2858eacb175fa3f86.glb");

  const {headFollow, cursorFollow, wireframe} = useControls({
    headFollow: false,
    cursorFollow: false,
    wireframe: false,
  });

  const {animations: TypingAnimation } = useFBX("animations/Typing.fbx");
  const {animations: FallingIdlingAnimation } = useFBX("animations/FallingIdle.fbx");
  const {animations: FallingToLandingAnimation } = useFBX("animations/FallingToLanding.fbx");
  const {animations: FallingToRollingAnimation } = useFBX("animations/FallingToRoll.fbx");
  const {animations: NeutralIdlingAnimation } = useFBX("animations/NeutralIdle.fbx");

  TypingAnimation[0].name = "Typing";
  FallingIdlingAnimation[0].name = "FallingIdle";
  FallingToLandingAnimation[0].name = "FallingToLanding";
  FallingToRollingAnimation[0].name = "FallingToRolling";
  NeutralIdlingAnimation[0].name = "NeutralIdle";

  const {actions} =  useAnimations(
                          [
                            TypingAnimation[0],
                            FallingIdlingAnimation[0],
                            FallingToLandingAnimation[0],
                            FallingToRollingAnimation[0],
                            NeutralIdlingAnimation[0]
                          ],
                          group);

  useFrame((state) => {
    if (headFollow){
      group.current.getObjectByName('Head').lookAt(state.camera.position);
    }
    if (cursorFollow){
      const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
      group.current.getObjectByName("Head").lookAt(target);
    }
  });

  useEffect( () => {
    actions[animation].reset().fadeIn(.5).play();
    return () => {
      actions[animation].reset().fadeOut(.5);
    }
  }, [animation]);

  useEffect( () => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireframe;
    });
  }, [wireframe]);

  return (
    <group {...props} ref={group} dispose={null}>
    <group rotation-x={-Math.PI / 2}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        frustumCulled={false}
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        frustumCulled={false}
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        frustumCulled={false}
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        frustumCulled={false}
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Headwear.geometry}
        material={materials.Wolf3D_Headwear}
        skeleton={nodes.Wolf3D_Headwear.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
    </group>
  );
}

useGLTF.preload("models/65ab1ea2858eacb175fa3f86.glb");

