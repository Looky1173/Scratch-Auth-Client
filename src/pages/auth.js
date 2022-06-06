import {
    Box,
    Button,
    Card,
    Link,
    Checkbox,
    CheckboxIndicator,
    Container,
    Text,
    Flex,
    Grid,
    Heading,
    TitleAndMetaTags,
    styled,
    Paragraph,
    Skeleton,
    ToastTitle,
    ToastDescription,
} from '@design-system';
import { Layout } from '@components';
import { ArrowLeftIcon, OpenInNewWindowIcon, CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useToast, useAccounts } from '@hooks';
import NextLink from 'next/link';

const OptionCard = styled(Card, {
    p: '$4',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 300ms ease',
    color: '$hiContrast',
    '&[disabled]': {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        color: '$neutral8',
        backgroundColor: '$neutral3',
    },
    variants: {
        variant: {
            default: {
                '&:hover': {
                    backgroundColor: '$neutral4',
                },
                '&:active': {
                    backgroundColor: '$neutral6',
                },
            },
            loading: {
                cursor: 'auto',
                pointerEvents: 'none',
            },
            danger: {
                cursor: 'auto',
                transition: 'none',
                backgroundColor: '$danger2',
            },
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const CodeCard = styled(Card, {
    backgroundColor: '$loContrast',
    p: '$4',
    borderRadius: '$4 0 0 $4',
    '&::before': {
        borderRadius: '$4 0 0 $4',
    },
});

const CodeButton = styled(Button, {
    backgroundColor: '$loContrast',
    borderRadius: '0 $4 $4 0 !important',
    height: 'auto !important',
});

const Label = styled('label', {
    color: '$hiContrast',
    fontSize: '$4',
    userSelect: 'none',
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

const UsernameInput = styled('input', {
    borderRadius: '$4 0 0 $4',
    p: '$2',
    border: 'none',
    fontSize: '$3',
    color: '$neutral12',
    backgroundColor: '$loContrast',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.1)',
    '&:focus': {
        boxShadow: 'inset 0 0 0 3px $colors$accent7',
    },
    '&:disabled': {
        pointerEvents: 'none !important',
        color: '$neutral8 !important',
        backgroundColor: '$neutral3 !important',
    },
});

export default function Auth() {
    const TOKEN_VALIDITY = 5 * 60 * 1000;
    const [hasChosenAuthMethod, setHasChosenAuthMethod] = useState(false);
    const [authenticationMethod, setAuthenticationMethod] = useState(null);
    const [openedAuthenticationProject, setOpenedAuthenticationProject] = useState(false);
    const [enteredUsername, setEnteredUsername] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [authenticationTokens, setAuthenticationTokens] = useState({ cloud: null, comment: null, 'profile-comment': null });
    const [username, setUsername] = useState(null);
    const tokenValidityTimeout = useRef(null);
    const [addUserToOneClickLoginList, setAddUserToOneClickLoginList] = useState(true);
    const [providerData, setProviderData] = useState(null);
    const [loadingOneClickSignIn, setLoadingOneClickSignIn] = useState(false);

    const [newOneClickSignInAccount, setNewOneClickSignInAccount] = useState(false);

    const router = useRouter();
    const { accounts, error: accountError, mutateAccounts } = useAccounts();
    const [toast, deleteToast] = useToast();

    useEffect(() => {
        if (router.isReady) {
            setProviderData({ redirectLocation: router.query?.redirect || undefined, providerName: router.query?.name });
            setNewOneClickSignInAccount(Boolean(router.query.newOneClickSignInAccount) === true ? true : false);
        }
    }, [router.isReady, router.query]);

    async function getTokens() {
        setAuthenticationTokens({ cloud: null, comment: null, 'profile-comment': null });
        if (authenticationMethod === 'profile-comment' && !username) {
            toast({
                customContent: (
                    <Box>
                        <Heading as="h2" css={{ mb: '$1', color: '$danger11', display: 'inline-flex', alignItems: 'center' }}>
                            <Box css={{ mr: '$1' }}>
                                <ExclamationTriangleIcon width={18} height={18} />
                            </Box>
                            Oops!
                        </Heading>
                        <Text>You forgot to enter your username.</Text>
                    </Box>
                ),
                variant: 'danger',
                duration: 15 * 1000,
            });

            return;
        }

        try {
            let tokens;

            if (authenticationMethod === 'profile-comment') {
                tokens = await fetch(`/api/auth/getTokens?method=${authenticationMethod}&redirect=${providerData?.redirectLocation}&username=${username}`);
            } else {
                tokens = await fetch(`/api/auth/getTokens?method=${authenticationMethod}&redirect=${providerData?.redirectLocation}`);
            }

            tokens = await tokens.json();
            setAuthenticationTokens({ ...authenticationTokens, [authenticationMethod]: { ...tokens, time: Date.now() } });
        } catch {
            setHasChosenAuthMethod(false);
            setOpenedAuthenticationProject(false);
            setEnteredUsername(false);
            setAuthenticationTokens({ cloud: null, comment: null, 'profile-comment': null });
            setUsername(null);
            setIsVerifying(false);
            clearTimeout(tokenValidityTimeout.current);

            toast({
                customContent: (
                    <Box>
                        <Heading as="h2" css={{ mb: '$1', color: '$danger11', display: 'inline-flex', alignItems: 'center' }}>
                            <Box css={{ mr: '$1' }}>
                                <ExclamationTriangleIcon width={18} height={18} />
                            </Box>
                            Ka-boom!
                        </Heading>
                        <Text>
                            We couldn't generate you a sign in code because something broke on our end. Please try again in a few moments. Also, keep an eye on our{' '}
                            <Link target="_blank" href="https://stats.uptimerobot.com/4Ggz4Fzo2O" css={{ display: 'inline-flex' }}>
                                status page <OpenInNewWindowIcon width={15} height={15} />
                            </Link>{' '}
                            for further information.
                        </Text>
                    </Box>
                ),
                variant: 'danger',
                duration: 15 * 1000,
            });
        }
    }

    function verifyTokenValidity() {
        if (hasChosenAuthMethod === true) {
            if (!authenticationTokens[authenticationMethod] || authenticationTokens[authenticationMethod].time < new Date(Date.now() - TOKEN_VALIDITY)) {
                if (authenticationMethod === 'profile-comment' && !username) return;
                getTokens();
                tokenValidityTimeout.current = setTimeout(() => {
                    verifyTokenValidity();
                }, TOKEN_VALIDITY);
            }
        }
    }

    useEffect(() => {
        verifyTokenValidity();

        if (hasChosenAuthMethod === false) {
            clearTimeout(tokenValidityTimeout.current);
        }
    }, [hasChosenAuthMethod, enteredUsername]);

    useEffect(() => {
        return () => {
            clearTimeout(tokenValidityTimeout.current);
        };
    }, []);

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    async function verify() {
        setIsVerifying(true);
        let privateCode = authenticationTokens[authenticationMethod].privateCode;
        let publicCode = authenticationTokens[authenticationMethod].publicCode;

        let redirect = providerData.redirectLocation;
        if (redirect) {
            redirect = Buffer.from(redirect, 'base64').toString('utf-8');
            if (!/^((http|https|ftp):\/\/)/.test(redirect)) redirect = 'https://' + redirect;
        }

        if (addUserToOneClickLoginList === true || newOneClickSignInAccount === true) {
            let token;
            try {
                if (authenticationMethod === 'profile-comment') {
                    token = await fetch(
                        `/api/auth/addAccountToOneClickSignInList?privateCode=${privateCode}&redirect=${
                            providerData?.redirectLocation || 'aHR0cHM6Ly9hdXRoLml0aW5lcmFyeS5ldS5vcmc='
                        }&username=${username}`,
                        {
                            method: 'GET',
                        },
                    );
                } else {
                    token = await fetch(
                        `/api/auth/addAccountToOneClickSignInList?privateCode=${privateCode}&redirect=${providerData?.redirectLocation || 'aHR0cHM6Ly9hdXRoLml0aW5lcmFyeS5ldS5vcmc='}`,
                        {
                            method: 'GET',
                        },
                    );
                }

                token = await token.json();
            } catch {
                setHasChosenAuthMethod(false);
                setOpenedAuthenticationProject(false);
                setEnteredUsername(false);
                setAuthenticationTokens({ cloud: null, comment: null, 'profile-comment': null });
                setUsername(null);
                setIsVerifying(false);
                clearTimeout(tokenValidityTimeout.current);

                toast({
                    customContent: (
                        <Box>
                            <Heading as="h2" css={{ mb: '$1', color: '$danger11', display: 'inline-flex', alignItems: 'center' }}>
                                <Box css={{ mr: '$1' }}>
                                    <ExclamationTriangleIcon width={18} height={18} />
                                </Box>
                                Ka-boom!
                            </Heading>
                            <Text>
                                We couldn't sign you in because something broke on our end. Please try again in a few moments. Also, keep an eye on our{' '}
                                <Link target="_blank" href="https://stats.uptimerobot.com/4Ggz4Fzo2O" css={{ display: 'inline-flex' }}>
                                    status page <OpenInNewWindowIcon width={15} height={15} />
                                </Link>{' '}
                                for further information.
                            </Text>
                        </Box>
                    ),
                    variant: 'danger',
                    duration: 15 * 1000,
                });

                return;
            }

            if (token.valid !== true) {
                setHasChosenAuthMethod(false);
                setOpenedAuthenticationProject(false);
                setEnteredUsername(false);
                setAuthenticationTokens({ cloud: null, comment: null, 'profile-comment': null });
                setUsername(null);
                setIsVerifying(false);
                clearTimeout(tokenValidityTimeout.current);

                let errorToast = toast({
                    customContent: (
                        <Box>
                            <ToastTitle>Failed authentication!</ToastTitle>
                            <ToastDescription>We couldn't authenticate you, therefore your account was not added to (or renewed on) your one click sign in list.</ToastDescription>
                            {newOneClickSignInAccount === false ||
                                (newOneClickSignInAccount === true && providerData.redirectLocation !== undefined && (
                                    <Flex css={{ width: '100%', mt: '$2' }} align="center" justify="center">
                                        <Button
                                            variant="danger"
                                            css={{ mr: '$2' }}
                                            onClick={() => {
                                                deleteToast(errorToast);
                                                location.href = `${redirect}?privateCode=${privateCode}&publicCode=${publicCode}`;
                                            }}
                                        >
                                            Dismiss and continue
                                        </Button>
                                    </Flex>
                                ))}
                        </Box>
                    ),
                    variant: 'danger',
                    duration: newOneClickSignInAccount === false ? Infinity : 15 * 1000,
                });
            } else {
                if (newOneClickSignInAccount === true && providerData.redirectLocation === undefined) {
                    router.push('/');
                    toast({
                        title: `Your account ${token.username} was successfully saved to your one click sign in account list!`,
                        description: 'You can now log in with it faster!',
                        duration: 15 * 1000,
                    });
                    mutateAccounts();
                } else {
                    location.href = `${redirect}?privateCode=${token.instantPrivateCode}`;
                }
            }
        } else {
            location.href = `${redirect}?privateCode=${privateCode}&publicCode=${publicCode}`;
        }
    }

    async function oneClickSignIn(username) {
        let redirect = providerData.redirectLocation;
        if (redirect) {
            redirect = Buffer.from(redirect, 'base64').toString('utf-8');
            if (!/^((http|https|ftp):\/\/)/.test(redirect)) redirect = 'https://' + redirect;
        }

        setLoadingOneClickSignIn(true);
        let signingInToast = toast({
            title: `Signing you in as ${username}...`,
            description: `You will soon be redirected to ${providerData?.providerName || 'the service that sent you to Scratch Auth'}`,
            duration: Infinity,
        });

        let token;

        try {
            token = await fetch(`/api/auth/accounts?username=${username}&redirect=${providerData?.redirectLocation}`, { method: 'POST' });
            token = await token.json();
        } catch {
            deleteToast(signingInToast);
            setLoadingOneClickSignIn(false);
            toast({
                customContent: (
                    <Box>
                        <Heading as="h2" css={{ mb: '$1', color: '$danger11', display: 'inline-flex', alignItems: 'center' }}>
                            <Box css={{ mr: '$1' }}>
                                <ExclamationTriangleIcon width={18} height={18} />
                            </Box>
                            Ka-boom!
                        </Heading>
                        <Text>
                            We couldn't sign you in because something broke on our end. Please try again in a few moments. Also, keep an eye on our{' '}
                            <Link target="_blank" href="https://stats.uptimerobot.com/4Ggz4Fzo2O" css={{ display: 'inline-flex' }}>
                                status page <OpenInNewWindowIcon width={15} height={15} />
                            </Link>{' '}
                            for further information.
                        </Text>
                    </Box>
                ),
                variant: 'danger',
                duration: 15 * 1000,
            });

            return;
        }

        if (token.success === true) {
            location.href = `${redirect}?privateCode=${token.instantPrivateCode}`;
        } else {
            deleteToast(signingInToast);
            toast({
                title: `Ugh, oh! Failed to sign you in as ${username}`,
                description: `Error: "${token?.error}"`,
                variant: 'danger',
                duration: Infinity,
            });
            setLoadingOneClickSignIn(false);
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <Layout>
            <TitleAndMetaTags title="Sign in with Scratch | Scratch Auth" />

            <Container size="3" css={{ textAlign: 'center', mb: '$4' }}>
                <Heading as="h1" size={3} css={{ mb: '$4', fontWeight: 500 }}>
                    {newOneClickSignInAccount === false ? (
                        <>
                            Sign in{' '}
                            {providerData?.providerName && (
                                <>
                                    {'to '}
                                    <Box
                                        as="span"
                                        css={{
                                            color: '$accent10',
                                        }}
                                    >
                                        {providerData.providerName}
                                    </Box>
                                </>
                            )}{' '}
                            with Scratch
                        </>
                    ) : (
                        <>
                            Add a new{' '}
                            <Box
                                as="span"
                                css={{
                                    color: '$accent10',
                                }}
                            >
                                one click sign in
                            </Box>{' '}
                            account
                        </>
                    )}
                </Heading>
            </Container>

            <Container size={hasChosenAuthMethod ? 2 : newOneClickSignInAccount === false ? 3 : 2} css={{ my: '$8' }}>
                {hasChosenAuthMethod === false && (
                    <Grid
                        css={{
                            gap: newOneClickSignInAccount === false ? '$6' : 0,
                            gridTemplateColumns: '1fr',
                            '@bp1': {
                                gap: newOneClickSignInAccount === false ? '$8' : 0,
                                gridTemplateColumns: newOneClickSignInAccount === false ? '1fr 1fr' : '1fr',
                            },
                        }}
                    >
                        <Box>
                            <Heading as="h2" css={{ mb: '$1', color: '$neutral11' }}>
                                Choose a way to sign in
                            </Heading>
                            <OptionCard
                                variant="interactive"
                                css={{ mb: '$4' }}
                                onClick={() => {
                                    setHasChosenAuthMethod(true);
                                    setAuthenticationMethod('cloud');
                                }}
                                disabled={true || loadingOneClickSignIn}
                            >
                                <Box
                                    css={{
                                        position: 'absolute',
                                        right: '-1em',
                                        top: '-0.5em',
                                        borderRadius: '$pill',
                                        backgroundColor: '$accent10',
                                        color: '$loContrast',
                                        textTransform: 'uppercase',
                                        fontWeight: '$bold',
                                        fontSize: '$2',
                                        px: '$2',
                                    }}
                                >
                                    recommended
                                </Box>
                                <Heading as="h3" css={{ color: 'inherit' }}>
                                    Cloud data
                                </Heading>
                                <Text css={{ lineHeight: 1.3, color: 'inherit' }}>
                                    Sign in by copying and pasting a 6-digit code into a Scratch project. This option cannot be used by New Scratchers!
                                </Text>
                            </OptionCard>
                            <OptionCard
                                variant="interactive"
                                css={{ mb: '$4' }}
                                onClick={() => {
                                    setHasChosenAuthMethod(true);
                                    setAuthenticationMethod('comment');
                                }}
                                disabled={true || loadingOneClickSignIn}
                            >
                                <Heading as="h3" css={{ color: 'inherit' }}>
                                    Comments
                                </Heading>
                                <Text css={{ lineHeight: 1.3, color: 'inherit' }}>
                                    Sign in by leaving a comment on a Scratch project! This option can be used by New Scratchers as well as Scratchers.
                                </Text>
                            </OptionCard>
                            <OptionCard
                                variant="interactive"
                                css={{ mb: '$4' }}
                                onClick={() => {
                                    setHasChosenAuthMethod(true);
                                    setAuthenticationMethod('profile-comment');
                                }}
                                disabled={loadingOneClickSignIn}
                            >
                                <Box
                                    css={{
                                        position: 'absolute',
                                        right: '-1em',
                                        top: '-0.5em',
                                        borderRadius: '$pill',
                                        backgroundColor: '$accent10',
                                        color: '$loContrast',
                                        textTransform: 'uppercase',
                                        fontWeight: '$bold',
                                        fontSize: '$2',
                                        px: '$2',
                                    }}
                                >
                                    new
                                </Box>
                                <Heading as="h3" css={{ color: 'inherit' }}>
                                    Profile comments
                                </Heading>
                                <Text css={{ lineHeight: 1.3, color: 'inherit' }}>
                                    Sign in by leaving a comment on your Scratch profile! This option can be used by New Scratchers as well as Scratchers.
                                </Text>
                            </OptionCard>
                        </Box>
                        {newOneClickSignInAccount === false && (
                            <Box>
                                <Heading as="h2" css={{ mb: '$1', color: '$neutral11' }}>
                                    One-click sign in
                                </Heading>
                                {!accountError &&
                                    (accounts?.isIdentified !== undefined ? (
                                        accounts?.accounts?.length === 0 || accounts?.isIdentified === false ? (
                                            <NextLink
                                                href={
                                                    providerData?.redirectLocation === undefined
                                                        ? '/auth?newOneClickSignInAccount=true'
                                                        : `/auth?newOneClickSignInAccount=true&redirect=${providerData.redirectLocation}`
                                                }
                                                passHref
                                            >
                                                <Button as="a" variant="accent" css={{ display: 'inline-flex', justifyContent: 'center', width: '100%', my: '$1' }}>
                                                    {accounts?.isIdentified === false ? 'Add a Scratch account' : 'Add a new account'}
                                                </Button>
                                            </NextLink>
                                        ) : (
                                            accounts?.accounts?.map((account, index) => (
                                                <OptionCard
                                                    key={index}
                                                    variant="interactive"
                                                    disabled={loadingOneClickSignIn}
                                                    onClick={() => {
                                                        oneClickSignIn(account.username);
                                                    }}
                                                    css={{ mb: index !== accounts?.accounts.length - 1 ? '$4' : '$2' }}
                                                >
                                                    {new Date(account.updated) < new Date(Date.now() - 27 * 24 * 60 * 60 * 1000) === true && <AccountExpiry>Expires soon</AccountExpiry>}
                                                    <Heading as="h3" css={{ color: 'inherit' }}>
                                                        {account.username}
                                                    </Heading>
                                                    <Text css={{ lineHeight: 1.3, color: 'inherit' }}>Last used to sign in at {new Date(account.updated).toLocaleString()}</Text>
                                                </OptionCard>
                                            ))
                                        )
                                    ) : (
                                        [...Array(Number(2))].map((value, index) => (
                                            <OptionCard key={index} variant="loading" css={{ mb: index !== 1 ? '$4' : 0 }}>
                                                <Heading as="h3">
                                                    <Skeleton width={`${getRandomInt(5, 10)}em`} />
                                                </Heading>
                                                <Text css={{ lineHeight: 1.3 }}>
                                                    <Skeleton width={`${getRandomInt(10, 20)}em`} />
                                                </Text>
                                            </OptionCard>
                                        ))
                                    ))}
                                {accountError && (
                                    <OptionCard variant="danger">
                                        <Heading as="h2" css={{ mb: '$1', color: '$danger11', display: 'inline-flex', alignItems: 'center' }}>
                                            <Box css={{ mr: '$1' }}>
                                                <ExclamationTriangleIcon width={18} height={18} />
                                            </Box>
                                            Ka-boom!
                                        </Heading>
                                        <Text>
                                            We couldn't retrieve your accounts because something broke on our end. Keep an eye on our{' '}
                                            <Link target="_blank" href="https://stats.uptimerobot.com/4Ggz4Fzo2O" css={{ display: 'inline-flex' }}>
                                                status page <OpenInNewWindowIcon width={15} height={15} />
                                            </Link>{' '}
                                            for further information.
                                        </Text>
                                    </OptionCard>
                                )}
                                <Text css={{ lineHeight: 1.3 }}>One click sign in accounts expire after 30 days of not being used. Using one to sign in will reset its expiry date.</Text>
                            </Box>
                        )}
                    </Grid>
                )}
                {hasChosenAuthMethod === true && (
                    <Box>
                        <Button
                            size="small"
                            variant="neutral"
                            onClick={() => {
                                setHasChosenAuthMethod(false);
                                setAuthenticationMethod(null);
                                setOpenedAuthenticationProject(false);
                            }}
                            css={{ mb: '$2' }}
                            disabled={isVerifying}
                        >
                            <Box css={{ mr: '$2' }}>
                                <ArrowLeftIcon width={20} height={20} />
                            </Box>
                            Change authentication method
                        </Button>
                        <Card css={{ p: '$4', mb: '$2' }}>
                            <Heading as="h3">
                                Sign in {authenticationMethod === 'cloud' ? 'through cloud data' : authenticationMethod === 'comment' ? 'by commenting' : 'by commenting on your profile'}
                            </Heading>
                            <Text css={{ lineHeight: 1.3 }}>
                                {authenticationMethod === 'cloud'
                                    ? 'Copy the code below, open and start the authentication project, and enter the code when prompted. This will sign you in with the Scratch account that you are currently logged into.'
                                    : authenticationMethod === 'comment'
                                    ? 'Copy the code below, open the authentication project, and leave a comment containing only and exactly your code. This will sign you in with the Scratch account that you are currently logged into.'
                                    : 'Enter your Scratch username, copy the code below, and leave a comment on your Scratch profile containing only and exactly your code. You may delete your comment once you have authenticated with Scratch Auth. This will sign you in with the Scratch account that you are currently logged into.'}
                            </Text>
                            <Flex justify="center" direction="column">
                                {authenticationMethod === 'profile-comment' && (
                                    <Flex justify="center">
                                        <Box>
                                            <Text css={{ mb: '$1', mt: '$2', color: '$neutral11' }}>Username</Text>
                                            <Flex>
                                                <UsernameInput
                                                    css={{ '@bp2': { fontSize: '$8' } }}
                                                    type="text"
                                                    value={username || ''}
                                                    onChange={(event) => setUsername(event.target.value)}
                                                    disabled={enteredUsername === true}
                                                />
                                                <CodeButton
                                                    css={{ height: '100%' }}
                                                    disabled={enteredUsername === false}
                                                    onClick={() => {
                                                        setUsername(null);
                                                        setEnteredUsername(false);
                                                        setOpenedAuthenticationProject(false);
                                                        setAuthenticationTokens({ cloud: null, comment: null, 'profile-comment': null });
                                                    }}
                                                >
                                                    Change
                                                </CodeButton>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                )}
                                <Flex justify="center" css={{ my: '$4' }}>
                                    <CodeCard>
                                        <Text css={{ fontSize: authenticationMethod === 'cloud' ? '$6' : '$3', '@bp2': { fontSize: '$8' } }}>
                                            {authenticationTokens[authenticationMethod] === null ? (
                                                <>
                                                    {authenticationMethod === 'profile-comment' && enteredUsername === false ? (
                                                        'Waiting for user input...'
                                                    ) : (
                                                        <Skeleton width={authenticationMethod === 'cloud' ? '5em' : '10em'} />
                                                    )}
                                                </>
                                            ) : (
                                                authenticationTokens[authenticationMethod].publicCode
                                            )}
                                        </Text>
                                    </CodeCard>
                                    <CodeButton
                                        css={{ height: '100%' }}
                                        disabled={authenticationTokens[authenticationMethod] === null}
                                        onClick={() => {
                                            copyTextToClipboard(authenticationTokens[authenticationMethod]?.publicCode);
                                        }}
                                    >
                                        Copy
                                    </CodeButton>
                                </Flex>
                            </Flex>
                            <Flex direction={{ '@initial': 'column', '@bp1': 'row' }} align={{ '@initial': 'center', '@bp1': 'start' }} justify="center">
                                {authenticationMethod === 'profile-comment' ? (
                                    <>
                                        <Button
                                            as={
                                                openedAuthenticationProject === false && isVerifying === false && enteredUsername === true && authenticationTokens[authenticationMethod] !== null
                                                    ? 'a'
                                                    : 'button'
                                            }
                                            href={openedAuthenticationProject === false && enteredUsername === true ? `https://scratch.mit.edu/users/${username}#comments` : null}
                                            target={openedAuthenticationProject === false && enteredUsername === true ? '_blank' : null}
                                            variant="accent"
                                            css={{ mb: '$2', mr: 0, '@bp1': { mb: 0, mr: '$2' } }}
                                            disabled={isVerifying || !username || (enteredUsername === true && authenticationTokens[authenticationMethod] === null)}
                                            onClick={() => {
                                                if (enteredUsername === false) {
                                                    setEnteredUsername(true);
                                                } else if (openedAuthenticationProject === false) {
                                                    setOpenedAuthenticationProject(true);
                                                } else {
                                                    // Verify identity
                                                    verify();
                                                }
                                            }}
                                        >
                                            {enteredUsername === false
                                                ? 'Generate code'
                                                : openedAuthenticationProject === false
                                                ? 'Open your profile'
                                                : isVerifying === false
                                                ? 'Done'
                                                : 'Verifying...'}
                                        </Button>
                                        <Button
                                            as={openedAuthenticationProject === true && isVerifying === false ? 'a' : 'button'}
                                            href={openedAuthenticationProject === true ? `https://scratch.mit.edu/users/${username}#comments` : null}
                                            target={openedAuthenticationProject === true ? '_blank' : null}
                                            variant="neutral"
                                            onClick={() => {
                                                if (openedAuthenticationProject === false) {
                                                    // Verify identity
                                                    setOpenedAuthenticationProject(true);
                                                    verify();
                                                }
                                            }}
                                            disabled={isVerifying || authenticationTokens[authenticationMethod] === null}
                                        >
                                            {openedAuthenticationProject === false ? 'I have already commented on my profile' : 'Reopen my profile'}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            as={openedAuthenticationProject === false ? (isVerifying === false ? 'a' : 'button') : 'button'}
                                            href={
                                                openedAuthenticationProject === false
                                                    ? `https://scratch.mit.edu/projects/${authenticationTokens[authenticationMethod]?.authProject}/${
                                                          authenticationMethod === 'cloud' ? 'fullscreen' : ''
                                                      }`
                                                    : null
                                            }
                                            target={openedAuthenticationProject === false ? '_blank' : null}
                                            variant="accent"
                                            css={{ mb: '$2', mr: 0, '@bp1': { mb: 0, mr: '$2' } }}
                                            disabled={isVerifying}
                                            onClick={() => {
                                                if (openedAuthenticationProject === false) {
                                                    setOpenedAuthenticationProject(true);
                                                } else {
                                                    // Verify identity
                                                    verify();
                                                }
                                            }}
                                        >
                                            {openedAuthenticationProject === false ? 'Open authentication project' : isVerifying === false ? 'Done' : 'Verifying...'}
                                        </Button>
                                        <Button
                                            as={openedAuthenticationProject === true ? (isVerifying === false ? 'a' : 'button') : 'button'}
                                            href={
                                                openedAuthenticationProject === true
                                                    ? `https://scratch.mit.edu/projects/${authenticationTokens[authenticationMethod]?.authProject}/${
                                                          authenticationMethod === 'cloud' ? 'fullscreen' : ''
                                                      }`
                                                    : null
                                            }
                                            target={openedAuthenticationProject === true ? '_blank' : null}
                                            variant="neutral"
                                            onClick={() => {
                                                if (openedAuthenticationProject === false) {
                                                    // Verify identity
                                                    setOpenedAuthenticationProject(true);
                                                    verify();
                                                }
                                            }}
                                            disabled={isVerifying || authenticationTokens[authenticationMethod] === null}
                                        >
                                            {openedAuthenticationProject === false
                                                ? authenticationMethod === 'cloud'
                                                    ? 'I have already entered my code'
                                                    : 'I have already commented'
                                                : 'Reopen authentication project'}
                                        </Button>
                                    </>
                                )}
                            </Flex>
                        </Card>
                        {newOneClickSignInAccount === false && (
                            <Flex align="center">
                                <Checkbox checked={addUserToOneClickLoginList} onCheckedChange={(checked) => setAddUserToOneClickLoginList(checked)} disabled={isVerifying} id="save-user">
                                    <CheckboxIndicator>
                                        <CheckIcon width={25} height={25} />
                                    </CheckboxIndicator>
                                </Checkbox>
                                <Label css={{ ml: 10 }} htmlFor="save-user">
                                    Add the account I will log into to my list of one-click sign in accounts
                                </Label>
                            </Flex>
                        )}
                    </Box>
                )}
                <Flex css={{ justifyContent: 'center', mt: '$8' }}>
                    <Button as="a" target="_blank" href="https://scratch.mit.edu/users/Looky1173/#comments">
                        Report an issue
                        <Box css={{ ml: '$2' }}>
                            <OpenInNewWindowIcon width={20} height={20} />
                        </Box>
                    </Button>
                </Flex>
            </Container>
        </Layout>
    );
}
