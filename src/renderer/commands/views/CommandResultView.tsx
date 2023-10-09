/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';

// import { setExecResult } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import styles from './command.result.scss';
import TimeUtil from '../../utils/TimeUtil';

export default function CommandResultView() {
  const list = useAppSelector((store) => store.commandResultList);

  const displayList = useMemo(() => {
    return list.map((item) => {
      const { hourString, minuteString, secondString } = TimeUtil.getTimeData(
        item.timestamp
      );
      const timeString = `${hourString}:${minuteString}:${secondString}`;
      return {
        ...item,
        timeString,
      };
    });
  }, [list]);

  return (
    <div className={styles.root}>
      {/* <p className={styles.title}>命令执行结果</p> */}
      {displayList.map((item, index) => {
        const { command, result, timeString } = item;
        return (
          <div key={`${index}`} className={styles.result_container}>
            <p className={styles.time}>{timeString}</p>
            <p className={styles.command}>
              {'> '}
              {command}
            </p>
            <p key={`${index}-${command}-result`} className={styles.result}>
              {result}
            </p>
          </div>
        );
      })}
    </div>
  );
}
