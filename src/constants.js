export const sessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'scratch-auth-token',
    ttl: 90 * 24 * 60 * 60 // 90 days,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
