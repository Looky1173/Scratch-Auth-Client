import React from 'react';
import { IconButton } from '@design-system';

import { useTheme as useNextTheme } from 'next-themes';
import { useTheme } from '@hooks';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { useRouter } from 'next/router';

const ThemeToggle = (props) => {
    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();

    const router = useRouter();

    const setGlobalTheme = (theme) => {
        const shouldAnimateThemeTransition = router?.pathname?.startsWith('/documentation');
        if (shouldAnimateThemeTransition) {
            const transitionCSS = '* { transition: 0.2s all linear !important; pointer-events: none !important; }';
            const head = document.head;
            let style = document.createElement('style');
            head.appendChild(style);
            style.setAttribute('type', 'text/css');
            style.setAttribute('id', 'theme-transition-global-styles');
            style.appendChild(document.createTextNode(transitionCSS));
        }

        setTheme(theme);

        if (shouldAnimateThemeTransition) {
            setTimeout(() => {
                document.getElementById('theme-transition-global-styles').remove();
            }, 300);
        }
    };

    return (
        <IconButton size="2" variant="ghost" onClick={() => (type === 'dark' ? setGlobalTheme('light') : setGlobalTheme('dark'))} {...props} aria-label="toggle a light and dark color scheme">
            {isDark ? <SunIcon width={18} height={18} /> : <MoonIcon width={18} height={18} />}
        </IconButton>
    );
};

export default ThemeToggle;
