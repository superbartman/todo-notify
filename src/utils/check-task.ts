interface Props {
  cb: (value: Boolean) => void;
}
const checkTask = (props: Props) => {
  chrome.storage.local.get('task').then((result) => {
    const task = result['task'];
    props.cb?.(Boolean(task));
  });
};

export default checkTask;
