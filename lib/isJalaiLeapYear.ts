// based on گاهشماری حسابی رایانه‌ای
// https://fa.wikipedia.org/wiki/%DA%AF%D8%A7%D9%87%E2%80%8C%D8%B4%D9%85%D8%A7%D8%B1%DB%8C_%D9%87%D8%AC%D8%B1%DB%8C_%D8%AE%D9%88%D8%B1%D8%B4%DB%8C%D8%AF%DB%8C_%D8%AD%D8%B3%D8%A7%D8%A8%DB%8C
export const isJalaiLeapYear = (year: number) => {
    const cte = 683 / 2820;
    const b = (year + 2346) * cte;
    const dec = b - Math.floor(b);
    return dec < cte;
};

// example: isJalaiLeapYear(1634) -> false
// example: isJalaiLeapYear(1391) -> true
