import React, { useState } from 'react';
import { message } from 'antd';

import { useAppDispatch } from '../../redux/hooks';
import { addCommand } from '../../redux/actions';
import styles from './add.command.scss';
import { addCommandToLocal } from '../handler';

export default function AddCommandView() {
  const [title, setTitle] = useState('');
  const [command, setCommand] = useState('');
  const dispatch = useAppDispatch();
  const [messageAPI, contextHolder] = message.useMessage();

  // const commandRef = useRef<HTMLInputElement>(null);
  // const titleRef = useRef<HTMLInputElement>(null);

  const onAddCommand = (cmd: string, tit?: string) => {
    console.log('add command ', cmd, 'title: ', tit);
    if (tit && cmd) {
      const data = { title: tit, command: cmd };
      addCommandToLocal(data);
      dispatch(addCommand(data));
      setCommand('');
      setTitle('');
    } else if (!tit) {
      messageAPI.info('Title不能为空');
    } else if (!cmd) {
      messageAPI.info('Command不能为空');
    }
  };

  return (
    <div className={styles.input_row}>
      {contextHolder}
      <span>Title:</span>
      <input
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        className={styles.input}
        // ref={titleRef}
      />
      <span>Command:</span>
      <input
        value={command}
        onChange={(event) => {
          setCommand(event.target.value);
        }}
        className={styles.input}
        // ref={commandRef}
      />
      <button
        type="button"
        className={styles.add_button}
        onClick={() => {
          onAddCommand(command, title);
        }}
      >
        Add
      </button>
    </div>
  );
}
