import {
  startOfMonth,
  formatISO,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  parseISO,
  format,
  differenceInYears,
  differenceInDays,
  isSameDay,
  formatDistance,
  isValid,
  parse,
  isBefore,
  addMonths,
  addYears,
  differenceInSeconds,
} from 'date-fns';

export const getISOFormatedDate = dateObj => formatISO(new Date(dateObj));
export const getCurrentISOFormatedDate = () => formatISO(new Date());
export const getFormatedDate = (dateObj, dateFormat) =>
  format(new Date(dateObj), dateFormat);

export const getStartOfMonth = dateObj => startOfMonth(dateObj);

export const getEndOfMonth = dateObj => endOfMonth(dateObj);

export const getStartOfWeek = dateObj => startOfWeek(dateObj);

export const getEndOfWeek = dateObj => endOfWeek(dateObj);

export const getISODateParsed = dateObj => parseISO(dateObj);

export const getDateTimeFormat = dateObj =>
  getFormatedDate(dateObj, 'MMMM d, yyyy K:m a'); // July 11, 2022 7:15 PM

export const getDateFormat = date => getFormatedDate(new Date(date), 'PP'); // Jul 11, 2022

export const getDiffFromCurrentYear = date =>
  differenceInYears(new Date(), new Date(date));

export const getDurationDistance = date =>
  formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });

export const getRemainingDays = date =>
  differenceInDays(new Date(date), new Date());

export const getDiffBetweenDays = (date1, date2) =>
  differenceInDays(new Date(date1), new Date(date2));

export const getDiffBetweenSeconds = (date1, date2) =>
  differenceInSeconds(new Date(date1), new Date(date2));

export const isSameDate = (date1, date2) =>
  isSameDay(new Date(date1), new Date(date2));

export const isSameDateAsCurrentDate = date =>
  isSameDay(new Date(date), new Date());

export const getCurrentYear = () => new Date().getFullYear();

export const getYearMonthAndDay = date => {
  const dateObj = date ? new Date(date) : new Date();
  return {
    date: dateObj.getDate(),
    month: dateObj.getMonth() + 1,
    year: dateObj.getFullYear(),
  };
};

export const isValidDate = date => isValid(new Date(date));

export const getSecondDiffFromCurrentDate = date =>
  differenceInSeconds(new Date(date), new Date());

export const getParseDate = (date, parseFormat = 'dd/MM/yyyy') =>
  parse(date, parseFormat, new Date());

export const isBeforeDate = (date1, date2) =>
  isBefore(new Date(date1), new Date(date2));

export const addYearsToDate = years => new Date().getFullYear() + years;
export const subYearsToDate = years => new Date().getFullYear() - years;
export const addYearsToCurrentDateAndGetISODate = years =>
  getISOFormatedDate(addYears(new Date(), years));
export const addMonthsToCurrentDateAndGetISODate = month =>
  getISOFormatedDate(addMonths(new Date(), month));
export const getMonthsList = () => [
  {value: 1, label: 'January'},
  {value: 2, label: 'February'},
  {value: 3, label: 'March'},
  {value: 4, label: 'April'},
  {value: 5, label: 'May'},
  {value: 6, label: 'June'},
  {value: 7, label: 'July'},
  {value: 8, label: 'August'},
  {value: 9, label: 'September'},
  {value: 10, label: 'October'},
  {value: 11, label: 'November'},
  {value: 12, label: 'December'},
];

export const getTime = () => getFormatedDate(new Date(), 'yyyy-MM-dd');

export const getWeekDayMonthDay = date =>
  getFormatedDate(isValidDate(date) ? date : new Date(), 'EEEE, MMMM eo'); // "Monday, November 9th"

export const getPerciseDayDiff = ({date1, date2 = new Date()}) => {
  const diff = getDiffBetweenDays(date1, date2);
  return Math.ceil(diff);
};
export const timeHelper = {};
export const getCurrentISOStringDate = () => new Date().toISOString();

export const getTimeDurationFromCreation = (date, translations = {}) => {
  const dateObj = new Date(date);
  const currentTime = new Date().getTime();
  const timeDiff = Math.trunc((currentTime - dateObj.getTime()) / 1000);
  return getDurationPerSlabs(timeDiff, 1, '', translations);
};

export const getDurationPerSlabs = (
  seconds,
  maxSlabCount = 7,
  joiner = ' ',
  translations = {},
) => {
  const duration = [];
  let remainder = Math.abs(seconds);
  if (remainder >= 365 * 24 * 3600) {
    const val =
      Math.trunc(remainder / (365 * 24 * 3600)) +
      (translations?.['years'] || 'y');
    remainder = remainder % (365 * 24 * 3600);
    if (duration.length < maxSlabCount) duration.push(val);
  }
  if (remainder >= 30 * 24 * 3600) {
    const val =
      Math.trunc(remainder / (30 * 24 * 3600)) +
      (translations?.['months'] || 'm');
    remainder = remainder % (30 * 24 * 3600);
    if (duration.length < maxSlabCount) duration.push(val);
  }
  if (remainder >= 7 * 24 * 3600) {
    const val =
      Math.trunc(remainder / (7 * 24 * 3600)) +
      (translations?.['weeks'] || 'w');
    remainder = remainder % (7 * 24 * 3600);
    if (duration.length < maxSlabCount) duration.push(val);
  }
  if (remainder >= 24 * 3600) {
    const val =
      Math.trunc(remainder / (24 * 3600)) + (translations?.['days'] || 'd');
    remainder = remainder % (24 * 3600);
    if (duration.length < maxSlabCount) duration.push(val);
  }
  if (remainder >= 3600) {
    const val = Math.trunc(remainder / 3600) + (translations?.['hours'] || 'h');
    remainder = remainder % 3600;
    if (duration.length < maxSlabCount) duration.push(val);
  }
  if (remainder >= 60) {
    const val = Math.trunc(remainder / 60) + (translations?.['min'] || 'm');
    remainder = remainder % 60;
    if (duration.length < maxSlabCount) duration.push(val);
  }

  const val = remainder + (translations?.['seconds'] || 's');
  if (duration.length < maxSlabCount) duration.push(val);
  return duration.join(joiner);
};
