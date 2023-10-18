import React, { useState } from 'react';
import { message } from 'antd';
import { useSpring, animated } from 'react-spring';

import { useAppDispatch } from '../../redux/hooks';
import { addCommand } from '../../redux/actions';
import styles from './AddCommandView.scss';
import DataUtil from '../../utils/DataUtil';

interface Props {
  visible: boolean;
}

export default function AddCommandView(props: Props) {
  const { visible } = props;

  const [title, setTitle] = useState('');
  const [command, setCommand] = useState('');
  const dispatch = useAppDispatch();
  const [messageAPI, contextHolder] = message.useMessage();

  // const commandRef = useRef<HTMLInputElement>(null);
  // const titleRef = useRef<HTMLInputElement>(null);

  const { transform } = useSpring({
    transform: `translateY(${visible ? 0 : 74}px)`,
    config: {
      duration: 300,
    },
  });

  const onAddCommand = (cmd: string, tit?: string) => {
    console.log('add command ', cmd, 'title: ', tit);
    if (tit && cmd) {
      const key = DataUtil.UUID();
      const data = { title: tit, command: cmd, key };
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
    <animated.div
      style={{
        transform,
      }}
      className={styles.input_row}
    >
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
          onAddCommand(command.trim(), title.trim());
        }}
      >
        Add
      </button>
    </animated.div>
  );
}
