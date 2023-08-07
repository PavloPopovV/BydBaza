const contactsForm = document.forms.contactForm,
  questionTabBtns = document.querySelectorAll(".question__plus"),
  questionTabAnswer = document.querySelectorAll(".question__answer"),
  productTabBtns = document.querySelectorAll(".product-tabs__btn"),
  productTabContent = document.querySelectorAll(".product-tabs__content"),
  productName = document.querySelector(".js-product__name"),
  breadCrumbsEl = document.querySelector(".js-breadcrumbs__title");

const patterns = {
  textPattern: /[а-яА-ЯЁё]{2,}/,
  namePattern: /^[а-яА-ЯҐґЄєІіЇї'-]{2,}$/,
  phonePattern: /^0\d{9}$/,
};

const messages = {
  errorRequired: "Це поле обов'язкове. Не може бути порожнім",
  errorText: "Не менше двох символів, лише кирилиця",
  errorName: "Від двох символів, лише кирилиця, без пробілів",
  errorPhone: "Починайте з нуля, введіть 10 символів",
  correct: "Все правильно, заповнюйте далі!",
};

function addFormValidation(formName) {
  formName.addEventListener("input", (e) => {
    const target = e.target;
    switch (target.name) {
      case "formQuestion":
        checkFieldOnInput(target, patterns.textPattern, messages.errorText);
        break;
      case "firstName":
        checkFieldOnInput(target, patterns.namePattern, messages.errorName);
        break;
      case "phoneNumber":
        checkFieldOnInput(target, patterns.phonePattern, messages.errorPhone);
        break;
      default:
        break;
    }
  });
  for (const input of formName.elements) {
    if (input.type !== "submit") {
      input.addEventListener("focus", (e) => {
        checkFieldOnFocus(e.target);
      });
      input.addEventListener("blur", (e) => {
        checkFieldOnBlur(e.target);
      });
    }
  }
}

function checkFieldOnFocus(input) {
  if (input.value.length < 1) {
    input.closest(".contacts__form-group").classList.add("error");
    input
      .closest(".contacts__form-group")
      .querySelector(".contacts__form-msg").textContent =
      messages.errorRequired;
  }
}

function checkFieldOnBlur(input) {
  if (input.closest(".contacts__form-group").classList.contains("success")) {
    input
      .closest(".contacts__form-group")
      .querySelector(".contacts__form-msg").textContent = "";
  }
}

function checkFieldOnInput(input, pattern, message) {
  if (!input.value.match(pattern)) {
    input.closest(".contacts__form-group").classList.remove("success");
    input.closest(".contacts__form-group").classList.add("error");
    input
      .closest(".contacts__form-group")
      .querySelector(".contacts__form-msg").textContent = message;
  } else {
    input.closest(".contacts__form-group").classList.remove("error");
    input.closest(".contacts__form-group").classList.add("success");
    input
      .closest(".contacts__form-group")
      .querySelector(".contacts__form-msg").textContent = messages.correct;
  }
}

function checkFormSuccess(groupClass) {
  const formGroup = contactsForm.querySelectorAll(groupClass);

  for (const group of formGroup) {
    if (!group.classList.contains("success")) {
      return false;
    }
  }
  return true;
}

function checkButtonDisabled(btnName) {
  contactsForm.addEventListener("input", () => {
    if (checkFormSuccess(".contacts__form-group")) {
      btnName.removeAttribute("disabled");
      btnName.classList.add("success");
    } else {
      btnName.setAttribute("disabled", "disabled");
    }
  });
}

function removeInputValue(formName) {
  for (const input of formName.elements) {
    if (input.type !== "submit") {
      input.value = "";
    }
  }
}

function removeActiveGroupClass(groupClass) {
  const formGroup = contactsForm.querySelectorAll(groupClass);
  for (const group of formGroup) {
    if (group.classList.contains("success")) {
      group.classList.remove("success");
    }
  }
}

document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("contacts__form-btn")) {
    e.preventDefault();
    target.setAttribute("disabled", "disabled");
    target.classList.remove("success");
    removeActiveGroupClass(".contacts__form-group");
    removeInputValue(contactsForm);
  }
});

if (contactsForm != undefined) {
  addFormValidation(contactsForm);
  checkButtonDisabled(contactsForm.contactsBtn);
}

const InfoSwiper = new Swiper(".swiper-products", {
  direction: "horizontal",
  spaceBetween: 132,
  slidesPerView: 3,
  loop: false,
  freeMode: true,

  navigation: {
    nextEl: ".new-products__arrow-next",
    prevEl: ".new-products__arrow-prev",
  },

  breakpoints: {
    360: {
      slidesPerView: 1.5,
      centeredSlides: true,
      initialSlide: 1,
      spaceBetween: 20,
    },
    380: {
      slidesPerView: 1.8,
      spaceBetween: 20,
      centeredSlides: true,
      initialSlide: 1,
    },
    460: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    560: {
      slidesPerView: 2.2,
      spaceBetween: 30,
    },
    660: {
      slidesPerView: 2.5,
      spaceBetween: 50,
    },
    768: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 2.5,
      spaceBetween: 60,
    },
    900: {
      slidesPerView: 3,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 60,
    },
    1200: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 3,
    },
  },
});

function breadCrumbs(productName, breadCrumbsEl) {
  if (productName !== null && breadCrumbsEl !== null) {
    breadCrumbsEl.textContent = productName.textContent;
  }
}
breadCrumbs(productName, breadCrumbsEl);

const productSwiper = new Swiper(".tab-reviews__swiper", {
  direction: "horizontal",
  spaceBetween: 10,
  slidesPerView: 1,
  loop: false,
  freeMode: true,

  navigation: {
    nextEl: ".tab-reviews__arrow-next",
    prevEl: ".tab-reviews__arrow-prev",
  },
});

function tabsAction(target) {
  const answerEl = document.querySelector(`div#${target.id}`);
  if (target.id === answerEl.id) {
    if (answerEl.classList.contains("active")) {
      answerEl.classList.remove("active");
      target.classList.remove("active");
    } else {
      questionTabAnswer.forEach((answer) => {
        answer.classList.remove("active");
      });
      questionTabBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      answerEl.classList.add("active");
      target.classList.add("active");
    }
  }
}

questionTabBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.target;
    tabsAction(target);
  });
});

function productTabs(target) {
  const contentEl = document.querySelector(`div#${target.id}`);
  if (!target.classList.contains("active")) {
    productTabBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    productTabContent.forEach((item) => {
      item.classList.remove("active");
    });
    target.classList.add("active");
    contentEl.classList.add("active");
  }
}

productTabBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.target;
    productTabs(target);
  });
});

const productReviewsList = document.querySelector(".tab-reviews__wrapper");
function countReviews(reviewsList) {
  document.querySelectorAll(".js-reviews__count").forEach((item) => {
    item.textContent = reviewsList.length;
  });
}
if (productReviewsList !== null) {
  countReviews(productReviewsList.children);
}

function ratingStar(stars) {
  [...stars].forEach((star, index) => {
    star.addEventListener("click", (e) => {
      [...stars].forEach((star, index1) => {
        index >= index1
          ? star.classList.add("active")
          : star.classList.remove("active");
      });
    });
  });
}
const stars = document.querySelector(".product__stars");
if (stars !== null) {
  ratingStar(stars.children);
}

const relatedSwiper = new Swiper(".related__swiper", {
  direction: "horizontal",
  spaceBetween: 132,
  slidesPerView: 3,
  loop: false,
  freeMode: true,

  navigation: {
    nextEl: ".related__arrow-next",
    prevEl: ".related__arrow-prev",
  },

  breakpoints: {
    360: {
      slidesPerView: 1.5,
      centeredSlides: true,
      initialSlide: 1,
      spaceBetween: 20,
    },
    380: {
      slidesPerView: 1.8,
      spaceBetween: 20,
      centeredSlides: true,
      initialSlide: 1,
    },
    460: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    560: {
      slidesPerView: 2.2,
      spaceBetween: 30,
    },
    660: {
      slidesPerView: 2.5,
      spaceBetween: 50,
    },
    768: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 2.5,
      spaceBetween: 60,
    },
    900: {
      slidesPerView: 3,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 60,
    },
    1200: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 3,
    },
  },
});

function changeHeaderTextColor() {
  if (document.querySelector(".breadcrumbs") !== null) {
    document.querySelector(".header").classList.add("black-color");
  }
}
changeHeaderTextColor();
