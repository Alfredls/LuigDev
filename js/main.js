const navMenu = document.getElementById("nav");
const iconMenu = document.getElementById("icon-menu");
const menuList = document.getElementById("menu-list");
const iconMenuBar = document.getElementById("icon-menu__bar");
const navbar = document.querySelector("#menu-list").querySelectorAll("a");
const dataMenu = document.querySelectorAll("[data]");

const formMsg = document.getElementById("form");
const fname = document.getElementById("formName");
const femail = document.getElementById("formEmail");
const fmessageBox = document.getElementById("formMessage");
const btnSubmit = document.getElementById("formSubmit");
const messagetext = document.getElementById("mensaje");
const popup = document.getElementById("popupId");
const btnModal = document.getElementById("ModalPopup-btn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 30) {
    navMenu.classList.add("nav__color-show");
  } else {
    navMenu.classList.remove("nav__color-show");
  }

  let current = "";
  dataMenu.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 6) {
      current = section.getAttribute("id");
    }
  });

  navbar.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });

  menuList.classList.remove("menu-list--show");
  menuList.classList.remove("menu-list--show-op");
  iconMenuBar.classList.remove("icon-menu__bar--show");
});

iconMenu.addEventListener("click", () => {
  menuList.classList.toggle("menu-list--show");
  menuList.classList.toggle("menu-list--show-op");
  iconMenuBar.classList.toggle("icon-menu__bar--show");
});

formMsg.addEventListener("submit", (e) => {
  e.preventDefault();

  let warnigs = "";
  let sendOk = false;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  if (fname.value.trim().length < 4) {
    warnigs += "Invalid Name";
    sendOk = true;
  }
  if (!regexEmail.test(femail.value)) {
    warnigs === ""
      ? (warnigs = "Invalid Email")
      : (warnigs += " / Invalid Email");
    sendOk = true;
  }
  if (fmessageBox.value.trim().length < 1) {
    warnigs === ""
      ? (warnigs = "empty message")
      : (warnigs += " / empty message");
    sendOk = true;
  }
  function errormsg() {
    messagetext.style.opacity = "1";
    messagetext.style.display = "block";
    messagetext.textContent = warnigs;
    setTimeout(() => {
      messagetext.style.opacity = "0";
    }, 3000);
    setTimeout(() => {
      messagetext.textContent = "";
      messagetext.style.display = "none";
    }, 4000);
  }

  if (sendOk) {
    errormsg();
  } else {
    handleSubmit();
  }
});

btnModal.addEventListener("click", () => {
  popup.classList.remove("modal-show");
});

async function handleSubmit() {
  const formDatos = new FormData(formMsg);
  const response = await fetch(formMsg.action, {
    method: formMsg.method,
    body: formDatos,
    headers: {
      Accept: "application/json",
    },
  });
  if (response.ok) {
    popup.classList.add("modal-show");
    formMsg.reset();
  }
}
