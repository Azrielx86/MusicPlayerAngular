const { app, ipcMain, BrowserWindow, dialog } = require("electron");
const fs = require("fs");

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

readDir = (path) => {
  let files = fs.readdirSync(path, {
    withFileTypes: true,
  });
  return files;
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

  // let files = fs.readdirSync(dir["filePaths"][0], {
  //   withFileTypes: true,
  // });

  let files = readDir(dir["filePaths"][0]);

  for (const value of files) {
    // Todo: remove
    // if (value.isDirectory())
    //   console.log(`${dir["filePaths"][0]}/${value.name} Es directorio`);
    // else if (value.isFile())
    //   console.log(`${dir["filePaths"][0]}/${value.name} Es archivo`);
    value.fullpath = `${dir["filePaths"][0]}/${value.name}`;
  }

  if (dir) event.reply("selected-file", files);
});
