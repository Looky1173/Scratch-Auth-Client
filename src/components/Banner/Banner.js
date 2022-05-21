import NextLink from 'next/link';
import { Box, Button, Container, Flex, Link, Text, Heading, styled } from '@design-system';
import { ChevronDownIcon, ExclamationTriangleIcon, OpenInNewWindowIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';

const BannerContainer = styled(Flex, {
    p: '$4',
    backgroundColor: '$accent10',
    color: '$loContrast',
});

function setWithExpiry(key, value, ttl) {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

function Banner({ key, expiry = 7 * 24 * 60 * 60 * 1000, closeable, message, CustomContent }) {
    const [isVisible, setVisibility] = useState(false);

    const dismissBanner = () => {
        setVisibility(false);
        setWithExpiry(`banner-${key}`, { isVisible: false }, expiry);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const bannerState = getWithExpiry(`banner-${key}`);
            if (!bannerState) {
                setVisibility(true);
                setWithExpiry(`banner-${key}`, { isVisible: true }, expiry);
            } else {
                setVisibility(bannerState?.isVisible || false);
            }
        }
    }, []);

    return (
        <>
            {isVisible && (
                <>
                    {!message ? (
                        <>{<CustomContent dismiss={dismissBanner} />}</>
                    ) : (
                        <BannerContainer>
                            <Flex>
                                <Box css={{ flex: 'none' }}>
                                    <InfoCircledIcon width={64} height={64} />
                                </Box>
                                <Flex direction="column" css={{ ml: '$4' }}>
                                    <Heading as="h3" size="2" css={{ color: 'inherit', mb: '$2' }}>
                                        Important notification
                                    </Heading>
                                    <Text css={{ color: 'inherit' }}>{message}</Text>
                                </Flex>
                            </Flex>
                        </BannerContainer>
                    )}
                </>
            )}
        </>
    );
}

export default Banner;
