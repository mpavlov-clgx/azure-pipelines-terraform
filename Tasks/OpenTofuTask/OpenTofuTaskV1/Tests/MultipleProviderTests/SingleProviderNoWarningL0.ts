import { OpenTofuCommandHandlerAzureRM } from '../../src/azure-opentofu-command-handler';
import tl = require('azure-pipelines-task-lib');

let opentofuCommandHandlerAzureRM: OpenTofuCommandHandlerAzureRM = new OpenTofuCommandHandlerAzureRM();

export async function run() {
    try {
        await opentofuCommandHandlerAzureRM.warnIfMultipleProviders();
    } catch(error) {
        tl.setResult(tl.TaskResult.Failed, 'SingleProviderNoWarningL0 should have succeeded but failed.');
    }
}

run();