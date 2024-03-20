// ==UserScript==
// @name         pttweb.cc-ToBottomButton
// @version      0.1
// @description  新增置底按鈕設定
// @author       flowerway626
// @match        https://www.pttweb.cc/*
// @namespace    https://github.com/flowerway626/pttweb-ToBottomButton/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @updateURL    https://raw.githubusercontent.com/flowerway626/pttweb-ToBottomButton/master/pttweb-ToBottomButton.user.js
// @downloadURL  https://raw.githubusercontent.com/flowerway626/pttweb-ToBottomButton/master/pttweb-ToBottomButton.user.js
// @grant        none
// ==/UserScript==

window.addEventListener("scroll", function () {
  // let scorllPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
  let focus = document.querySelectorAll(".e7-btn-no-focus");
  let buttons = getButtons(focus);
  // 視窗捲動長度 = 頁面長度 => 滑到頁面最底
  let height = Math.ceil(window.scrollY + window.innerHeight);

  if (window.scrollY > 400) {
    buttons.length < 2 ? createTobottom(focus, buttons) : buttons[buttons.length - 1].style.display = "block";
  }
  if (height === document.body.scrollHeight) {
    buttons[buttons.length - 1].style.display = "none";
  }
  if (window.scrollY < 400 && buttons.length === 2) {
    buttons[buttons.length - 1].style.display = "block";
  }
});

function createTobottom(focus, buttons) {
  // 建立 置底 button
  let ToBootomBtn = createBtn("expand_more", "20px");
  ToBootomBtn.addEventListener("click", function () {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });

  // 建立 跳轉至推文 button
  let ToMessageBtn = createBtn("forum", "70px");
  ToMessageBtn.addEventListener("click", function () {
    // 取得頁面中所有 class 為 "f3" 且包含 "文章網址" 的 <span>
    document.querySelectorAll('span.f3').forEach(span => {
      if (span.textContent.includes("文章網址")) {
        span.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 文章頁面才顯示 ToMessageBtn
  if (location.href.replace(location.origin, '').split('/').length > 3) {
    focus[focus.length - 1].appendChild(ToMessageBtn);
    buttons = getButtons(focus);
    buttons[0].style.bottom = "120px";
  } else {
    // 調整置頂 button 位置
    buttons = getButtons(focus);
    buttons[0].style.bottom = "70px";
  }

  // 新增 button
  focus = document.querySelectorAll(".e7-btn-no-focus");
  focus[focus.length - 1].appendChild(ToBootomBtn);
};
// 建立 button
function createBtn (icon, bottom) {
  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.className = "v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right v-btn--small theme--dark blue darken-3";
  button.innerHTML = `<div class="v-btn__content"><i aria-hidden="true" class="v-icon material-icons theme--dark">${icon}</i></div>`;
  button.style.bottom = bottom;
  return button;
}
// 取得目前 右下 buuton
function getButtons(focus) {
  return focus[focus.length - 1].querySelectorAll(".e7-btn-no-focus button");
}