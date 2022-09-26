# 前端错误监控常见的方案（持续更新）

## vue

- Vue.config.errorHandler (errorCaptured),  劫持Vue.config.errorHandler, 当Vue项目中发生错误，将错误捕获上报

```typescript
  // case
  import store from '@/store'

  export default {
    install(Vue, options) {
      if(optinons.developmentOff && process.env.NODE_ENV === 'development') return 
      // Vue 错误捕获上报
      Vue.config.errorHandler = (error, vm, mes) => {
        const info = { // 自己需要传的
          type: 'script',
          code: error.stack.toString(),
          mes: error.message,
          url: window.location.href
        }

        Vue.nextTick(() => {
          store.dispatch('addErrorLog', info)
        })
      }
    }
  }

```

- Img 图片错误监控 @error

<img src="https://xxxxxx....." @error="imgError">

imgError (e) {
  this.PUSH_ERROR_LOG(e)
}


- 用户切换路径，接口报错 捕获上报
watch: {
  $route(to, from) {
    this.PUSH_ERROR_LOG({toPath: to.path, from: from.path})
  }
}


- 与后台交互，接口报错

```typescript
  const addErrorLog = errorInfo => {
    cosnt { statusText, status, request: { responseURL } } = errorInfo
    const info = {
      type: 'ajax',
      code: status,
      mes: statusText,
      url: responseURL
    }
    if(!responseURL.includes('save_error_logger'))  store.dispatch('addErrorLogEvent', info)
  }

  if (!response) {
    const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
    response = {
      statusText,
      status,
      request: { responseURL: config.url }
    }
  }
  addErrorLog(response)

```

- Console. Info/warn/error 捕获上报

```typescript
import store from '@/store'
export default {
  install (Vue, options) {
    // console信息捕获上报
    const wrapConsoleMethod = (console, level, callback) => {
      // 转console, 否则捕获后, 控制台不打印
      console[`_check${level}`] = console[level]
      console[level] = (args) => {
         console[`_check${level}`](args)
        callback && callback(args, level)
      }
    }
    const consoleMethodCallback = (msg, level) => {
      const info = {
        type: 'console',
        code: `console.${level}`,
        mes: msg,
        url: window.location.href
      }
      Vue.nextTick(() => {
        store.dispatch('addErrorLog', info)
      })
    }
    const consoleTypeArr = ['info', 'warn', 'error']
    for (let level of consoleTypeArr) {
      wrapConsoleMethod(console, level, consoleMethodCallback)
    }
  }
}


```

- 公共管理 提交函数

 ```typescript
    /**
     * @description 错误日志提交
     */
    Vue.prototype.PUSH_ERROR_LOG = errorInfo => {
      let info = {}
      console.log(errorInfo,'errorInfo')
      if(errorInfo.srcElement){
        const { localName='',currentSrc='' } = errorInfo.srcElement
        info = {
          type: localName,
          code: errorInfo.type,
          mes: currentSrc,
          url: window.location.href
        }
      } else if(errorInfo.toPath) {
        // 记录路由跳转
        const {toPath,form} = errorInfo
        info = {
          type: 'path',
          code: '-',
          mes: `来源: ${form}`,
          url: `跳转: ${toPath}`
        }
      }
      store.dispatch('addErrorLog', info)
    }

 ```


 ## mini program

 ```javascript
const VERSION = "0.0.18";

// 普通日志
const canIUseLogManage = wx.canIUse("getLogManager");
const logger = canIUseLogManage ? wx.getLogManager({ level: 0 }) : null;
// 实时日志
const realtimeLogger = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;

export function DEBUG(file, ...args) {
  console.debug(`[${VERSION}] ${file}  | `, ...args);
  if (canIUseLogManage) {
    logger.debug(`[${VERSION}]`, file, " | ", ...args);
  }

  realtimeLogger && realtimeLogger.info(`[${VERSION}]`, file, " | ", ...args);
}

export function RUN(file, ...args) {
  console.log(`[${VERSION}]`, file, " | ", ...args);
  if (canIUseLogManage) {
    logger.log(`[${VERSION}]`, file, " | ", ...args);
  }

  realtimeLogger && realtimeLogger.info(`[${VERSION}]`, file, " | ", ...args);
}

export function ERROR(file, ...args) {
  console.error(`[${VERSION}]`, file, " | ", ...args);
  if (canIUseLogManage) {
    logger.error(`[${VERSION}]`, file, " | ", ...args);
  }

  realtimeLogger && realtimeLogger.error(`[${VERSION}]`, file, " | ", ...args);
}

export function getLogger(fileName) {
  return {
    DEBUG: function (...args) {
      DEBUG(fileName, ...args)
    },
    RUN: function (...args) {
      RUN(fileName, ...args)
    },
    ERROR: function (...args) {
      ERROR(fileName, ...args)
    }
  }
}

 ```
