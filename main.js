const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path');
require('./src/menu')

const createWindow = () => {
  const win = new BrowserWindow({
    height: 500,
    width: 1300,
		webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      printOptions: {
        silent: true,
      },
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  win.loadFile('index.html');
  win.webContents.openDevTools()
};

app.whenReady().then(() => {
  createWindow();

	app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

ipcMain.handle('myfunc', async (event, arg) => {
  console.log('Received message from renderer:', arg);
  
  return new Promise(function(resolve, reject) {
    if (arg.message === 'Hello World') {
        resolve("this worked!");
    } else {
        reject("this didn't work!");
    }
  });  
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.disableHardwareAcceleration()