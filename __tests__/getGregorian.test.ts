import { getGregorian } from '../lib';

describe('getGregorian', () => {
    it('should correctly convert jalali date to gregorian date for sample dates', () => {
        expect(getGregorian({ year: 1401, month: 2, day: 3 })).toEqual({ year: 2022, month: 4, day: 23 });
        expect(getGregorian({ year: 1400, month: 12, day: 9 })).toEqual({ year: 2022, month: 2, day: 28 });
        expect(getGregorian({ year: 1400, month: 12, day: 10 })).toEqual({ year: 2022, month: 3, day: 1 });
        expect(getGregorian({ year: 1400, month: 12, day: 29 })).toEqual({ year: 2022, month: 3, day: 20 });
        expect(getGregorian({ year: 1401, month: 1, day: 1 })).toEqual({ year: 2022, month: 3, day: 21 });
        expect(getGregorian({ year: 1398, month: 12, day: 10 })).toEqual({ year: 2020, month: 2, day: 29 });
        expect(getGregorian({ year: 1399, month: 1, day: 1 })).toEqual({ year: 2020, month: 3, day: 20 });
        expect(getGregorian({ year: 1395, month: 12, day: 30 })).toEqual({ year: 2017, month: 3, day: 20 });
        expect(getGregorian({ year: 1396, month: 1, day: 1 })).toEqual({ year: 2017, month: 3, day: 21 });
        expect(getGregorian({ year: 1394, month: 12, day: 10 })).toEqual({ year: 2016, month: 2, day: 29 });
    });
});
