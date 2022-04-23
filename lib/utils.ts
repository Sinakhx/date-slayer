const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const faToEnDict = new Map();
const enToFaDict = new Map();

faDigits.forEach((digit, idx) => {
    faToEnDict.set(digit, enDigits[idx]);
});
enDigits.forEach((digit, idx) => {
    enToFaDict.set(digit, faDigits[idx]);
});

export const enToFaNumber = (num: number | string) =>
    `${num}`
        .split('')
        .map((n) => enToFaDict.get(n) || n)
        .join('');
export const faToEnNumber = (num: number | string) =>
    `${num}`
        .split('')
        .map((n) => faToEnDict.get(n) || n)
        .join('');

export const zeroPad = (n: number | string) => (+n >= 10 ? `${n}` : `0${n}`);

/**
 * creates a bilingual dictionary form an object or json
 * @param object as source
 * @returns an object with same key-value pairs & value-key pairs as well
 */
export const objectMirror = (object: Record<string, any>): Record<string, string> => {
    const result = {} as Record<string, any>;
    // eslint-disable-next-line guard-for-in
    for (const key in object) {
        result[key] = object[key];
        result[object[key]] = key;
    }
    return result;
};

export type DateTimeObj = Record<string, 'numeric' | '2-digit' | undefined>;

// common numberingSystems: 'latn' | 'arab' | 'arabext'
export const dateOptions = {
    // example output: '1400/09/10،18:05 '
    enDate: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        numberingSystem: 'latn',
        weekday: 'long',
    } as unknown as DateTimeObj,
    // example output: '۱۴۰۰ آذر ۱۰, چهارشنبه'
    faLong: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    } as unknown as DateTimeObj,
};

export const enDateFormat = new Intl.DateTimeFormat('fa-ir', dateOptions.enDate);
export const faLongFormat = new Intl.DateTimeFormat('fa-ir', dateOptions.faLong);

export const GregorianMonths: Array<string> = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const JalaliMonths: Array<string> = [
    '',
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
];

export const JalaliMonthsEn: Record<string, string> = {
    فروردین: 'Farvardin',
    اردیبهشت: 'Ordibehesht',
    خرداد: 'Khordad',
    تیر: 'Tir',
    مرداد: 'Mordad',
    شهریور: 'Shahrivar',
    مهر: 'Mehr',
    آبان: 'Aban',
    آذر: 'Azar',
    دی: 'Dey',
    بهمن: 'Bahman',
    اسفند: 'Esfand',
};

export const WeekDays: Record<string, string> = objectMirror({
    Saturday: 'شنبه',
    Sunday: 'یکشنبه',
    Monday: 'دوشنبه',
    Tuesday: 'سه شنبه',
    Wednesday: 'چهارشنبه',
    Thursday: 'پنجشنبه',
    Friday: 'جمعه',
});

export const WeekDaysFa: Record<string, string> = objectMirror({
    شنبه: 'Shanbeh',
    یکشنبه: 'Yekshanbeh',
    دوشنبه: 'Doshanbeh',
    'سه شنبه': 'Seshanbeh',
    چهارشنبه: 'Chaharshanbeh',
    پنجشنبه: 'Panjshanbeh',
    جمعه: 'Jomeh',
});

// sample dates for testing purposes only
export const sampleDates: Record<string, string> = {
    '1401-02-03': '2022-04-23',
    '1400-12-09': '2022-02-28',
    '1400-12-10': '2022-03-01',
    '1400-12-29': '2022-03-20',
    '1401-01-01': '2022-03-21',
    '1398-12-10': '2020-02-29',
    '1399-01-01': '2020-03-20',
    '1395-12-30': '2017-03-20',
    '1396-01-01': '2017-03-21',
    '1394-12-10': '2016-02-29',
};
