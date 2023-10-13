/* eslint-disable react/require-default-props */
import { useState } from 'react';
import { Modal } from 'antd';

type Props = {
  open: boolean;
  initValue?: string;
  onCancel: () => void;
  onOk: (text: string) => void;
};

export default function CommandTagModal(props: Props) {
  const { open, initValue = '', onCancel, onOk } = props;

  const [value, setValue] = useState(initValue);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => {
        console.log('on ok: ', value);
        onOk(value);
      }}
    >
      <p>Tag</p>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </Modal>
  );
}
