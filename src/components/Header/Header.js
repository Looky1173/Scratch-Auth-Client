import NextLink from 'next/link';
import { Badge, Box, Button, Card, Container, Flex, Link, Text, Heading, Popover, PopoverTrigger, PopoverContent, PopoverClose, Separator, Skeleton, styled } from '@design-system';
import ThemeToggle from '../ThemeToggle';
import Logo from '../Logo';
import { useAccounts } from '@hooks';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import fetchJson from '@/utils/fetch-json';
import { useRouter } from 'next/router';

const AccountCard = styled(Card, {
    backgroundColor: '$loContrast',
    p: '$4',
});

const AccountExpiry = styled(Box, {
    position: 'absolute',
    right: '-1em',
    top: '-0.5em',
    borderRadius: '$pill',
    backgroundColor: '$danger10',
    color: '$loContrast',
    textTransform: 'uppercase',
    fontWeight: '$bold',
    fontSize: '$2',
    px: '$2',
});

function Header({ withSecondaryHeader, secondaryHeader }) {
    const { accounts, mutateAccounts } = useAccounts();
    const router = useRouter();

    const [removeAccountButtonStates, setRemoveAccountButtonStates] = useState({});

    useEffect(() => {
        console.log('A', accounts);
    }, [accounts]);

    async function removeAccount(username = null) {
        if (username === null) {
            // Remove all one click sign in accounts with the given token
            await fetch('/api/auth/accounts', { method: 'DELETE', headers: { Authorization: accounts.token } });
            setRemoveAccountButtonStates({});
        } else {
            await fetch(`/api/auth/accounts?username=${username}`, { method: 'DELETE', headers: { Authorization: accounts.token } });
        }

        mutateAccounts();
    }

    return (
        <>
            <Flex
                as="header"
                css={{
                    py: '$4',
                    px: '$4',
                    jc: 'space-between',
                    position: 'relative',
                    zIndex: '1',
                }}
            >
                <NextLink href="/" passHref>
                    <Box
                        as="a"
                        css={{
                            color: '$hiContrast',
                            display: 'inline-flex',
                            '&:focus': {
                                boxShadow: 'none',
                            },
                        }}
                    >
                        <span
                            style={{
                                position: 'absolute',
                                width: 1,
                                height: 1,
                                padding: 0,
                                margin: -1,
                                overflow: 'hidden',
                                clip: 'rect(0, 0, 0, 0)',
                                whiteSpace: 'nowrap',
                                border: 0,
                            }}
                        >
                            Scratch Auth homepage
                        </span>
                        <Logo />
                    </Box>
                </NextLink>
                <Flex as="nav" css={{ ai: 'center' }}>
                    <NextLink href="/documentation" passHref>
                        <Link variant="subtle" css={{ mr: '$5', '@bp2': { mr: '$7' } }}>
                            <Text>Documentation</Text>
                        </Link>
                    </NextLink>
                    <Link
                        href="https://github.com/Looky1173/Scratch-Auth-Client"
                        variant="subtle"
                        css={{
                            mr: '$5',
                            display: 'none',
                            '@bp1': { display: 'block' },
                            '@bp2': { mr: '$7' },
                        }}
                    >
                        <Text>GitHub</Text>
                    </Link>
                    {accounts === undefined && (
                        <Link variant="subtle" css={{ mr: '$5', '@bp2': { mr: '$7' }, width: '7.5rem' }}>
                            {<Skeleton />}
                        </Link>
                    )}
                    {accounts?.isIdentified === false && (
                        <NextLink href="/auth?newOneClickSignInAccount=true" passHref>
                            <Link variant="subtle" css={{ mr: '$5', '@bp2': { mr: '$7' } }}>
                                <Text>Add a Scratch account</Text>
                            </Link>
                        </NextLink>
                    )}
                    {accounts?.isIdentified === true && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Link variant="subtle" css={{ mr: '$5', '@bp2': { mr: '$7' } }}>
                                    <Text as="div" css={{ display: 'inline-flex' }}>
                                        Your accounts
                                        <Box css={{ ml: '$1' }}>
                                            <ChevronDownIcon width={18} height={18} />
                                        </Box>
                                    </Text>
                                </Link>
                            </PopoverTrigger>
                            <PopoverContent sideOffset={10} align="end" css={{ width: '20rem' }}>
                                <Flex direction="column" css={{ gap: 10 }}>
                                    <Flex align="center" justify="between">
                                        <Heading as="h2" css={{ mb: '$1', color: '$neutral11' }}>
                                            Your One Click Sign In Accounts
                                        </Heading>
                                    </Flex>
                                    {accounts.accounts !== null &&
                                        accounts.accounts.map((account, index) => (
                                            <AccountCard key={index}>
                                                {new Date(account.updated) < new Date(Date.now() - 27 * 24 * 60 * 60 * 1000) === true && <AccountExpiry>Expires soon</AccountExpiry>}
                                                <Flex justify="between">
                                                    <Heading as="h3">{account.username}</Heading>
                                                    <Button
                                                        variant="neutral"
                                                        size="small"
                                                        disabled={removeAccountButtonStates?.[account.username] === true ? true : false}
                                                        onClick={() => {
                                                            setRemoveAccountButtonStates({ ...removeAccountButtonStates, [account.username]: true });
                                                            removeAccount(account.username);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Flex>
                                                <Text css={{ lineHeight: 1.3 }}>Last used to sign in at {new Date(account.updated).toLocaleString()}</Text>
                                            </AccountCard>
                                        ))}
                                    <NextLink href="/auth?newOneClickSignInAccount=true" passHref>
                                        <Button as="a" variant="accent" css={{ display: 'inline-flex', justifyContent: 'center', width: '100%', my: '$1' }}>
                                            Add a new account
                                        </Button>
                                    </NextLink>
                                    <Button
                                        variant="danger"
                                        css={{ display: 'inline-flex', justifyContent: 'center', width: '100%', my: '$1' }}
                                        disabled={removeAccountButtonStates?._removeAllButtonDisabled === true ? true : false}
                                        onClick={() => {
                                            setRemoveAccountButtonStates({ ...removeAccountButtonStates, _removeAllButtonDisabled: true });
                                            removeAccount();
                                        }}
                                    >
                                        Remove all
                                    </Button>
                                    <Text css={{ lineHeight: 1.3, mb: '$2' }}>One click sign in accounts expire after 30 days of not being used. Using one to sign in will reset its expiry date.</Text>
                                    <Link
                                        as="a"
                                        href="/api/auth/forgetMe"
                                        variant="subtle"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await fetch('/api/auth/forgetMe', { method: 'POST' });
                                            router.push('/');
                                            mutateAccounts();
                                        }}
                                    >
                                        <Text>Forget this device (clears session cookie and one click sign in accounts)</Text>
                                    </Link>
                                </Flex>
                            </PopoverContent>
                        </Popover>
                    )}
                    <ThemeToggle />
                </Flex>
            </Flex>
            {withSecondaryHeader === true && (
                <Container size="3">
                    <Flex
                        css={{
                            px: '$4',
                            py: '$2',
                            backgroundColor: '$card2',
                            borderRadius: '$4',
                            border: '2px solid $colors$neutral6',
                        }}
                    >
                        <Heading as="h2">{secondaryHeader?.title}</Heading>
                        {secondaryHeader.subtitle && (
                            <>
                                <Separator orientation="vertical" css={{ mx: '$2', '&[data-orientation=vertical]': { width: '2px', height: 'initial' } }} />
                                <Heading as="h3" css={{ fontWeight: 400 }}>
                                    {secondaryHeader?.subtitle}
                                </Heading>
                            </>
                        )}
                        {secondaryHeader.controls && secondaryHeader.controls}
                    </Flex>
                </Container>
            )}
        </>
    );
}

export default Header;
