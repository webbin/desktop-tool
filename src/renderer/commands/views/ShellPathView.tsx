import { useState, useEffect } from 'react';
import { FolderOutlined } from '@ant-design/icons';
// import classnames from 'classnames';

import styles from './ShellPathView.scss';

const KEY = 'Shell-Path';

const DefaultPath = 'C:\\Program Files\\Git\\bin\\bash.exe';

export default function ShellPathView() {
  const [shellPath, setShellPath] = useState(DefaultPath);

  const loadShellPath = () => {
    const str = window.localStorage.getItem(KEY);
    if (str) {
      setShellPath(str);
      window.electron.ipcRenderer.setShellPath(str);
    }
  };

  const onChoosePath = () => {
    window.electron.ipcRenderer
      .showChooseShellPath()
      .then((result) => {
        console.log('choose shell path: ', result);
        if (result) {
          setShellPath(result);
          window.localStorage.setItem(KEY, result);
          window.electron.ipcRenderer.setShellPath(result);
        }
      })
      .catch((err) => {
        console.log('choose shell path error : ', err);
      });
  };

  useEffect(() => {
    loadShellPath();
    return () => {
      // second
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span>当前SHELL路径：</span>
        <span className={styles.shell_span}>{shellPath}</span>
        <button
          className={styles.shell_folder_button}
          type="button"
          onClick={onChoosePath}
        >
          <FolderOutlined />
        </button>
      </div>
    </div>
  );
}
