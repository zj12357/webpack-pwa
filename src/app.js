import "@babel/polyfill";
import "./assets/style/base.scss";
import "./assets/style/common.scss";
import "./assets/font/iconfont.css";
import "normalize.css";


$(
  function () {
    // 判断该浏览器支不支持 serviceWorker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("service-worker registed");
          })
          .catch((error) => {
            console.log("service-worker registed error");
          });
      });
    }

    let dfdPrompt = null;
    let btnInstall = $("#btnInstall");
    $(function () {
      if(dfdPrompt==null){
        btnInstall.hide();
      }
      window.addEventListener("beforeinstallprompt", function (e) {
        // 存储事件
        dfdPrompt = e;
        // 显示按钮
        btnInstall.show();
        // 阻止默认事件
        e.preventDefault();
        return false;
      });

      btnInstall.on("click", function () {
        console.log('安装', dfdPrompt);
        if (dfdPrompt == null) {
          return;
        }
        // 通过按钮点击事件触发横幅显示
        dfdPrompt.prompt();
        // 监控用户的安装行为
        dfdPrompt.userChoice.then(function (choiceResult) {
          if (choiceResult.outcome === "accepted") {
            btnInstall.hide();
            dfdPrompt = null;
          }
        });
      });
    });
  }
)