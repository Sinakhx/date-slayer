/* eslint-disable @typescript-eslint/naming-convention */
import { zeroPad, enDateFormat, enToFaNumber, JalaliMonths, JalaliMonthsEn, WeekDaysFa } from './utils';

type TimeFormat = 'HH:mm' | 'HH:mm:ss' | 'hh:mm a' | 'hh:mm:ss a';

export const getJalali = (date: Date | number | string = new Date()) => {
    const d = new Date(date);
    const [weekdayFa, _d, t] = enDateFormat.format(d).split(' ');
    const tp = t.split(':').map(zeroPad);
    const time = tp.join(':');
    const _date = _d.slice(0, -2);
    const [yearEn, monthEn, dayEn] = _date.split('/');
    const [yearFa, monthFa, dayFa] = enToFaNumber(_date).split('/');
    const _dateFa = `${yearFa}/${monthFa}/${dayFa}`;
    const timeFa = enToFaNumber(time);
    const monthLongFa = JalaliMonths[+monthEn];
    const monthLongEn = JalaliMonthsEn[monthLongFa];
    const [hours, minutes, seconds] = tp;

    return {
        en: {
            date: _date, // '1401/02/01'
            year: yearEn, // '1401'
            month: monthEn, // '02'
            day: dayEn, // '01'
            weekday: WeekDaysFa[weekdayFa], // 'Panjshanbeh'
            monthLong: monthLongEn, // 'Ordibehesht'
            getTime: (format: TimeFormat = 'HH:mm') => {
                switch (format) {
                    case 'HH:mm:ss':
                        return time;
                    case 'HH:mm':
                        return `${hours}:${minutes}`;
                    case 'hh:mm a':
                        return `${+hours > 12 ? zeroPad(+hours - 12) : hours}:${minutes} ${+hours >= 12 ? 'PM' : 'AM'}`;
                    case 'hh:mm:ss a':
                        return `${+hours > 12 ? zeroPad(+hours - 12) : hours}:${minutes}:${seconds} ${
                            +hours >= 12 ? 'PM' : 'AM'
                        }`;
                    default:
                        throw new TypeError('Bad Format');
                }
            },
            getDescriptiveDate: ({ delimiter = ' ', weekday = true, day = true, month = true, year = false } = {}) => {
                const del = day || month || year ? delimiter : '';
                const weekVal = weekday ? WeekDaysFa[weekdayFa] + del : '';
                const dayVal = day ? +day : '';
                const mothVal = month ? monthLongEn : '';
                const yearVal = year ? yearEn : '';
                return weekVal + [dayVal, mothVal, yearVal].join(' ').trim();
            },
        },
        fa: {
            date: _dateFa, // '۱۴۰۱/۰۲/۰۱'
            year: yearFa, // '۱۴۰۱'
            month: monthFa, // '۰۲'
            day: dayFa, // '۰۱'
            weekday: weekdayFa, // 'پنجشنبه'
            monthLong: monthLongFa, // 'اردیبهشت'
            getTime: (format: TimeFormat = 'HH:mm') => {
                const [hoursFa, minutesFa, secondsFa] = tp.map(enToFaNumber);
                switch (format) {
                    case 'HH:mm:ss':
                        return timeFa;
                    case 'HH:mm':
                        return `${hoursFa}:${minutesFa}`;
                    case 'hh:mm a':
                        return `${+hours > 12 ? enToFaNumber(zeroPad(+hours - 12)) : hoursFa}:${minutesFa} ${
                            +hours >= 12 ? 'ب.ظ' : 'ق.ظ'
                        }`;
                    case 'hh:mm:ss a':
                        return `${+hours > 12 ? enToFaNumber(zeroPad(+hours - 12)) : hoursFa}:${minutesFa}:${secondsFa} ${
                            +hours >= 12 ? 'ب.ظ' : 'ق.ظ'
                        }`;
                    default:
                        throw new TypeError('Bad Format');
                }
            },
            getDescriptiveDate: ({ delimiter = ' ', weekday = true, day = true, month = true, year = false } = {}) => {
                const del = day || month || year ? delimiter : '';
                const weekVal = weekday ? weekdayFa + del : '';
                const dayVal = day ? enToFaNumber(+day) : '';
                const mothVal = month ? monthLongFa : '';
                const yearVal = year ? yearFa : '';
                return weekVal + [dayVal, mothVal, yearVal].join(' ').trim();
            },
        },
    };
};
