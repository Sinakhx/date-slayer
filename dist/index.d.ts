declare type TimeFormat = 'HH:mm' | 'HH:mm:ss' | 'hh:mm a' | 'hh:mm:ss a';
declare const getJalali: (date?: Date | number | string) => {
    en: {
        date: string;
        year: string;
        month: string;
        day: string;
        weekday: string;
        monthLong: string;
        getTime: (format?: TimeFormat) => string;
        getDescriptiveDate: ({ delimiter, weekday, day, month, year }?: {
            delimiter?: string | undefined;
            weekday?: boolean | undefined;
            day?: boolean | undefined;
            month?: boolean | undefined;
            year?: boolean | undefined;
        }) => string;
    };
    fa: {
        date: string;
        year: string;
        month: string;
        day: string;
        weekday: string;
        monthLong: string;
        getTime: (format?: TimeFormat) => string;
        getDescriptiveDate: ({ delimiter, weekday, day, month, year }?: {
            delimiter?: string | undefined;
            weekday?: boolean | undefined;
            day?: boolean | undefined;
            month?: boolean | undefined;
            year?: boolean | undefined;
        }) => string;
    };
};

export { getJalali };
