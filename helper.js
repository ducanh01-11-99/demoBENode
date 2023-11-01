const uuid = require('uuid');

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
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
        "status" : id,
        "data": data,
        "isOk": isOk
    }
  }

const validateName = (name) => {
    if(name.length < 3 || name.length > 50) {
        return "Tên có độ dài từ 3 đến 50 kí tự"
    }
    const regex = /^[a-zA-Z0-9\sàáạãảăắằẵặẳâấầẫậẩèéẹẽẻêềếễệểđìíịĩỉòóọõỏôốồỗộổơớờỡợởùúụũủưứừữựửỳýỵỹỷÀÁẠÃẢĂẮẰẴẶẲÂẤẦẪẬẨÈÉẸẼẺÊỀẾỄỆỂĐÌÍỊĨỈÒÓỌÕỎÔỐỒỖỘỔƠỚỜỠỢỞÙÚỤŨỦƯỨỪỮỰỬỲÝỴỸỶ\s]+$/u;
    if (!regex.test(name)) {
        return "Tên không đúng định dạng";
      }  
      // Nếu tất cả các điều kiện đều thỏa mãn, chuỗi là UUID hợp lệ
      return "";
}

const validatePositiveNumber = (number, textValidate) => {
    if (isNaN(number)) {
        return textValidate + " không đúng định dạng số";
      } else {
        // Không phải số
        if(number < 0) {
            return textValidate + "phải là số dương";
        }
        return "";
      }
}

const convertStringToArr = (str) => {
    if(str) {
        let arr = str.split(',');
        return arr;
    }
    return [];
}



module.exports = {
    getOffset,
    emptyOrRows,
    genGuid,
    checkNewGuid,
    isValidUUID,
    genResponseBody,
    validateName,
    validatePositiveNumber,
    convertStringToArr
}
