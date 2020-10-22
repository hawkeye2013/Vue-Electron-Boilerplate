"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IpcController_1 = require("../ipc/IpcController");
var url = require("url");
var path = require("path");
var isDevEnv = false;
var App = /** @class */ (function () {
    function App() {
    }
    App.onWindowAllClosed = function () {
        if (process.platform !== 'darwin') {
            App.application.quit();
        }
    };
    App.onClose = function () {
        // Dereference the window object.
        App.mainWindow = null;
    };
    App.onReady = function () {
        App.mainWindow = new App.BrowserWindow({
            width: 1200,
            height: 800,
            webPreferences: {
                nodeIntegration: true,
                allowRunningInsecureContent: isDevEnv ? true : false
            }
        });
        if (isDevEnv) {
            App.mainWindow.webContents.openDevTools();
            App.mainWindow.loadURL('http://localhost:8080');
        }
        else {
            App.mainWindow.loadURL(url.format({
                pathname: path.join(App.application.getAppPath(), 'dist', 'index.html'),
                protocol: 'file:',
                slashes: true
            }));
        }
        App.mainWindow.webContents.on('dom-ready', function () {
            setInterval(function () {
                App.mainWindow.webContents.send('app-data');
            }, 10000);
        });
        App.mainWindow.on('closed', App.onClose);
    };
    App.main = function (app, browserWindow) {
        if (process.argv.includes('--dev')) {
            isDevEnv = true;
        }
        App.ipcController = new IpcController_1.IpcController();
        App.BrowserWindow = browserWindow;
        App.application = app;
        App.application.on('window-all-closed', App.onWindowAllClosed);
        App.application.on('ready', App.onReady);
    };
    App.getDevEnv = function () {
        return isDevEnv;
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=App.js.map