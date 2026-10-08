# switch 多分支

> 本节深入学习 switch 语句，掌握固定值匹配的多分支写法及穿透特性。

## switch 语法

当条件是**固定值匹配**（===）时，switch 比 if-else if 更清晰：

```javascript
switch (表达式) {
    case 值1:
        // 匹配值1时执行
        break;
    case 值2:
        // 匹配值2时执行
        break;
    default:
        // 以上都不匹配时执行
        break;
}
```

### 执行流程

1. 计算 `switch` 后的表达式的值
2. 从上到下依次与 `case` 的值比较（使用 === 全等比较）
3. 匹配成功，执行该 case 下面的代码
4. 遇到 `break`，跳出 switch 语句
5. 如果所有 case 都不匹配，执行 `default`

## break 与穿透

### 没有 break 的穿透现象

```javascript
var num = 2;
switch (num) {
    case 1: console.log("一");
    case 2: console.log("二");   // 匹配，输出"二"
    case 3: console.log("三");   // 穿透，输出"三"
    default: console.log("其他"); // 穞透，输出"其他"
}
// 最终输出：二、三、其他
```

> ⚠️ 没有 break，匹配后**从该 case 开始往下全部执行**，不再判断后续 case。

### 利用穿透实现多个值匹配同一逻辑

```javascript
var month = 2;
switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        console.log("31天的大月");
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        console.log("30天的小月");
        break;
    case 2:
        console.log("28或29天的2月");
        break;
}
```

> 💡 多个 case 连着写，共享同一段代码和 break，这是穿透的**合理用法**。

## switch vs if-else if

| 对比项 | switch | if-else if |
|--------|--------|------------|
| 条件类型 | 固定值匹配（===） | 范围判断（>、<、>=） |
| 适用场景 | 月份、星期、菜单选项 | 成绩等级、价格区间 |
| 可读性 | 值多时更清晰 | 范围判断更自然 |
| 灵活性 | 只能匹配具体值 | 可写任意条件表达式 |

### 示例对比：判断星期

```javascript
// switch 版 — 更清晰
var day = 3;
switch (day) {
    case 1: console.log("周一"); break;
    case 2: console.log("周二"); break;
    case 3: console.log("周三"); break;
    case 4: console.log("周四"); break;
    case 5: console.log("周五"); break;
    default: console.log("周末"); break;
}

// if-else if 版 — 也能写，但不如 switch 清晰
if (day === 1) { console.log("周一"); }
else if (day === 2) { console.log("周二"); }
else if (day === 3) { console.log("周三"); }
else if (day === 4) { console.log("周四"); }
else if (day === 5) { console.log("周五"); }
else { console.log("周末"); }
```

### 示例对比：判断成绩等级

```javascript
// if-else if 版 — 更自然
if (score >= 90) { console.log("优秀"); }
else if (score >= 80) { console.log("良好"); }
else if (score >= 60) { console.log("及格"); }
else { console.log("不及格"); }

// switch 版 — 需额外处理，不推荐
// switch 只能匹配具体值，范围判断需要变通
```

## default 的位置

default 可以放在任何位置，但**习惯放最后**：

```javascript
// 放最后（推荐）
switch (num) {
    case 1: console.log("一"); break;
    default: console.log("其他"); break;
}

// 放中间也可以，但需要 break
switch (num) {
    case 1: console.log("一"); break;
    default: console.log("其他"); break;
    case 2: console.log("二"); break;
}
```

> 💡 不管 default 放哪里，只有在所有 case 都不匹配时才执行 default。

## 常见错误

### 1. 忘写 break

```javascript
// ❌ 忘写 break，导致穿透
switch (num) {
    case 1: console.log("一");
    case 2: console.log("二");  // 匹配1时也会执行这里
}
```

### 2. case 用范围判断

```javascript
// ❌ switch 的 case 只能是固定值
switch (score) {
    case score >= 90:  // 错误！case 后不能写条件表达式
}

// ✅ 范围判断用 if-else if
if (score >= 90) { ... }
```

### 3. case 的值类型不匹配

```javascript
var num = "1";  // 字符串
switch (num) {
    case 1: console.log("数字1"); break;   // 不匹配，=== 比较类型
    case "1": console.log("字符串1"); break; // 匹配
}
```

## 速记口诀

> switch 匹配固定值，case 逐一比对；
> break 别忘防穿透，穿透利用多值同；
> default 兜底放最后，范围判断用 if 更好；