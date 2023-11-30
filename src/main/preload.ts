// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

import {
  EXECUTE_COMMAND,
  GET_COMMAND_LIST,
  REPLY_COMMAND_LIST,
  SET_SHELL_PATH,
  SHOW_ADD_COMMAND,
  SHOW_COMMAND_LIST,
  SHOW_IMPORT_COMMAND_LIST,
  TOGGLE_COMMAND_FILTER,
  CHOOSE_SHELL_PATH,
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
    showChooseShellPath() {
      return ipcRenderer.invoke(CHOOSE_SHELL_PATH) as Promise<string>;
    },
    setShellPath(shellPath: string) {
      ipcRenderer.send(SET_SHELL_PATH, shellPath);
    },
    setRenderCommandList(getCommandList: () => string) {
      ipcRenderer.on(GET_COMMAND_LIST, (event) => {
        event.sender.send(REPLY_COMMAND_LIST, getCommandList());
      });
    },
    setShowCommandListTextCallback(showCommand: () => void) {
      ipcRenderer.on(SHOW_COMMAND_LIST, showCommand);
    },
    setShowImportCommandListCallback(showCommand: () => void) {
      ipcRenderer.on(SHOW_IMPORT_COMMAND_LIST, showCommand);
    },
    setToggleCommandFilterCallback(toggleCommand: () => void) {
      ipcRenderer.on(TOGGLE_COMMAND_FILTER, toggleCommand);
    },
    setToggleAddCommandCallback(toggleAddCommand: () => void) {
      ipcRenderer.on(SHOW_ADD_COMMAND, toggleAddCommand);
    },
  },
  hostData: {
    versions: process.versions,
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
