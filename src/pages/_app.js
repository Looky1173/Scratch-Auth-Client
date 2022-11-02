import { UIProvider } from '@design-system/theme';
import { createTheme } from '@design-system/theme/stitches.config';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Script from 'next/script';
import { fetcher } from '@constants';

import { CustomToastProvider, ToastContainer } from '@design-system';

import { SWRConfig } from 'swr';
//import fetchJson from '@utils/fetch-json';

const lightTheme = createTheme({
    type: 'light',
});

const darkTheme = createTheme({
    type: 'dark',
});

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Script src="https://cdn.counter.dev/script.js" data-id="ba0fade3-2043-4627-92c0-b8e6f6ea8a69" data-utcoffset="1" />
            <SWRConfig
                value={{
                    fetcher: fetcher,
                    onError: (err) => {
                        console.error(err);
                    },
                }}
            >
                <NextThemesProvider
                    defaultTheme="system"
                    attribute="class"
                    value={{
                        light: lightTheme.className,
                        dark: darkTheme.className,
                    }}
                >
                    <UIProvider>
                        <CustomToastProvider>
                            <Component {...pageProps} />
                            <ToastContainer />
                        </CustomToastProvider>
                    </UIProvider>
                </NextThemesProvider>
            </SWRConfig>
        </>
    );
}

export default MyApp;
