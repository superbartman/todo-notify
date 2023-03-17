const selfSetInterval = (cb: Function, timeout: number, taskType?: string) => {
  let timer: number = null;
  const interval = () => {
    timer = setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('interval', taskType);
      const result = cb(timer);
      if (result && result.then) {
        result.then((canContinue: boolean) => {
          if (canContinue) {
            interval();
          } else {
            clearTimeout(timer);
          }
        });
        return;
      }
      if (result) {
        interval();
        return;
      }
      clearTimeout(timer);
    }, timeout);
  };
  interval();
};

export default selfSetInterval;
