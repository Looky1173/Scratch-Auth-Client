import React from 'react';
import Text from '../Text';
import { merge } from '@utils/merge';

const DEFAULT_TAG = 'p';

const Paragraph = React.forwardRef((props, forwardedRef) => {
    // '2' here is the default Paragraph size variant
    const { size = '1', ...textProps } = props;

    // This is the mapping of Paragraph Variants to Text variants
    const textSize = {
        1: { '@initial': '3', '@bp2': '4' },
        2: { '@initial': '5', '@bp2': '6' },
    };

    // This is the mapping of Paragraph Variants to Text css
    const textCss = {
        1: { lineHeight: '25px', '@bp2': { lineHeight: '27px' } },
        2: { color: '$slate11', lineHeight: '27px', '@bp2': { lineHeight: '30px' } },
    };
    return (
        <Text
            as={DEFAULT_TAG}
            {...textProps}
            ref={forwardedRef}
            size={textSize[size]}
            css={{
                ...merge(textCss[size], props.css),
            }}
        />
    );
});

export default Paragraph;
