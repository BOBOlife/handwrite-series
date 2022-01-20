## React Notes

### 组件类

- Component
- PureComponent
- memo
- forwardRef
- lazy
- Suspenese
- Fragment
- Profiler
- StrictMode

```tsx
function Componet(prop, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpateQueue; // 更新组件的方法
}
```

PureComponent 和 Componet 用法，差不多一样，唯一不同的是，纯组件 PureComponent
会浅比较，props 和 state 是否相同，来决定是否重新渲染组件，一般用于性能调优，减少
render 次数。

React.memo 和 PureComponent 作用类似，可以作性能优化，React.memo 是高阶组件，
函数组件和类组件都可以使用，和区别 PureComponent 是 React.memo 只能对 props 的情况确定是否渲染。
memo 接受两个参数，第一个参数原始组件本身，第二个参数，可以根据一次更新 props 是否相同决定原始组件是否重新渲染，是一个返回布尔值。true 证明无需渲染，和类组件中的 shouldComponentUpdate()正好相反

- **React.memo**:第二个参数返回 true 组件不渲染，返回 false 组件重新渲染
- **shouldComponentUpdate**: 返回 true 组件渲染，返回 false 组件不渲染

React.memo 一定程度上，可以等价于组件外部使用了 shouldComponentUpdate,用于拦截新老 props，确定组件是否更新。

---

### forWardRef

#### 1. 转发引入 Ref

使用场景： 若父组件想要获取孙组件某一 DOM 元素，这种**隔代**ref 获取引用，就需要`forwardRef`来帮忙

```jsx
  function Son(props){
    const {grandRef} = props
    return (<div>
      <div>xxxx</div>
      <span ref={grandRef}>这个是要获取的元素</span>
    <div>
    )
  }

  class Father extends React.Componet {
    constructor(props){
      super(props)
    }
    render(){
      return (<div>
        </Son granRef={this.props.grandRef}>
      </div>)
    }
  }

  const NewFather = React.forwardRef((props,ref)=><Father grandRef={ref}  {...props} />  )

  class GrandFather extends React.Component{
    constructor(props){
        super(props)
    }
    node = null
    componentDidMount(){
        console.log(this.node)
    }
    render(){
        return <div>
            <NewFather ref={(node)=> this.node = node } />
        </div>
    }
  }
```

react 不允许 ref 通过 props 传递，因为组件上已经有 ref 这个属性,在组件调和过程中，已经被特殊处理，forwardRef 出现就是解决这个问题，把 ref 转发到自定义的 forwardRef 定义的属性上，让 ref，可以通过 props 传递。

#### 2. 高阶组件转发 Ref

由于属性代理的 HOC，被包裹了一层，所以如果是类组件，是通过`ref`拿不到原始组件的实例的，不过可以通过`forWardRef`转发`ref`

```jsx
function HOC(Component) {
  class Wrap extends React.Component {
    render() {
      const { forwardedRef, ...otherprops } = this.props;
      return <Component ref={forwardedRef} {...otherprops} />;
    }
  }
  return React.forwardRef((props, ref) => (
    <Wrap forwardedRef={ref} {...props} />
  ));
}

class Index extends React.Component {
  componentDidMount() {
    console.log(666);
  }
  render() {
    return <div>hello,world</div>;
  }
}

const HocIndex = HOC(Index, true);

export default () => {
  const node = useRef(null);
  useEffect(() => {
    /* 就可以跨层级，捕获到 Index 组件的实例了 */
    console.log(node.current.componentDidMount);
  }, []);
  return (
    <div>
      <HocIndex ref={node} />
    </div>
  );
};
```

**总结： react 里面当直接获取不到 ref 来操作 DOM 和组件实例的情况下，可以通过 forwardRef 来转发 ref**

### lazy && Suspence

React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，推荐 Loadable Components 这个库

React.lazy 和 Suspense 配合一起用，能够有动态加载组件的效果。React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise ，该 Promise 需要 resolve 一个 default export 的 React 组件。

```jsx
import Test from "./comTest"; // 引入一个子组件
const LazyComponent = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          default: () => <Test />,
        });
      }, 2000);
    })
);
class index extends React.Component {
  render() {
    return (
      <div className="context_box" style={{ marginTop: "50px" }}>
        <React.Suspense
          fallback={
            <div className="icon">
              <SyncOutlined spin />
            </div>
          }
        >
          <LazyComponent />
        </React.Suspense>
      </div>
    );
  }
}
```

**Suspense 让组件“等待”某个异步操作，直到该异步操作结束即可渲染**

由可以等待异步操作不难看出，可以用来等待数据获取，可以用来等待图像、脚本、或其它异步操作

#### Fragment

这里唯一想说的是 Fragment 和 <></>区别，fragment 可以支持 key 属性，<></>不支持 key 属性

#### Profiler

这个 api 一般会用于开发阶段，用于性能检测，检测一次 react 组件渲染用时，性能的开销。

有两个参数

- id ，用于标识唯一性
- onRender 回调函数，用于渲染完成回调，接受渲染参数

```jsx
const index = () => {
  const callback = (...arg) => console.log(arg);
  return (
    <>
      <Profiler id="root" onRender={callback}>
        <Router>
          <Meuns />
          <KeepaliveRouterSwitch withoutRoute>
            {renderRoutes(menusList)}
          </KeepaliveRouterSwitch>
        </Router>
      </Profiler>
    </>
  );
};
```

#### strictMode

严格模式，用于检测 react 项目中的潜在问题，不会渲染 UI，他为后代元素触发格外的检查和警告，不会影响生产构键。

优点：

- 识别不安全的生命周期
- 使用过时的字符串的 ref API 的警告
- 使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
- 检测过时的 context API

## 工具类函数

#### createElement

jsx 语法最终还是要通过 babel 的转译成用 react 函数的形式

```jsx
render() {
  React.createElement('div',{className: 'box'},'内容可以再嵌套createElement的函数')
}
```
理论上我们可以直接使用createElement来开发，不用jsx语法，但是大多人会这么搞？

```js
// createElement模型
React.createElement(
  type,
  [props],
  [...children]
)
```

createElement做了什么？

通过createElement处理，最终会形成 $$typeof = Symbol(react.element) 对象。


####  cloneElement 

那么cloneElement感觉在我们实际业务组件中，可能没什么用，但是在一些开源项目，或者是公共插槽组件中用处还是蛮大的，比如说，我们可以在组件中，劫持children element，然后通过cloneElement克隆element，混入props。经典的案例就是 react-router中的Swtich组件，通过这种方式，来匹配唯一的 Route并加以渲染。

这个先TODO

#### createContext 

createContext 用来创建一个Context对象。createContext对象中存在用于传递Context对象值value的Provider，和接受value变化订阅的Consumer。 

这就是发布订阅呀！！！ 果然编程世界里面的名字很不同然而核心都是一样的XD
```js
  const myContext = React.createContext(defaultValue) // Consumer的上级树都没有匹配到Provider时，用defaultValue作为value。 
```
小总结：Provider和Consumer的良好的特性，可以做数据的存和取，Consumer一方面传递的value，另一方面可以订阅value的改变。
Provider还有一个特性可以层层传递value，这种特性在react-redux中表现的淋漓尽致。


#### React.Children

5个api：
-  Children.map
-  Children.forEarch 
-  Children.count
-  Children.toArray
-  Children.only

React.Children 提供了用于处理 this.props.children**不透明数据结构**（所以不直接用map，forEach）的实用方法

注意 如果 children 是一个 Fragment 对象，它将被视为单一子节点的情况处理，而不会被遍历。

Children.forEach和Children.map 用法类似，Children.map可以返回新的数组，Children.forEach仅停留在遍历阶段。

children 中的组件总数量，等同于通过 map 或 forEach 调用回调函数的次数。对于更复杂的结果，Children.count可以返回同一级别子组件的数量。

Children.toArray返回，props.children扁平化后结果。

Children.only验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误。


## React Hooks





