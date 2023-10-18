import React, { useMemo } from 'react';

import { useAppSelector } from '../../redux/hooks';
import styles from './CommandListView.scss';
import CommandItem from './CommandItem';
import { CommandData } from '../../types';
import { TAG_NONE } from '../../constants/Constant';

interface Props {
  onItemEditTag: (index: number, data: CommandData) => void;
}

export default function CommandListView(props: Props) {
  const { onItemEditTag } = props;
  const commandList = useAppSelector((store) => store.commandList);
  const selectedTagList = useAppSelector(
    (store) => store.commandInfo.selectedTagList
  );

  const list = useMemo(() => {
    if (!selectedTagList.length) {
      return commandList;
    }
    if (selectedTagList.length === 1 && selectedTagList[0] === TAG_NONE) {
      return commandList.filter((item) => {
        return !item.tag;
      });
    }
    const map: { [key: string]: boolean } = {};
    selectedTagList.forEach((item) => {
      map[item] = true;
    });
    return commandList.filter((item) => {
      if (item.tag && map[item.tag]) {
        return true;
      }
      return false;
    });
  }, [commandList, selectedTagList]);

  console.log('command list render : ', commandList.length);

  return (
    <div className={styles.root}>
      {list.map((item, index) => {
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
