export const sessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'scratch-auth-token',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
