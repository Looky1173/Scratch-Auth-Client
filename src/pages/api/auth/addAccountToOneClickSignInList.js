import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@constants';

export default withIronSessionApiRoute(async (req, res) => {
    let serverURL = process.env.SERVER_URL;

    let privateCode = req.query.privateCode;

    let token = await fetch(`${serverURL}/auth/verifyToken/${privateCode}?oneClickSignIn=true&redirect=${req.query.redirect}`, { headers: { Authorization: req.session?.user?.token } });
    token = await token.json();

    if (token.valid === true) {
        req.session.user = { token: token.oneClickSignInToken };
        await req.session.save();
    }

    return res.status(200).json(token);
}, sessionOptions);
