/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FloatButton } from 'antd';
import { PlusCircleOutlined, ClearOutlined } from '@ant-design/icons';

import { getLocalCommandList } from './handler';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { initCommands, clearExecResult } from '../redux/actions';
import styles from './command.page.module.scss';

import AddCommandView from './views/AddCommandView';
import CommandListView from './views/CommandListView';
import CommandResultView from './views/CommandResultView';

export default function CommandPage() {
  const dispatch = useAppDispatch();
  const resultCount = useAppSelector((store) => store.commandResultList.length);
  const [addVisible, setAddVisible] = useState(false);

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
      <FloatButton.Group style={{ bottom: 76 }}>
        {resultCount > 0 ? (
          <FloatButton
            type="primary"
            tooltip="Clear Console"
            icon={<ClearOutlined />}
            onClick={() => {
              dispatch(clearExecResult());
            }}
          />
        ) : null}

        <FloatButton
          tooltip="Add Command"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            console.log('show add');
            setAddVisible((old) => !old);
          }}
        />
      </FloatButton.Group>

      <AddCommandView visible={addVisible} />
    </div>
  );
}
