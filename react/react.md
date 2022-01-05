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
**总结： react 里面当直接获取不到ref来操作DOM和组件实例的情况下，可以通过forwardRef来转发ref**


### lazy && Suspence

React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，推荐 Loadable Components 这个库

React.lazy和Suspense配合一起用，能够有动态加载组件的效果。React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise ，该 Promise 需要 resolve 一个 default export 的 React 组件。
