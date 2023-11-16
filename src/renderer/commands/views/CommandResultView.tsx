/* eslint-disable react/no-array-index-key */
import { useEffect, useMemo, useRef } from 'react';

// import { setExecResult } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import styles from './CommandResultView.scss';
import TimeUtil from '../../utils/TimeUtil';

export default function CommandResultView() {
  const list = useAppSelector((store) => store.commandResultList);
  const listCountRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (list.length > listCountRef.current) {
      const element = containerRef.current;
      if (element) {
        // element.scrollTop = element.scrollHeight;
        element.scrollTo({
          behavior: 'smooth',
          top: element.scrollHeight,
        });
      }
    }
    listCountRef.current = list.length;
  }, [list]);

  return (
    <div ref={containerRef} className={styles.root}>
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
