import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Navbar.module.scss';

interface Props {}

const Navbar: FC<Props> = ({}) => {
    const [mounted, setMounted] = useState(false);
    const [toggled, setToggled] = useState(false);

    const menuRef = useRef(null);
    const toggleRef = useRef(null);

    useEffect(() => setMounted(true), []);
    useEffect(() => {
        if (menuRef.current)
            menuRef.current.className =
                styles.menu + ' ' + (toggled ? styles.menuToggled : '');
        if (toggleRef.current) {
            toggleRef.current.className =
                styles.toggle + ' ' + (toggled ? styles.buttonToggled : '');
            toggleRef.current.disabled = true;
            setTimeout(() => {
                toggleRef.current.disabled = false;
            }, 500);
        }
    }, [toggled]);

    const currentPage = useRouter().pathname;

    if (!mounted) return null;

    return (
        <>
            <nav className={styles.nav}>
                <button
                    className={styles.toggle}
                    ref={toggleRef}
                    onClick={() => {
                        setToggled(!toggled);
                    }}>
                    <div className={styles.hamburger}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </button>
                <div className={styles.menu} ref={menuRef}>
                    <div className={styles.bg}>
                        <div></div>
                        <div className={styles.mid}></div>
                        <div></div>
                    </div>
                    <div className={styles.links}>
                        <Link href='/'>
                            <a
                                className={
                                    currentPage == '/' ? styles.active : ''
                                }>
                                .home()
                            </a>
                        </Link>
                        <Link href='/about'>
                            <a
                                className={
                                    currentPage == '/about' ? styles.active : ''
                                }>
                                .about()
                            </a>
                        </Link>
                        <Link href='/portfolio'>
                            <a
                                className={
                                    currentPage == '/portfolio'
                                        ? styles.active
                                        : ''
                                }>
                                .portfolio()
                            </a>
                        </Link>
                        <Link href='/contact'>
                            <a
                                className={
                                    currentPage == '/contact'
                                        ? styles.active
                                        : ''
                                }>
                                .contact()
                            </a>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
