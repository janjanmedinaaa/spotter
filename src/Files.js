var fs = require('fs');

const mkdir = (dir) => {
    if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) fs.mkdirSync(dir);
}

const exist = (dir) => {
    return fs.existsSync(dir)
}

module.exports = {
    mkdir,
    exist
}