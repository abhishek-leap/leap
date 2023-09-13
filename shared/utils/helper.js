import {storage} from '../mmkv-store/store';

export const setGlobalNavigation = navigation => {
  global.navRef = navigation;
  // global.videoScrollIndex = 0
  return true;
};

export const isEmptyStr = str => !str || !str.trim();
export const validateEmail = email =>
  email ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) : true;
export const validatePhone = phone =>
  phone ? /^\+?[0-9]+$/i.test(phone) : true;

export const getCurrentYear = () => new Date().getFullYear();

export const getYearMonthAndDay = date => {
  const dateObj = date ? new Date(date) : new Date();
  return {
    date: dateObj.getDate(),
    month: dateObj.getMonth() + 1,
    year: dateObj.getFullYear(),
  };
};

export const isUserMinor = date => {
  let formatDate = new Date(date);
  return (
    new Date(
      formatDate.getFullYear() + 13,
      formatDate.getMonth() - 1,
      formatDate.getDate(),
    ) <= new Date()
  );
};

export const getData = (key, type = 'string') => {
  if (type === 'string') {
    return storage.getString(key);
  } else if (type === 'number') {
    return storage.getNumber(key);
  } else if (type === 'boolean') {
    return storage.getBoolean(key);
  }
};

export const setData = (key, value) => {
  storage.set(key, value);
};

export const removeData = async key => {
  storage.delete(key);
};

export const removeAllData = async () => {
  const fcmToken = getData('fcmToken');
  storage.clearAll();
  if (fcmToken) {
    setData('fcmToken', fcmToken);
  }
};

export const checkKeyExist = async key => {
  return storage.contains(key);
};

export const getFields = (input, field) => {
  let output = [];
  for (let i = 0; i < input.length; ++i) output.push(input[i][field]);
  return output;
};

/* Object insert into Array with duplicate check.
 1. If blank pass then remove full array. 
 2. if object exist then remove that object.
*/
export const objInsertToArray = (payload, array) => {
  if (payload != '') {
    const contains = array.findIndex(v => v.name === payload.name);
    if (contains) {
      array.push(payload);
    } else {
      array.splice(contains, 1);
    }
  } else {
    array.splice(0, array.length);
  }
};

export const queryString = (object = {}) =>
  Object.keys(object).length
    ? `?${Object.keys(object)
        .map(key =>
          [
            key,
            typeof object[key] !== 'object'
              ? object[key]
              : JSON.stringify(object[key]),
          ]
            .map(encodeURIComponent)
            .join('='),
        )
        .join('&')}`
    : '';

export const getBase64FromUrl = async url => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

export const removeByAttr = function (arr, attr, value) {
  let i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr] === value
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

export const removeElementFromArray = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];

export const getVotingsPercentages = (votesA = 0, votesB = 0) => {
  let resultedVotesA = 0;
  let resultedVotesB = 0;
  if (votesA === votesB) {
    resultedVotesA = 0.5;
    resultedVotesB = 0.5;
  } else {
    const totalVotes = votesA + votesB;
    if (totalVotes > 10) {
      resultedVotesA = votesA / totalVotes;
      resultedVotesB = votesB / totalVotes;
    } else {
      if (votesA > votesB) {
        resultedVotesA = 0.5 + votesA * 0.05;
        resultedVotesB = 0.5 - votesA * 0.05;
      } else {
        resultedVotesA = 0.5 - votesB * 0.05;
        resultedVotesB = 0.5 + votesB * 0.05;
      }
    }
  }
  resultedVotesA = (resultedVotesA * 100).toFixed(1);
  resultedVotesB = (resultedVotesB * 100).toFixed(1);
  return {resultedVotesA, resultedVotesB};
};
