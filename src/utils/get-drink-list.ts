import getDateKey from './get-date-key';

const getDrinkList = () => {
  return chrome.storage.local.get('drinkList').then((result) => {
    const list = result['drinkList'] ?? {};
    const key = getDateKey();
    return {
      list,
      item: list[key] ?? [],
      key: key,
    };
  });
};

export default getDrinkList;
