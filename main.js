// api YaMap

let center = [56.81911640814073, 60.71813354831949];
let сhernyakhovsky = [56.75167166360553, 60.75666995767255];

// city

const cities = {
  EKATERINBURG: [56.81911640814073, 60.71813354831949],
  PETERBURG: [59.934910487611226, 30.372076390685216],
  MOSKOW: [55.7599352627125, 37.6270555029466],
  CHELYABINSK: [55.16568660106791, 61.43873868217899],
  KAZAN: [55.78612625631046, 49.13234342462967],
};

function init() {
  var map = new ymaps.Map(
    "map",
    {
      center: center,
      zoom: 11,
      controls: [],
    },
    { suppressMapOpenBlock: true }
  );

  let placemark = new ymaps.Placemark(
    [56.75167166360553, 60.75666995767255],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "./img/map/placemark.svg",
      iconImageSize: [48, 54],
      iconImageOffset: [-19, -44],
    }
  );

  let placemark2 = new ymaps.Placemark(
    [56.86537049860099, 60.66835145503491],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "./img/map/placemark.svg",
      iconImageSize: [48, 54],
      iconImageOffset: [-19, -44],
    }
  );

  map.geoObjects.add(placemark);
  map.geoObjects.add(placemark2);

  map
    .setBounds(map.geoObjects.getBounds(), { checkZoomRange: true })
    .then(function () {
      if (map.getZoom() > 15) map.setZoom(15);
    });

  var el = document.getElementById("show");
  el.addEventListener("click", showBal, false);
  function showBal() {
    map.setCenter([56.75167166360553, 60.75666995767255]),
      map.balloon.open(
        map.getCenter(),
        { content: "Hello Yandex!" },
        { closeButton: true }
      );
  }

  var el2 = document.getElementById("show2");
  el2.addEventListener("click", showBal2, false);
  function showBal2() {
    map.setCenter([56.86537049860099, 60.66835145503491]),
      map.balloon.open(
        map.getCenter(),
        { content: "Hello Yandex!" },
        { closeButton: true }
      );
  }

  let selectItem = document.querySelectorAll(".select__item");

  function setPosition() {
    (select = this.closest(".select")),
      (currentText = select.querySelector(".select__current"));
    switch (currentText.innerText) {
      case "Екатеринбург":
        map.setCenter(cities.EKATERINBURG);
        break;
      case "Санкт-Петербург":
        map.setCenter(cities.PETERBURG);
        break;
      case "Москва":
        map.setCenter(cities.MOSKOW);
        break;
      case "Казань":
        map.setCenter(cities.KAZAN);
        break;
      case "Челябинск":
        map.setCenter(cities.CHELYABINSK);
        break;
    }
  }

  selectItem.forEach((item) => {
    item.addEventListener("click", setPosition);
  });
}

// custom select

let select = function () {
  let selectHeader = document.querySelectorAll(".select__header");
  let selectItem = document.querySelectorAll(".select__item");

  selectHeader.forEach((item) => {
    item.addEventListener("click", selectToggle);
  });

  selectItem.forEach((item) => {
    item.addEventListener("click", selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle("is-active");
  }

  function selectChoose() {
    let text = this.innerText,
      select = this.closest(".select"),
      currentText = select.querySelector(".select__current");
    currentText.innerText = text;
    select.classList.remove("is-active");
  }
};

// swipe panel

let swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
});

select();
ymaps.ready(init);

// !togle visible password

function show_hide_password(target) {
  var input = document.getElementById("password");
  if (input.getAttribute("type") == "password") {
    target.classList.add("view");
    input.setAttribute("type", "text");
  } else {
    target.classList.remove("view");
    input.setAttribute("type", "password");
  }
  return false;
}

function viewDiv() {
  let auth = document.getElementById("auth");
  if (auth.style.display == "flex") {
    auth.style.display = "none";
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  } else {
    auth.style.display = "flex";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "22px";
  }
}
