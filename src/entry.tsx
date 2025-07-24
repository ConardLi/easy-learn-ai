import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./entry.css";

// 添加百度统计代码
(function () {
  const hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?101babebc798720a3301bf9ef85b1d97";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
