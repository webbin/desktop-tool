import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import './App.css';
import PropValueView from './components/PropValueView';

function Hello() {
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('ipc-example', {});
  }, []);
  return (
    <div>
      <PropValueView data={window.electron.hostData.versions} />
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
