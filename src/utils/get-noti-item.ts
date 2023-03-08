import { DataSourceType } from '../components/noti-table';

const getNotiItem = () => {
  return chrome.storage.local.get('notiList').then((result) => {
    const list: DataSourceType[] = result['notiList'] ?? [];
    return {
      notiItem:
        list.find(
          (item) =>
            new Date(item.noti_time).getTime() < new Date().getTime() &&
            item.status,
        ) ?? ({} as DataSourceType),
      list,
    };
  });
};

export default getNotiItem;
