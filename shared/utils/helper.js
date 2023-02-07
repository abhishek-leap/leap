import { storage } from "../mmkv-store/store";

export const setGlobalNavigation = (navigation) => { 
    global.navRef = navigation
    return true;
}

export const isEmptyStr = str => !str || !str.trim();
export const validateEmail = email =>  (email ? (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) : true);
export const validatePhone = phone =>  (phone ? (/^\+?[0-9]+$/i.test(phone)) : true);

export const getCurrentYear = () => new Date().getFullYear();

export const isDate13orMoreYearsOld = (date) => {
    let formatDate = new Date(date);
    return new Date(formatDate.getFullYear()+13, formatDate.getMonth()-1, formatDate.getDate()) <= new Date();
}

export const getData = (key, type="string") => {
    if(type === "string") {
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

