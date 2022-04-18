import React from 'react';
import NextLink from 'next/link';
import { Button, Link, Section, Container, Box, Heading, Grid, Flex, Text, Paragraph } from '@design-system';
import { ArrowRightIcon } from '@radix-ui/react-icons';

function Hero() {
    return (
        <Section
            size={{
                '@initial': '2',
                '@bp1': '3',
            }}
            css={{
                pt: '$3',
                '@bp2': {
                    pt: '$6',
                },
            }}
        >
            <Container size="3">
                <Heading
                    size="4"
                    css={{
                        mb: '$3',
                        '@initial': {
                            pr: 100,
                        },
                        '@bp2': {
                            ta: 'center',
                            px: 180,
                        },
                        '@bp3': {
                            px: 200,
                        },
                    }}
                >
                    Scratch OAuth{' '}
                    <Box
                        as="span"
                        css={{
                            color: '$accent10',
                        }}
                    >
                        made easy
                    </Box>
                </Heading>
                <Paragraph
                    size="2"
                    css={{
                        mb: '$6',
                        '@bp2': {
                            mx: 230,
                            ta: 'center',
                            mb: '$7',
                        },
                    }}
                >
                    Scratch Auth comes with a simple API, is fully customizable, and looks <i>fantastic</i>!
                </Paragraph>
                <Flex css={{ '@bp2': { jc: 'center', my: '$7' } }}>
                    <NextLink href="/documentation/introduction" passHref>
                        <Button as="a" variant="accent" css={{ mr: '$3' }}>
                            Documentation
                            <Box css={{ ml: '$1' }}>
                                <ArrowRightIcon width={24} height={24} />
                            </Box>
                        </Button>
                    </NextLink>
                    <NextLink href="/documentation/about" passHref>
                        <Button as="a" variant="neutral">
                            Learn more
                        </Button>
                    </NextLink>
                </Flex>
            </Container>

            <Box css={{ height: '20px', my: '$6', '@bp2': { my: '$8' } }} />

            <Container size="3">
                <Grid
                    css={{
                        gap: '$6',
                        gridTemplateColumns: '1fr',
                        '@bp1': {
                            gap: '$7',
                            gridTemplateColumns: '1fr 1fr',
                        },
                        '@bp2': {
                            gap: '$7',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                        },
                    }}
                >
                    <Box>
                        <Flex
                            css={{
                                ai: 'center',
                                jc: 'center',
                                width: '$7',
                                height: '$7',
                                borderRadius: '$round',
                                backgroundColor: '$accent5',
                                color: '$accent11',
                                mb: '$4',
                            }}
                        >
                            <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.96424 2.68571C10.0668 2.42931 9.94209 2.13833 9.6857 2.03577C9.4293 1.93322 9.13832 2.05792 9.03576 2.31432L5.03576 12.3143C4.9332 12.5707 5.05791 12.8617 5.3143 12.9642C5.5707 13.0668 5.86168 12.9421 5.96424 12.6857L9.96424 2.68571ZM3.85355 5.14646C4.04882 5.34172 4.04882 5.6583 3.85355 5.85356L2.20711 7.50001L3.85355 9.14646C4.04882 9.34172 4.04882 9.6583 3.85355 9.85356C3.65829 10.0488 3.34171 10.0488 3.14645 9.85356L1.14645 7.85356C0.951184 7.6583 0.951184 7.34172 1.14645 7.14646L3.14645 5.14646C3.34171 4.9512 3.65829 4.9512 3.85355 5.14646ZM11.1464 5.14646C11.3417 4.9512 11.6583 4.9512 11.8536 5.14646L13.8536 7.14646C14.0488 7.34172 14.0488 7.6583 13.8536 7.85356L11.8536 9.85356C11.6583 10.0488 11.3417 10.0488 11.1464 9.85356C10.9512 9.6583 10.9512 9.34172 11.1464 9.14646L12.7929 7.50001L11.1464 5.85356C10.9512 5.6583 10.9512 5.34172 11.1464 5.14646Z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </Flex>
                        <Heading as="h4" css={{ mb: '$2' }}>
                            Developer friendly API
                        </Heading>
                        <Text
                            as="p"
                            size={{
                                '@initial': '4',
                                '@bp2': '5',
                            }}
                            variant="gray"
                            css={{
                                lineHeight: '25px',
                            }}
                        >
                            With only 3 API endpoints, Scratch Auth is a breeze to integrate into your Scratch app! What's more, everything is fully documented and explained on the{' '}
                            <NextLink href="/documentation/introduction" passHref>
                                <Link>Documentation</Link>
                            </NextLink>{' '}
                            page.
                        </Text>
                    </Box>
                    <Box>
                        <Flex
                            css={{
                                ai: 'center',
                                jc: 'center',
                                width: '$7',
                                height: '$7',
                                borderRadius: '$round',
                                backgroundColor: '$accent5',
                                color: '$accent11',
                                mb: '$4',
                            }}
                        >
                            <svg width="25" height="25" viewBox="1 -1 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </Flex>
                        <Heading as="h4" css={{ mb: '$2' }}>
                            Fully customizable
                        </Heading>
                        <Text
                            as="p"
                            size={{
                                '@initial': '4',
                                '@bp2': '5',
                            }}
                            variant="gray"
                            css={{
                                lineHeight: '25px',
                            }}
                        >
                            Scratch Auth allows you to build your own, completely custom login pages with its API. Nevertheless, there's a default, beautifully-crafted login page to give you a head
                            start!
                        </Text>
                    </Box>
                    <Box>
                        <Flex
                            css={{
                                ai: 'center',
                                jc: 'center',
                                width: '$7',
                                height: '$7',
                                borderRadius: '$round',
                                backgroundColor: '$accent5',
                                color: '$accent11',
                                mb: '$4',
                            }}
                        >
                            <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </Flex>
                        <Heading as="h4" css={{ mb: '$2' }}>
                            Authenticate with cloud data, or by comments
                        </Heading>
                        <Text
                            as="p"
                            size={{
                                '@initial': '4',
                                '@bp2': '5',
                            }}
                            variant="gray"
                            css={{
                                lineHeight: '25px',
                            }}
                        >
                            Your users can log in with both cloud data and by commenting. Therefore, Scratch Auth can be used by New Scratchers as well, who don't have access to cloud data yet.
                        </Text>
                    </Box>
                    <Box>
                        <Flex
                            css={{
                                ai: 'center',
                                jc: 'center',
                                width: '$7',
                                height: '$7',
                                borderRadius: '$round',
                                backgroundColor: '$accent5',
                                color: '$accent11',
                                mb: '$4',
                            }}
                        >
                            <svg width="25" height="25" viewBox="-1 -1 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.29227 0.048984C3.47033 -0.032338 3.67946 -0.00228214 3.8274 0.125891L12.8587 7.95026C13.0134 8.08432 13.0708 8.29916 13.0035 8.49251C12.9362 8.68586 12.7578 8.81866 12.5533 8.82768L9.21887 8.97474L11.1504 13.2187C11.2648 13.47 11.1538 13.7664 10.9026 13.8808L8.75024 14.8613C8.499 14.9758 8.20255 14.8649 8.08802 14.6137L6.15339 10.3703L3.86279 12.7855C3.72196 12.934 3.50487 12.9817 3.31479 12.9059C3.1247 12.8301 3 12.6461 3 12.4414V0.503792C3 0.308048 3.11422 0.130306 3.29227 0.048984ZM4 1.59852V11.1877L5.93799 9.14425C6.05238 9.02363 6.21924 8.96776 6.38319 8.99516C6.54715 9.02256 6.68677 9.12965 6.75573 9.2809L8.79056 13.7441L10.0332 13.178L8.00195 8.71497C7.93313 8.56376 7.94391 8.38824 8.03072 8.24659C8.11753 8.10494 8.26903 8.01566 8.435 8.00834L11.2549 7.88397L4 1.59852Z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </Flex>
                        <Heading as="h4" css={{ mb: '$2' }}>
                            One-click login
                        </Heading>
                        <Text
                            as="p"
                            size={{
                                '@initial': '4',
                                '@bp2': '5',
                            }}
                            variant="gray"
                            css={{
                                lineHeight: '25px',
                            }}
                        >
                            Your users may choose to stay logged in to multiple Scratch accounts, and sign in with one click to your services. That's a win-win situation!
                        </Text>
                    </Box>
                </Grid>
            </Container>
        </Section>
    );
}

export default Hero;
