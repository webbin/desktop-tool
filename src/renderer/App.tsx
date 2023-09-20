/* eslint-disable promise/always-return */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import './App.css';
// import PropValueView from './components/PropValueView';
import { CommandData } from './types';
import styles from './App.module.scss';
import CommandList from './components/CommandList';

const COMMAND_KEY = 'COMMAND';

function Hello() {
  const inputRef = useRef<HTMLInputElement>(null);
  const commandRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const [commands, setCommands] = useState<CommandData[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('ipc-example', {});
  }, []);

  useEffect(() => {
    const data = JSON.stringify(commands);
    window.localStorage.setItem(COMMAND_KEY, data);
  }, [commands]);

  const onAddCommand = (cmd: string, tit?: string) => {
    setCommands((old) => {
      const newList = [...old, { command: cmd, title: tit }];
      const data = JSON.stringify(newList);
      window.localStorage.setItem(COMMAND_KEY, data);
      return newList;
    });
  };

  return (
    <div className={styles.root}>
      <CommandList data={commands} />
      <div className={styles.input_row}>
        <span>Command:</span>
        <input className={styles.input} ref={commandRef} />
      </div>
      <div className={styles.input_row}>
        <span>Title:</span>
        <input className={styles.input} ref={inputRef} />
      </div>
      <button
        type="button"
        className={styles.add_button}
        onClick={() => {
          const command = commandRef.current?.value;
          const title = titleRef.current?.value;
          if (command) {
            onAddCommand(command, title);
          }
        }}
      >
        Add
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
