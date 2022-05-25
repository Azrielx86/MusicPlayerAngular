const { app, ipcMain, BrowserWindow, dialog } = require("electron");
const fs = require("fs");
const mm = require("music-metadata");

let appWin;

createWindow = () => {
  appWin = new BrowserWindow({
    width: 1200,
    height: 600,
    title: "Angular and Electron",
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  appWin.loadURL(`file://${__dirname}/dist/index.html`);

  appWin.setMenu(null);

  appWin.webContents.openDevTools();

  appWin.on("closed", () => {
    appWin = null;
  });
};

/**
 * @param {string} path
 * @returns {fs.Dirent[]}
 */
const getAllFiles = (path) => {
  const filesArray = [];

  let files = fs.readdirSync(path, {
    withFileTypes: true,
  });

  for (const value of files) {
    if (value.isDirectory()) {
      getAllFiles(`${path}/${value.name}`).forEach((element) => {
        filesArray.push(element);
      });
    } else {
      if (value.name.match(/\b(\.mp3)|(\.flac)\b/i)) {
        value.fullpath = `${path}/${value.name}`;
        filesArray.push(value);
      }
    }
  }

  for (const [i, value] of filesArray.entries()) {
    value.index = i;
  }

  return filesArray;
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("message", (event) => {
  event.reply("reply", "pong");
});

ipcMain.on("open-file-dialog-for-file", async (event) => {
  let dir = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const filesArray = getAllFiles(dir["filePaths"][0]);

  for (const value of filesArray) {
    await mm.parseFile(value.fullpath).then((meta) => {
      value.meta = meta;
      if (value.meta.common.title === undefined) value.meta.common.title = value.name;
      value.cover = mm.selectCover(meta.common.picture);
      if (value.cover)
        value.coverURL = `data:${value.cover.format};base64,${value.cover.data.toString("base64")}`;
      else value.coverURL = " ";
    });
  }

  if (dir) event.reply("selected-file", filesArray);
});
