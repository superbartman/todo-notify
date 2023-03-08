const getDrinkHours = () => {
  return chrome.storage.local.get('drinkHours').then((result) => {
    const list: number[] = result['drinkHours'] ?? [];
    return list;
  });
};

export default getDrinkHours;
