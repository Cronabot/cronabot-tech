import { CSSProperties, FC, useState } from 'react';
import p5Types from 'p5';
import dynamic from 'next/dynamic';
import Boid from './Boid';

interface Props {
    style?: CSSProperties;
}

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

const BoidSim: FC<Props> = ({ style }) => {
    const flock: Boid[] = [];

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(
            canvasParentRef
        );
        for (let i = 0; i < 100; i++) {
            flock.push(new Boid(p5));
            console.log(flock.length);
        }
    };

    const draw = (p5: p5Types) => {
        p5.background('rgb(21,21,21)');
        flock.forEach((boid) => {
            boid.update(p5);
            boid.flock(p5, flock);
            boid.draw(p5);
        });
    };

    const windowResized = (p5: p5Types) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    return (
        <div style={style}>
            <Sketch setup={setup} draw={draw} windowResized={windowResized} />
        </div>
    );
};
export default BoidSim;
