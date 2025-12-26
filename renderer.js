const tabs = document.querySelectorAll('.tab-btn');
const views = document.querySelectorAll('.ai-view');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 1. 移除所有按钮的激活状态
        tabs.forEach(t => t.classList.remove('active'));
        // 2. 给当前点击的按钮添加激活状态
        tab.classList.add('active');

        // 3. 获取目标 ID
        const targetId = tab.getAttribute('data-target');

        // 4. 隐藏所有 Webview
        views.forEach(view => view.classList.remove('active'));

        // 5. 显示目标 Webview
        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.classList.add('active');
        }
    });
});