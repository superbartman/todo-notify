const checkTask = (cb: (result: Boolean) => void) => {
  chrome.storage.local.get('task').then((result) => {
    const task = result['task'];
    cb(Boolean(task));
  });
};

export default checkTask;
