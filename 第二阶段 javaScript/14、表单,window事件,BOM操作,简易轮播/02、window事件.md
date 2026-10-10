# window 事件

发生在浏览器窗口上的事件：load、scroll、resize、error。

---

## window 事件一览

| 事件 | 触发时机 | 特点 |
|------|----------|------|
| `onload` | 页面所有资源加载完成 | HTML + CSS + 图片等 |
| `onscroll` | 页面滚动时 | 连续触发 |
| `onresize` | 浏览器窗口尺寸变化时 | 连续触发 |
| `onerror` | 浏览器中出现错误时 | 可拦截错误 |

---

## 一、load 加载事件

```javascript
window.onload = function () {
    // 页面所有 HTML 和 CSS 渲染完成后执行
    console.log("窗口/页面加载完成");
};
```

- 一般将 JS 逻辑写在 `onload` 中，确保 DOM 元素已加载
- `onload` 也适用于 `<img>` 标签：

```javascript
var img = document.getElementsByTagName("img")[0];
img.onload = function () {
    console.log("图片加载完成");
};
```

---

## 二、scroll 滚动事件

```javascript
window.onscroll = function () {
    console.log("网页滚动");
};
```

- 滚动时**连续触发**，注意性能优化
- 常配合 `scrollTop` 判断滚动位置

---

## 三、resize 窗口重置事件

```javascript
window.onresize = function () {
    console.log("页面尺寸变化");
    // 获取浏览器宽度
    var width = window.innerWidth;
    // 响应式：浏览器宽度与文字尺寸等比例
    document.querySelector("h1").style.fontSize = width / 20 + "px";
};
```

### 宽度属性对比

| 属性 | 说明 |
|------|------|
| `window.innerWidth` | 浏览器内宽度（= 网页宽度） |
| `window.outerWidth` | 浏览器外宽度（含边框、滚动条） |

> 注：`innerWidth`/`outerWidth` 是 window 的属性；`offsetWidth`/`clientWidth` 是元素属性。

---

## 四、error 错误事件

### window.onerror

```javascript
window.onerror = function () {
    console.log("检测到错误");
    // return true;  // 拦截错误，控制台不报错
    // return false; // 不拦截，控制台报错（默认）
    return true;
};
```

- 默认返回 `false`，错误会在控制台报错
- 返回 `true` 可拦截错误，控制台不报错
- **注意**：`onerror` 是老版本语法，可能被废除（Firefox 已不支持）
- 推荐使用 `try...catch` 代替

### img.onerror — 图片加载失败处理

```javascript
img.onerror = function () {
    console.log("图片加载出错");
    // 设置默认头像
    img.src = "img/default.gif";
};
```

- 常用于用户头像加载失败时设置默认头像
- `img.onload` + `img.onerror` 配合使用

---

## 五、JS 错误与进程终止

```javascript
console.log(a);  // 报错：a is not defined
console.log(123); // 不会执行，因为上面报错后进程终止
```

- JS 中一旦报错，会**终止进程**，停止执行后续代码
- 使用 `try...catch` 可以捕获错误，防止进程终止