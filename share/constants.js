// validate sdt
const regexPhoneNumber = /(0|84|+84)([3|5|7|8|9])+([0-9]{8})\b/g;
export const REGEX_CMND_CCCD = /^([0-9]{9}|[0-9]{12}|[A-Z]([0-9]{7}))$/g;

module.exports = {
    regexPhoneNumber
}