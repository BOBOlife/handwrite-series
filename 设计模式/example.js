// 单例模式的验证
import xxx from './index.js';
const a = new xxx()

const b = new xxx()
a.store = 1

console.log('b :>> ', b);
console.log('a :>> ', a);
console.dir(xxx);
