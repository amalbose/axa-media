require("babel-register");

const {app, BrowserWindow, shell} = require('electron')
const path = require('path')
const url = require('url')
const dialog = require('electron').dialog
const ipc = require('electron').ipcMain

let win

function createWindow () {
  win = new BrowserWindow({width: 900, height: 600})
  
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))


  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, function (files) {
    if (files) event.sender.send('selected-directory', files)
  })
})

ipc.on('open-movie', function (event,path) {
  shell.openItem(path)
})