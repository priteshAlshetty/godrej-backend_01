let reportPath = '';

module.exports = {
    setPath: (path) => {
        reportPath = path;
        console.log('path set')
    },
    getPath: () => reportPath,
};
