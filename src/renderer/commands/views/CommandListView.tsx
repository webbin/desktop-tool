import React from 'react';

import { useAppSelector } from '../../redux/hooks';
import styles from './CommandListView.scss';
import CommandItem from './CommandItem';

interface Props {
  onItemEditTag: (index: number) => void;
}

export default function CommandListView(props: Props) {
  const { onItemEditTag } = props;
  const commandList = useAppSelector((store) => store.commandList);
  console.log('command list: ', commandList.length);

  return (
    <div className={styles.root}>
      {commandList.map((item, index) => {
        return (
          <CommandItem
            index={index}
            onItemEditTag={onItemEditTag}
            data={item}
            key={item.key}
          />
        );
      })}
    </div>
  );
}
