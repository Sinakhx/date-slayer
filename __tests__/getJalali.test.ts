import { getJalali } from '../lib';

describe('getJalali', () => {
    const date_2022_04_21 = new Date(1650534589167); // Thu Apr 21 2022 14:19:49 GMT+0430 (Iran Daylight Time)
    describe('English format', () => {
        const date = getJalali(date_2022_04_21);
        it('should return static properties correctly', () => {
            expect(date.en.date).toBe('1401/02/01');
            expect(date.en.year).toBe('1401');
            expect(date.en.month).toBe('02');
            expect(date.en.day).toBe('01');
            expect(date.en.weekday).toBe('Panjshanbeh');
            expect(date.en.monthLong).toBe('Ordibehesht');
        });

        it('should get time with different formats', () => {
            expect(date.en.getTime()).toBe('14:19');
            expect(date.en.getTime('HH:mm')).toBe('14:19');
            expect(date.en.getTime('HH:mm:ss')).toBe('14:19:49');
            expect(date.en.getTime('hh:mm a')).toBe('02:19 PM');
            expect(date.en.getTime('hh:mm:ss a')).toBe('02:19:49 PM');
            const date2 = new Date(date_2022_04_21);
            date2.setHours(3);
            const newDate = getJalali(date2);
            expect(newDate.en.getTime()).toBe('03:19');
            expect(newDate.en.getTime('HH:mm')).toBe('03:19');
            expect(newDate.en.getTime('HH:mm:ss')).toBe('03:19:49');
            expect(newDate.en.getTime('hh:mm a')).toBe('03:19 AM');
            expect(newDate.en.getTime('hh:mm:ss a')).toBe('03:19:49 AM');
        });

        it('should throw error when bad format is given', () => {
            expect(() => date.en.getTime('some bad format' as any)).toThrowError('Bad Format');
        });

        it('should get descriptive date with different formats', () => {
            expect(date.en.getDescriptiveDate()).toBe('Panjshanbeh 1 Ordibehesht');
            expect(date.en.getDescriptiveDate({ weekday: false, day: false, month: false, year: true })).toBe('1401');
            expect(
                date.en.getDescriptiveDate({ delimiter: ' ', weekday: false, day: false, month: false, year: true }),
            ).toBe('1401');
            expect(
                date.en.getDescriptiveDate({ delimiter: ' ', weekday: false, day: false, month: true, year: true }),
            ).toBe('Ordibehesht 1401');
            expect(date.en.getDescriptiveDate({ weekday: false, day: true, month: true, year: true })).toBe(
                '1 Ordibehesht 1401',
            );
            expect(date.en.getDescriptiveDate({ year: true })).toBe('Panjshanbeh 1 Ordibehesht 1401');
            expect(
                date.en.getDescriptiveDate({ delimiter: ' ', weekday: true, day: true, month: true, year: true }),
            ).toBe('Panjshanbeh 1 Ordibehesht 1401');
            expect(date.en.getDescriptiveDate({ year: true, delimiter: ', ' })).toBe('Panjshanbeh, 1 Ordibehesht 1401');
            expect(date.en.getDescriptiveDate({ year: true, delimiter: ' -- ' })).toBe(
                'Panjshanbeh -- 1 Ordibehesht 1401',
            );
            expect(date.en.getDescriptiveDate({ weekday: false, day: false, month: true })).toBe('Ordibehesht');
            expect(date.en.getDescriptiveDate({ weekday: false, day: true, month: true })).toBe('1 Ordibehesht');
            expect(date.en.getDescriptiveDate({ weekday: true, day: false, month: true })).toBe(
                'Panjshanbeh Ordibehesht',
            );
            expect(date.en.getDescriptiveDate({ weekday: true, day: false, month: false })).toBe('Panjshanbeh');
            expect(date.en.getDescriptiveDate({ weekday: false, day: true, month: false })).toBe('1');
        });
    });

    describe('Persian format', () => {
        const date = getJalali(1650534589167);
        it('should return static properties correctly', () => {
            expect(date.fa.date).toBe('????????/????/????');
            expect(date.fa.year).toBe('????????');
            expect(date.fa.month).toBe('????');
            expect(date.fa.day).toBe('????');
            expect(date.fa.weekday).toBe('??????????????');
            expect(date.fa.monthLong).toBe('????????????????');
        });

        it('should get time with different formats', () => {
            expect(date.fa.getTime()).toBe('????:????');
            expect(date.fa.getTime('HH:mm')).toBe('????:????');
            expect(date.fa.getTime('HH:mm:ss')).toBe('????:????:????');
            expect(date.fa.getTime('hh:mm a')).toBe('????:???? ??.??');
            expect(date.fa.getTime('hh:mm:ss a')).toBe('????:????:???? ??.??');
            const date2 = new Date(date_2022_04_21);
            date2.setHours(3);
            const newDate = getJalali(date2);
            expect(newDate.fa.getTime()).toBe('????:????');
            expect(newDate.fa.getTime('HH:mm')).toBe('????:????');
            expect(newDate.fa.getTime('HH:mm:ss')).toBe('????:????:????');
            expect(newDate.fa.getTime('hh:mm a')).toBe('????:???? ??.??');
            expect(newDate.fa.getTime('hh:mm:ss a')).toBe('????:????:???? ??.??');
        });

        it('should throw error when bad format is given', () => {
            expect(() => date.fa.getTime('some wrong format' as any)).toThrowError('Bad Format');
        });

        it('should get descriptive date with different formats', () => {
            expect(date.fa.getDescriptiveDate()).toBe('?????????????? ?? ????????????????');
            expect(date.fa.getDescriptiveDate({ weekday: false, day: false, month: false, year: true })).toBe('????????');
            expect(
                date.fa.getDescriptiveDate({ delimiter: ' ', weekday: false, day: false, month: false, year: true }),
            ).toBe('????????');
            expect(
                date.fa.getDescriptiveDate({ delimiter: ' ', weekday: false, day: false, month: true, year: true }),
            ).toBe('???????????????? ????????');
            expect(date.fa.getDescriptiveDate({ weekday: false, day: true, month: true, year: true })).toBe(
                '?? ???????????????? ????????',
            );
            expect(date.fa.getDescriptiveDate({ year: true })).toBe('?????????????? ?? ???????????????? ????????');
            expect(
                date.fa.getDescriptiveDate({ delimiter: ' ', weekday: true, day: true, month: true, year: true }),
            ).toBe('?????????????? ?? ???????????????? ????????');
            expect(date.fa.getDescriptiveDate({ year: true, delimiter: '?? ' })).toBe('???????????????? ?? ???????????????? ????????');
            expect(date.fa.getDescriptiveDate({ year: true, delimiter: ' -- ' })).toBe('?????????????? -- ?? ???????????????? ????????');
            expect(date.fa.getDescriptiveDate({ weekday: false, day: false, month: true })).toBe('????????????????');
            expect(date.fa.getDescriptiveDate({ weekday: false, day: true, month: true })).toBe('?? ????????????????');
            expect(date.fa.getDescriptiveDate({ weekday: true, day: false, month: true })).toBe('?????????????? ????????????????');
            expect(date.fa.getDescriptiveDate({ weekday: true, day: false, month: false })).toBe('??????????????');
            expect(date.fa.getDescriptiveDate({ weekday: false, day: true, month: false })).toBe('??');
        });
    });
});
