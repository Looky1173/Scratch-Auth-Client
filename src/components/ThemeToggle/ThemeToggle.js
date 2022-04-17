import React from 'react';
import { IconButton } from '@design-system';

import { useTheme as useNextTheme } from 'next-themes';
import { useTheme } from '@hooks';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

const ThemeToggle = (props) => {
    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();

    return (
        <IconButton size="2" variant="ghost" onClick={() => (type === 'dark' ? setTheme('light') : setTheme('dark'))} {...props} aria-label="toggle a light and dark color scheme">
            {isDark ? <SunIcon width={18} height={18} /> : <MoonIcon width={18} height={18} />}
        </IconButton>
    );
};

export default ThemeToggle;
