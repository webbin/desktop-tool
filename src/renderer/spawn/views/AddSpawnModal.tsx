import React, { useState } from 'react';
import { message, Modal, Button, ConfigProvider } from 'antd';
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';

import styles from '../../commands/views/AddCommandView.scss';
import addSpawnStyles from './AddSpawnModal.scss';
import { useAppDispatch } from '../../redux/hooks';
import { addSpawn } from '../../redux/actions';
import DataUtil from 'renderer/utils/DataUtil';

interface Props {
  visible: boolean;
  onAddConfirm: () => void;
}

function AddSpawnModal(props: Props) {
  const { visible, onAddConfirm } = props;

  const [title, setTitle] = useState('');
  // const [tag, setTag] = useState('');
  const [command, setCommand] = useState('');
  const [argList, setArgList] = useState<string[]>(['']);

  const dispatch = useAppDispatch();
  const [messageAPI, contextHolder] = message.useMessage();

  const dismiss = () => {
    setTitle('');
    setCommand('');
    setArgList(['']);
    onAddConfirm();
  };

  const onAddSpawn = () => {
    const tit = title.trim();
    const cmd = command.trim();
    if (title && command) {
      const key = DataUtil.UUID();
      const argL: string[] = [];
      argList.forEach((arg) => {
        if (arg) {
          argL.push(arg.trim());
        }
      });
      dispatch(
        addSpawn({
          key,
          title: tit,
          command,
          args: argL,
        })
      );
      dismiss();
    } else if (!tit) {
      messageAPI.info('Title不能为空');
    } else if (!cmd) {
      messageAPI.info('Command不能为空');
    }
  };

  return (
    <Modal
      open={visible}
      onOk={onAddSpawn}
      onCancel={dismiss}
      className={styles.add_command_modal}
      title={<div className={styles.modal_title}>Add Spawn Command</div>}
    >
      {contextHolder}
      <div className={addSpawnStyles.modal_root}>
        <div className={styles.add_command_input_row}>
          <span className={styles.add_command_title}>Title:</span>
          <input
            maxLength={30}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            className={styles.input}
            // ref={titleRef}
          />
        </div>

        <div className={styles.add_command_input_row}>
          <span className={styles.add_command_title}>Command:</span>
          <input
            maxLength={12}
            value={command}
            onChange={(event) => {
              setCommand(event.target.value);
            }}
            className={styles.input}
            // ref={titleRef}
          />
        </div>
        <div className={styles.add_command_input_row}>
          <span className={styles.add_command_title}>
            Args
            {argList.length < 10 ? (
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      motion: false,
                    },
                  },
                }}
              >
                <Button
                  className={addSpawnStyles.add_arg_button}
                  icon={<PlusCircleFilled />}
                  onClick={() => {
                    setArgList((old) => {
                      return [...old, ''];
                    });
                  }}
                />
              </ConfigProvider>
            ) : null}
          </span>
        </div>

        <div className={addSpawnStyles.args_container}>
          {argList.map((item, index) => {
            const key = `${index}`;
            return (
              <div className={addSpawnStyles.arg_row} key={key}>
                <span className={addSpawnStyles.arg_index_text}>
                  No. {index + 1} :
                </span>
                <input
                  maxLength={12}
                  value={item}
                  onChange={(event) => {
                    setArgList((old) => {
                      const l = [...old];
                      l[index] = event.target.value;
                      return l;
                    });
                  }}
                  className={styles.input}
                  // ref={titleRef}
                />
                {index > 0 ? (
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          motion: false,
                        },
                      },
                    }}
                  >
                    <Button
                      className={addSpawnStyles.arg_del_button}
                      icon={<MinusCircleFilled />}
                      onClick={() => {
                        setArgList((old) => {
                          const l = [...old];
                          l.splice(index, 1);
                          return l;
                        });
                      }}
                    />
                  </ConfigProvider>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default AddSpawnModal;
