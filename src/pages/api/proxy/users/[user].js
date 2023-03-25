export default async function getUser(req, res) {
    const { user } = req.query;

    let userData = await fetch(`https://api.scratch.mit.edu/users/${user}`);
    userData = await userData.json();

    return res.status(200).json(userData);
}
