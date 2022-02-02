exports.validationName = (name) => {
    if (name == null || name == '') {
        return 'Name must be filled.';
    }
};