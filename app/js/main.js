const contactsForm = document.forms.contactForm;

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

function checkButtonDisabled() {
  contactsForm.addEventListener("input", () => {
    if (checkFormSuccess(".contacts__form-group")) {
      contactsForm.contactsBtn.removeAttribute("disabled");
      contactsForm.contactsBtn.classList.add('success')
    } else {
      contactsForm.contactsBtn.setAttribute("disabled", "disabled");
    }
  });
}

document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("contacts__form-btn")) {
    e.preventDefault();
  }
});

addFormValidation(contactsForm);
checkButtonDisabled();

const InfoSwiper = new Swiper('.swiper-products', {
    direction: 'horizontal',
    spaceBetween: 132,
    slidesPerView: 3,
    loop: false,
    freeMode: true,
  
    navigation: {
      nextEl: '.new-products__arrow-next',
      prevEl: '.new-products__arrow-prev',
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
        slidesPerView: 2.3,
        spaceBetween: 30,
      },
      560: {
        slidesPerView: 2.2,
        spaceBetween: 30,
      },
      660: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 60,
      },
      800: {
        slidesPerView: 2.2,
        spaceBetween: 60,
      },
      900: {
        slidesPerView: 2.5,
        spaceBetween: 60,
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      1200: {
        slidesPerView: 3,
      }
    }
  });
