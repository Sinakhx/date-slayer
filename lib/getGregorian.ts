import { getJalali } from './getJalali';
import { zeroPad } from './utils';

type DateObject = Readonly<{
    year: number;
    month: number;
    day: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}>;

// '1401-02-03' <-> '2022-04-23'
// '1400-12-09' <-> '2022-02-28'
// '1400-12-10' <-> '2022-03-01'
// '1400-12-29' <-> '2022-03-20'
// '1401-01-01' <-> '2022-03-21'
// '1398-12-10' <-> '2020-02-29'
// '1399-01-01' <-> '2020-03-20'
// '1395-12-30' <-> '2017-03-20'
// '1396-01-01' <-> '2017-03-21'
// '1394-12-10' <-> '2016-02-29'

const tenHours = 10 * 60 * 60 * 1000; // offset to get rid of midnight seperation. TODO: handle this with date.setHours instead & rollback on final result (to handle time as well)

const getJalaliApprox = (gYear: number, gMonth: number, gDay: number) => getJalali(`${gYear}-${gMonth}-${gDay}`).en;

export const convertJalaliToGregorian = (jYear: number = 1401, jMonth: number = 2, jDay: number = 3) => {
    // '1394-12-10' -> '2016-02-29'
    // const limit = 7000;
    let gYear = jYear + 621; // 2015
    const gMonth = ((jMonth + 14) % 12) + 1; // 02
    const gDay = (jDay + 21) % 27; // 03

    const jApprox = getJalaliApprox(gYear, gMonth, gDay);

    let apxJYear = +jApprox.year;
    const apxJMonth = +jApprox.month;
    const apxJDay = +jApprox.day;

    if (apxJYear > jYear) {
        apxJYear -= 1;
        gYear -= 1;
    }
    if (apxJYear < jYear) {
        apxJYear += 1;
        gYear += 1;
    }
    // year is synced

    const jDateString = `${jYear}/${zeroPad(jMonth)}/${zeroPad(jDay)}`;
    const apxDateString = `${apxJYear}/${apxJMonth}/${apxJDay}`;
    const gregDateString = `${gYear}/${gMonth}/${gDay}`;
    const jDate = new Date(jDateString).getTime(); // TODO: refactor getTime to a reusable function
    let apxDate = new Date(apxDateString).getTime();
    let gregDate = new Date(gregDateString).getTime();
    let diff = jDate - apxDate + tenHours;
    // const test = new Date(apxDate + diff);
    // const testResult = `${test.getFullYear()}/${test.getMonth() + 1}/${test.getDate()}`;
    let result = new Date(gregDate + diff);
    let resultString = `${result.getFullYear()}/${result.getMonth() + 1}/${result.getDate()}`;
    let confirmJalali = getJalali(resultString).en.date; // TODO: replace getJalai with getJalaliLight

    if (jDateString !== confirmJalali) {
        // TODO: refactor if condition & above logic to a reusable function
        apxDate = new Date(confirmJalali).getTime();
        gregDate = new Date(resultString).getTime();
        diff = jDate - apxDate + tenHours;
        result = new Date(gregDate + diff);
        resultString = `${result.getFullYear()}/${result.getMonth() + 1}/${result.getDate()}`;
        confirmJalali = getJalali(resultString).en.date;
    }

    // day is not yet well synced
    // const newJalali = getJalali(gregDate).en.date;
    // const isEqual = new Date(newJalali).getTime() === jDate;
    // console.log('isEqual is:', isEqual);
    // console.log({
    //     newJalali,
    //     isEqual,
    //     gregDateString,
    //     jDateString,
    // });

    // console.log({
    //     origin: jDateString,
    //     // testResult,
    //     resultString,
    //     confirmJalali,
    // });

    return {
        year: result.getFullYear(),
        month: result.getMonth() + 1,
        day: result.getDate(),
    };
};

export const getGregorian = (jdate: Date | number | string | DateObject) => {
    // const jalObj = { year: 1397, month: 4, day: 1 };
    // const gregObj = { year: 2018, month: 6, day: 22 };
    // just DateObject for now
    const {
        year: jYear,
        month: jMonth,
        day: jDay,
        // hours = 0,
        // minutes = 0,
        // seconds = 0,
        // milliseconds = 0,
    } = (jdate || {}) as DateObject;
    // const dateStr = `${year}-${zeroPad(month)}-${zeroPad(day)} ${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(
    //     seconds,
    // )}:${zeroPad(milliseconds)}`;
    // const dateObj = new Date(dateStr);

    return convertJalaliToGregorian(jYear, jMonth, jDay);
};
