import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@constants';

export default withIronSessionApiRoute(forgetMe, sessionOptions);

async function forgetMe(req, res) {
    let serverURL = process.env.SERVER_URL;
    const method = req.method;

    if (method === 'POST') {
        await fetch(`${serverURL}/auth/oneClickSignIn`, { method: 'DELETE', headers: { Authorization: req.session?.user?.token } });

        req.session.destroy();
        return res.status(200).json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
}
