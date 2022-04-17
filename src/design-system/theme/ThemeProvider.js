import React, { useState, useMemo, useEffect } from 'react';
import CSSBaseline from '../CSSBaseline';
import ThemeContext, { defaultContext } from './ThemeContext';
import withDefaults from '@utils/with-defaults';
import deepMerge from '@utils/deep-merge';
import { copyObject } from '@utils/object';
import { changeTheme, getThemeName, getDocumentCSSTokens, getDocumentTheme } from './utils';
import useSSR from '@hooks/useSSR';

const defaultProps = {
    disableBaseline: false,
};

const ThemeProvider = ({ theme: userTheme, disableBaseline, children }) => {
    const { isBrowser } = useSSR();

    const [currentTheme, setCurrentTheme] = useState(defaultContext.type);

    const changeCurrentTheme = (type) => {
        setCurrentTheme((ct) => (ct !== type ? type : ct));
    };

    const changeTypeBaseEl = (el) => {
        const themeValue = getDocumentTheme(el);
        themeValue && changeCurrentTheme(themeValue);
    };

    const providerValue = useMemo(() => {
        const themeTokens = isBrowser ? getDocumentCSSTokens() : {};
        const theme = deepMerge(copyObject(defaultContext.theme), themeTokens);
        const themeName = getThemeName(currentTheme);
        return {
            theme,
            type: themeName,
            isDark: themeName === 'dark',
        };
    }, [currentTheme, isBrowser]);

    useEffect(() => {
        // initial set
        changeTypeBaseEl(document?.documentElement);

        const observer = new MutationObserver((mutation) => {
            if (mutation && mutation.length > 0 && mutation[0]?.target.nodeName === 'BODY') {
                const documentTheme = document?.body?.dataset?.theme;
                documentTheme && changeCurrentTheme(documentTheme);
            } else {
                changeTypeBaseEl(document?.documentElement);
            }
        });

        observer.observe(document?.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme', 'style'],
        });

        observer.observe(document?.body, {
            attributes: true,
            attributeFilter: ['data-theme', 'style'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isBrowser || !userTheme) {
            return;
        }
        if (userTheme?.className) {
            changeTheme(userTheme.className);
            changeCurrentTheme(getThemeName(userTheme.className));
        }
    }, [isBrowser, userTheme]);

    return (
        <ThemeContext.Provider value={providerValue}>
            {!disableBaseline && <CSSBaseline />}
            {children}
        </ThemeContext.Provider>
    );
};

export default withDefaults(ThemeProvider, defaultProps);
