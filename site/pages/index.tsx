import { FC, useEffect, useRef } from 'react';
import Navbar from '@components/Navbar/Navbar';
import styles from '@styles/pages/index.module.scss';
import { NextSeo } from 'next-seo';

interface Props {}

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
            <div className={styles.landing}>
                <canvas></canvas>
                <div className={styles.text}>
                    <h3>Hey, I&#39;m</h3>
                    <h1>Mani Cronin</h1>
                    <div>
                        <h3 className={styles.sub} ref={typedText}></h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
