import { Select } from 'antd';
import React from 'react';

const Index = () => {
  const [value, setValue] = React.useState([]);

  const handleChange = (value: number[]) => {
    setValue(value);
    chrome.storage.local.set({ drinkHours: value });
  };

  React.useEffect(() => {
    chrome.storage.local.get('drinkHours').then((result) => {
      const list: number[] = result['drinkHours'] ?? [];
      setValue(list);
    });
  }, []);

  return (
    <Select
      mode='tags'
      value={value}
      style={{ width: 300 }}
      onChange={handleChange}
      options={new Array(24).fill(undefined).map((_, index) => {
        return {
          label: `${index}:00`,
          value: index,
        };
      })}
    />
  );
};

export default Index;
