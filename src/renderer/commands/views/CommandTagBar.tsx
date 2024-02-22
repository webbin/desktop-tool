/* eslint-disable react/require-default-props */
/* eslint-disable no-lonely-if */
/* eslint-disable react/no-array-index-key */
import React, { useMemo, useRef, useEffect } from 'react';
import { Tag, Input, InputRef } from 'antd';
import classnames from 'classnames';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import styles from './CommandTagBar.scss';
import {
  deleteSelectedTag,
  clearSeletedTags,
  setSeletedTags,
  putSearchCommand,
} from '../../redux/actions';
import { TAG_ALL, TAG_NONE, TAG_RECENT } from '../../constants/Constant';

const { Search } = Input;
const { CheckableTag } = Tag;
type CommandTagItemProps = {
  tag: string;
  // index: number;
};

function CommandTagItem(props: CommandTagItemProps) {
  const { tag } = props;

  const dispatch = useAppDispatch();
  const selectedTagList = useAppSelector(
    (store) => store.commandInfo.selectedTagList
  );

  const tagSelected = useMemo(() => {
    return selectedTagList.indexOf(tag) >= 0;
  }, [selectedTagList, tag]);

  // return (
  //   <Button

  //     onClick={() => {
  //     }}
  //     type="default"
  //   >
  //     {tag}
  //   </Button>
  // );

  const onTagChange = (checked: boolean) => {
    console.log(' tag ', tag, ', checked ? ', checked);

    if (tag === TAG_ALL) {
      dispatch(clearSeletedTags());
    } else if (tag === TAG_NONE || tag === TAG_RECENT) {
      dispatch(setSeletedTags([tag]));
    } else {
      if (tagSelected) {
        dispatch(deleteSelectedTag(tag));
      } else {
        dispatch(setSeletedTags([tag]));
      }
    }
  };

  return (
    <CheckableTag
      className={classnames(styles.command_tag, {
        [styles.command_tag_selected]: tagSelected,
      })}
      checked={tagSelected}
      onChange={onTagChange}
    >
      {tag}
    </CheckableTag>
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
    const result: string[] = [];
    commandList.forEach((item) => {
      if (item.tag) {
        const index = result.indexOf(item.tag);
        if (index < 0) {
          result.push(item.tag);
        }
      }
    });
    return result;
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
    <div className={styles.root}>
      <div className={styles.container}>
        <CommandTagItem key="tag-all" tag={TAG_ALL} />
        <CommandTagItem key="tag-none" tag={TAG_NONE} />
        <CommandTagItem key="tag-recent" tag={TAG_RECENT} />
      </div>
      <div className={styles.container}>
        {tagList.map((item, index) => {
          return <CommandTagItem key={`${item}_${index}`} tag={item} />;
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
          allowClear
        />
      ) : null}
    </div>
  );
}
