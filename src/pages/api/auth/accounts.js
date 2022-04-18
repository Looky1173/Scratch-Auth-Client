import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@constants';

export default withIronSessionApiRoute(accounts, sessionOptions);

async function accounts(req, res) {
    let serverURL = process.env.SERVER_URL;
    const method = req.method;

    if (method === 'GET') {
        if (req.session.user) {
            let accounts = await fetch(`${serverURL}/auth/oneClickSignIn`, { method: 'GET', headers: { Authorization: req.session?.user?.token } });
            accounts = await accounts.json();
            return res.json({
                ...req.session.user,
                accounts: accounts === {} ? null : accounts,
                isIdentified: accounts === {} ? false : true,
            });
        } else {
            return res.json({
                accounts: null,
                isIdentified: false,
            });
        }
    }
    if (method === 'POST') {
        if (!req.session.user) return res.status(401).json({ error: 'Missing authentication token' });

        if (!req.query.username) return res.status(400).json({ error: 'Missing username' });

        if (!req.query.redirect) return res.status(400).json({ error: 'Missing redirect location' });

        let data = await fetch(`${serverURL}/auth/oneClickSignIn/${req.query.username}&redirect=${req.query.redirect}`, { method: 'POST', headers: { Authorization: req.session?.user?.token } });
        data = await data.json();

        return res.status(200).json({ success: typeof data.error === 'undefined' ? true : false, error: data.error, instantPrivateCode: data.instantPrivateCode });
    }
    if (method === 'DELETE') {
        if (!req.session.user) return res.status(401).json({ error: 'Missing authentication token' });

        if (req.query.username) {
            await fetch(`${serverURL}/auth/oneClickSignIn/${req.query.username}`, { method: 'DELETE', headers: { Authorization: req.session?.user?.token } });
        } else {
            await fetch(`${serverURL}/auth/oneClickSignIn`, { method: 'DELETE', headers: { Authorization: req.session?.user?.token } });
        }

        return res.status(200).json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
}
