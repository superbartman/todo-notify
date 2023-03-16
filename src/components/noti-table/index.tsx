import React from 'react';

import { EditableProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';

export type DataSourceType = {
  id: React.Key;
  title: string;
  desc: string;
  noti_time: number;
  status?: boolean;
};

const Index = () => {
  const [editableKeys, setEditableRowKeys] = React.useState<React.Key[]>([]);
  const [dataSource, setDataSource] = React.useState<DataSourceType[]>([]);

  React.useEffect(() => {
    chrome.storage.local.get('notiList').then((result) => {
      const list = result['notiList'] ?? [];
      setDataSource(list);
    });
    chrome.runtime.onMessage.addListener((message: any) => {
      if (message.message === 'update noti task' && message.list) {
        setDataSource(message.list);
      }
    });
  }, []);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      title: 'Desc',
      dataIndex: 'desc',
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'switch',
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      title: 'Noti Time',
      dataIndex: 'noti_time',
      valueType: 'dateTime',
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      title: 'Action',
      valueType: 'option',
      render: (_, record, __, action) => [
        <a
          key='editable'
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <a
          key='delete'
          onClick={() => {
            const data = dataSource.filter((item) => item.id !== record.id);
            chrome.storage.local.set({ notiList: data }).then(() => {
              setDataSource(data);
              // 如果删除完毕，通知停止定时任务
              !data.length &&
                chrome.runtime.sendMessage({ message: 'stop noti task' });
            });
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey='id'
        columns={columns}
        value={dataSource}
        onChange={(data: DataSourceType[]) => {
          chrome.storage.local.set({ notiList: data }).then(() => {
            setDataSource(data);
          });
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          saveText: 'Save',
          deleteText: 'Delete',
          cancelText: 'Cancel',
          onSave: () => {
            return new Promise((resolve) => {
              resolve(true);
            });
          },
          onChange: setEditableRowKeys,
        }}
        recordCreatorProps={{
          record: () => ({
            id: new Date().getTime(),
            title: '',
            desc: '',
            status: true,
            noti_time: new Date().getTime(),
          }),
        }}
      />
    </>
  );
};

export default Index;
