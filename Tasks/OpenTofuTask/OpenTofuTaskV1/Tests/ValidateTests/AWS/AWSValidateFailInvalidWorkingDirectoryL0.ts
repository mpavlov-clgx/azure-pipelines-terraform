import { OpenTofuCommandHandlerAWS } from '../../../src/aws-opentofu-command-handler';
import tl = require('azure-pipelines-task-lib');

let opentofuCommandHandlerAWS: OpenTofuCommandHandlerAWS = new OpenTofuCommandHandlerAWS();

export async function run() {
    try {
        await opentofuCommandHandlerAWS.validate();
    } catch(error) {
        tl.setResult(tl.TaskResult.Failed, 'AWSValidateFailInvalidWorkingDirectoryL0 should have succeeded but failed with error.');
    }
}

run();