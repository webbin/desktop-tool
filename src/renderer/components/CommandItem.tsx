import React from 'react';

import { CommandData } from '../types';
import styles from './command.item.module.scss';

interface CommandItemProp {
  data: CommandData;
}

export default function CommandItem(props: CommandItemProp) {
  const { data } = props;

  const onEdit = () => {
    console.log('edit command ', data);
  };

  const onDelete = () => {
    console.log('delete command ', data);
  };

  const runCommand = () => {
    window.electron.ipcRenderer
      .execCommand(data.command)
      .then((result) => {
        console.log('command result: ', result);
      })
      .catch((err) => {
        console.log('command error: ', err);
      });
  };

  return (
    <div className={styles.container}>
      <p>{data.title}</p>
      <p>{data.command}</p>
      <div className={styles.button_row}>
        <button className={styles.button} type="button" onClick={onDelete}>
          删除
        </button>
        <button className={styles.button} type="button" onClick={onEdit}>
          编辑
        </button>
        <button className={styles.button} type="button" onClick={runCommand}>
          执行
        </button>
      </div>
    </div>
  );
}
