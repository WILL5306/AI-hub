const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    title: "AI Hub 工作台",
    
    // ✅ 新增：加载根目录下的 icon.png 图标
    icon: path.join(__dirname, 'icon.png'), 
    
    // 隐藏顶部原生菜单栏，更简洁
    autoHideMenuBar: true, 
    
    webPreferences: {
      webviewTag: true, // 允许使用 webview 标签
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');

  // 窗口关闭时只是清空引用
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // === 注册老板键 (Shift+Z) ===
  const ret = globalShortcut.register('Shift+Z', () => {
    if (!mainWindow) return;

    if (mainWindow.isVisible()) {
      if (mainWindow.isFocused()) {
        mainWindow.hide(); // 隐藏
      } else {
        mainWindow.show(); // 显示并聚焦
        mainWindow.focus();
      }
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  if (!ret) {
    console.log('快捷键 Shift+Z 注册失败');
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 退出时注销快捷键
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});