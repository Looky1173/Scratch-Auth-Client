import { defaultThemeMap as defaultStitchesThemeMap } from '@stitches/react';
import {
    gray,
    mauve,
    slate,
    sage,
    olive,
    sand,
    tomato,
    red,
    crimson,
    pink,
    plum,
    purple,
    violet,
    indigo,
    blue,
    sky,
    mint,
    cyan,
    teal,
    green,
    grass,
    lime,
    yellow,
    amber,
    orange,
    brown,
    bronze,
    gold,
    grayA,
    mauveA,
    slateA,
    sageA,
    oliveA,
    sandA,
    tomatoA,
    redA,
    crimsonA,
    pinkA,
    plumA,
    purpleA,
    violetA,
    indigoA,
    blueA,
    skyA,
    mintA,
    cyanA,
    tealA,
    greenA,
    grassA,
    limeA,
    yellowA,
    amberA,
    orangeA,
    brownA,
    bronzeA,
    goldA,
    whiteA,
    blackA,
} from '@radix-ui/colors';

export const defaultTokens = {
    fonts: {
        untitled: 'Untitled Sans, -apple-system, system-ui, sans-serif',
        sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif;",
        mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono','Courier New', monospace;",
    },
    space: {
        1: '5px',
        2: '10px',
        3: '15px',
        4: '20px',
        5: '25px',
        6: '35px',
        7: '45px',
        8: '65px',
        9: '80px',
    },
    sizes: {
        1: '5px',
        2: '10px',
        3: '15px',
        4: '20px',
        5: '25px',
        6: '35px',
        7: '45px',
        8: '65px',
        9: '80px',
    },
    fontSizes: {
        1: '12px',
        2: '13px',
        3: '15px',
        4: '17px',
        5: '19px',
        6: '21px',
        7: '27px',
        8: '35px',
        9: '59px',
    },
    radii: {
        1: '4px',
        2: '6px',
        3: '8px',
        4: '12px',
        round: '50%',
        pill: '9999px',
    },
    zIndices: {
        1: '100',
        2: '200',
        3: '300',
        4: '400',
        max: '999',
    },
    fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
    lineHeights: {
        xs: 1,
        sm: 1.25,
        md: 1.5,
        lg: 1.625,
        xl: 1.75,
    },
    letterSpacings: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
    },
    borderWeights: {
        light: '1px',
        normal: '2px',
        bold: '3px',
        extrabold: '4px',
        black: '5px',
    },
    transitions: {
        default: 'all 250ms ease',
    },
    breakpoints: {
        xs: '650px',
        sm: '960px',
        md: '1280px',
        lg: '1400px',
        xl: '1920px',
    },
};

export const defaultColors = {
    ...gray,
    ...mauve,
    ...slate,
    ...sage,
    ...olive,
    ...sand,
    ...tomato,
    ...red,
    ...crimson,
    ...pink,
    ...plum,
    ...purple,
    ...violet,
    ...indigo,
    ...blue,
    ...sky,
    ...mint,
    ...cyan,
    ...teal,
    ...green,
    ...grass,
    ...lime,
    ...yellow,
    ...amber,
    ...orange,
    ...brown,
    ...bronze,
    ...gold,

    ...grayA,
    ...mauveA,
    ...slateA,
    ...sageA,
    ...oliveA,
    ...sandA,
    ...tomatoA,
    ...redA,
    ...crimsonA,
    ...pinkA,
    ...plumA,
    ...purpleA,
    ...violetA,
    ...indigoA,
    ...blueA,
    ...skyA,
    ...mintA,
    ...cyanA,
    ...tealA,
    ...greenA,
    ...grassA,
    ...limeA,
    ...yellowA,
    ...amberA,
    ...orangeA,
    ...brownA,
    ...bronzeA,
    ...goldA,

    ...whiteA,
    ...blackA,

    selection: '$accent5'
};

export const defaultMedia = {
    /* xs: `(min-width: ${defaultTokens.breakpoints.xs})`,
    sm: `(min-width: ${defaultTokens.breakpoints.sm})`,
    md: `(min-width: ${defaultTokens.breakpoints.md})`,
    lg: `(min-width: ${defaultTokens.breakpoints.lg})`,
    xl: `(min-width: ${defaultTokens.breakpoints.xl})`,
    xsMax: `(max-width: ${defaultTokens.breakpoints.xs})`,
    smMax: `(max-width: ${defaultTokens.breakpoints.sm})`,
    mdMax: `(max-width: ${defaultTokens.breakpoints.md})`,
    lgMax: `(max-width: ${defaultTokens.breakpoints.lg})`,
    xlMax: `(max-width: ${defaultTokens.breakpoints.xl})`,
    motion: '(prefers-reduced-motion)',
    safari: 'not all and (min-resolution:.001dpcm)',
    hover: '(any-hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)', */
    bp1: '(min-width: 520px)',
    bp2: '(min-width: 900px)',
    bp3: '(min-width: 1200px)',
    bp4: '(min-width: 1800px)',
    motion: '(prefers-reduced-motion)',
    hover: '(any-hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
};

export const defaultUtils = {
    p: (value) => ({
        padding: value,
    }),
    pt: (value) => ({
        paddingTop: value,
    }),
    pr: (value) => ({
        paddingRight: value,
    }),
    pb: (value) => ({
        paddingBottom: value,
    }),
    pl: (value) => ({
        paddingLeft: value,
    }),
    px: (value) => ({
        paddingLeft: value,
        paddingRight: value,
    }),
    py: (value) => ({
        paddingTop: value,
        paddingBottom: value,
    }),
    m: (value) => ({
        margin: value,
    }),
    mt: (value) => ({
        marginTop: value,
    }),
    mr: (value) => ({
        marginRight: value,
    }),
    mb: (value) => ({
        marginBottom: value,
    }),
    ml: (value) => ({
        marginLeft: value,
    }),
    mx: (value) => ({
        marginLeft: value,
        marginRight: value,
    }),
    my: (value) => ({
        marginTop: value,
        marginBottom: value,
    }),
    ta: (value) => ({
        textAlign: value,
    }),
    tt: (value) => ({
        textTransform: value,
    }),
    to: (value) => ({
        textOverflow: value,
    }),
    d: (value) => ({ display: value }),
    dflex: (value) => ({
        display: 'flex',
        alignItems: value,
        justifyContent: value,
    }),
    fd: (value) => ({
        flexDirection: value,
    }),
    fw: (value) => ({ flexWrap: value }),
    ai: (value) => ({
        alignItems: value,
    }),
    ac: (value) => ({
        alignContent: value,
    }),
    jc: (value) => ({
        justifyContent: value,
    }),
    as: (value) => ({
        alignSelf: value,
    }),
    fg: (value) => ({ flexGrow: value }),
    fs: (value) => ({
        fontSize: value,
    }),
    fb: (value) => ({
        flexBasis: value,
    }),
    bc: (value) => ({
        backgroundColor: value,
    }),
    bf: (value) => ({
        backdropFilter: value,
    }),
    bg: (value) => ({
        background: value,
    }),
    bgBlur: (value) => ({
        bf: 'saturate(180%) blur(10px)',
        bg: `${value}66`,
    }),
    bgColor: (value) => ({
        backgroundColor: value,
    }),
    backgroundClip: (value) => ({
        WebkitBackgroundClip: value,
        backgroundClip: value,
    }),
    bgClip: (value) => ({
        WebkitBackgroundClip: value,
        backgroundClip: value,
    }),
    br: (value) => ({
        borderRadius: value,
    }),
    bw: (value) => ({
        borderWidth: value,
    }),
    btrr: (value) => ({
        borderTopRightRadius: value,
    }),
    bbrr: (value) => ({
        borderBottomRightRadius: value,
    }),
    bblr: (value) => ({
        borderBottomLeftRadius: value,
    }),
    btlr: (value) => ({
        borderTopLeftRadius: value,
    }),
    bs: (value) => ({
        boxShadow: value,
    }),
    normalShadow: (value) => ({
        boxShadow: `0 4px 14px 0 $colors${value}`,
    }),
    normalShadowVar: (value) => ({
        boxShadow: `0 4px 14px 0 ${value}`,
    }),
    lh: (value) => ({
        lineHeight: value,
    }),
    ov: (value) => ({ overflow: value }),
    ox: (value) => ({
        overflowX: value,
    }),
    oy: (value) => ({
        overflowY: value,
    }),
    pe: (value) => ({
        pointerEvents: value,
    }),
    events: (value) => ({
        pointerEvents: value,
    }),
    us: (value) => ({
        WebkitUserSelect: value,
        userSelect: value,
    }),
    userSelect: (value) => ({
        WebkitUserSelect: value,
        userSelect: value,
    }),
    w: (value) => ({ width: value }),
    h: (value) => ({ height: value }),
    mw: (value) => ({ maxWidth: value }),
    maxW: (value) => ({
        maxWidth: value,
    }),
    mh: (value) => ({
        maxHeight: value,
    }),
    maxH: (value) => ({
        maxHeight: value,
    }),
    size: (value) => ({
        width: value,
        height: value,
    }),
    minSize: (value) => ({
        minWidth: value,
        minHeight: value,
        width: value,
        height: value,
    }),
    sizeMin: (value) => ({
        minWidth: value,
        minHeight: value,
        width: value,
        height: value,
    }),
    maxSize: (value) => ({
        maxWidth: value,
        maxHeight: value,
    }),
    sizeMax: (value) => ({
        maxWidth: value,
        maxHeight: value,
    }),
    appearance: (value) => ({
        WebkitAppearance: value,
        appearance: value,
    }),
    scale: (value) => ({
        transform: `scale(${value})`,
    }),
    linearGradient: (value) => ({
        backgroundImage: `linear-gradient(${value})`,
    }),
    tdl: (value) => ({
        textDecorationLine: value,
    }),
    textGradient: (value) => ({
        backgroundImage: `linear-gradient(${value})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        '&::selection': {
            WebkitTextFillColor: '$colors$text',
        },
    }),
};

export const defaultThemeMap = {
    ...defaultStitchesThemeMap,
    width: 'space',
    height: 'space',
    minWidth: 'space',
    maxWidth: 'space',
    minHeight: 'space',
    maxHeight: 'space',
    flexBasis: 'space',
    gridTemplateColumns: 'space',
    gridTemplateRows: 'space',
    blockSize: 'space',
    minBlockSize: 'space',
    maxBlockSize: 'space',
    inlineSize: 'space',
    minInlineSize: 'space',
    maxInlineSize: 'space',
    borderWidth: 'borderWeights',
};

export default {
    prefix: 'wickson-ui',
    theme: {
        ...defaultTokens,
        colors: defaultColors,
        shadows: {},
    },
    media: defaultMedia,
    utils: defaultUtils,
    themeMap: defaultThemeMap,
};
