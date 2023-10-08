/* eslint-disable promise/always-return */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import './App.css';
// import styles from './App.module.scss';
import CommandPage from './commands/CommandPage';

// function Hello() {
//   return (
//     <div className={styles.root}>
//       <CommandList onRefresh={updateLocalData} data={commands} />
//     </div>
//   );
// }

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<CommandPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}
