/* eslint-disable react/require-default-props */
import React, { useMemo, useState } from 'react';

import {
  CaretRightFilled,
  PoweroffOutlined,
  DeleteFilled,
} from '@ant-design/icons';
import { Button } from 'antd';

import { useAppDispatch } from '../../redux/hooks';
import { deleteSpawn } from '../../redux/actions';
import { SpawnData } from '../../types';
import styles from './SpawnItem.scss';

interface Props {
  index: number;
  data: SpawnData;
  selected?: boolean;
  onItemClick: (data: SpawnData, index: number) => void;
}

function SpawnItem(props: Props) {
  const { data, index, selected, onItemClick } = props;

  const dispatch = useAppDispatch();

  const [mouseIn, setMouseIn] = useState(false);
  const [running, setRunning] = useState(false);

  const argString = useMemo(() => {
    if (data.args && data.args.length) {
      return data.args.join(' ');
    }
    return '';
  }, [data.args]);

  return (
    <div
      style={{
        backgroundColor: selected ? '#ddd' : undefined,
      }}
      onMouseEnter={() => {
        setMouseIn(true);
      }}
      onMouseLeave={() => {
        setMouseIn(false);
      }}
      className={styles.root}
      onClick={() => {
        onItemClick(data, index);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onItemClick(data, index);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <span className={styles.title}>{data.title}</span>
      <span className={styles.spawn_command}>
        {data.command} {argString}
      </span>
      {running ? <div className={styles.command_running_rag} /> : null}
      {mouseIn ? (
        <div className={styles.float_menu_container}>
          {running ? (
            <Button
              className={styles.float_menu_button}
              icon={<PoweroffOutlined />}
              onClick={() => {
                setRunning(false);
              }}
            />
          ) : (
            <Button
              className={styles.float_menu_button}
              icon={<CaretRightFilled />}
              onClick={() => {
                setRunning(true);
              }}
            />
          )}
          <Button
            className={styles.float_menu_button}
            icon={<DeleteFilled />}
            onClick={() => {
              dispatch(deleteSpawn(data.key));
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default SpawnItem;
