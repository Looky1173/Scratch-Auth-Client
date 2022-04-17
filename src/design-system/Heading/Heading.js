import React from 'react';
import Text from '../Text';
import { merge } from '@utils/merge';

const DEFAULT_TAG = 'h1';

const Heading = React.forwardRef((props, forwardedRef) => {
    // '2' here is the default heading size variant
    const { size = '1', ...textProps } = props;
    // This is the mapping of Heading Variants to Text variants
    const textSize = {
        1: { '@initial': '4', '@bp2': '5' },
        2: { '@initial': '6', '@bp2': '7' },
        3: { '@initial': '7', '@bp2': '8' },
        4: { '@initial': '8', '@bp2': '9' },
    };

    // This is the mapping of Heading Variants to Text css
    const textCss = {
        1: { fontWeight: 500, lineHeight: '20px', '@bp2': { lineHeight: '23px' } },
        2: { fontWeight: 500, lineHeight: '25px', '@bp2': { lineHeight: '30px' } },
        3: { fontWeight: 500, lineHeight: '33px', '@bp2': { lineHeight: '41px' } },
        4: { fontWeight: 500, lineHeight: '35px', '@bp2': { lineHeight: '55px' } },
    };

    return (
        <Text
            as={DEFAULT_TAG}
            {...textProps}
            ref={forwardedRef}
            size={textSize[size]}
            css={{
                fontVariantNumeric: 'proportional-nums',
                ...merge(textCss[size], props.css),
            }}
        />
    );
});

export default Heading;
