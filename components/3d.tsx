'use client'
import React, { Suspense } from 'react';
import { PortalModel } from './Portal';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import SpinningLoadingIcon from './SpinningLoadingIcon';

interface ThreeComponentProps {
    chatBotState: string;
    actions?: string[];
}

const ThreeComponent: React.FC<ThreeComponentProps> = ({ chatBotState, actions }) => {
    const IronManCameraMyCamera = (): null => {
        const { camera } = useThree();
        useFrame(() => {
            camera.position.set(90, 100, 60); // Moved camera further out by increasing z
            camera.lookAt(-0.5, 40, 0); // Looking up more by increasing y target further
        });
        return null;
    };

    return (
        <Canvas flat={false} linear={false}>
            {/* <Suspense fallback={<SpinningLoadingIcon />}> */}
                <IronManCameraMyCamera />
                <directionalLight intensity={10} position={[1, 3, 0.5]} />
                <PortalModel botState={chatBotState} actions={actions} />
            {/* </Suspense> */}
        </Canvas>
    );
};

export default ThreeComponent;