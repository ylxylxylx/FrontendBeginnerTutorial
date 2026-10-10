# Cookie

> Cookie 是浏览器端用于存储用户信息的一个字段，属于 document 的属性，一般记录用户的登录状态或用户名密码等信息

## 一、Cookie 基本操作

### 读取 Cookie

```javascript
console.log(document.cookie);
// 输出格式: "username=张三; age=20"
```

### 增（添加数据）

```javascript
document.cookie = "username=张三";
document.cookie = "age=20";
// Cookie 赋值是追加，不会覆盖之前的数据
```

> **注意**：Cookie 不同于普通 JS 变量，赋值的新数据会**追加**到老数据后面，不会覆盖

### 改（修改数据）

```javascript
document.cookie = "username=李四";
// key 存在 → 覆盖对应的 value
```

### 删（删除数据）

```javascript
// 把有效期设置为过去的时间点 → 立即删除
var time = new Date("2020-09-03 10:28:00");
document.cookie = "sex=男;expires=" + time;
```

## 二、Cookie 键值对规则

```
Cookie存储格式: "key1=value1; key2=value2; key3=value3"

规则:
  key不重复 → 赋值时:
    key存在 → 覆盖更新对应的value（改）
    key不存在 → 追加新的键值对（增）
```

## 三、有效期 expires

### 默认行为

| 情况 | Cookie行为 |
|------|-----------|
| 网页窗口关闭 | 自动清理Cookie |
| 网页刷新 | **不清理**Cookie |
| 设置有效期（未来时间） | 长期存储，到期自动删除 |
| 设置有效期（过去时间） | 立即删除 |

### 设置有效期

```javascript
var time = new Date("2020-09-03 12:28:00");
document.cookie = "sex=男;expires=" + time;
```

> **注意**：有效期存储可能需要在服务器环境下才能成功。`http://` 开头是服务器环境，`file://` 开头是本地环境

## 四、Cookie 增删改查总结

| 操作 | 写法 | 说明 |
|------|------|------|
| 查 | `document.cookie` | 返回所有Cookie字符串 |
| 增 | `document.cookie = "key=value"` | key不存在则追加 |
| 改 | `document.cookie = "key=newValue"` | key存在则覆盖 |
| 删 | `document.cookie = "key=;expires=过去时间"` | 设置过期时间删除 |

## 五、Cookie 自动登录示例

```javascript
// 1. 从本地取出cookie值
var cookie = document.cookie;

if (cookie.includes("username")) {
    // 有cookie → 自动登录
    // 四种方式提取用户名：
    alert("欢迎回来: " + cookie.substr(9));
    alert("欢迎回来: " + cookie.substring(9));
    alert("欢迎回来: " + cookie.slice(9));
    alert("欢迎回来: " + cookie.split('=')[1]);
} else {
    // 无cookie → 首次登录
    var name = prompt("请输入你的用户名");

    // 设置三天内自动登录
    var now = new Date();
    // 方式1: getTime() + 毫秒数
    var after = new Date(now.getTime() + 24 * 60 * 60 * 1000 * 3);
    // 方式2: setDate() + 天数
    now.setDate(now.getDate() + 3);

    // 把cookie的有效期设置为三天后
    document.cookie = "username=" + name + ";expires=" + after;
}
```

### 计算三天后的两种方式

```javascript
var now = new Date();

// 方式1: 毫秒数计算
var after = new Date(now.getTime() + 24 * 60 * 60 * 1000 * 3);

// 方式2: 日期计算
now.setDate(now.getDate() + 3);
```

### 提取Cookie值的四种方式

```javascript
// 假设 cookie = "username=张三"
cookie.substr(9)       // 从第9个字符截取到末尾
cookie.substring(9)    // 同上
cookie.slice(9)        // 同上
cookie.split('=')[1]   // 按=分割，取第二部分（最通用）
```

> **推荐**：`split('=')[1]` 最通用，不依赖key的长度

## 六、Cookie 的局限性

| 局限 | 说明 |
|------|------|
| 容量小 | 约4KB |
| 字符串格式 | 只能存字符串，需手动解析 |
| 操作不便 | 没有现成的API，需手动拼接字符串 |
| 安全性 | 可被客户端读取，敏感信息需加密 |
| 有效期依赖服务器环境 | expires在file://环境下可能失效 |