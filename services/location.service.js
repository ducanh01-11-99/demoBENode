const db = require('./db');

async function getListProvinces(){
    const provinces = await db.query(
        'SELECT * FROM provinces order by administrative_unit_id'
    );

    if(provinces.length === 0) {
        return [];
    }
    return provinces;
};

async function getListDistrict(idProvince){
    const districts = await db.query(
        'SELECT * FROM districts where province_code = ? order by administrative_unit_id',
        [idProvince]
    );

    if(districts.length === 0) {
        return [];
    }
    return districts;
};

async function getListWard(idDistrict){
    const wards = await db.query(
        'SELECT * FROM wards where district_code = ? order by administrative_unit_id',
        [idDistrict]
    );

    if(wards.length === 0) {
        return [];
    }
    return wards;
};

async function getListArea(){
    const wards = await db.query(
        'SELECT * FROM area'
    );

    if(wards.length === 0) {
        return [];
    }
    return wards;
};

const getYearKey = async() => {
    const list = await db.query(
        'SELECT * FROM nam_hoc ORDER BY ma_nam_hoc DESC'
    );

    if(list.length === 0) {
        return [];
    }
    return list;
}

const getTypeSchool = async() => {
    const list = await db.query(
        'SELECT * FROM loai_truong ORDER BY loai_truong_id DESC'
    );

    if(list.length === 0) {
        return [];
    }
    return list;
}

module.exports = {getListProvinces, getListDistrict, getListWard, getListArea, getYearKey, getTypeSchool}