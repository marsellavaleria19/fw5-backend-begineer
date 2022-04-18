exports.cloudFileName = (path) => {
    const filename = path.split('/').slice(-3).join('/').split('.')[0];
    return filename;
};