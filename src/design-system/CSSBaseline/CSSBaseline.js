import React from 'react';
import { globalCss, getCssText } from '../theme/stitches.config';

const globalStyles = globalCss({
    '*, *:before, *:after': {
        boxSizing: 'border-box',
        textRendering: 'geometricPrecision',
        WebkitTapHighlightColor: 'transparent',
    },
    'html, body, #root, #__next': {
        height: '100%',
    },
    '#__next': {
        position: 'relative',
        zIndex: 0,
    },
    html: {
        fontSize: '$4',
    },
    body: {
        margin: 0,
        padding: 0,
        minHeight: '100%',
        position: 'relative',
        overflowX: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        fontSize: '$4',
        lineHeight: '$md',
        fontFamily: '$sans',
    },
    'html, body': {
        backgroundColor: '$loContrast',
        color: '$text',
    },
    'p, small': {
        letterSpacing: '$tighter',
        fontWeight: '$normal',
        fontFamily: '$sans',
    },
    p: {
        margin: '$md 0',
        fontSize: '$4',
        lineHeight: '$lg',
    },
    small: {
        margin: 0,
        lineHeight: '$md',
        fontSize: '$2',
    },
    b: {
        fontWeight: '$semibold',
    },
    span: {
        fontSize: 'inherit',
        fontWeight: 'inherit',
    },
    img: {
        maxWidth: '100%',
    },
    a: {
        cursor: 'pointer',
        fontSize: 'inherit',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        WebkitBoxAlign: 'center',
        alignItems: 'center',
        color: '$link',
        textDecoration: 'none',
    },
    'a:hover': {
        textDecoration: 'none',
    },
    'ul,ol': {
        padding: 0,
        listStyleType: 'none',
        margin: '$sm $sm $sm $lg',
        color: '$foreground',
    },
    ol: {
        listStyleType: 'decimal',
    },
    li: {
        marginBottom: '$5',
        fontSize: '$4',
        lineHeight: '$lg',
    },
    'h1,h2,h3,h4,h5,h6': {
        margin: '0 0 $5 0',
    },
    h1: {
        letterSpacing: '$tighter',
        lineHeight: '$md',
        fontSize: '$8',
        fontWeight: '$bold',
    },
    h2: {
        letterSpacing: '$tighter',
        fontSize: '$7',
        fontWeight: '$semibold',
    },
    h3: {
        letterSpacing: '$tighter',
        fontSize: '$6',
        fontWeight: '$semibold',
    },
    h4: {
        letterSpacing: '$tighter',
        fontSize: '$5',
        fontWeight: '$semibold',
    },
    h5: {
        letterSpacing: '$tight',
        fontSize: '$4',
        fontWeight: '$semibold',
    },
    h6: {
        letterSpacing: '$tight',
        fontSize: '$3',
        fontWeight: '$semibold',
    },
    'button, input, select,textarea': {
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        margin: 0,
    },
    'button:focus, input:focus, select:focus,textarea:focus': {
        outline: 'none',
    },
    code: {
        color: '$code',
        padding: '$1 $2',
        borderRadius: '$xs',
        bg: '$codeLight',
        fontFamily: '$mono',
        fontSize: '$xs',
        whiteSpace: 'pre-wrap',
        transition: '$default',
    },
    'code:hover': {
        opacity: 0.8,
    },
    pre: {
        overflow: 'auto',
        whiteSpace: 'pre',
        textAlign: 'left',
        fontSize: '$3',
        borderRadius: '$lg',
        padding: '$md $lg',
        margin: '$lg 0 ',
        fontFamily: '$mono',
        lineHeight: '$md',
        webkitOverflowScrolling: 'touch',
    },
    'pre code': {
        color: '$foreground',
        fontSize: '$xs',
        lineHeight: '$sm',
        whiteSpace: 'pre',
    },
    'pre code:before,pre code:after': {
        display: 'none',
    },
    'pre p': {
        margin: 0,
    },
    'pre::-webkit-scrollbar': {
        display: 'none',
        width: 0,
        height: 0,
        background: 'transparent',
    },
    hr: {
        borderColor: '$accents2',
    },
    details: {
        backgroundColor: '$accents1',
        border: 'none',
    },
    'details:focus, details:hover, details:active': {
        outline: 'none',
    },
    summary: {
        cursor: 'pointer',
        userSelect: 'none',
        listStyle: 'none',
        outline: 'none',
    },
    'summary::-webkit-details-marker, summary::before': {
        display: 'none',
    },
    'summary::-moz-list-bullet': {
        fontSize: 0,
    },
    'summary:focus, summary:hover, summary:active': {
        outline: 'none',
        listStyle: 'none',
    },
    '::selection': {
        backgroundColor: '$selection',
    },
    blockquote: {
        padding: '$md $lg',
        color: '$accents5',
        backgroundColor: '$accents1',
        borderRadius: '$lg',
        margin: '$10 0',
    },
    'blockquote *:first-child': {
        marginTop: 0,
    },
    'blockquote *:last-child': {
        marginBottom: 0,
    },
    svg: {
        display: 'block',
        verticalAlign: 'middle',
    },
});

const flushCSS = () => <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />;

const CssBaseline = ({ children }) => {
    globalStyles();
    return <React.Fragment>{children}</React.Fragment>;
};

const MemoCssBaseline = React.memo(CssBaseline);
MemoCssBaseline.flush = flushCSS;

export default MemoCssBaseline;
