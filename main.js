const { app, BrowserWindow } = require('electron');

let win;
app.disableHardwareAcceleration()
function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 800,
  });

  win.setResizable(false)

  win.loadURL('file://' + __dirname + '/dist/cp-ing/index.html');

  win.on('closed', () => {
    win = null;
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
