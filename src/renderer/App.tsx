/* eslint-disable promise/always-return */
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Menu } from 'antd';

import type { MenuProps } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { store, persistor } from './redux/store';

import './App.css';
import styles from './App.module.scss';
import CommandPage from './commands/CommandPage';
// import HomePage from './home/HomePage';
import SettingsPage from './settings/SettingsPage';
import SpawnPage from './spawn/SpawnPage';

type MenuItem = Required<MenuProps>['items'][number];

function Container() {
  const navigate = useNavigate();

  const MainItems: MenuItem[] = [
    {
      label: 'Commands',
      key: 'Commands',
      icon: <AppstoreOutlined />,
      onClick: () => {
        navigate('/commands');
      },
    },
    {
      label: 'Spawn',
      key: 'Spawn',
      icon: <MailOutlined />,
      onClick: () => {
        navigate('/spawn');
      },
    },
    {
      label: 'Settings',
      key: 'Settings',
      icon: <SettingOutlined />,
      onClick: () => {
        navigate('/settings');
      },
    },
  ];

  return (
    <div className={styles.root}>
      <Menu className={styles.menu} items={MainItems} />
      <Routes>
        <Route path="/commands" element={<CommandPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/spawn" element={<SpawnPage />} />
      </Routes>
      {/* <div className={styles.content_container}>
      </div> */}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Container />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
