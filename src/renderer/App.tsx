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
  const [title, setTitle] = useState('');
  const [command, setCommand] = useState('');

  const commandRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const [commands, setCommands] = useState<CommandData[]>([]);

  const updateLocalData = () => {
    const str = window.localStorage.getItem(COMMAND_KEY);
    if (str) {
      const list = JSON.parse(str);
      setCommands(list);
    }
  };

  useEffect(() => {
    // window.electron.ipcRenderer.sendMessage('ipc-example', {});
    updateLocalData();
  }, []);

  useEffect(() => {
    const data = JSON.stringify(commands);
    window.localStorage.setItem(COMMAND_KEY, data);
  }, [commands]);

  const onAddCommand = (cmd: string, tit?: string) => {
    console.log('add command ', cmd, 'title: ', tit);
    setCommands((old) => {
      const newList = [...old, { command: cmd, title: tit }];
      const data = JSON.stringify(newList);
      window.localStorage.setItem(COMMAND_KEY, data);
      return newList;
    });
    setCommand('');
    setTitle('');
  };

  return (
    <div className={styles.root}>
      <CommandList onRefresh={updateLocalData} data={commands} />
      <div className={styles.input_row}>
        <span>Command:</span>
        <input
          value={command}
          onChange={(event) => {
            setCommand(event.target.value);
          }}
          className={styles.input}
          ref={commandRef}
        />
      </div>
      <div className={styles.input_row}>
        <span>Title:</span>
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          className={styles.input}
          ref={titleRef}
        />
      </div>
      <button
        type="button"
        className={styles.add_button}
        onClick={() => {
          // const command = commandRef.current?.value;
          // const title = titleRef.current?.value;
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
