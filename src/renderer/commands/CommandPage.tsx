/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { FloatButton } from 'antd';
import { PlusCircleOutlined, ClearOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearExecResult, updateCommandTagByKey } from '../redux/actions';
import styles from './CommandPage.scss';

import AddCommandView from './views/AddCommandView';
import CommandListView from './views/CommandListView';
import CommandResultView from './views/CommandResultView';
import CommandTagModal from './views/CommandTagModal';
import CommandTagBar from './views/CommandTagBar';
import CommandListModal from './dialogs/CommandListModal';
import ImportCommandModal from './dialogs/ImportCommandModal';

export default function CommandPage() {
  const dispatch = useAppDispatch();
  const resultCount = useAppSelector((store) => store.commandResultList.length);

  const editKeyRef = useRef<string>();

  const [addVisible, setAddVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [commandListTextVisible, setCommandListTextVisible] = useState(false);
  const [jsonTextAreaVisible, setJsonTextAreaVisible] = useState(false);
  const [initTag, setInitTag] = useState<string>();
  const [editTagModalVisible, setEditTagModalVisible] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer.setShowCommandListTextCallback(() => {
      setCommandListTextVisible(true);
    });

    window.electron.ipcRenderer.setShowImportCommandListCallback(() => {
      setJsonTextAreaVisible(true);
    });

    window.electron.ipcRenderer.setToggleCommandFilterCallback(() => {
      setFilterVisible((v) => !v);
    });

    window.electron.ipcRenderer.setToggleAddCommandCallback(() => {
      setAddVisible((v) => !v);
    });

    return () => {
      // second
    };
  }, []);

  const dismissEditTagModal = () => {
    setEditTagModalVisible(false);
    editKeyRef.current = undefined;
  };

  const dismissCommandListTextDialog = () => {
    setCommandListTextVisible(false);
  };

  const onTagOk = (text: string) => {
    if (editKeyRef.current !== undefined) {
      dispatch(updateCommandTagByKey({ tag: text, key: editKeyRef.current }));
    }
    dismissEditTagModal();
  };

  return (
    <div id="command-page" className={styles.root}>
      <div
        // onClick={(event) => {
        //   if (addVisible) {
        //     setAddVisible(false);
        //     event.preventDefault();
        //     event.stopPropagation();
        //   }
        // }}
        className={styles.column_container}
      >
        <CommandTagBar showFilter={filterVisible} />
        <div className={styles.main_content}>
          <CommandListView
            onItemEditTag={(data) => {
              editKeyRef.current = data.key;
              setInitTag(data.tag || '');
              setEditTagModalVisible(true);
            }}
          />
          <CommandResultView />
        </div>
      </div>
      <FloatButton.Group>
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

      <AddCommandView
        onAddConfirm={() => {
          setAddVisible(false);
        }}
        visible={addVisible}
      />
      <CommandTagModal
        onCancel={dismissEditTagModal}
        onOk={onTagOk}
        open={editTagModalVisible}
        initValue={initTag}
      />
      <CommandListModal
        visible={commandListTextVisible}
        onCancel={dismissCommandListTextDialog}
        onOk={dismissCommandListTextDialog}
      />
      <ImportCommandModal
        onCancel={() => {
          setJsonTextAreaVisible(false);
        }}
        onOk={() => {
          setJsonTextAreaVisible(false);
        }}
        visible={jsonTextAreaVisible}
      />
    </div>
  );
}
