/* eslint-disable react/require-default-props */
import { useState, useEffect } from 'react';
import { Modal, message } from 'antd';

import { TAG_ALL, TAG_NONE, TAG_RECENT } from '../../constants/Constant';

type Props = {
  open: boolean;
  initValue?: string;
  onCancel: () => void;
  onOk: (text: string) => void;
};

export default function CommandTagModal(props: Props) {
  const { open, initValue = '', onCancel, onOk } = props;

  const [value, setValue] = useState(initValue);
  const [messageAPI, contextHolder] = message.useMessage();

  useEffect(() => {
    setValue(initValue);
    console.log('command tag modal, init value changed: ', initValue);
  }, [initValue]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => {
        console.log('on ok: ', value);
        if (TAG_ALL === value || TAG_NONE === value || TAG_RECENT === value) {
          messageAPI.warning('标签名称已被占用');
          return;
        }
        onOk(value);
      }}
      // afterClose={() => {
      //   setValue('');
      // }}
    >
      {contextHolder}
      <p>Tag</p>
      <input
        type="text"
        value={value}
        maxLength={10}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </Modal>
  );
}
