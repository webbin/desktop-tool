/* eslint-disable react/no-array-index-key */
import { useEffect, useMemo, useRef } from 'react';
import { Spin } from 'antd';

import { CommandResultInfo } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import styles from './CommandResultView.scss';
import TimeUtil from '../../utils/TimeUtil';

interface CommandResultItemProps {
  data: CommandResultInfo;
  index: number;
}

function CommandResultItem(props: CommandResultItemProps) {
  const { data, index } = props;

  const timeString = useMemo(() => {
    const { hourString, minuteString, secondString } = TimeUtil.getTimeData(
      data.startTimestamp
    );
    return `${hourString}:${minuteString}:${secondString}`;
  }, [data.startTimestamp]);

  const endTimeString = useMemo(() => {
    const { hourString, minuteString, secondString } = TimeUtil.getTimeData(
      data.endTimestamp
    );
    return `${hourString}:${minuteString}:${secondString}`;
  }, [data.endTimestamp]);

  return (
    <div className={styles.result_container}>
      <p className={styles.time}>{timeString}</p>
      <p className={styles.command}>
        {'> '}
        {data.command}
      </p>
      {data.running ? (
        <Spin size="large" className={styles.loading_spin} />
      ) : null}
      {data.result ? (
        <>
          <p className={styles.time} style={{ paddingTop: 0 }}>
            {endTimeString}
          </p>
          <p key={`${index}-${data.command}-result`} className={styles.result}>
            {data.result}
          </p>
        </>
      ) : null}
    </div>
  );
}

export default function CommandResultView() {
  const list = useAppSelector((store) => store.commandResultList);
  const listCountRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayList = useMemo(() => {
    return list.map((item) => {
      const { hourString, minuteString, secondString } = TimeUtil.getTimeData(
        item.startTimestamp
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
      {displayList.map((item, index) => {
        return (
          <CommandResultItem
            key={`${index}-${item.command}-result`}
            data={item}
            index={index}
          />
        );
      })}
    </div>
  );
}
