import { Modal } from 'antd';
import React, { useMemo } from 'react';
import { useAppSelector } from 'renderer/redux/hooks';

import styles from './CommandListModal.scss';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
};

export default function CommandListModal(props: Props) {
  const { visible, onCancel, onOk } = props;

  const commandList = useAppSelector((store) => store.commandList);

  const str = useMemo(() => {
    return JSON.stringify(commandList, undefined, 4);
  }, [commandList]);

  // console.log(' command List json text: ', str);

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={() => {
        onOk();
      }}
      title="Command List Json String"
      className={styles.modal_root}
    >
      <div className={styles.json_text_container}>
        <span>{str}</span>
      </div>
    </Modal>
  );
}
