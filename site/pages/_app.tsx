import { FC } from 'react';
import { DefaultSeo, NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';

import '@styles/global.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <DefaultSeo
                title={undefined}
                titleTemplate='%s | cronabot.tech'
                defaultTitle='cronabot.tech'
                canonical='https://cronabot.tech/'
                openGraph={{
                    type: 'website',
                    url: 'https://cronabot.tech/',
                    site_name: 'cronabot.tech',
                }}
            />
            <Component {...pageProps} />
        </>
    );
};

export default App;
