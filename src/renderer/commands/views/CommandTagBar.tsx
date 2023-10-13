/* eslint-disable react/no-array-index-key */
import { useMemo } from 'react';
import { Button } from 'antd';

import { useAppSelector } from '../../redux/hooks';
import styles from './CommandTagBar.scss';

export default function CommandTagBar() {
  const commandList = useAppSelector((store) => store.commandList);

  const tagList = useMemo(() => {
    return commandList.reduce(
      (pre, current) => {
        if (current.tag) {
          return pre.concat([current.tag]);
        }
        return pre;
      },
      ['All'] as string[]
    );
  }, [commandList]);

  return (
    <div className={styles.container}>
      {tagList.map((item, index) => {
        return (
          <Button key={`${item}_${index}`} type="default">
            {item}
          </Button>
        );
      })}
    </div>
  );
}
