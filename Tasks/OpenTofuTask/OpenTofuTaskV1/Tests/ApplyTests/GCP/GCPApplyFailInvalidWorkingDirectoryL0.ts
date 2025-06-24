import { OpenTofuCommandHandlerGCP } from '../../../src/gcp-opentofu-command-handler';
import tl = require('azure-pipelines-task-lib');

let opentofuCommandHandlerGCP: OpenTofuCommandHandlerGCP = new OpenTofuCommandHandlerGCP();

export async function run() {
    try {
        await opentofuCommandHandlerGCP.apply();
    } catch(error) {
        tl.setResult(tl.TaskResult.Failed, 'GCPApplyFailInvalidWorkingDirectoryL0 should have succeeded but failed with error.');
    }
}

run();