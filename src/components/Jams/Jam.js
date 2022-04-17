import { Box, Card, Flex, Heading, ErrorBoundary, Text, Skeleton, theme } from '@design-system';
import Image from 'next/image';
import { css } from '@design-system';
import { useState } from 'react';

const jamThumbnail = css({
    btlr: '$4',
    btrr: '$4',
});

function ErrorFallback({ error }) {
    console.error(error);
    return (
        <Flex align="center" justify="center" direction="column" css={{ backgroundColor: '$danger3', color: '$danger11', width: '100%', aspectRatio: '16 / 9', px: '$4', btlr: '$4', btrr: '$4' }}>
            <Heading as="h2" css={{ color: 'inherit' }}>
                This image could not be loaded!
            </Heading>
            <br />
            <Text css={{ color: 'inherit', textAlign: 'center' }}>
                Images are only accepted from <i>assets.scratch.mit.edu</i>! Check the console for details.
            </Text>
        </Flex>
    );
}

function Jam({ loading = false, data }) {
    const [loadingThumbnail, setLoadingThumbnail] = useState(true);

    return (
        <Card as="a" href={loading === true ? '#' : 'https://itinerary.eu.org/jams/' + data.slug} variant="interactive">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                {loadingThumbnail === true && <Skeleton width="100%" aspectRatio="16 / 9" borderRadius={`${theme.radii[4]} ${theme.radii[4]} 0 0`} />}
                {loading === false && (
                    <Box css={{ width: loadingThumbnail === true ? '0' : 'auto' }}>
                        <Image
                            src={data.content.headerImage}
                            width={1920}
                            height={1080}
                            layout="responsive"
                            objectFit="cover"
                            className={jamThumbnail()}
                            onLoadingComplete={() => setLoadingThumbnail(false)}
                            onError={() => {
                                throw new Error('Could not load thumbnail');
                            }}
                        />
                    </Box>
                )}
            </ErrorBoundary>
            <Box css={{ p: '$3' }}>
                <Heading css={{ mb: '$2' }}>{loading === true ? <Skeleton width="60%" /> : data.name}</Heading>
                <Text size="3" css={{ color: '$neutral11' }}>
                    {loading === true ? <Skeleton /> : data.content.description}
                </Text>
                <Flex align={{ '@initial': 'start', '@bp2': 'center' }} direction={{ '@initial': 'column', '@bp2': 'row' }} gap={{ '@initial': 1, '@bp2': 0 }} justify="between" css={{ mt: '$3' }}>
                    <Flex align="center">
                        <Text size="2" css={{ color: '$neutral11' }}>
                            Hosted by {<Skeleton inline width="5rem" />}
                        </Text>
                    </Flex>
                    <Box>
                        <Text size="2" css={{ color: '$neutral11' }}>
                            {<Skeleton inline width="1.5rem" />} submissions
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Card>
    );
}

export default Jam;
