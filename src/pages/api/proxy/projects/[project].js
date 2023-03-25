export default async function getProject(req, res) {
    const { project } = req.query;

    let projectData = await fetch(`https://api.scratch.mit.edu/projects/${project}`);
    projectData = await projectData.json();

    return res.status(200).json(projectData);
}
