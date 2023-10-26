// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

import {
  EXECUTE_COMMAND,
  GET_COMMAND_LIST,
  REPLY_COMMAND_LIST,
  SET_SHELL_PATH,
} from './Constant';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    execCommand<T>(command: string) {
      return ipcRenderer.invoke(EXECUTE_COMMAND, command) as Promise<T>;
    },
    setShellPath(shellPath: string) {
      ipcRenderer.send(SET_SHELL_PATH, shellPath);
    },
    sendCommandList(getCommandList: () => string) {
      ipcRenderer.on(GET_COMMAND_LIST, (event) => {
        event.sender.send(REPLY_COMMAND_LIST, getCommandList());
      });
    },
  },
  hostData: {
    versions: process.versions,
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
