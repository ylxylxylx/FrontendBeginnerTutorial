# do-while 循环

> 本节学习 do-while 循环，掌握"先执行后判断"的循环结构。

## do-while 语法

```javascript
do {
    // 循环体：至少执行一次
} while (条件);
```

### 执行流程

1. **先执行循环体**（不管条件）
2. 判断条件是否为 true
3. 如果为 true，**回到第1步**再次执行循环体
4. 如果为 false，退出循环

> do-while 是**先执行后判断**，循环体**至少执行一次**。

## while vs do-while

| 对比项 | while | do-while |
|--------|-------|----------|
| 判断时机 | 先判断后执行 | 先执行后判断 |
| 最少执行次数 | 0次（条件为false时不执行） | 1次（不管条件都执行一次） |
| 语法结尾 | 无分号 | `while (条件);` 有分号 |

### 示例对比：条件一开始就为 false

```javascript
// while 版：一次都不执行
var i = 10;
while (i <= 5) {
    console.log(i);  // 不输出
    i++;
}

// do-while 版：至少执行一次
var i = 10;
do {
    console.log(i);  // 输出 10
    i++;
} while (i <= 5);
```

## 基础示例

### 示例1：输出1到10

```javascript
var i = 1;
do {
    console.log(i);
    i++;
} while (i <= 10);
```

### 示例2：求1到100的和

```javascript
var sum = 0;
var i = 1;
do {
    sum += i;
    i++;
} while (i <= 100);
console.log("1到100的和：" + sum);  // 5050
```

### 示例3：猜数字游戏

```javascript
var target = 7;  // 目标数字
var guess;
do {
    guess = prompt("请猜一个1-10的数字") * 1;
    if (guess > target) {
        alert("猜大了");
    } else if (guess < target) {
        alert("猜小了");
    }
} while (guess !== target);
alert("恭喜，猜对了！");
```

> 💡 猜数字是 do-while 的典型场景：**至少需要猜一次**，猜对才退出。

### 示例4：密码验证

```javascript
var password;
do {
    password = prompt("请输入密码");
    if (password !== "123456") {
        alert("密码错误，请重新输入");
    }
} while (password !== "123456");
alert("密码正确，登录成功！");
```

## do-while 的典型使用场景

do-while 适合**至少执行一次**的场景：

| 场景 | 说明 |
|------|------|
| 密码验证 | 至少输入一次密码 |
| 猜数字 | 至少猜一次 |
| 菜单选择 | 至少显示一次菜单 |
| 输入校验 | 至少输入一次再判断 |

## 常见错误

### 1. 忘记分号

```javascript
// ❌ while 后面忘记分号，语法错误
do {
    console.log(i);
    i++;
} while (i <= 10)   // 缺少分号

// ✅ 正确
do {
    console.log(i);
    i++;
} while (i <= 10);  // 别忘了分号
```

### 2. 条件写反导致多执行一次

```javascript
var i = 1;
do {
    console.log(i);
    i++;
} while (i <= 0);  // 条件为false，但已经输出了1
// while 版不会输出
```

## 三种循环的选择

| 循环类型 | 使用场景 |
|----------|----------|
| for | 循环次数**确定**时（最常用） |
| while | 循环次数**不确定**，可能一次都不执行 |
| do-while | 循环次数**不确定**，但至少执行一次 |

## 速记口诀

> do-while 先做后判断，至少执行一次循环；
> while 后面加分号，密码验证最常用；
> 次数确定用 for，不确定用 while 或 do-while；