/* eslint-disable react/no-array-index-key */
import React from 'react';

// import { setExecResult } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import styles from './command.result.scss';

export default function CommandResultView() {
  const list = useAppSelector((store) => store.commandResultList);
  return (
    <div className={styles.root}>
      {/* <p className={styles.title}>命令执行结果</p> */}
      {list.map((item, index) => {
        const { command, result } = item;
        return (
          <>
            <p key={`${index}-${command}`} className={styles.result}>
              {'> '}
              {command}
            </p>
            <p key={`${index}-${command}-result`} className={styles.result}>
              {result}
            </p>
          </>
        );
      })}
    </div>
  );
}
