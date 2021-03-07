const storage = window.localStorage;

// summary list
const SUMMARY = "_summary";
const getSummaryList = (storeName) => JSON.parse(storage.getItem(storeName + SUMMARY));
const updateSummaryList = (storeName, idList) => storage.setItem(storeName + SUMMARY, JSON.stringify(idList));

// items
const DATA = "_date_";
const getData = (storeName, id) => JSON.parse(storage.getItem(storeName + DATA + id))
const setData = (storeName, id, data) => storage.setItem(storeName + DATA + id, JSON.stringify(data));
const removeData = (storeName, id) => storage.removeItem(storeName + DATA + id);

// id iterator
const ITERATOR = "_iter";
const getNewId = (storeName) => {
    const lastId = parseInt(storage.getItem(storeName + ITERATOR));
    let newId;
    if (!lastId) {
        newId = 1;
    } else {
        newId = lastId + 1;
    }
    storage.setItem(storeName + ITERATOR, newId);
    return newId;
};


const save = function(storeName, data, dataName) {
    const id = saveToSummaryListAndGetId(storeName, dataName);
    setData(storeName, id, data);
}

const saveToSummaryListAndGetId = function(storeName, dataName) {
    window.console.log("saveToSummaryListAndGetId");
    let summaryList = getSummaryList(storeName);
    window.console.log(summaryList);
    if (summaryList == null) {
        summaryList = {};
    }
    if (Object.keys(summaryList).includes(dataName)) {
        return summaryList[dataName];
    } else {
        const id = getNewId();
        summaryList[dataName] = id;
        window.console.log(summaryList);
        updateSummaryList(storeName, summaryList);
        return id;
    }
}

const load = function(storeName, dataName) {
    const summaryList = getSummaryList(storeName);
    const dataId = summaryList[dataName];
    return getData(storeName, dataId);
}

const remove = function(storeName, dataName) {
    let summaryList = getSummaryList(storeName);
    const dataId = summaryList[dataName];
    delete summaryList[dataName];
    updateSummaryList(storeName, summaryList);

    removeData(dataId);
}

const list = function(storeName) {
    const summaryList = getSummaryList(storeName);
    if (summaryList) {
        return Object.keys(summaryList);
    } else {
        return [];
    }
}

export default {
    save,
    load,
    remove,
    list
}