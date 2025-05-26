const dayjs = require('dayjs')
const formatToLocal = (dateObj) => {
    
    return dayjs(dateObj).format('YYYY-MM-DD hh:mm:ss A');
};

module.exports = {formatToLocal }