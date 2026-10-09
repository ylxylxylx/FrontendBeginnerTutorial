# JS内置对象 - Number 数字

## 一、创建数字

### 方式一：直接赋值

```javascript
var n = 2;
```

### 方式二：Number() 函数

`Number()` 除了创建数字，还可以进行类型转换成 number 类型：

```javascript
n = Number(2);
console.log(n, typeof n); // 2 "number"
```

### 方式三：new Number() 创建数字对象

```javascript
var num = new Number(2); // num 是一个数字对象，值是2
console.log(num, typeof num); // Number {2} "object"
```

> **注意**：使用 `new` 创建的都是**对象**，typeof 返回 `"object"`。

## 二、数字对象 vs 数字

```javascript
var n = 2;
var num = new Number(2);

// 数字对象可以和数字做运算，结果是 number
console.log(n + num); // 4

// == 比较值（会类型转换），=== 严格比较
console.log(n == num);  // true（值相等）
console.log(n === num); // false（类型不同：number vs object）
```

## 三、Boolean 转换陷阱

### Number() 转换

```javascript
var isOk = Number(false);
console.log(isOk); // 0

if (isOk) {
    console.log('isOk转为布尔是true');
} else {
    console.log('不ok，isOk转为布尔是false'); // 执行这句
}
```

### new Number() 对象陷阱

```javascript
var isOpen = new Number(false);
// isOpen 是一个数字对象，对象的值是 false
// 但对象始终存在，转成布尔都是 true，和对象的值无关！

if (isOpen) {
    console.log('保险箱开了吗，一百万'); // 执行这句！
} else {
    console.log('打不开！');
}
```

> **重要**：一个空对象和空数组转成布尔也是 `true`：
> ```javascript
> console.log(Boolean({})); // true
> console.log(Boolean([])); // true
> ```

## 四、内存模型

- **对象**存在内存的**堆区**，在堆区的对象都有一个指针（地址、门牌号、编号）指向这个对象
- **基本类型**存在内存的**栈区**

## 五、Number 内置属性和方法

### toString() 转字符串

```javascript
var num = 3.1415926;
console.log(num.toString()); // "3.1415926"
```

### toFixed() 保留小数位数

```javascript
console.log(num.toFixed(2)); // "3.14"
```

### isInteger() 判断是否为整数

```javascript
console.log(Number.isInteger(-2)); // true
```

### parseInt() 从字符串解析整数

```javascript
console.log(Number.parseInt('3.14'));         // 3
console.log(Number.parseInt('3.1415xxx92'));  // 3（遇到非数字停止）
```

### parseFloat() 从字符串解析小数

```javascript
console.log(Number.parseFloat('3.14'));          // 3.14
console.log(Number.parseFloat('3.1V415xxx92'));  // 3.1（遇到非数字停止）
```

> `Number.` 可以省去：`parseInt()`、`parseFloat()`

## 六、isNaN 判断

### isNaN() 全局方法

判断一个数是否是非数字，**会先转为数字**再判断：

```javascript
console.log(isNaN(NaN));    // true
console.log(isNaN('你好')); // true（'你好'转数字是NaN）
```

### Number.isNaN() 静态方法

确定传递的值是否为 NaN，**不会进行类型转换**，必须值为 NaN 且类型为 Number 才返回 true：

```javascript
console.log(Number.isNaN(NaN));    // true
console.log(Number.isNaN('你好')); // false（不会类型转换）
```

## 总结

| 方法 | 说明 |
|------|------|
| `num.toString()` | 转字符串 |
| `num.toFixed(n)` | 保留n位小数 |
| `Number.isInteger(x)` | 是否为整数 |
| `parseInt(str)` | 解析整数 |
| `parseFloat(str)` | 解析小数 |
| `isNaN(x)` | 是否非数字（会类型转换） |
| `Number.isNaN(x)` | 是否为NaN（不类型转换） |