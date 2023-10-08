import React from 'react';

import { useAppSelector } from '../../redux/hooks';
import styles from './command.list.scss';
import CommandItem from '../../components/CommandItem';

export default function CommandListView() {
  const commandList = useAppSelector((store) => store.commandList);
  console.log('command list: ', commandList.length);

  return (
    <div className={styles.root}>
      {commandList.map((item) => {
        return <CommandItem data={item} key={item.command} />;
      })}
    </div>
  );
}
