# 浅谈TypeScript

## 1.TypeScript是什么？ 

粗略的认为是带类型的js

- TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目。
- TypeScript 是一门静态类型、弱类型的语言。
- TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性。
- TypeScript 可以编译为 JavaScript，然后运行在浏览器、Node.js 等任何能运行 JavaScript 的环境中。
- TypeScript 拥有很多编译选项，类型检查的严格程度由你决定。
- TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript。
- TypeScript 增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力。
- TypeScript 拥有活跃的社区，大多数常用的第三方库都提供了类型声明。
- TypeScript 与标准同步发展，符合最新的 ECMAScript 标准（stage 3）。
- 

如果要在报错的时候终止 js 文件的生成，可以在 `tsconfig.json` 中配置 `noEmitOnError` 即可。



TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以**它们都是弱类型**。

这样的类型系统体现了 TypeScript 的核心设计理念在完整保留 JavaScript 运行时行为的基础上，通过引入静态类型系统来提高代码的可维护性，减少可能出现的 bug。

类型：指的是变量的类型，而变量是一块内存空间，不同类型的变量会占用不同的字节数，而且可以做的操作也不同。number、boolean、string 等类型的变量会占用不同的内存大小。

类型分为基础类型和引用类型，基础类型分配在栈上，而引用类型分配在堆上，之所以有引用类型是因为这种类型是复合出来的，比如对象，它可能有任意多个属性，这种就放在可动态分配内存的堆上，然后在栈上记录下该地址，这就是引用类型。

类型是运行时的变量的内存空间大小和可以做的操作的标识，但是代码中不一定包含，根据代码中是否有类型的标识，语言分为了静态类型语言和动态类型语言。

### 发展历史

- 2012-10：微软发布了 TypeScript 第一个版本（0.8），此前已经在微软内部开发了两年。
- 2014-04：TypeScript 发布了 1.0 版本。
- 2014-10：Angular 发布了 2.0 版本，它是一个基于 TypeScript 开发的前端框架。
- 2015-01：ts-loader 发布，webpack 可以编译 TypeScript 文件了。
- 2015-04：微软发布了 Visual Studio Code，它内置了对 TypeScript 语言的支持，它自身也是用 TypeScript 开发的。
- 2016-05：`@types/react` 发布，TypeScript 可以开发 React 应用了。
- 2016-05：`@types/node` 发布，TypeScript 可以开发 Node.js 应用了。
- 2016-09：TypeScript 发布了 2.0 版本。
- 2018-06：TypeScript 发布了 3.0 版本。
- 2019-02：TypeScript 宣布由官方团队来维护 typescript-eslint，以支持在 TypeScript 文件中运行 ESLint 检查。
- 2020-05：Deno 发布了 1.0 版本，它是一个 JavaScript 和 TypeScript 运行时。
- 2020-08：TypeScript 发布了 4.0 版本。
- 2020-09：Vue 发布了 3.0 版本，官方支持 TypeScript。

## 2.为什么我们要使用TypeScript？

TypeScript 增加了代码的可读性和可维护性

- 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
- 可以在编译阶段就发现大部分错误，这总比在运行时候出错好

- 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、代码重构等

TypeScript 非常包容

- TypeScript 是 JavaScript 的超集，`.js` 文件可以直接重命名为 `.ts` 即可
- 即使不显式的定义类型，也能够自动做出类型推论

- TypeScript 的类型系统是图灵完备的，可以定义从简单到复杂的几乎一切类型
- 即使 TypeScript 编译报错，也可以生成 JavaScript 文件

- 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

TypeScript 拥有活跃的社区

- 大部分第三方库都有提供给 TypeScript 的类型定义文件
- Angular、Vue、VS Code、Ant Design 等等耳熟能详的项目都是使用 TypeScript 编写的

- TypeScript 拥抱了 ES6 规范，支持 ESNext 草案中处于第三阶状态（Stage 3）的特性

TypeScript 的缺点

任何事物都是有两面性的，我认为 TypeScript 的弊端在于：

- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本

- 集成到构建流程需要一些工作量

## 3.怎么使用TypeScript

```bash
# 全局安装typescript
yarn global add typescript

# 查看typescript版本，若能看到版本号则安装成功
tsc --version

# 编译一个.ts或.tsx文件 .tsx是React使用typescript时要编译的文件
tsc HelloWorld.ts

tsc HelloWorld.ts -w  //  Watch 监听这个文件的编译
```



```bash
 # tsc --init 配置文件
 noImplicitAny: true 不用隐式的any
```

any类型 unknown类型 

any 不会进行ts的类型检测

unknown 不知啥类型但是是有类型的

```typescript
let a: any = 'abc'
let b: string = a   // 这里不管是什么类型都不会有报错, 应为ts不对any类型检测
/*================================================================*/
let c: unknown = 'aaa'
let d: string = c // 这里会报错，ts会进行类型检测，并报“不能将类型unknown分配给类型string”

 // 此时 上面 写断言
let d: string = c as string // 报错消失
/*=====================================================================*/

// 有个场景 断言不允许类型之间转换的 但是可以转成 unknown 然后在装成其它类型（骚操作）
const x: number = 99
const y: string = x as unknown as string // 不会报错
```

void 和 never

~~~typescript
// void类型只能 是null 和 undefined 常常用来表示函数没有明确的返回值

function test1(): void {} // 没有明确的返回值
function test2(): void | string {} // 返回值可能是undefined 或者是的string类型
console.log(test1()) // undefined
/*===============================================================*/

function test3(): never {
    throw new Error('类型错误')
}
// 这个不会返回任何类型 这个函数抛出异常后，相当于不执行了
// 而 void 的function是可以执行完毕函数的


// 已经声明好的类型的值 默认 是可以赋值 null 或 undefined
strictNullChecks: true // 配置项里面配置
let str: string  = 'xx'
str = 'yyy' // 配置后 null  和 undefined 都会报错
~~~

Function 类型 它是大写的 其他的是小写的 string  number boolen null undefined ...    （函数的声明）

函数的结构定义

~~~typescript
let fn = (a: number, b: number) => number  // 定义了函数类型是要传两个number类型的参数并返回number类型的值
fn = (x: number, y: number): number => {
    return x + y;
}// 定义函数的时候，里面的参数 不用和类型结构里面的相同
~~~

剩余参数的定义

~~~typescript
function sum(...args: number[]): number {
    return args.reduce((s, n) => s + n, 0)
}
console.log(1, 2, 3, 4) // 10

function push(arr: any[], ...args: any[]): any[] {
    arr.push(...args)
    return arr
}
~~~

### 元组（tuple）

数组和元组很相似，但是有个不一样的地方就是，元组会限制某个位置的元素的类型

~~~typescript
let arr: (string | number | boolean)[] = ['1', true, 100]// 里面元素只要类型允许就没错，不管的元素的位置的

let tuple: [number, string, boolean] = [1, '222', true]
~~~

### 枚举类型 （enum）



### 宽泛类型和值类型

断言   as const 可以将定义值类型

~~~typescript
let a = 123 as const // a的类型是123 不是单纯的宽泛类型
const arr = [99, 'hi'] //  这时候是 (number | string)[] 类型
const arr = [99, 'hi'] as const // 这时候就变成了 readonly [number, string] 元组类型了
~~~

总结 as const 是根据值类型来提取类型如果是宽泛类型直接应用

~~~typescript
// 对象类型  不加 as const 时就是 { name: string} 类型
const obj = {
    name: "hello word"
} as const  // 这时候就是具体的值了  { readonly name: 'hello world'}
let a: string = 'hi'
const obj = {
    name: a
} as const // 这时候就是  { readonly name: string}
~~~

数组使用const 断言

~~~typescript
/** 下面的备注只表明类型 */
let a = 'hi' // string
let b = 123 // number
let c = [a, b]// (number | string)[]
let f = c[1] // number | string
// or
let c = [a, b] as const //readonly [string, number] 变成只读的元组类型
// or 相同的想法
let c = <const>[a, b] // readonly [string, number]
let f = c[1] // number
~~~

#### 解构中使用 as const

~~~typescript
function add() {
    let a = 'hi'
    let b = (x: number, y: number):number => x + y
    return [a, b] // as const 可以将数组变成元组
}
const [n, m] = add() // 直接解构是不行的需要是个元组 
// 我们 可以 按照下列方式
......
	return [a, b] as [typeOf a, typeOf b]
    // or 
    return [a, b] as [string, Function] // 或者更加具体一点 [stting, (x:number, 
    y: number) => number]
......
const [n, m] = [...add()]
console(m(1,2)) // 3

// 问题溯源：
//如果不加 断言 那么函数的返回值就是 (string | (x: number, y: number) => number)[]
//在解构的时候单独拿到m的时候 m的类型就是 (string |  (x: number, y: number) => number 其中一种 ts并不能具体知晓它是哪一种类型所以会报错
// 解决方案 就是让它类型对应变得具体一点，言简则是使用数组变成元组这种
~~~

#### 泛型

~~~typescript
function fn<T>(a: T): T {
    return a
}

function fn<T>(arr: T):number {
    return arr.length // 不是所有类型都可以有length属性的
}
~~~

常用的函数类型书写方式

~~~typescript
// 类型写在函数体
const add1 = (a: number, b: number):number => a + b
// :后面
const add2: (a: number, b: number)=> number = (a, b) => a + b
// type 缩写
type Add = (a: number, b: number) => number
const add3: Add = (a, b) => a + b
// 如果有属性，只能用interface
interface AddWithProps {
    (a: number, b: number): number
    xxx: string
}
const add4: AddWithProps = (a, b) => a + b
add4.xxx = '123'
~~~


## 深入理解TypeScript 

### 编译上下文

编译上下文是个比较花哨的术语，可以用它来给文件分组，告诉TypeScript哪些文件是有效的，那些是无效的。**除了有效文件所携带信息外，编译上下文还包含有正在被使用的编译选项的信息**。定义这种逻辑分组，一个比较好的方式是使用 `tsconfig.json` 文件。


这个JSON文件会包含一部分默认的编译选项，即便这个文件里面只有`{}`，**TypeScript将会把此目录和子目录下的所有.ts文件作为编译上下文的一部分**

---

### 编译选项 （这个东西是配置你的编译强度的，有关ts的配置自己研究下，配配看）
通过`tsc --init`这个命令可以生成 
~~~typescript
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
~~~

- 运行 tsc，它会在当前目录或者是父级目录寻找 tsconfig.json 文件。
- 运行 tsc -p ./path-to-project-directory 。当然，这个路径可以是绝对路径，也可以是相对于当前目录的相对路径。

你甚至可以使用 tsc -w 来启用 TypeScript 编译器的观测模式，在检测到文件改动之后，它将重新编译

~~~typescript
// 可以显示指定需要编译的文件
{
    "files": [
        "./some/file.ts"
    ]
}

// 可以使用  include 和  exclude 选项来指定需要包含的文件和要排除的文件；
{
    "include": [
        "./folder"
    ],
    "exclude": [
        "./folder/**/*.spec.ts",
        "./folder/someSubFolder"
    ]
}
~~~


        
[Glob](https://www.gulpjs.com.cn/docs/getting-started/explaining-globs/)

### 声明空间

#### 类型声明空间
```js
class Foo {}
interface Bar {}
type Bas = {};
```
你可以将 Foo, Bar, Bas 作为类型注解使用
```js
let foo: Foo;
let bar: Bar;
let bas: Bas;
```
**尽管你定义了 interface Bar，却并不能够把它作为一个变量来使用，因为它没有定义在变量声明空间中。**

```ts
interface Bar {}
const bar = Bar; // Error: "cannot find name 'Bar'"
```
#### 变量声明空间

变量声明空间包含可用作变量的内容，在上文中 Class Foo 提供了一个类型 Foo 到类型声明空间，此外它同样提供了一个变量 Foo 到变量声明空间
```ts
class Foo {}
const someVar = Foo;
const someOtherVar = 123;
```

---
## 模块

在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。

**不同的文件**里面的变量 可以在全局使用

缺点： 使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。


### 文件模块
文件模块也被称为外部模块。如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，那么它会在这个文件中创建一个本地的作用域。

文件里使用 import 时，它不仅允许你使用从其他文件导入的内容，还会将此文件标记为一个模块，文件内定义的声明也不会“污染”全局命名空间.

使用`module: commonjs` 选项以及使用 ES 模块语法导入、导出、编写模块。平时一般我们框架里面的也是用的这个。

