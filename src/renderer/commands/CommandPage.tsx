/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import { getLocalCommandList } from './handler';
import { useAppDispatch } from '../redux/hooks';
import { initCommands } from '../redux/actions';
import styles from './command.page.module.scss';

import AddCommandView from './views/AddCommandView';
import CommandListView from './views/CommandListView';
import CommandResultView from './views/CommandResultView';

export default function CommandPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const list = getLocalCommandList();
    if (list) {
      console.log('local command list: ');
      console.log(list);
      dispatch(initCommands(list));
    }
    return () => {
      // second
    };
  }, []);

  return (
    <div id="command-page" className={styles.root}>
      <div className={styles.main_content}>
        <CommandListView />
        <CommandResultView />
      </div>
      <AddCommandView />
    </div>
  );
}
