export default async function getTokens(req, res) {
    let serverURL = process.env.SERVER_URL;

    let authenticationMethod = req.query.method;
    const customProject = req.query?.authProject;
    let tokens;

    if (req.query.username) {
        tokens = await fetch(`${serverURL}/auth/getTokens?method=${authenticationMethod}&redirect=${req.query.redirect}&username=${req.query.username}`);
    } else {
        tokens = await fetch(`${serverURL}/auth/getTokens?method=${authenticationMethod}&redirect=${req.query.redirect}${customProject && `&authProject=${customProject}`}`);
    }

    tokens = await tokens.json();

    return res.status(200).json(tokens);
}
