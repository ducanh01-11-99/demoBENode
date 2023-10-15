const uuid = require('uuid');

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    console.log('row', rows)
    if (!rows) {
        return [];
    }
    return rows;
}

const genGuid = () => {
    return uuid.v4();
}

module.exports = {
    getOffset,
    emptyOrRows,
    genGuid
}