# JS内置对象 - Boolean 布尔

## 一、取反运算符 `!`

`!` 有两个作用：
1. **取反**：将 true 变 false，false 变 true
2. **强制类型转换**：把其他类型转为 boolean 类型

```javascript
console.log(!true);  // false
console.log(!2);     // false（2 转布尔是 true，取反为 false）
console.log(!'2');   // false（'2' 转布尔是 true，取反为 false）
```

## 二、Boolean() 转换规则

对于以下值，转为布尔都是 **false**（记忆口诀：**0、null、undefined、NaN、空字符串**）：

| 值 | Boolean 结果 |
|----|-------------|
| `0` | `false` |
| `null` | `false` |
| `undefined` | `false` |
| `NaN` | `false` |
| `''`（空字符串） | `false` |

其他所有值转为布尔都是 **true**。

## 三、new Boolean() 对象陷阱

```javascript
var isOk = new Boolean(false);
// isOk 是一个布尔对象，值是 false
// 但对象转布尔都是 true！

if (isOk) {
    console.log('isOk转为布尔是true'); // 执行这句！
} else {
    console.log('不ok，isOk转为布尔是false');
}
```

### 用 == 比较可以取出对象的值

```javascript
console.log(isOk == true);  // false（对象的值是 false）
console.log(isOk == false); // true（对象的值是 false）
```

### 用 == false 做判断

```javascript
if (isOk == true) {
    console.log('isOk转为布尔是true');
} else {
    console.log('不ok，isOk转为布尔是false'); // 执行这句
}

if (isOk == false) {
    console.log('isOk转为布尔是true'); // 执行这句
} else {
    console.log('不ok，isOk转为布尔是false');
}
```

## 四、最佳实践

> **在使用布尔作为判断条件的时候，尽量不要使用布尔对象（`new Boolean()`），直接使用布尔值。**

```javascript
// 推荐 ✅
var flag = false;
if (flag) { ... }

// 不推荐 ❌
var flag = new Boolean(false);
if (flag) { ... } // 始终为 true！
```

## 总结

| 概念 | 说明 |
|------|------|
| `!` | 取反 + 强制转布尔 |
| 转为 false 的值 | `0`, `null`, `undefined`, `NaN`, `''` |
| `new Boolean()` | 创建对象，**对象转布尔始终为 true** |
| 最佳实践 | 判断条件用布尔值，不用布尔对象 |