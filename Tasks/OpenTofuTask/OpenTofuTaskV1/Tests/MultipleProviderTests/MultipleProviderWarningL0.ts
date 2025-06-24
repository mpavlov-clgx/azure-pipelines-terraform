import { OpenTofuCommandHandlerAzureRM } from '../../src/azure-opentofu-command-handler';
import tl = require('azure-pipelines-task-lib');

let opentofuCommandHandlerAzureRM: OpenTofuCommandHandlerAzureRM = new OpenTofuCommandHandlerAzureRM();

export async function run() {
    try {
        await opentofuCommandHandlerAzureRM.warnIfMultipleProviders();
    } catch(error) {
        tl.setResult(tl.TaskResult.Failed, 'MultipleProviderWarningL0 should have succeeded but failed.');
    }
}

run();