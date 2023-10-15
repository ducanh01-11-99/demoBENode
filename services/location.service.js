const db = require('./db');

async function getListProvinces(){
    const provinces = await db.query(
        'SELECT * FROM provinces'
    );

    if(provinces.length === 0) {
        return [];
    }
    return provinces;
};

async function getListDistrict(idProvince){
    const districts = await db.query(
        'SELECT * FROM districts where province_code = ?',
        [idProvince]
    );

    if(districts.length === 0) {
        return [];
    }
    return districts;
};

async function getListWard(idDistrict){
    const wards = await db.query(
        'SELECT * FROM wards where district_code = ?',
        [idDistrict]
    );

    if(wards.length === 0) {
        return [];
    }
    return wards;
};

module.exports = {getListProvinces, getListDistrict, getListWard}