# window 事件

## 常用 window 事件

### 1. onload — 页面加载完毕

页面的 HTML、CSS、JS、图片等资源加载完毕后触发。

```javascript
window.onload = function () {
    console.log('页面加载完毕');
    // JS 代码都写在 load 事件中，确保 DOM 已加载
};
```

**img 的 load 和 error 事件：**

```javascript
var img = document.querySelector('img');
img.onload = function (ev) {
    console.log('图片加载完毕', ev);
};
img.onerror = function (ev) {
    console.log('图片加载失败', ev);
};
```

### 2. onhashchange — URL 锚点变化

当当前 URL 的锚部分（`#` 后面的内容）发生修改时触发。

```javascript
window.onhashchange = function (ev) {
    console.dir(ev);
};
```

### 3. onresize — 页面尺寸变化

当浏览器窗口尺寸发生变化时触发。

```javascript
window.onresize = function (ev) {
    console.log('页面尺寸正在发生变化');
};
```

### 4. onscroll — 页面滚动

当滚动条位置发生改变时触发。

```javascript
window.onscroll = function () {
    console.log('页面发生滚动');
};
```

## window 事件总结

| 事件 | 触发时机 | 常见用途 |
|------|----------|----------|
| `onload` | 页面资源全部加载完毕 | 确保 DOM 加载后再执行 JS |
| `onhashchange` | URL 锚点变化 | 单页应用路由切换 |
| `onresize` | 窗口尺寸变化 | 响应式布局调整 |
| `onscroll` | 滚动条位置变化 | 固定导航、回到顶部 |

## 实际应用：动态固定导航栏

```javascript
var nav = document.querySelector('.nav');
window.onscroll = function () {
    var scrollTop = document.scrollingElement.scrollTop;
    if (scrollTop >= 100) {
        nav.style.position = 'fixed';
    } else {
        nav.style.position = 'static';
    }
};