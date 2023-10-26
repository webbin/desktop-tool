import { useState, useEffect } from 'react';
import { Button } from 'antd';
import classnames from 'classnames';

import styles from './ShellPathView.scss';

const KEY = 'Shell-Path';

const DefaultPath = 'C:\\Program Files\\Git\\bin\\bash.exe';

export default function ShellPathView() {
  const [inEditing, setInEditing] = useState(false);

  const [shellPath, setShellPath] = useState(DefaultPath);

  const saveShellPath = () => {
    setInEditing(false);
    window.localStorage.setItem(KEY, shellPath);
    window.electron.ipcRenderer.setShellPath(shellPath);
  };

  const loadShellPath = () => {
    const str = window.localStorage.getItem(KEY);
    if (str) {
      setShellPath(str);
      window.electron.ipcRenderer.setShellPath(str);
    }
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
        {inEditing ? (
          <input
            className={classnames(styles.shell, styles.input)}
            onChange={(event) => {
              setShellPath(event.target.value);
            }}
            value={shellPath}
          />
        ) : (
          <div className={styles.shell}>
            <span>{shellPath}</span>
          </div>
        )}
        {inEditing ? (
          <Button onClick={saveShellPath}>确认</Button>
        ) : (
          <Button
            onClick={() => {
              setInEditing((old) => !old);
            }}
          >
            编辑
          </Button>
        )}
      </div>
    </div>
  );
}
