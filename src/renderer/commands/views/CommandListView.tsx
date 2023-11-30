import React, { useEffect, useMemo } from 'react';

import { useAppSelector } from '../../redux/hooks';
import styles from './CommandListView.scss';
import CommandItem from './CommandItem';
import { CommandData } from '../../types';
import { TAG_NONE, TAG_RECENT } from '../../constants/Constant';

interface Props {
  onItemEditTag: (data: CommandData) => void;
}

function commandMatchKeyword(keyword: string, command: CommandData) {
  const { command: text, tag } = command;
  return (
    text.toLowerCase().includes(keyword.toLowerCase()) ||
    tag?.toLowerCase().includes(keyword.toLowerCase())
  );
}

export default function CommandListView(props: Props) {
  const { onItemEditTag } = props;
  const commandList = useAppSelector((store) => store.commandList);
  const selectedTagList = useAppSelector(
    (store) => store.commandInfo.selectedTagList
  );
  const usedInfo = useAppSelector((store) => store.commandUseInfo);
  const searchKey = useAppSelector((store) => {
    const { selectedTagList: tagList, commandSearchMap } = store.commandInfo;
    const [tag] = tagList;
    if (commandSearchMap && commandSearchMap[tag]) {
      return commandSearchMap[tag].keyword;
    }
    return '';
  });
  const recentList = useAppSelector((store) => store.commandInfo.recentRunList);

  const list = useMemo(() => {
    if (!selectedTagList.length) {
      return commandList;
    }
    if (selectedTagList.length === 1 && selectedTagList[0] === TAG_NONE) {
      return commandList.filter((item) => {
        return !item.tag;
      });
    }
    if (selectedTagList[0] === TAG_RECENT) {
      const commandBook: { [key: string]: CommandData } = {};
      commandList.forEach((item) => {
        commandBook[item.key] = item;
      });
      return recentList.map((item) => commandBook[item]);
    }
    const map: { [key: string]: boolean } = {};
    selectedTagList.forEach((item) => {
      map[item] = true;
    });
    const filtedList = commandList.filter((item) => {
      if (item.tag && map[item.tag]) {
        if (searchKey) {
          return commandMatchKeyword(searchKey, item);
        }
        return true;
      }
      return false;
    });

    const listWithUseInfo = filtedList.map((item) => {
      const { tag, title, command, key } = item;
      const useCount = usedInfo[key] || 0;
      return { tag, title, command, key, useCount };
    });

    const sortedList = listWithUseInfo.sort((a, b) => {
      if (a.useCount > b.useCount) {
        return -1;
      }
      if (a.useCount < b.useCount) {
        return 1;
      }
      return 0;
    });
    return sortedList;
  }, [commandList, selectedTagList, usedInfo, searchKey, recentList]);

  useEffect(() => {
    window.electron.ipcRenderer.setRenderCommandList(() => {
      const l = commandList.map((item) => {
        const { tag, title, command, key } = item;
        return { tag, title, command, key };
      });
      return JSON.stringify(l);
    });
  }, [commandList]);

  // console.log('command list render : ', commandList.length);

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
