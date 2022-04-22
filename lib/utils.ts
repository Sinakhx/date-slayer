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

// // 'چهارشنبه ۳۱ فروردین'
// new Date().toLocaleDateString('fa-IR', { day: 'numeric', weekday: 'long', month: 'long' });

// // '۱۴۰۱ فروردین ۳۱, چهارشنبه'
// new Date().toLocaleDateString('fa-IR', { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' });

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

export const WeekDays: Record<string, string> = {
    Saturday: 'شنبه',
    Sunday: 'یکشنبه',
    Monday: 'دوشنبه',
    Tuesday: 'سه شنبه',
    Wednesday: 'چهارشنبه',
    Thursday: 'پنجشنبه',
    Friday: 'جمعه',
    شنبه: 'Saturday',
    یکشنبه: 'Sunday',
    دوشنبه: 'Monday',
    'سه شنبه': 'Tuesday',
    چهارشنبه: 'Wednesday',
    پنجشنبه: 'Thursday',
    جمعه: 'Friday',
};

export const WeekDaysFa: Record<string, string> = {
    شنبه: 'Shanbeh',
    یکشنبه: 'Yekshanbeh',
    دوشنبه: 'Doshanbeh',
    'سه شنبه': 'Seshanbeh',
    چهارشنبه: 'Chaharshanbeh',
    پنجشنبه: 'Panjshanbeh',
    جمعه: 'Jomeh',
    Shanbeh: 'شنبه',
    Yekshanbeh: 'یکشنبه',
    Doshanbeh: 'دوشنبه',
    Seshanbeh: 'سه شنبه',
    Chaharshanbeh: 'چهارشنبه',
    Panjshanbeh: 'پنجشنبه',
    Jomeh: 'جمعه',
};
