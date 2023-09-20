import React from 'react';

import { CommandData } from '../types';
import CommandItem from './CommandItem';

interface Props {
  data: CommandData[];
}

export default function CommandList(props: Props) {
  const { data } = props;
  return (
    <div
      style={{
        backgroundColor: '#fee',
        borderRadius: 10,
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        minHeight: 100,
        display: 'flex',
      }}
    >
      {data.length ? (
        data.map((item) => {
          return <CommandItem data={item} />;
        })
      ) : (
        <span
          style={{
            alignSelf: 'center',
            alignContent: 'center',
            display: 'flex',
          }}
        >
          没有找到指令，请新增
        </span>
      )}
    </div>
  );
}
