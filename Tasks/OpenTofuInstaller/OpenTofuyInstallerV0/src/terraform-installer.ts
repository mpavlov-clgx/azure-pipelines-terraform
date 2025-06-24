import tasks = require('azure-pipelines-task-lib/task');
import tools = require('azure-pipelines-tool-lib/tool');
import path = require('path');
import os = require('os');
import fs = require('fs');

const uuidV4 = require('uuid/v4');
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

const opentofuToolName = "tofu";
const isWindows = os.type().match(/^Win/);
const proxy = tasks.getHttpProxyConfiguration();

const repo = 'opentofu/opentofu';
const url  = `https://api.github.com/repos/${repo}/releases/latest`;

export async function downloadOpenTofu(inputVersion: string): Promise<string> {
    var latestVersion: string = "";
    if(inputVersion.toLowerCase() === 'latest') {
        console.log(tasks.loc("GettingLatestOpenTofuVersion"));
        if(proxy == null){
            await fetch(url, {
                headers: {
                    'Accept': 'application/vnd.github+json'
                }
            })
            .then(response => {
                if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
                return response.json();
            })
            .then(data => {
                latestVersion = tools.cleanVersion(data.tag_name.replace('v', ''));
            })
            .catch((exception: any) => {
                console.warn(tasks.loc("OpenTofuVersionNotFound"));

                latestVersion = '1.9.0';
            })
        }
        else
        {
            var proxyUrl = proxy.proxyUsername !="" ? proxy.proxyUrl.split("://")[0] + '://' + proxy.proxyUsername + ':' + proxy.proxyPassword + '@' + proxy.proxyUrl.split("://")[1]:proxy.proxyUrl;
            var proxyAgent = new HttpsProxyAgent(proxyUrl);
              await fetch(url, {agent: proxyAgent})
            .then(response => {
                if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
                return response.json();
            })
            .then(data => {
                latestVersion = tools.cleanVersion(data.tag_name.replace('v', ''));
            })
            .catch((exception: any) => {
                console.warn(tasks.loc("OpenTofuVersionNotFound"));

                latestVersion = '1.9.0';
            })

        }
    }
    var version = latestVersion != "" ? tools.cleanVersion(latestVersion) : tools.cleanVersion(inputVersion);

    if (!version) {
        throw new Error(tasks.loc("InputVersionNotValidSemanticVersion", inputVersion));
    }

    let cachedToolPath = tools.findLocalTool(opentofuToolName, version);
    if (!cachedToolPath) {
        let openTofDownloadUrl = getOpenTofuDownloadUrl(version);
        let fileName = `${opentofuToolName}-${version}-${uuidV4()}.zip`;
        let openTofuDownloadPath;

        try {
            openTofuDownloadPath = await tools.downloadTool(openTofDownloadUrl, fileName);
        } catch (exception) {
            throw new Error(tasks.loc("OpenTofuDownloadFailed", openTofDownloadUrl, exception));
        }

        let openTofuUnzippedPath = await tools.extractZip(openTofuDownloadPath);
        cachedToolPath = await tools.cacheDir(openTofuUnzippedPath, opentofuToolName, version);
    }

    let openTofuPath = findOpenTofuExecutable(cachedToolPath);
    if (!openTofuPath) {
        throw new Error(tasks.loc("OpenTofuNotFoundInFolder", cachedToolPath));
    }

    if (!isWindows) {
        fs.chmodSync(openTofuPath, "777");
    }

    tasks.setVariable('openTofuLocation', openTofuPath);

    return openTofuPath;
}

function getOpenTofuDownloadUrl(version: string): string {
    let platform: string;
    let architecture: string;

    switch(os.type()) {
        case "Darwin":
            platform = "darwin";
            break;
        
        case "Linux":
            platform = "linux";
            break;
        
        case "Windows_NT":
            platform = "windows";
            break;
        
        default:
            throw new Error(tasks.loc("OperatingSystemNotSupported", os.type()));
    }

    switch(os.arch()) {
        case "x64":
            architecture = "amd64";
            break;
        
        case "x32":
            architecture = "386";
            break;

        case "arm64":
                architecture = "arm64";
            break;

        case "arm":
                architecture = "arm";
            break;

        default:
            throw new Error(tasks.loc("ArchitectureNotSupported", os.arch()));
    }

    return `https://github.com/opentofu/releases/download/v${version}/tofu${version}_${platform}_${architecture}.zip`;
}

function findOpenTofuExecutable(rootFolder: string): string {
    let opentofuPath = path.join(rootFolder, opentofuToolName + getExecutableExtension());
    var allPaths = tasks.find(rootFolder);
    var matchingResultFiles = tasks.match(allPaths, opentofuPath, rootFolder);
    return matchingResultFiles[0];
}

function getExecutableExtension(): string {
    if (isWindows) {
        return ".exe";
    }

    return "";

}
