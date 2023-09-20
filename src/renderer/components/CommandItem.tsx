import React from 'react';

import { CommandData } from '../types';

interface CommandItemProp {
  data: CommandData;
}

export default function CommandItem(props: CommandItemProp) {
  const { data } = props;

  const onEdit = () => {
    console.log('command ', data);
  };

  const runCommand = () => {
    window.electron.ipcRenderer
      .execCommand(data.command)
      .then((result) => {
        console.log('command result: ', result);
      })
      .catch((err) => {
        console.log('command error: ', err);
      });
  };

  return (
    <div
      style={{
        backgroundColor: '#cac',
        borderRadius: 10,
      }}
    >
      <span>{data.title}</span>
      <span>{data.command}</span>

      <button type="button" onClick={onEdit}>
        编辑
      </button>
      <button type="button" onClick={runCommand}>
        执行
      </button>
    </div>
  );
}
