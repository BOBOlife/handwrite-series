/**
 * 深拷贝函数 - 完整版
 * 
 * 支持的类型：
 * - 基本类型：number, string, boolean, null, undefined, symbol, bigint
 * - 引用类型：Object, Array, Date, RegExp, Map, Set, Function
 * - 特殊情况：循环引用、Symbol 作为 key
 * 
 * @param {any} obj - 需要深拷贝的对象
 * @param {WeakMap} hash - 用于处理循环引用的缓存（内部使用）
 * @returns {any} - 深拷贝后的新对象
 */
function deepClone(obj, hash = new WeakMap()) {
  
  // ============ 1. 处理 null 和 undefined ============
  // null 和 undefined 直接返回，无需处理
  if (obj === null || obj === undefined) {
    return obj;
  }

  // ============ 2. 处理基本类型 ============
  // 基本类型（number, string, boolean, symbol, bigint）不是引用类型
  // 直接返回即可，因为它们本身就是按值传递的
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    return obj;
  }

  // ============ 3. 处理函数 ============
  // 函数通常不需要深拷贝，直接返回原函数引用
  // 原因：函数的闭包无法被真正复制，强行复制会丢失闭包上下文
  if (typeof obj === 'function') {
    return obj;
  }

  // ============ 4. 处理特殊内置对象 ============
  
  // 4.1 Date 对象：使用 getTime() 获取时间戳创建新 Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // 4.2 RegExp 对象：使用 source 和 flags 创建新正则
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  // 4.3 Map 对象：创建新 Map 并递归克隆每个键值对
  if (obj instanceof Map) {
    const cloneMap = new Map();
    // 先存入缓存，处理循环引用
    hash.set(obj, cloneMap);
    obj.forEach((value, key) => {
      // Map 的 key 也可能是对象，所以 key 和 value 都需要深拷贝
      cloneMap.set(deepClone(key, hash), deepClone(value, hash));
    });
    return cloneMap;
  }

  // 4.4 Set 对象：创建新 Set 并递归克隆每个值
  if (obj instanceof Set) {
    const cloneSet = new Set();
    hash.set(obj, cloneSet);
    obj.forEach((value) => {
      cloneSet.add(deepClone(value, hash));
    });
    return cloneSet;
  }

  // ============ 5. 处理循环引用 ============
  // 使用 WeakMap 缓存已经克隆过的对象
  // 如果发现当前对象已经在缓存中，直接返回缓存的克隆对象
  // 这样可以避免无限递归导致的栈溢出
  // 
  // 例如：const obj = { a: 1 }; obj.self = obj;
  // 如果不处理循环引用，deepClone(obj) 会无限递归
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // ============ 6. 创建克隆对象 ============
  // 使用 obj.constructor 保持原型链
  // 这样克隆出来的对象和原对象是同一个类的实例
  // 
  // 例如：
  // class Person { greet() {} }
  // const p1 = new Person();
  // const p2 = deepClone(p1);
  // p2 instanceof Person  // → true
  // p2.greet()            // → 可以调用
  const cloneObj = new obj.constructor();

  // 将克隆对象存入缓存，用于处理循环引用
  // 注意：必须在递归之前存入缓存！
  hash.set(obj, cloneObj);

  // ============ 7. 处理 Symbol 作为 key 的属性 ============
  // for...in 无法遍历 Symbol 类型的 key
  // 需要使用 Object.getOwnPropertySymbols 获取所有 Symbol key
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  for (const symKey of symbolKeys) {
    cloneObj[symKey] = deepClone(obj[symKey], hash);
  }

  // ============ 8. 遍历并递归克隆所有普通属性 ============
  // 使用 for...in 遍历对象的所有可枚举属性（包括原型链上的）
  // 使用 hasOwnProperty 过滤掉原型链上的属性，只保留自身属性
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }

  return cloneObj;
}


// ============================================================
// 测试用例
// ============================================================

// 测试 1：基本对象和数组
const testObj = {
  num: 1,
  str: 'hello',
  bool: true,
  nullVal: null,
  undefinedVal: undefined,
  arr: [1, 2, { nested: 'value' }],
  obj: { a: 1, b: { c: 2 } },
};

const cloned1 = deepClone(testObj);
cloned1.arr[2].nested = 'modified';
console.log('原对象 arr[2].nested:', testObj.arr[2].nested);  // → 'value' (未被修改)
console.log('克隆对象 arr[2].nested:', cloned1.arr[2].nested); // → 'modified'

// 测试 2：循环引用
const circular = { name: 'circular' };
circular.self = circular;
const cloned2 = deepClone(circular);
console.log('循环引用测试:', cloned2.self === cloned2);  // → true (克隆对象也有循环引用)
console.log('是否为新对象:', cloned2 !== circular);      // → true

// 测试 3：特殊类型
const specialObj = {
  date: new Date('2024-01-01'),
  regex: /hello/gi,
  map: new Map([['key1', 'value1'], ['key2', { nested: true }]]),
  set: new Set([1, 2, { a: 1 }]),
  [Symbol('mySymbol')]: 'symbol value',
};

const cloned3 = deepClone(specialObj);
console.log('Date 类型:', cloned3.date instanceof Date, cloned3.date.getTime() === specialObj.date.getTime());
console.log('RegExp 类型:', cloned3.regex instanceof RegExp, cloned3.regex.source === 'hello');
console.log('Map 类型:', cloned3.map instanceof Map, cloned3.map.get('key1') === 'value1');
console.log('Set 类型:', cloned3.set instanceof Set, cloned3.set.size === 3);

console.log('\n✅ 所有测试通过！');


// ============================================================
// 导出（如果在 Node.js 模块环境中使用）
// ============================================================
// module.exports = { deepClone };
