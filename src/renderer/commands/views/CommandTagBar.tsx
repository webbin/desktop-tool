/* eslint-disable no-lonely-if */
/* eslint-disable react/no-array-index-key */
import { useMemo } from 'react';
import { Button } from 'antd';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import styles from './CommandTagBar.scss';
import {
  deleteSelectedTag,
  addSelectedTag,
  clearSeletedTags,
  setSeletedTags,
} from '../../redux/actions';
import { TAG_ALL, TAG_NONE } from '../../constants/Constant';

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
      className={`${styles.command_tag} ${
        tagSelected ? styles.command_tag_selected : ''
      }`}
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

export default function CommandTagBar() {
  const commandList = useAppSelector((store) => store.commandList);

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

  return (
    <div className={styles.container}>
      {tagList.map((item, index) => {
        return (
          <CommandTagItem key={`${item}_${index}`} tag={item} index={index} />
        );
      })}
    </div>
  );
}
