window.addEventListener("scroll", function() {
  let scorllPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
  let focus = document.querySelectorAll(".e7-btn-no-focus");
  let buttons = focus[focus.length - 1].querySelectorAll(".e7-btn-no-focus button");
  // 視窗捲動長度 = 頁面長度 => 滑到頁面最底
  let height = Math.ceil(window.scrollY + window.innerHeight);

  if (window.scrollY > 400) {
    buttons.length < 2 ? createTobottom(focus[focus.length - 1], buttons) : buttons[1].style.display = "block";
  }
  if (height === document.body.scrollHeight) {
    buttons[1].style.display = "none";
  }
  if (window.scrollY < 400 && buttons.length === 2) {
  buttons[1].style.display = "block";
  }
});

function createTobottom (focus, buttons) {
  let ToBootomBtn = document.createElement("button");
  ToBootomBtn.setAttribute("type", "button");
  ToBootomBtn.className = "v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right v-btn--small theme--dark blue darken-3";
  ToBootomBtn.innerHTML = `<div class="v-btn__content"><i aria-hidden="true" class="v-icon material-icons theme--dark">expand_more</i></div>`;
  ToBootomBtn.style.bottom = "20px";
  ToBootomBtn.addEventListener("click", function() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });
  // 新增置底 button
  focus.appendChild(ToBootomBtn);
  // 調整置頂 button 位置
  buttons[0].style.bottom = "70px";
};