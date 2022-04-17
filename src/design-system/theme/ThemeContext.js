import React from 'react';
import { theme } from './stitches.config';

export const defaultContext = {
    isDark: false,
    theme,
    type: 'light',
};

const ThemeContext = React.createContext(defaultContext);

export default ThemeContext;
