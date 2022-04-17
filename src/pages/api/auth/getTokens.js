export default async function getTokens(req, res) {
    let serverURL = process.env.SERVER_URL;

    let authenticationMethod = req.query.method;
    let tokens = await fetch(`${serverURL}/auth/getTokens?method=${authenticationMethod}`);
    tokens = await tokens.json();

    return res.status(200).json(tokens);
}
