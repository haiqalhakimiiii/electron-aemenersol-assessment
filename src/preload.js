// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  login: (credentials) => ipcRenderer.invoke('login', credentials),
  fetchAPI: () => ipcRenderer.invoke('fetch-api'),
  logout: () => ipcRenderer.invoke('logout'),
});
