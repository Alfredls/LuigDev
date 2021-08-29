const menuList = document.querySelector(".menu__list");
const iconMenu = document.getElementById("icon-reponseve");
const iconResponseve = document.getElementById("icon-reponseve__item");

const formMsg = document.getElementById("formMsg");
const fName = document.getElementById("formName");
const fEmail = document.getElementById("formEmail");
const fText = document.getElementById("formTextArea");

const msgError = document.getElementById("erroMsg");
const spinner = document.getElementById("spinner");

const popup = document.getElementById("popupId");
const btnModal = document.getElementById("ModalPopup-btn");

/* icon menu */
iconMenu.addEventListener("click", () => {
  menuList.classList.toggle("menu__list--show");
  iconResponseve.classList.toggle("icon-show");
});

/* form */

formMsg.addEventListener("submit", (e) => {
  e.preventDefault();

  let warnigs = "";
  let sendOk = false;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  if (fName.value.trim().length < 4) {
    warnigs += "Invalid Name";
    sendOk = true;
  }
  if (!regexEmail.test(fEmail.value)) {
    warnigs === ""
      ? (warnigs = "Invalid Email")
      : (warnigs += " / Invalid Email");
    sendOk = true;
  }
  if (fText.value.trim().length < 1) {
    warnigs === ""
      ? (warnigs = "empty message")
      : (warnigs += " / empty message");
    sendOk = true;
  }

  function errormsg() {
    msgError.style.opacity = "1";
    msgError.textContent = warnigs;

    setTimeout(() => {
      msgError.style.opacity = "0";
    }, 3000);
  }

  sendOk ? errormsg() : handleSubmit();
});

function spinnerActive() {
  spinner.style.opacity = "1";
  setTimeout(() => {
    spinner.style.opacity = "0";
  }, 2000);
}

async function handleSubmit() {
  spinnerActive();
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

btnModal.addEventListener("click", () => {
  popup.classList.remove("modal-show");
});
