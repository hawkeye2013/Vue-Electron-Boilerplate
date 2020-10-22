import { ipcMain, IpcMainEvent } from 'electron';
import * as path from 'path';
import App from '../../core/App';

export class IPCButton {
  constructor() {
    this.watchIPCChannels();
  }

  watchIPCChannels() {
    ipcMain.on('button::click', this.handleButtonClick);
  }

  handleButtonClick(event: IpcMainEvent, args: string[]) {
    console.log('Handle Button Click');
    console.log(event, args);
  }
}
