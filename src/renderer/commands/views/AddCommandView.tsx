import React, { useCallback, useEffect, useState } from 'react';
import { message, Modal } from 'antd';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addCommand } from '../../redux/actions';
import styles from './AddCommandView.scss';
import DataUtil from '../../utils/DataUtil';
import { TAG_NONE } from '../../constants/Constant';

interface Props {
  visible: boolean;
  onAddConfirm: () => void;
}

export default function AddCommandView(props: Props) {
  const { visible, onAddConfirm } = props;

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [command, setCommand] = useState('');
  const dispatch = useAppDispatch();
  const [messageAPI, contextHolder] = message.useMessage();
  const selectedTag = useAppSelector(
    (store) => store.commandInfo.selectedTagList[0]
  );

  useEffect(() => {
    if (visible) {
      if (selectedTag && selectedTag !== TAG_NONE) {
        setTag(selectedTag);
      } else {
        setTag('');
      }
    }
  }, [visible, selectedTag]);

  // const { transform } = useSpring({
  //   transform: `translateX(${visible ? 300 : 0}px)`,
  //   config: {
  //     duration: 300,
  //   },
  // });

  const onAddCommand = useCallback(
    (cmd: string, tit?: string, commandTag?: string) => {
      console.log('add command ', cmd, 'title: ', tit);
      if (tit && cmd) {
        const key = DataUtil.UUID();
        const data = { tag: commandTag, title: tit, command: cmd, key };
        dispatch(addCommand(data));
        setCommand('');
        setTitle('');
      } else if (!tit) {
        messageAPI.info('Title不能为空');
      } else if (!cmd) {
        messageAPI.info('Command不能为空');
      }
    },
    [dispatch, messageAPI]
  );

  return (
    // <animated.div
    //   style={{
    //     transform,
    //   }}
    //   className={styles.input_row}
    // >
    <Modal
      open={visible}
      onOk={() => {
        onAddCommand(command.trim(), title.trim(), tag);
        onAddConfirm();
      }}
      onCancel={onAddConfirm}
      className={styles.add_command_modal}
      title={<div className={styles.modal_title}>Add Command</div>}
    >
      {contextHolder}
      <div className={styles.add_command_input_row}>
        <span className={styles.add_command_title}>Tag(Optional):</span>
        <input
          maxLength={15}
          value={tag}
          onChange={(event) => {
            setTag(event.target.value);
          }}
          className={styles.input}
        />
      </div>

      <div className={styles.add_command_input_row}>
        <span className={styles.add_command_title}>Title:</span>
        <input
          maxLength={30}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          className={styles.input}
          // ref={titleRef}
        />
      </div>

      <div className={styles.add_command_input_row}>
        <span className={styles.add_command_title}>Command:</span>
        <textarea
          value={command}
          onChange={(event) => {
            setCommand(event.target.value);
          }}
          className={styles.command_input}
        />
      </div>
    </Modal>
  );
}
