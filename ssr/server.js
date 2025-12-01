import http from "node:http";
import fs from "node:fs"; // 工作中使用 fs-extra


const server=http.createServer((req,res)=>{
  const html = fs.readFileSync("index.html", 'utf-8')
  // 模版解析的工作，将数据和html进行拼接， 编译过程
  // ejs, pug, handlebars 
  const date = new Date().toLocaleString()
  const compiledHtml = html.replace("{date}", date)
  // 先进的工程化处理
  // 这里渲染react app
  // 这里渲染vue app
  
  res.end(compiledHtml)
}); 

server.listen(3000,()=>{
  console.log("Server running at http://localhost:3000/");
});



/**
 * SSR
 *
 * Server -> rendered html -> browser
 * 
 * CSR
 * 
 * Server -> empty html + Js -> Browser execute js -> rendered html -> browser
 * 
 * 纯粹的服务端渲染，也会有很大局限性，有的内容也需要客户端渲染
 * 1.canvas
 * 2.事件绑定
 * 3.层叠样式表的解析 
 * 4.htmldom、cssdom结合
 * 
 * 
 * 纯粹的服务端依然有问题
 * 降低服务器成本
 * spa 应用 没办法100%重构为ssr的架构形式
 * 
 * 前后端同构，预渲染，混合式渲染
*/