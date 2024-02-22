import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { useAppSelector } from '../redux/hooks';
import AddSpawnModal from './views/AddSpawnModal';
import styles from './SpawnPage.scss';

function SpawnPage() {
  const spawnList = useAppSelector((store) => store.spawnList);

  const [addSpawnVisible, setAddSpawnVisible] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.spawn_command_list_container}>
        {spawnList.forEach((item) => {
          return <div>{item.title}</div>;
        })}
      </div>

      <FloatButton.Group>
        <FloatButton
          tooltip="Add Command"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            // console.log('show add');
            setAddSpawnVisible(true);
          }}
        />
      </FloatButton.Group>

      <AddSpawnModal
        visible={addSpawnVisible}
        onAddConfirm={() => {
          setAddSpawnVisible(false);
        }}
      />
    </div>
  );
}

export default SpawnPage;
