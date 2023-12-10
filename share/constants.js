// validate sdt
const regexPhoneNumber = /(0|84|+84)([3|5|7|8|9])+([0-9]{8})\b/g;

const LIST_GENDER = [
    {value: 1, name: "Nữ"},
    {value: 0, name: "Nam"},
]

module.exports = {
    regexPhoneNumber, LIST_GENDER
}