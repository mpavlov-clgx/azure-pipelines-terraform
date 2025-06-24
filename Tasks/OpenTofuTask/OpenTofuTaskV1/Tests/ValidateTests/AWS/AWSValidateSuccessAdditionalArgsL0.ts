import { OpenTofuCommandHandlerAWS } from '../../../src/aws-opentofu-command-handler';
import tl = require('azure-pipelines-task-lib');

let opentofuCommandHandlerAWS: OpenTofuCommandHandlerAWS = new OpenTofuCommandHandlerAWS();

export async function run() {
    try {
        const response = await opentofuCommandHandlerAWS.validate();
        if (response === 0) {
            tl.setResult(tl.TaskResult.Succeeded, 'AWSValidateSuccessAdditionalArgsL0 should have succeeded.');
        } else{
            tl.setResult(tl.TaskResult.Failed, 'AWSValidateSuccessAdditionalArgsL0 should have succeeded but failed.');
        }
    } catch(error) {
        tl.setResult(tl.TaskResult.Failed, 'AWSValidateSuccessAdditionalArgsL0 should have succeeded but failed.');
    }
}

run();