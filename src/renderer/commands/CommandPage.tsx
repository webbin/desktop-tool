/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { FloatButton } from 'antd';
import { PlusCircleOutlined, ClearOutlined } from '@ant-design/icons';

import { getLocalCommandList } from './handler';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  initCommands,
  clearExecResult,
  updateCommandTagByIndex,
} from '../redux/actions';
import styles from './CommandPage.scss';

import AddCommandView from './views/AddCommandView';
import CommandListView from './views/CommandListView';
import CommandResultView from './views/CommandResultView';
import CommandTagModal from './views/CommandTagModal';
import CommandTagBar from './views/CommandTagBar';

export default function CommandPage() {
  const dispatch = useAppDispatch();
  const resultCount = useAppSelector((store) => store.commandResultList.length);

  const editIndexRef = useRef<number>();

  const [addVisible, setAddVisible] = useState(false);
  const [editTagModalVisible, setEditTagModalVisible] = useState(false);

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

  const dismissEditTagModal = () => {
    setEditTagModalVisible(false);
    editIndexRef.current = undefined;
  };

  const onTagOk = (text: string) => {
    // console.log('update command tag ', editIndexRef.current, text);
    if (editIndexRef.current !== undefined) {
      dispatch(
        updateCommandTagByIndex({ index: editIndexRef.current, tag: text })
      );
    }
    dismissEditTagModal();
  };

  return (
    <div id="command-page" className={styles.root}>
      <div className={styles.column_container}>
        <CommandTagBar />
        <div className={styles.main_content}>
          <CommandListView
            onItemEditTag={(i: number) => {
              editIndexRef.current = i;
              setEditTagModalVisible(true);
            }}
          />
          <CommandResultView />
        </div>
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
      <CommandTagModal
        onCancel={dismissEditTagModal}
        onOk={onTagOk}
        open={editTagModalVisible}
      />
    </div>
  );
}
