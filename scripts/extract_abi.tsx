const fs = require('fs');
const path = require('path');

const contractName = 'LUXToken';
const artifactPath = path.join(__dirname, `../artifacts/src/${contractName}.sol/${contractName}.json`);
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

const abi = JSON.stringify(artifact.abi, null, 2);
fs.writeFileSync(`${contractName}.abi.json`, abi);

console.log(`ABI for ${contractName} has been extracted to ${contractName}.abi.json`);
