const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "AI 聚合助手",
        icon: path.join(__dirname, 'icon.png'), // 如果你有图标的话
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // 为了演示简单，这里允许渲染进程直接使用Node
            webviewTag: true // 关键：允许使用 <webview> 标签
        }
    });

    // 隐藏默认菜单栏（可选，为了更像App）
    win.setMenuBarVisibility(false);

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});