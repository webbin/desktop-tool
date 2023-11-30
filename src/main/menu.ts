import {
  app,
  Menu,
  // shell,
  BrowserWindow,
  MenuItemConstructorOptions,
  dialog,
  ipcMain,
  IpcMainEvent,
} from 'electron';

import os from 'os';
import fs from 'fs';

import {
  GET_COMMAND_LIST,
  REPLY_COMMAND_LIST,
  TOGGLE_COMMAND_FILTER,
  SHOW_COMMAND_LIST,
  SHOW_IMPORT_COMMAND_LIST,
  SHOW_ADD_COMMAND,
} from './Constant';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: 'Tools',
      submenu: [
        {
          label: 'About ElectronReact',
          // selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: 'Hide App',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click() {
            // shell.openExternal('https://electronjs.org');
          },
        },
      ],
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: 'Add Command',
            accelerator: 'Ctrl+N',
            click: () => {
              this.mainWindow.webContents.send(SHOW_ADD_COMMAND);
            },
          },
          {
            label: 'Export To File',
            click: () => {
              this.showExportDialog();
            },
          },
          {
            label: 'Export To Text',
            click: () => {
              this.mainWindow.webContents.send(SHOW_COMMAND_LIST);
            },
          },
          {
            label: 'Import From Json Text',
            click: () => {
              this.mainWindow.webContents.send(SHOW_IMPORT_COMMAND_LIST);
            },
          },
          {
            label: '&Open',
            accelerator: 'Ctrl+O',
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: '&Edit',
        submenu: [
          {
            label: '&Filter',
            accelerator: 'Ctrl+F',
            // selector: 'undo:'
            click: () => {
              this.mainWindow.webContents.send(TOGGLE_COMMAND_FILTER);
            },
          },
          // { label: '&Undo', accelerator: 'Ctrl+Z', selector: 'undo:' },
          // { label: '&Redo', accelerator: 'Shift+Ctrl+Z', selector: 'redo:' },
        ],
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development' ||
          process.env.DEBUG_PROD === 'true'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  },
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
              ],
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'About',
            click: this.showAboutDialog,
          },
          // {
          //   label: 'Documentation',
          //   click() {
          //     shell.openExternal(
          //       'https://github.com/electron/electron/tree/main/docs#readme'
          //     );
          //   },
          // },
          // {
          //   label: 'Community Discussions',
          //   click() {
          //     shell.openExternal('https://www.electronjs.org/community');
          //   },
          // },
          // {
          //   label: 'Search Issues',
          //   click() {
          //     shell.openExternal('https://github.com/electron/electron/issues');
          //   },
          // },
        ],
      },
    ];

    return templateDefault;
  }

  showExportDialog = () => {
    const defaultPath = app.getPath('documents');
    dialog
      .showSaveDialog({
        title: 'Export Json File',
        defaultPath,
        filters: [{ extensions: ['json'], name: 'json' }],
      })
      .then((result) => {
        if (result.canceled) return;
        const p = result.filePath;
        if (p) {
          // console.log('event names: ', ipcMain.eventNames());

          const replyListener = (event: IpcMainEvent, arg: string) => {
            // event.
            if (typeof arg === 'string' && arg.length) {
              console.log('write json file ', p, arg.length);
              fs.writeFileSync(p, arg);
            } else {
              console.log('arg wrong !');
            }

            ipcMain.removeListener(REPLY_COMMAND_LIST, replyListener);
          };
          ipcMain.on(REPLY_COMMAND_LIST, replyListener);
          this.mainWindow.webContents.send(GET_COMMAND_LIST);
        }
        console.log('open directory result: ', result);
      })
      .catch((err) => {
        console.log('open directory error ', err);
      });
  };

  // showExportCommandTextDialog = () => {
  //   const replyListener = (event: IpcMainEvent, arg: string) => {
  //     // event.
  //     if (typeof arg === 'string' && arg.length) {
  //       dialog.showMessageBox(this.mainWindow, {
  //         type: 'info',
  //         message: 'Command Json Data',
  //         detail: arg,
  //         buttons: ['OK'],
  //       });
  //     } else {
  //       console.log('arg wrong !');
  //     }

  //     ipcMain.removeListener(REPLY_COMMAND_LIST, replyListener);
  //   };
  //   ipcMain.on(REPLY_COMMAND_LIST, replyListener);
  //   this.mainWindow.webContents.send(GET_COMMAND_LIST);
  // };

  showAboutDialog = () => {
    const osInfo = `${os.type()} ${os.arch()} ${os.release()}`;
    const [cpu] = os.cpus();
    const cpuInfo = `CPU:${cpu.model}`;

    // Platform : ${process.env.PLATFORM}
    //       Arch : ${process.env.ARCH}

    const detail = `
      Version 1.0.0

      Node js Version: ${process.versions.node}
      V8 Version: ${process.versions.v8}
      Chrome Version: ${process.versions.chrome}
      Electron Version: ${process.versions.electron}

      OS Info: ${osInfo}
      CPU: ${cpuInfo}
    `;

    dialog.showMessageBox(this.mainWindow, {
      type: 'info',
      message: 'Command Book',
      title: 'About',
      detail,
      buttons: ['OK'],
    });
  };
}
