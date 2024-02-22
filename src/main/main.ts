/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, dialog, shell, ipcMain } from 'electron';
// import { autoUpdater } from 'electron-updater';
// import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import {
  EXECUTE_COMMAND,
  SET_SHELL_PATH,
  CHOOSE_SHELL_PATH,
  EXECUTE_SPAWN,
  SPAWN_RESPONSE,
} from './Constant';
import {
  execCommandAsync,
  execSpawn,
  setShellPath,
} from './childprocess/childprocess';
import { platform } from 'os';

// class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info';
//     autoUpdater.logger = log;
//     autoUpdater.checkForUpdatesAndNotify();
//   }
// }

let mainWindow: BrowserWindow | null = null;

// ipcMain.on('ipc-example', async (event, arg) => {
//   const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
//   console.log(msgTemplate(arg));
//   event.reply('ipc-example', msgTemplate('pong'));
// });

ipcMain.handle(EXECUTE_COMMAND, async (event, command) => {
  const res = await execCommandAsync(command);
  return res;
});

ipcMain.handle(CHOOSE_SHELL_PATH, async (event, arg) => {
  const defaultPath = app.getPath('home');
  // user data path:  C:\Users\weibin2.zheng\AppData\Roaming\Electron
  // session data path:  C:\Users\weibin2.zheng\AppData\Roaming\Electron
  // app data path:  C:\Users\weibin2.zheng\AppData\Roaming
  // console.log('user data path: ', app.getPath('userData'));
  // console.log('session data path: ', app.getPath('sessionData'));
  // console.log('app data path: ', app.getPath('appData'));
  // if (process.platform === 'win32') {
  //   defaultPath = app.getPath('exe');
  // }
  const res = await dialog.showOpenDialog({
    title: 'Choose Shell Path',
    defaultPath,
    // filters: [{ extensions: ['json'], name: 'json' }],
  });

  if (res.canceled) {
    return undefined;
  }
  return res.filePaths[0];
});

ipcMain.handle(EXECUTE_SPAWN, (event, arg) => {
  const { command, args, opts } = arg;
  const id = execSpawn(
    { command, args, opts },
    {
      onResponse: (processId, result) => {
        mainWindow?.webContents.send(SPAWN_RESPONSE, {
          id: processId,
          data: result,
          type: 'response',
        });
      },
      onError: (processId, error) => {
        mainWindow?.webContents.send(SPAWN_RESPONSE, {
          id: processId,
          data: error,
          type: 'error',
        });
      },
      onClose: (processId) => {
        mainWindow?.webContents.send(SPAWN_RESPONSE, {
          id: processId,
          type: 'close',
        });
      },
    }
  );
  return id;
});

ipcMain.on(SET_SHELL_PATH, (event, arg) => {
  console.log('set shell path : ', arg);
  setShellPath(arg);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

// const installExtensions = async () => {
//   const installer = require('electron-devtools-installer');
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//   const extensions = ['REACT_DEVELOPER_TOOLS'];
//   return installer
//     .default(
//       extensions.map((name) => installer[name]),
//       forceDownload
//     )
//     .catch(console.log);
// };

const createWindow = async () => {
  if (isDebug) {
    // await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
