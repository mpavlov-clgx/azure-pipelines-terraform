import tasks = require('azure-pipelines-task-lib/task');
import tools = require('azure-pipelines-tool-lib/tool');
import { ToolRunner } from 'azure-pipelines-task-lib/toolrunner';
import path = require('path');
import * as installer from './opentofu-installer';

async function configureOpenTofu() {
    let inputVersion = tasks.getInput("opentofuVersion", true);
    let openTofuPath = await installer.downloadOpenTofu(inputVersion);
    let envPath = process.env['PATH'];

    // Prepend the tools path. Instructs the agent to prepend for future tasks
    if (envPath && !envPath.startsWith(path.dirname(openTofuPath))) {
        tools.prependPath(path.dirname(openTofuPath));
    }
}

async function verifyOpenTofu() {
    console.log(tasks.loc("VerifyOpenTofuInstallation"));
    let openTofuPath = tasks.which("tofu", true);
    let openToFuTool : ToolRunner = tasks.tool(openTofuPath);
    openToFuTool.arg("version");
    return openToFuTool.exec();
}

async function run() {
    tasks.setResourcePath(path.join(__dirname, '..', 'task.json'));

    try {
        await configureOpenTofu();
        await verifyOpenTofu();
        tasks.setResult(tasks.TaskResult.Succeeded, "");
    } catch (error) {
        tasks.setResult(tasks.TaskResult.Failed, error);
    }
}

run();