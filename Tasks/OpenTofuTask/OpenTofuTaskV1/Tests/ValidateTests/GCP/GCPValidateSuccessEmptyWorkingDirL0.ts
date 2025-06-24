import { OpenTofuCommandHandlerGCP } from '../../../src/gcp-opentofu-command-handler';
import tl = require('azure-pipelines-task-lib');

let opentofuCommandHandlerGCP: OpenTofuCommandHandlerGCP = new OpenTofuCommandHandlerGCP();

export async function run() {
    try {
        const response = await opentofuCommandHandlerGCP.validate();
        if (response === 0) {
            tl.setResult(tl.TaskResult.Succeeded, 'GCPValidateSuccessEmptyWorkingDirL0 should have succeeded.');
        } else{
            tl.setResult(tl.TaskResult.Failed, 'GCPValidateSuccessEmptyWorkingDirL0 should have succeeded but failed.');
        }
    } catch(error) {
        tl.setResult(tl.TaskResult.Failed, 'GCPValidateSuccessEmptyWorkingDirL0 should have succeeded but failed.');
    }
}

run();