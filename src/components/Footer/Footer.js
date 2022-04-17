import NextLink from 'next/link';
import { Box, Container, Grid, Heading, Text, Link, Flex, Separator /*VisuallyHidden*/ } from '@design-system';
import Logo from '../Logo';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';

const Footer = () => {
    return (
        <Box css={{ pb: '$8' }}>
            <Separator size={2} css={{ mx: 'auto', my: '$8' }} />
            <Container size={2} css={{ maxWidth: '1090px' }}>
                <Grid
                    css={{
                        '& ul, & li': { listStyle: 'none', margin: 0, padding: 0 },
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        gap: '$6',
                        '@bp2': {
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '$3',
                        },
                    }}
                >
                    <Flex css={{ flexDirection: null, alignItems: 'center', '@bp2': { flexDirection: 'column', alignItems: 'start' } }}>
                        <NextLink href="/" passHref>
                            <Link css={{ color: '$hiContrast', ':focus': { boxShadow: 'none' } }}>
                                {/* <VisuallyHidden>Modulz homepage</VisuallyHidden> */}
                                <Logo aria-hidden />
                            </Link>
                        </NextLink>

                        <Text as="span" size={3} css={{ ml: 'auto', mt: 0, '@bp2': { ml: 0, mt: 'auto' }, color: '$neutral11', lineHeight: '0', userSelect: 'none' }}>
                            &copy; Scratch Auth {'2022 - ' + new Date().getFullYear()}
                        </Text>
                    </Flex>
                    <Box>
                        <Heading as="h6" bold>
                            Scratch Auth
                        </Heading>
                        <ul>
                            <li>
                                <Text as="p" size={4} css={{ mt: '$3', lineHeight: '1' }}>
                                    <NextLink href="/" passHref>
                                        <Link variant="subtle">Home</Link>
                                    </NextLink>
                                </Text>
                            </li>
                        </ul>
                    </Box>
                    <Box>
                        <Heading as="h6" bold>
                            Resources
                        </Heading>
                        <ul>
                            <li>
                                <Text as="p" size={4} css={{ mt: '$3', lineHeight: '1' }}>
                                    <NextLink href="/documentation" passHref>
                                        <Link variant="subtle">Documentation</Link>
                                    </NextLink>
                                </Text>
                            </li>
                        </ul>
                    </Box>
                    <Box>
                        <Heading as="h6" bold>
                            Community
                        </Heading>
                        <ul>
                            <li>
                                <Text as="p" size={4} css={{ mt: '$3', lineHeight: '1' }}>
                                    <Link variant="subtle" target="_blank" href="https://beta.itinerary.eu.org" css={{display: 'inline-flex'}}>
                                        Incubator <OpenInNewWindowIcon width={15} height={15} />
                                    </Link>
                                </Text>
                            </li>
                            <li>
                                <Text as="p" size={4} css={{ mt: '$3', lineHeight: '1' }}>
                                    <Link variant="subtle" target="_blank" href="https://itinerary.eu.org" css={{display: 'inline-flex'}}>
                                        Itinerary <OpenInNewWindowIcon width={15} height={15} />
                                    </Link>
                                </Text>
                            </li>
                            <li>
                                <Text as="p" size={4} css={{ mt: '$3', lineHeight: '1' }}>
                                    <Link variant="subtle" target="_blank" href="https://scratchtools.edu.eu.org" css={{display: 'inline-flex'}}>
                                        Scratch Tools <OpenInNewWindowIcon width={15} height={15} />
                                    </Link>
                                </Text>
                            </li>
                            <li>
                                <Text as="p" size={4} css={{ mt: '$3', lineHeight: '1' }}>
                                    <Link variant="subtle" target="_blank" href="https://scratch.mit.edu/users/Looky1173/#comments" css={{display: 'inline-flex'}}>
                                        Feedback <OpenInNewWindowIcon width={15} height={15} />
                                    </Link>
                                </Text>
                            </li>
                        </ul>
                    </Box>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
