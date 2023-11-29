/* eslint-disable react/require-default-props */
/* eslint-disable no-lonely-if */
/* eslint-disable react/no-array-index-key */
import React, { useMemo, useRef, useEffect } from 'react';
import { Button, Input, InputRef } from 'antd';
import classnames from 'classnames';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import styles from './CommandTagBar.scss';
import {
  deleteSelectedTag,
  clearSeletedTags,
  setSeletedTags,
  putSearchCommand,
} from '../../redux/actions';
import { TAG_ALL, TAG_NONE } from '../../constants/Constant';

const { Search } = Input;

type CommandTagItemProps = {
  tag: string;
  index: number;
};

function CommandTagItem(props: CommandTagItemProps) {
  const { tag, index } = props;

  const dispatch = useAppDispatch();
  const selectedTagList = useAppSelector(
    (store) => store.commandInfo.selectedTagList
  );

  const tagSelected = useMemo(() => {
    return selectedTagList.indexOf(tag) >= 0;
  }, [selectedTagList, tag]);

  return (
    <Button
      className={classnames(styles.command_tag, {
        [styles.command_tag_selected]: tagSelected,
      })}
      onClick={() => {
        if (tag === TAG_ALL) {
          dispatch(clearSeletedTags());
        } else if (tag === TAG_NONE) {
          dispatch(setSeletedTags([TAG_NONE]));
        } else {
          if (tagSelected) {
            dispatch(deleteSelectedTag(tag));
          } else {
            dispatch(setSeletedTags([tag]));
          }
        }
      }}
      type="default"
    >
      {tag}
    </Button>
  );
}

interface CommandTagBarProps {
  showFilter?: boolean;
}

export default function CommandTagBar(props: CommandTagBarProps) {
  const { showFilter } = props;

  const commandList = useAppSelector((store) => store.commandList);
  const dispatch = useAppDispatch();

  const searchRef = useRef<InputRef>(null);
  const searchKeyword = useAppSelector((store) => {
    const { selectedTagList, commandSearchMap } = store.commandInfo;
    const [tag] = selectedTagList;
    if (commandSearchMap && commandSearchMap[tag]) {
      return commandSearchMap[tag].keyword;
    }
    return '';
  });
  const tag = useAppSelector((store) => store.commandInfo.selectedTagList[0]);

  const tagList = useMemo(() => {
    return commandList.reduce(
      (pre, current) => {
        if (current.tag) {
          const index = pre.indexOf(current.tag);
          if (index < 0) {
            return pre.concat([current.tag]);
          }
          return pre;
        }
        return pre;
      },
      [TAG_ALL, TAG_NONE]
    );
  }, [commandList]);

  useEffect(() => {
    if (showFilter && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showFilter]);

  const onSearch = (value: string) => {
    if (tag) {
      console.log('on input search press ', value);
      dispatch(
        putSearchCommand({
          key: tag,
          data: { keyword: value, tag },
        })
      );
    }
  };

  const onChange = (e: any) => {
    // console.log('tag bar search  on change ', e.target.value);
    const { value } = e.target;
    if (tag) {
      console.log('update search, tag: ', tag, ', value:', value);
      dispatch(
        putSearchCommand({
          key: tag,
          data: { keyword: value, tag },
        })
      );
    }
  };

  return (
    <div>
      <div className={styles.container}>
        {tagList.map((item, index) => {
          return (
            <CommandTagItem key={`${item}_${index}`} tag={item} index={index} />
          );
        })}
      </div>

      {showFilter ? (
        <Search
          ref={searchRef}
          className={styles.search_bar}
          placeholder="输入搜索关键字"
          onSearch={onSearch}
          onChange={onChange}
          value={searchKeyword}
        />
      ) : null}
    </div>
  );
}
