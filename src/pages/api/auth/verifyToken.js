export default async function verifyToken(req, res) {
    let serverURL = process.env.SERVER_URL;

    if (!req.query.privateCode) return res.status(400).json({ error: 'Missing private code' });

    return res.redirect(307, `${serverURL}/auth/verifyToken/${req.query.privateCode}`);
}
