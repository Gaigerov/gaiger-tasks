const list = [
    {name: 'ivan', age: 1},
    {name: 'ivan', age: 2},
    {name: 'ivan', age: 3},
    {name: 'ivan', age: 4},
    {name: 'ivan', age: 5},
    {name: 'ivan', age: 6},
    {name: 'ivan', age: 7},
    {name: 'ivan', age: 8},
    {name: 'ivan', age: 9},
    {name: 'ivan', age: 10},
    {name: 'ivan', age: 11},
    {name: 'ivan', age: 12},
    {name: 'ivan', age: 13},
    {name: 'ivan', age: 14},
    {name: 'ivan', age: 15},
    {name: 'ivan', age: 16},
    {name: 'ivan', age: 17},
    {name: 'ivan', age: 18},
    {name: 'ivan', age: 19},
    {name: 'ivan', age: 20},
    {name: 'ivan', age: 21},
    {name: 'ivan', age: 22},
    {name: 'ivan', age: 23},
    {name: 'ivan', age: 24},
];
let page = 0;
const elementsOnPage = 5;
const pages = Math.floor(list.length / elementsOnPage);

const getIndexes = (page, elementsOnPage) => {
    const startIndex = page * elementsOnPage;
    const endIndex = startIndex + elementsOnPage;
    return [startIndex, endIndex];
};

const getPageElements = (elementList, pageNumber, elementsOnPage) => {
    const [start, end] = getIndexes(pageNumber - 1, elementsOnPage);
    return elementList.slice(start, end);
}

const handleLeftPage = () => {
    if (page > 0) {
        page -= 1;
    }
}

const handleRightPage = () => {
    if (page < pages) {
        page += 1;
    }
}

const handleChangePage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber <= pages) {
        page = pageNumber;
    }
}
