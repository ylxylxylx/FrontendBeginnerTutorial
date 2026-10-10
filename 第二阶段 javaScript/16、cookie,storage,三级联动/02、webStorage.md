# webStorage

> HTML5 新增的本地存储对象，相当于浏览器本地的小型数据库，包含 **sessionStorage** 和 **localStorage** 两种

## 一、sessionStorage vs localStorage

| 对比项 | sessionStorage | localStorage |
|--------|---------------|-------------|
| 名称 | 会话存储 | 本地/长期存储 |
| 生命周期 | 窗口关闭立即清理 | 长期存储，不会自动清理 |
| 类比 | 类似无有效期的Cookie | 类似设置有效期的Cookie |
| 清除方式 | 窗口关闭自动清除 | 只能手动清除 |

## 二、增删改查 API

### 增（setItem）

```javascript
sessionStorage.setItem("name1", "张三");
localStorage.setItem("name2", "李四");
sessionStorage.setItem("age1", 10);
localStorage.setItem("age2", 20);
```

### 删（removeItem / clear）

```javascript
// 删除指定key
sessionStorage.removeItem("name1");
localStorage.removeItem("name2");

// 清空所有数据
sessionStorage.clear();
localStorage.clear();
```

### 改（setItem）

```javascript
// key存在则修改对应的value
sessionStorage.setItem("name1", "王五");
localStorage.setItem("name2", "赵六");
```

### 查（getItem / key）

```javascript
// 通过key获取value
sessionStorage.getItem("name1");   // "王五"
localStorage.getItem("name2");     // "赵六"

// 通过索引获取key
sessionStorage.key(0);             // 第一个key
sessionStorage.length;             // 数据条数
```

## 三、API 总结

| 方法/属性 | 作用 | 示例 |
|----------|------|------|
| `setItem(key, value)` | 巻加/修改数据 | `localStorage.setItem("name", "张三")` |
| `getItem(key)` | 查取数据 | `localStorage.getItem("name")` |
| `removeItem(key)` | 删除指定数据 | `localStorage.removeItem("name")` |
| `clear()` | 清空所有数据 | `localStorage.clear()` |
| `key(index)` | 通过索引获取key | `localStorage.key(0)` |
| `length` | 数据条数 | `localStorage.length` |

## 四、遍历所有数据

```javascript
// 遍历 sessionStorage
for (var i = 0; i < sessionStorage.length; i++) {
    var key = sessionStorage.key(i);
    var value = sessionStorage.getItem(key);
    console.log(key + " : " + value);
}

// 遍历 localStorage
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    console.log(key + " : " + value);
}
```

## 五、计数器示例（localStorage）

需求：统计当前网页的打开次数

```javascript
var count = localStorage.getItem("count");

if (!count) {
    // 首次访问
    count = 1;
} else {
    // 非首次访问
    count++;
}

localStorage.setItem("count", count);
document.write("当前网页被访问了" + count + "次");
```

### 逻辑流程

```
第一次打开:
  getItem("count") → null → count = 1 → setItem("count", 1)
  显示: "当前网页被访问了1次"

第二次打开:
  getItem("count") → "1" → count = 2 → setItem("count", 2)
  显示: "当前网页被访问了2次"

刷新页面:
  getItem("count") → "2" → count = 3 → setItem("count", 3)
  显示: "当前网页被访问了3次"
```

## 六、Cookie vs webStorage 对比

| 对比项 | Cookie | sessionStorage | localStorage |
|--------|--------|---------------|-------------|
| 容量 | 约4KB | 约5MB | 约5MB |
| API | 字符串拼接 | setItem/getItem | setItem/getItem |
| 生命周期 | 默认窗口关闭清除 | 窗口关闭清除 | 长期存储 |
| 有效期 | 可设置expires | 无 | 无 |
| 用途 | 登录状态、用户信息 | 临时数据 | 长期数据 |
| 随请求发送 | 是（HTTP请求自动携带） | 否 | 否 |

> **webStorage 优势**：容量更大、API更友好、不会随HTTP请求发送到服务器