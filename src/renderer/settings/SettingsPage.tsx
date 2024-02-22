import React from 'react';

import ShellPathView from '../commands/views/ShellPathView';
import styles from './SettingsPage.scss';

export default function SettingsPage() {
  return (
    <div className={styles.root}>
      <ShellPathView />
    </div>
  );
}
