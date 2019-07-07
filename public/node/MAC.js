const os = require('os');

const networkInterfaces = os.networkInterfaces();
window.MAC = networkInterfaces[Object.keys(networkInterfaces)[0]][0].mac;
