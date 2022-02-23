import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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
                        <Link href='/'>.home()</Link>
                        <Link href='/about'>.about()</Link>
                        <Link href='/portfolio'>.portfolio()</Link>
                        <Link href='/contact'>.contact()</Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
