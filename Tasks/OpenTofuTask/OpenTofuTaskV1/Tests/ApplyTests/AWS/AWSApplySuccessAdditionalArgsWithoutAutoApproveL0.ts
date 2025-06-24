import { OpenTofuCommandHandlerAWS } from '../../../src/aws-opentofu-command-handler';
import tl = require('azure-pipelines-task-lib');

let opentofuCommandHandlerAWS: OpenTofuCommandHandlerAWS = new OpenTofuCommandHandlerAWS();

export async function run() {
    try {
        const response = await opentofuCommandHandlerAWS.apply();
        if (response === 0) {
            tl.setResult(tl.TaskResult.Succeeded, 'AWSApplySuccessAdditionalArgsWithoutAutoApproveL0 should have succeeded.');
        } else{
            tl.setResult(tl.TaskResult.Failed, 'AWSApplySuccessAdditionalArgsWithoutAutoApproveL0 should have succeeded but failed.');
        }
    } catch(error) {
        tl.setResult(tl.TaskResult.Failed, 'AWSApplySuccessAdditionalArgsWithoutAutoApproveL0 should have succeeded but failed.');
    }
}

run();
