import { FC } from 'react';
import Navbar from '@components/Navbar/Navbar';

interface Props {}

const about: FC<Props> = ({}) => {
    return (
        <>
            <Navbar />
            About
        </>
    );
};

export default about;
