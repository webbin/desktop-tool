import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  CaretRightFilled,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import { CommandData } from '../../types';
import AutoTextArea from '../../components/AutoTextArea';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addExecResult,
  updateExecResult,
  deleteCommand,
  updateCommand,
  addCommandUse,
  addRunningCommand,
  deleteRunningCommand,
  addRecentRunCommand,
} from '../../redux/actions';
import styles from './CommandItem.scss';

interface CommandItemProp {
  data: CommandData;
  index: number;
  onItemEditTag: (data: CommandData) => void;
}

export default function CommandItem(props: CommandItemProp) {
  const dispatch = useAppDispatch();
  const { data, index, onItemEditTag } = props;

  const commandRunning = useAppSelector((state) =>
    state.commandInfo.runningKeyList.includes(data.key)
  );

  const [editTitle, setEditTitle] = useState(data.title);
  const [editCommand, setEditCommand] = useState(data.command);
  const [editing, setEditing] = useState(false);

  const tagName = data.tag || 'Add Tag';

  const onEdit = () => {
    console.log('edit command ', data);
    setEditing((old) => !old);
  };

  const onDelete = () => {
    console.log('delete command ', data);
    dispatch(deleteCommand(data.key));
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
      tag: data.tag,
    };
    dispatch(updateCommand(commandData));
  };

  const onEditTag = () => {
    onItemEditTag(data);
  };

  const runCommand = () => {
    dispatch(addRunningCommand(data.key));
    dispatch(addRecentRunCommand(data.key));
    const execTime = Date.now();
    dispatch(
      addExecResult({
        startTimestamp: execTime,
        endTimestamp: 0,
        command: data.command,
        result: '',
        running: true,
      })
    );
    window.electron.ipcRenderer
      .execCommand<string>(data.command)
      .then((result) => {
        dispatch(deleteRunningCommand(data.key));
        console.log('command result: ', result);
        dispatch(
          updateExecResult({
            startTimestamp: execTime,
            endTimestamp: Date.now(),
            result: result.trim(),
            running: false,
          })
        );
        dispatch(addCommandUse(data.key));
      })
      .catch((err) => {
        dispatch(deleteRunningCommand(data.key));
        // console.log('command error: ', err);
        const res = err.message || err.msg || String(err);
        dispatch(
          updateExecResult({
            startTimestamp: execTime,
            endTimestamp: Date.now(),
            result: res,
            running: false,
          })
        );
      });
  };

  return (
    <div className={styles.container}>
      <span className={styles.index_text}>{index + 1}</span>
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
        <AutoTextArea
          className={styles.command_input}
          onChange={(event) => {
            setEditCommand(event.target.value);
          }}
          value={editCommand}
        />
      ) : (
        <p className={styles.command}>{data.command}</p>
      )}
      {editing ? null : (
        <div className={styles.option_button_container}>
          <Button
            className={styles.add_tag_button}
            type="default"
            onClick={onEditTag}
            // icon={<DeleteOutlined />}
          >
            {tagName}
          </Button>
          <Button
            // className={styles.delete_button}
            danger
            type="primary"
            onClick={onDelete}
            icon={<DeleteOutlined />}
          />
        </div>
      )}
      <div className={styles.button_row}>
        {editing ? (
          <>
            <Tooltip placement="top" title="取消">
              <Button
                className={styles.button}
                onClick={onCancelEdit}
                icon={<CloseOutlined />}
                // type="primary"
                shape="circle"
              />
            </Tooltip>
            <Tooltip placement="top" title="确认">
              <Button
                className={styles.button}
                onClick={onConfirmEdit}
                icon={<CheckOutlined />}
                // type="primary"
                shape="circle"
              />
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip placement="top" title="编辑">
              <Button
                className={styles.button}
                onClick={onEdit}
                icon={<FormOutlined />}
                // type="primary"
                shape="circle"
              />
            </Tooltip>
            <Tooltip placement="top" title="执行">
              <Button
                loading={commandRunning}
                className={styles.button}
                onClick={runCommand}
                icon={<CaretRightFilled />}
                // type="primary"
                shape="circle"
              />
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
}
