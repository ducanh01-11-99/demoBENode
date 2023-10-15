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

const checkNewGuid = (uuid) => {
    if(uuid === null) {
        return false;
    }
    return uuid === "00000000-0000-0000-0000-000000000000";
}

const isValidUUID = (uuid) => {
    // Kiểm tra độ dài chuỗi
    if (uuid.length !== 36) {
      return false;
    }
  
    // Kiểm tra định dạng chuỗi
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    if (!regex.test(uuid)) {
      return false;
    }  
    // Nếu tất cả các điều kiện đều thỏa mãn, chuỗi là UUID hợp lệ
    return true;
  }

  const genResponseBody = (id, data, isOk) => {
    return {
        "id" : id,
        "data": data,
        "isOk": isOk
    }
  }

module.exports = {
    getOffset,
    emptyOrRows,
    genGuid,
    checkNewGuid,
    isValidUUID,
    genResponseBody
}
