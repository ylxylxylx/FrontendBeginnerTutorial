# break 和 continue

> 本节学习循环控制语句 break 和 continue，掌握如何中断或跳过循环。

## break — 跳出循环

`break` 会**立即终止当前循环**，不再执行后续迭代：

```javascript
for (var i = 1; i <= 10; i++) {
    if (i === 5) {
        break;  // i=5 时直接退出循环
    }
    console.log(i);
}
// 输出：1 2 3 4
```

### break 的执行流程

```
i=1 → 不满足 → 输出1
i=2 → 不满足 → 输出2
i=3 → 不满足 → 输出3
i=4 → 不满足 → 输出4
i=5 → 满足 → break → 退出循环（5及之后都不输出）
```

### break 应用场景

#### 1. 找到目标就停止

```javascript
// 在1-100中找到第一个能被7整除的数
for (var i = 1; i <= 100; i++) {
    if (i % 7 === 0) {
        console.log("找到了：" + i);  // 找到了：7
        break;  // 找到就停止，不再继续
    }
}
```

#### 2. 满足条件提前退出

```javascript
// 输入密码，最多3次机会
for (var i = 1; i <= 3; i++) {
    var pwd = prompt("请输入密码（第" + i + "次机会）");
    if (pwd === "123456") {
        alert("密码正确！");
        break;  // 密码正确，不需要再试
    } else {
        alert("密码错误！");
    }
}
```

#### 3. 在 switch 中使用

```javascript
var day = 3;
switch (day) {
    case 1: console.log("周一"); break;  // 跳出switch
    case 2: console.log("周二"); break;
    case 3: console.log("周三"); break;
    default: console.log("其他"); break;
}
```

> ⚠️ switch 中的 break 只跳出 switch，不影响外层循环。

## continue — 跳过本次

`continue` 会**跳过本次循环的剩余代码**，直接进入下一次迭代：

```javascript
for (var i = 1; i <= 10; i++) {
    if (i === 5) {
        continue;  // 跳过i=5，直接进入i=6
    }
    console.log(i);
}
// 输出：1 2 3 4 6 7 8 9 10（跳过了5）
```

### continue 的执行流程

```
i=1 → 不满足 → 输出1
i=2 → 不满足 → 输出2
i=3 → 不满足 → 输出3
i=4 → 不满足 → 输出4
i=5 → 满足 → continue → 跳过输出，进入i=6
i=6 → 不满足 → 输出6
...
```

### continue 应用场景

#### 1. 跳过不需要处理的数据

```javascript
// 输出1-20中所有的奇数（跳过偶数）
for (var i = 1; i <= 20; i++) {
    if (i % 2 === 0) {
        continue;  // 偶数跳过
    }
    console.log(i);  // 只输出奇数
}
```

#### 2. 过滤无效输入

```javascript
// 只处理正数，跳过0和负数
for (var i = 0; i < 5; i++) {
    var num = prompt("请输入第" + (i + 1) + "个数") * 1;
    if (num <= 0) {
        continue;  // 非正数跳过
    }
    console.log("正数：" + num);
}
```

## break vs continue

| 对比项 | break | continue |
|--------|-------|----------|
| 作用 | 终止整个循环 | 跳过本次，继续下一次 |
| 循环是否继续 | 不继续 | 继续 |
| 形象比喻 | 直接离开教室 | 跳过这道题，做下一道 |
| 可用于 switch | ✅ 是 | ❌ 否 |

### 对比示例

```javascript
// break 版：遇到5就停
for (var i = 1; i <= 10; i++) {
    if (i === 5) break;
    console.log(i);
}
// 输出：1 2 3 4

// continue 版：跳过5继续
for (var i = 1; i <= 10; i++) {
    if (i === 5) continue;
    console.log(i);
}
// 输出：1 2 3 4 6 7 8 9 10
```

## while 中的 break 和 continue

```javascript
// while 中的 break
var i = 1;
while (i <= 10) {
    if (i === 5) break;
    console.log(i);
    i++;
}
// 输出：1 2 3 4

// while 中的 continue — ⚠️ 注意位置
var i = 0;
while (i < 10) {
    i++;              // ⚡ 更新必须放在continue之前！
    if (i === 5) continue;
    console.log(i);
}
// 输出：1 2 3 4 6 7 8 9 10
```

> ⚠️ while 中使用 continue 时，**更新语句必须放在 continue 之前**，否则会死循环！

```javascript
// ❌ 死循环！continue 跳过了 i++
var i = 1;
while (i <= 10) {
    if (i === 5) continue;  // i永远卡在5
    console.log(i);
    i++;
}
```

## 常见错误

### 1. while 中 continue 导致死循环

```javascript
// ❌ 死循环
var i = 0;
while (i < 10) {
    i++;
    if (i === 5) continue;  // ✅ 更新在continue之前，没问题
    console.log(i);
}

// ❌ 死循环
var i = 0;
while (i < 10) {
    if (i === 5) continue;  // i=5时跳过了i++
    console.log(i);
    i++;                    // 这行被跳过了
}
```

### 2. 误以为 continue 会结束循环

```javascript
// continue 只是跳过本次，不是结束循环
for (var i = 1; i <= 3; i++) {
    if (i === 2) continue;
    console.log(i);
}
// 输出：1 3（2被跳过，但循环继续）
```

## 速记口诀

> break 跳出整个循环，continue 跳过本次继续；
> break 像离场不回来，continue 像跳过做下一题；
> while 用 continue 要当心，更新语句放前面；