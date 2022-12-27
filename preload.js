const {
  contextBridge,
  ipcRenderer
} = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

// contextBridge.exposeInMainWorld(
//   "api", {
//       invoke: (channel, data) => {
//           let validChannels = ["myfunc"];
//           if (validChannels.includes(channel)) {
//             return ipcRenderer.invoke(channel, data); 
//           }
//       },
//   }
// );

contextBridge.exposeInMainWorld('api', {
  invoke: (channel, data) => {
      return ipcRenderer.invoke(channel, data); 
  },
});