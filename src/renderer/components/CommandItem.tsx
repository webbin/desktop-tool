import React, { useState } from 'react';
import { Button } from 'antd';

import { CommandData } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { addExecResult, deleteCommand, updateCommand } from '../redux/actions';
import { deleteLocalCommand, updateCommandByKey } from '../commands/handler';
import styles from './command.item.module.scss';

interface CommandItemProp {
  data: CommandData;
}

export default function CommandItem(props: CommandItemProp) {
  const dispatch = useAppDispatch();
  const { data } = props;

  const [editTitle, setEditTitle] = useState(data.title);
  const [editCommand, setEditCommand] = useState(data.command);
  const [editing, setEditing] = useState(false);
  const [commandRunning, setCommandRunning] = useState(false);

  const onEdit = () => {
    console.log('edit command ', data);
    setEditing((old) => !old);
  };

  const onDelete = () => {
    console.log('delete command ', data);
    deleteLocalCommand(data.key);
    dispatch(deleteCommand(data.command));
  };

  const onCancelEdit = () => {
    setEditing(false);
    setEditTitle(data.title);
    setEditCommand(data.command);
  };

  const onConfirmEdit = () => {
    setEditing(false);
    const commandData = {
      command: editCommand,
      title: editTitle,
      key: data.key,
    };
    updateCommandByKey(commandData);
    dispatch(updateCommand(commandData));
  };

  const runCommand = () => {
    setCommandRunning(true);
    const execTime = Date.now();
    window.electron.ipcRenderer
      .execCommand<string>(data.command)
      .then((result) => {
        setCommandRunning(false);
        console.log('command result: ', result);
        dispatch(
          addExecResult({ timestamp: execTime, command: data.command, result })
        );
      })
      .catch((err) => {
        setCommandRunning(false);
        // console.log('command error: ', err);
        const res = err.message || err.msg || String(err);
        dispatch(
          addExecResult({
            timestamp: execTime,
            command: data.command,
            result: res,
          })
        );
      });
  };

  return (
    <div className={styles.container}>
      {editing ? (
        <input
          className={styles.title_input}
          onChange={(event) => {
            setEditTitle(event.target.value);
          }}
          value={editTitle}
          type="text"
        />
      ) : (
        <p className={styles.title}>{data.title}</p>
      )}
      {editing ? (
        <textarea
          className={styles.command_input}
          onChange={(event) => {
            setEditCommand(event.target.value);
          }}
          value={editCommand}
          // type="text"
        />
      ) : (
        <p className={styles.command}>{data.command}</p>
      )}
      <div className={styles.button_row}>
        {editing ? (
          <>
            <button
              className={styles.button}
              type="button"
              onClick={onCancelEdit}
            >
              取消
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={onConfirmEdit}
            >
              确认
            </button>
          </>
        ) : (
          <>
            <Button
              className={styles.button}
              danger
              type="primary"
              onClick={onDelete}
            >
              删除
            </Button>
            <Button className={styles.button} type="primary" onClick={onEdit}>
              编辑
            </Button>
            <Button
              loading={commandRunning}
              className={styles.button}
              type="primary"
              onClick={runCommand}
            >
              执行
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
