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

~~~tsx
function Componet(prop,context,updater){
  this.props = props
  this.context = context
  this.refs = emptyObject 
  this.updater = updater || ReactNoopUpateQueue // 更新组件的方法
}
~~~

PureComponent和Componet用法，差不多一样，唯一不同的是，纯组件PureComponent
会浅比较，props和state是否相同，来决定是否重新渲染组件，一般用于性能调优，减少
render次数。

React.memo和PureComponent作用类似，可以作性能优化，React.memo是高阶组件，
函数组件和类组件都可以使用，和区别PureComponent是React.memo只能对props的情况确定是否渲染。
memo接受两个参数，第一个参数原始组件本身，第二个参数，可以根据一次更新props是否相同决定原始组件是否重新渲染，是一个返回布尔值。true证明无需渲染，和类组件中的shouldComponentUpdate()正好相反

- **React.memo**:第二个参数返回true组件不渲染，返回false组件重新渲染
- **shouldComponentUpdate**: 返回true组件渲染，返回false组件不渲染