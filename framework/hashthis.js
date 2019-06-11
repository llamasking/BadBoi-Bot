const crypto = require("crypto");

module.exports = (data, algorithm) => {
    if (!algorithm) algorithm="md5";
    return crypto.createHash(algorithm).update(data, 'utf8').digest('hex').toLocaleUpperCase();
}