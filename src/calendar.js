const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const getDaysOnMonth = (month, year) => {
    return 32 - new Date(year, month, 32).getDate();
};

// Возвращает день недели 0-6, где 0 - вск
const getStartWeekday = (month, year) => {
    return new Date(year, month, 0).getDay();
};

const getMonthPage = (month, year) => {
    const calendar = [];
    const startWeekDay = getStartWeekday(month, year);
    const daysOnMonth = getDaysOnMonth(month, year);
    let counter = 0;
    for (let row = 0; row < 6; row += 1) {
        calendar.push([]);
        for (let col = 0; col < 7; col += 1) {
            const day = (counter || col >= startWeekDay) && counter < daysOnMonth ? ++counter : '';
            calendar[row].push(day);
        }
    }
    return calendar;
};

console.log(getMonthPage(9, 2020))