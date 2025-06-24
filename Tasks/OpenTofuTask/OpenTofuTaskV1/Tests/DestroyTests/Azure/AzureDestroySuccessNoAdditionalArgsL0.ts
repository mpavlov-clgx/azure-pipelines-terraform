import { OpenTofuCommandHandlerAzureRM } from '../../../src/azure-opentofu-command-handler';
import tl = require('azure-pipelines-task-lib');

let opentofuCommandHandlerAzureRM: OpenTofuCommandHandlerAzureRM = new OpenTofuCommandHandlerAzureRM();

export async function run() {
    try {
        const response = await opentofuCommandHandlerAzureRM.destroy();
        if (response === 0) {
            tl.setResult(tl.TaskResult.Succeeded, 'AzureDestroySuccessNoAdditionalArgsL0 should have succeeded.');
        } else{
            tl.setResult(tl.TaskResult.Failed, 'AzureDestroySuccessNoAdditionalArgsL0 should have succeeded but failed.');
        }
    } catch(error) {
        tl.setResult(tl.TaskResult.Failed, 'AzureDestroySuccessNoAdditionalArgsL0 should have succeeded but failed.');
    }
}

run();
