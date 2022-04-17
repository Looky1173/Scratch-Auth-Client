import React from 'react';
import { styled, keyframes } from '../theme/stitches.config';

const defaultEnableAnimation = true;

const SkeletonProviderContext = React.createContext({});

const skeletonHighlight = keyframes({
    '100%': { transform: 'translateX(100%)' },
});

const SkeletonSpan = styled('span', {
    '--base-color': '$colors$neutral5',
    '--highlight-color': '$colors$neutral3',
    '--animation-duration': '1.5s',
    '--animation-direction': 'normal',
    '--pseudo-element-display': 'block',

    backgroundColor: 'var(--base-color)',
    width: '100%',
    borderRadius: '$4',
    display: 'inline-flex',
    lineHeight: 1,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,

    '&::after': {
        content: ' ',
        display: 'var(--pseudo-element-display)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'linear-gradient(90deg, var(--base-color), var(--highlight-color), var(--base-color))',
        transform: 'translateX(-100%)',

        animationName: `${skeletonHighlight}`,
        animationDirection: 'var(--animation-direction)',
        animationDuration: 'var(--animation-duration)',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
    },
});

function SkeletonProvider({ children, ...styleOptions }) {
    return <SkeletonProviderContext.Provider value={styleOptions}>{children}</SkeletonProviderContext.Provider>;
}

function styleOptionsToCssObject({
    baseColor,
    highlightColor,

    width,
    height,
    aspectRatio,
    borderRadius,
    circle,

    direction,
    duration,
    enableAnimation = defaultEnableAnimation,
}) {
    const style = {};

    if (direction === 'rtl') style['--animation-direction'] = 'reverse';
    if (typeof duration === 'number') style['--animation-duration'] = `${duration}s`;
    if (!enableAnimation) style['--pseudo-element-display'] = 'none';

    if (typeof width === 'string' || typeof width === 'number') style.width = width;
    if (typeof height === 'string' || typeof height === 'number') style.height = height;
    if (typeof aspectRatio === 'string' || typeof aspectRatio === 'number') style.aspectRatio = aspectRatio;

    if (typeof borderRadius === 'string' || typeof borderRadius === 'number') style.borderRadius = borderRadius;

    if (circle) style.borderRadius = '50%';

    if (typeof baseColor !== 'undefined') style['--base-color'] = baseColor;
    if (typeof highlightColor !== 'undefined') style['--highlight-color'] = highlightColor;

    return style;
}

const Skeleton = function ({ count = 1, wrapper: Wrapper, circle = false, style: styleProp, ...originalPropsStyleOptions }) {
    const contextStyleOptions = React.useContext(SkeletonProviderContext);

    const propsStyleOptions = { ...originalPropsStyleOptions };

    // DO NOT overwrite style options from the context if `propsStyleOptions`
    // has properties explicity set to undefined
    for (const [key, value] of Object.entries(originalPropsStyleOptions)) {
        if (typeof value === 'undefined') {
            delete propsStyleOptions[key];
        }
    }

    // Props take priority over context
    const styleOptions = {
        ...contextStyleOptions,
        ...propsStyleOptions,
        circle,
    };

    // `styleProp` has the least priority out of everything
    const style = {
        ...styleProp,
        ...styleOptionsToCssObject(styleOptions),
    };

    const inline = styleOptions.inline ?? false;

    const elements = [];

    // Without the <br />, the skeleton lines will all run together if `width` is specified
    for (let i = 0; i < count; i++) {
        const skeletonSpan = (
            <SkeletonSpan style={style} key={i}>
                &zwnj;
            </SkeletonSpan>
        );

        if (inline) {
            elements.push(skeletonSpan);
        } else {
            elements.push(
                <React.Fragment key={i}>
                    {skeletonSpan}
                    <br />
                </React.Fragment>,
            );
        }
    }

    return <>{Wrapper ? elements.map((el, i) => <Wrapper key={i}>{el}</Wrapper>) : elements}</>;
};

const Provider = SkeletonProvider;
export { SkeletonProvider, Provider };
export default Skeleton;
