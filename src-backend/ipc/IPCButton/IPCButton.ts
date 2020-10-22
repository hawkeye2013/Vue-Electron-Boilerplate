import { ipcMain, IpcMainEvent } from 'electron';

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
