import { Modal } from 'antd';
import React from 'react';
import { useAppSelector } from 'renderer/redux/hooks';

import styles from './CommandListModal.scss';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
};

export default function CommandListModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const str = useAppSelector((store) =>
    JSON.stringify(store.commandList, undefined, '\n\n')
  );
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
      <div style={{ height: 400, overflowY: 'scroll' }}>{str}</div>
    </Modal>
  );
}
