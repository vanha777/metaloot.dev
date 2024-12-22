'use client'
import React, { Suspense, useEffect } from 'react';
import { PortalModel } from './Portal';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import Loading from './loading';
import { useGLTF } from '@react-three/drei';
// import SpinningLoadingIcon from './SpinningLoadingIcon';

useGLTF.preload('/european_and_american_game_scencemagic_portal.glb')

interface ThreeComponentProps {
    chatBotState: string;
    actions?: string[];
}

const ThreeComponent: React.FC<ThreeComponentProps> = ({ chatBotState, actions }) => {
    const IronManCameraMyCamera = (): null => {
        const { camera } = useThree();
        camera.position.set(90, 100, 60);
        camera.lookAt(-0.5, 40, 0);
        return null;
    };

    return (
        <Suspense fallback={<Loading />}>
            <Canvas flat={false} linear={false}>
                <IronManCameraMyCamera />
                <directionalLight intensity={10} position={[1, 3, 0.5]} />
                <PortalModel botState={chatBotState} actions={actions} />
            </Canvas >
        </Suspense>
    );
};

export default ThreeComponent;