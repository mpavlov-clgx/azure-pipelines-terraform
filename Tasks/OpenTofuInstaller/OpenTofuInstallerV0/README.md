# OpenTofu tool installer


### Overview

The OpenTofu Tool Installer task acquires a specified version of [OpenTofu](https://opentofu.org/) from the Internet or the tools cache and prepends it to the PATH of the Azure Pipelines Agent (hosted or private). Use this task to change the version of OpenTofu used in subsequent tasks like [OpenTofu](https://aka.ms/AAf0uqr).
Adding this task before the [OpenTofu task](https://aka.ms/AAf0uqr) in a build definition ensures you are using that task with the right OpenTofu  version.


### Contact Information

Please report a problem at [Developer Community Forum](https://developercommunity.visualstudio.com/spaces/21/index.html) if you are facing problems in making this task work. You can also share feedback about the task like, what more functionality should be added to the task, what other tasks you would like to have, at the same place.


### Pre-requisites for the task

The task can run on the following build agent operating systems:
- Windows
- MacOS
- Linux

** Opentofu is already installed on hosted Ubuntu build agents. So, this task may be omitted for these agents unless a different vesrion of Opentofu is needed.

### Parameters of the task

* **Display name\*:** Provide a name to identify the task among others in your pipeline.

* **Version\*:** Specify the keyword 'latest' to get the latest released version or specify exact version of Opentofu to install.  
Example: 
    To install latest Opentofu version use keyword: latest.  To install specific version Ex. 1.0.8, use 1.0.8.
For getting more details about exact version, refer [this link](https://releases.hashicorp.com/opentofu/)


### Output Variables

* **Opentofu location:** This variable can be used to refer to the location of the opentofu binary that was installed on the agent in subsequent tasks.

### Example Task Usage
Below is a basic example usage of a few commands within the OpentofuInstaller task.

```yaml
- task: OpentofuInstaller@0
  displayName: Install Opentofu 1.5.7
  inputs:
    opentofuVersion: 1.5.7
```
