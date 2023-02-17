import { storage } from "../mmkv-store/store";

export const setGlobalNavigation = (navigation) => {
    global.navRef = navigation
    return true;
}

export const isEmptyStr = str => !str || !str.trim();
export const validateEmail = email => (email ? (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) : true);
export const validatePhone = phone => (phone ? (/^\+?[0-9]+$/i.test(phone)) : true);

export const getCurrentYear = () => new Date().getFullYear();

export const isUserMinor = (date) => {
    let formatDate = new Date(date);
    return new Date(formatDate.getFullYear() + 13, formatDate.getMonth() - 1, formatDate.getDate()) <= new Date();
}

export const getData = (key, type = "string") => {
    if (type === "string") {
        return storage.getString(key);
    } else if (type === "number") {
        return storage.getNumber(key);
    } else if (type === "boolean") {
        return storage.getBoolean(key);
    }
}

export const setData = (key, value) => {
    storage.set(key, value);
}

export const removeData = async (key) => {
    storage.delete(key);
}

export const removeAllData = async () => {
    storage.clearAll();
}

export const checkKeyExist = async (key) => {
    return storage.contains(key);
}

export const getFields = (input, field) => {
    let output = [];
    for (let i = 0; i < input.length; ++i)
        output.push(input[i][field]);
    return output;
}

/* Object insert into Array with duplicate check.
 1. If blank pass then remove full array. 
 2. if object exist then remove that object.
*/
export const objInsertToArray = (payload, array) => {
    if (payload != '') {
        const contains = array.findIndex(v => v.name === payload.name);
        if (contains) {
            array.push(payload)
        } else {
            array.splice(contains, 1);
        }
    } else {
        array.splice(0, array.length)
    }
}

export const queryString = (object = {}) => Object.keys(object).length ? `?${Object.keys(object).map((key) => [key, typeof object[key] !== "object" ? object[key] : JSON.stringify(object[key]),].map(encodeURIComponent).join("=")).join("&")}` : "";

export const removeByAttr = function (arr, attr, value) {
    let i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
}