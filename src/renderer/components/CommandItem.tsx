import React from 'react';

import { CommandData } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { addExecResult, deleteCommand } from '../redux/actions';
import { deleteLocalCommand } from '../commands/handler';
import styles from './command.item.module.scss';

interface CommandItemProp {
  data: CommandData;
}

export default function CommandItem(props: CommandItemProp) {
  const dispatch = useAppDispatch();
  const { data } = props;

  const onEdit = () => {
    console.log('edit command ', data);
  };

  const onDelete = () => {
    console.log('delete command ', data);
    deleteLocalCommand(data.command);
    dispatch(deleteCommand(data.command));
  };

  const runCommand = () => {
    window.electron.ipcRenderer
      .execCommand<string>(data.command)
      .then((result) => {
        console.log('command result: ', result);
        dispatch(addExecResult({ command: data.command, result }));
      })
      .catch((err) => {
        // console.log('command error: ', err);
        const res = err.message || err.msg || String(err);
        dispatch(addExecResult({ command: data.command, result: res }));
      });
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{data.title}</p>
      <p className={styles.command}>{data.command}</p>
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
