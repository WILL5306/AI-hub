// renderer.js - 带有记忆功能的版本

const menuItems = document.querySelectorAll('.menu-item');
const webview = document.getElementById('webview');
const loading = document.getElementById('loading');

// === 核心逻辑：初始化加载 ===
// 1. 从本地存储中读取上次的 URL，如果没有就用 DeepSeek 作为默认
const savedUrl = localStorage.getItem('lastActiveUrl');
const defaultUrl = 'https://chat.deepseek.com'; 
const targetUrl = savedUrl || defaultUrl;

// 2. 让 Webview 加载这个 URL
webview.src = targetUrl;

// 3. 遍历菜单，设置点击事件并点亮正确的图标
menuItems.forEach(item => {
    const itemUrl = item.getAttribute('data-url');

    // 如果这个菜单的链接等于我们要加载的链接，就把它设为高亮
    if (itemUrl === targetUrl) {
        // 先移除 HTML 里可能写死的 active
        menuItems.forEach(el => el.classList.remove('active')); 
        item.classList.add('active');
    }

    item.addEventListener('click', () => {
        // --- 样式切换 ---
        menuItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');

        // --- 页面跳转与保存 ---
        if (itemUrl && webview.src !== itemUrl) {
            loading.style.display = 'flex';
            webview.src = itemUrl;
            
            // ✅ 关键一步：把当前 URL 存入本地存储
            localStorage.setItem('lastActiveUrl', itemUrl);
        }
    });
});

// === Loading 动画逻辑 ===
webview.addEventListener('did-start-loading', () => {
    loading.style.display = 'flex';
});

webview.addEventListener('did-stop-loading', () => {
    loading.style.display = 'none';
});