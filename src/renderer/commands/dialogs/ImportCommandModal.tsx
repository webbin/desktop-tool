import { Modal } from 'antd';
import React, { useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/redux/hooks';

import styles from './CommandListModal.scss';
import { initCommands } from '../../redux/actions';
import { CommandData } from '../../types';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
};

const mergeCommandList = (list1: CommandData[], list2: CommandData[]) => {
  const map = new Map<string, number>();

  for (let i = 0; i < list1.length; i += 1) {
    const item = list1[i];
    map.set(item.key, i);
  }

  const res: CommandData[] = Array.from(list1);

  for (let i = 0; i < list2.length; i += 1) {
    const item = list2[i];
    const index = map.get(item.key);
    if (index !== undefined) {
      res[index] = item;
    } else {
      res.push(item);
    }
  }

  return res;
};

export default function ImportCommandModal(props: Props) {
  const { visible, onCancel, onOk } = props;

  const dispatch = useAppDispatch();
  const localCommandList = useAppSelector((state) => state.commandList);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={() => {
        const json = inputRef.current?.value;
        if (!json) {
          return;
        }
        try {
          const list = JSON.parse(json);
          const res = mergeCommandList(localCommandList, list);
          dispatch(initCommands(res));
        } catch (error) {
          console.log('json string error ', error);
        }
        onOk();
      }}
      title="Import Command List From Json"
      className={styles.modal_root}
    >
      <textarea
        ref={inputRef}
        placeholder="Paste your json here"
        // onChange={(event) => {
        //   const str = event.target.value;
        //   if (str) {
        //   }
        // }}
        className={styles.json_input}
      />
    </Modal>
  );
}
