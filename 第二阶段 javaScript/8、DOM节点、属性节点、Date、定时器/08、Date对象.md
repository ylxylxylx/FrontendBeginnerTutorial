# Date 对象

> Date 对象用于处理日期和时间，可以获取当前时间的年月日时分秒，也可以通过时间戳进行时间计算。

## 一、创建 Date 对象

```js
// 获取当前时间
var now = new Date();
console.log(now);
// 输出: Mon Aug 24 2020 16:29:22 GMT+0800 (中国标准时间)

// 通过时间戳创建
console.log(new Date(1598257762399));
// 输出: Mon Aug 24 2020 16:29:22 GMT+0800

// 通过日期字符串创建
console.log(new Date('2020 8 24 9:10:16'));
// 输出: Mon Aug 24 2020 09:10:16 GMT+0800

// 通过年月日参数创建（月份从 0 开始！）
console.log(new Date(2020, 8, 24, 9, 10, 16));
// 输出: Thu Sep 24 2020 09:10:16 GMT+0800
// ⚠️ 月份 8 对应 9 月，因为月份从 0 开始
```

## 二、获取日期时间

```js
var now = new Date();

console.log(now.getFullYear());     // 获取完整年份：2020
console.log(now.getMonth() + 1);    // 获取月份：0-11，需要 +1
console.log(now.getDate());         // 获取日期：1-31

console.log(now.getHours());        // 获取小时：0-23
console.log(now.getMinutes());      // 获取分钟：0-59
console.log(now.getSeconds());      // 获取秒：0-59

console.log(now.getDay());          // 获取星期：0-6（0=周日）
console.log(now.getMilliseconds()); // 获取毫秒：0-999
```

### ⚠️ 易错点

| 方法 | 返回范围 | 注意事项 |
|------|---------|---------|
| `getMonth()` | 0-11 | **需要 +1** 才是实际月份 |
| `getDay()` | 0-6 | **0 是周日**，1-6 是周一到周六 |
| `getDate()` | 1-31 | 直接使用，无需调整 |

## 三、时间戳

时间戳是从 **1970年1月1日 0点0分0秒** 到当前时间的**毫秒数**。

```js
// 获取时间戳
console.log(now.getTime());  // 1598257762399

// 根据时间戳获取时间对象
console.log(new Date(1598257762399));
// 输出: Mon Aug 24 2020 16:29:22 GMT+0800
```

### 时间戳的应用

```js
// 计算两个时间的差值
var start = new Date('2020-1-1');
var end = new Date('2020-12-31');
var diff = end.getTime() - start.getTime();  // 毫秒差
var days = diff / (1000 * 60 * 60 * 24);      // 转换为天数
console.log(days);  // 365
```

## 四、格式化日期

```js
function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // 补零
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

console.log(formatDate(new Date()));
// 输出: 2020-08-24 16:29:22
```

---

**小结**

| 方法 | 作用 | 返回范围 |
|------|------|---------|
| `getFullYear()` | 获取年份 | 四位数 |
| `getMonth()` | 获取月份 | 0-11（需+1） |
| `getDate()` | 获取日期 | 1-31 |
| `getDay()` | 获取星期 | 0-6（0=周日） |
| `getHours()` | 获取小时 | 0-23 |
| `getMinutes()` | 获取分钟 | 0-59 |
| `getSeconds()` | 获取秒 | 0-59 |
| `getTime()` | 获取时间戳 | 毫秒数 |