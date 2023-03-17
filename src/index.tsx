import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import { Button, message, Tabs, TabsProps } from 'antd';
import { CoffeeOutlined, PushpinOutlined } from '@ant-design/icons';

import checkTask from './utils/check-task';

const NotiTable = lazy(() => import('./components/noti-table'));
const Drink = lazy(() => import('./components/drink'));

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const items: TabsProps['items'] = [
    {
      key: 'noti-table',
      label: (
        <span>
          <PushpinOutlined />
          Noti Task
        </span>
      ),
      children: <NotiTable />,
    },
    {
      key: 'drink',
      label: (
        <span>
          <CoffeeOutlined />
          Drink Task
        </span>
      ),
      children: <Drink />,
    },
  ];

  return (
    <div style={{ padding: '16px 32px' }}>
      <Suspense fallback={<div>Loading...</div>}>
        {contextHolder}
        <div>
          <Button
            type='primary'
            key='noti'
            style={{ marginRight: '16px' }}
            onClick={() => {
              // 通知开始定时任务，如果已经开启就不通知
              checkTask((result) => {
                if (!result) {
                  chrome.runtime.sendMessage({ message: 'start task' });
                  messageApi.open({
                    type: 'success',
                    content: 'success',
                  });
                  return;
                }
                messageApi.open({
                  type: 'info',
                  content: 'task is running',
                });
              });
            }}
          >
            Start Task
          </Button>
          <Button
            key='stop_drink'
            onClick={() => {
              chrome.runtime.sendMessage({ message: 'stop task' });
              messageApi.open({
                type: 'success',
                content: 'success',
              });
            }}
          >
            Stop Task
          </Button>
        </div>
        <Tabs defaultActiveKey='noti-table' items={items} />
      </Suspense>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
