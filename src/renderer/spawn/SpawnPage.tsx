import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { useAppSelector } from '../redux/hooks';
import AddSpawnModal from './views/AddSpawnModal';
import styles from './SpawnPage.scss';
import SpawnItem from './views/SpawnItem';

function SpawnPage() {
  const spawnList = useAppSelector((store) => store.spawnList);

  const [addSpawnVisible, setAddSpawnVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  console.log('spawn page, list ', spawnList);

  return (
    <div className={styles.root}>
      <div className={styles.spawn_command_list_container}>
        {spawnList.map((item, index) => {
          const selected = selectedIndex === index;
          return (
            <SpawnItem
              index={index}
              key={item.key}
              data={item}
              selected={selected}
              onItemClick={(data, i) => {
                setSelectedIndex(i);
              }}
            />
          );
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
