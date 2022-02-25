import { FC, useEffect, useRef } from 'react';
import Navbar from '@components/Navbar';
import styles from '@styles/pages/index.module.scss';
import { NextSeo } from 'next-seo';

import dynamic from 'next/dynamic';

interface Props {}

const BoidSim = dynamic(() => import('@components/BoidSim'), { ssr: false });

const Home: FC<Props> = ({}) => {
    const typedText = useRef(null);

    useEffect(() => {
        let i = 0;
        const txt = 'Full stack web developer';

        const typewrite = () => {
            if (i < txt.length) {
                if (typedText.current) {
                    typedText.current.innerHTML += txt.charAt(i);
                    i++;
                    setTimeout(typewrite, 50);
                }
            }
        };

        setTimeout(typewrite, 500);
    }, []);

    return (
        <>
            <NextSeo title='Home' />
            <Navbar />
            <BoidSim
                style={{
                    height: '100vh',
                    width: '100%',
                    overflow: 'hidden',
                    position: 'fixed',
                    zIndex: '-1',
                }}
            />
            <div className={styles.landing}>
                <div className={styles.text}>
                    <h3>Hey, I&#39;m</h3>
                    <h1>Mani Cronin</h1>
                    <div>
                        <h3 className={styles.sub} ref={typedText}></h3>
                    </div>
                </div>
            </div>
            <div className={styles.about}>
                <h1>Skills</h1>
            </div>
        </>
    );
};

export default Home;
