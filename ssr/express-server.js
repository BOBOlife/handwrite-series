import express from "express";
import { createServer } from "vite";
import fs from "node:fs";

//我们需要通过vite在开发环境帮我们将react进行构建，创建vite服务器
const vite =await createServer({
  server:{
    middlewareMode:true
  },
  appType:"custom"
});

const app = express();

app.use(vite.middlewares);

app.use(async (req,res)=>{
  //将模版进行渲染
  //使用vite 进行模块加载
  const template = await vite.transformIndexHtml(
    req.url,
    fs.readFileSync("index.html", "utf-8")
  );
  // 加载render渲染器
  const { render } = await vite.ssrLoadModule("render.jsx");
  const appHtml = render();
  const html = template.replace("<!-- app-html -->", appHtml);
  res.send(html)
})


app.listen(3000,()=>{
  console.log("Server running at http://localhost:3000/");
});