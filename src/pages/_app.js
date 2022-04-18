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
            <Script data-website-id="3910acac-41c1-4af3-8d47-968e10c1b638" data-domains="auth.itinerary.eu.org" src="https://analytics.itinerary.eu.org/umami.js" />
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
