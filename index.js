const core = require('@actions/core');
const github = require('@actions/github');

try {
    const domain = 'server-mom.modulero.nl';

    const account = core.getInput('account');
    const project = core.getInput('project');
    const email = core.getInput('email');
    const apiKey = core.getInput('api_key');
    const serverId = core.getInput('server_id');
    const branch = core.getInput('branch');
    const revision = core.getInput('revision');

    fetch(`https://${account}.${domain}/api/projects/${project}/deployments`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(email + ':' + apiKey),
        },
        body: JSON.stringify({
            server_id: serverId,
            branch: branch,
            revision: revision,
        })
    })
        .then(response => response.json())
        .then(json => core.setOutput('output', json));
} catch (error) {
    core.setFailed(error.message);
}