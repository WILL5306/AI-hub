// 获取 DOM 元素
const menuItems = document.querySelectorAll('.menu-item');
const webview = document.getElementById('webview');
const loading = document.getElementById('loading');

// 遍历菜单添加点击事件
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // 1. 样式切换
        menuItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');

        // 2. 页面跳转
        const url = item.getAttribute('data-url');
        if (url && webview.src !== url) {
            loading.style.display = 'flex'; // 显示加载中
            webview.src = url;
        }
    });
});

// 监听 Webview 加载状态
webview.addEventListener('did-start-loading', () => {
    loading.style.display = 'flex';
});

webview.addEventListener('did-stop-loading', () => {
    loading.style.display = 'none';
});