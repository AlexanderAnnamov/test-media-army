// city

const cities = {
  EKATERINBURG: {
    coordinates: [56.81911640814073, 60.71813354831949],
    addresses: {
      chernyakhovsky: [56.75167166360553, 60.75666995767255],
      blucher: [56.86537049860099, 60.66835145503491],
    },
  },
  PETERBURG: {
    coordinates: [59.934910487611226, 30.372076390685216],
    addresses: {
      chernyakhovsky: [],
      blucher: [],
    },
  },
  MOSKOW: {
    coordinates: [55.7599352627125, 37.6270555029466],
    addresses: {
      chernyakhovsky: [],
      blucher: [],
    },
  },
  CHELYABINSK: {
    coordinates: [55.16568660106791, 61.43873868217899],
    addresses: {
      chernyakhovsky: [56.75167166360553, 60.75666995767255],
      blucher: [56.86537049860099, 60.66835145503491],
    },
  },
  KAZAN: {
    coordinates: [55.78612625631046, 49.13234342462967],
    addresses: {
      chernyakhovsky: [56.75167166360553, 60.75666995767255],
      blucher: [56.86537049860099, 60.66835145503491],
    },
  },
};

// YaMap

function init() {
  var map = new ymaps.Map(
    "map",
    {
      center: cities.EKATERINBURG,
      zoom: 11,
      controls: [],
    },
    { suppressMapOpenBlock: true }
  );

  // init shops adress

  let shopСhernyakhovsky = new ymaps.Placemark(
    cities.EKATERINBURG.addresses.chernyakhovsky,
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "./img/map/placemark.svg",
      iconImageSize: [48, 54],
      iconImageOffset: [-19, -44],
    }
  );

  let shopBlucher = new ymaps.Placemark(
    cities.EKATERINBURG.addresses.blucher,
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "./img/map/placemark.svg",
      iconImageSize: [48, 54],
      iconImageOffset: [-19, -44],
    }
  );

  // add shops to map

  map.geoObjects.add(shopСhernyakhovsky);
  map.geoObjects.add(shopBlucher);

  // zoom for all objects

  map
    .setBounds(map.geoObjects.getBounds(), { checkZoomRange: true })
    .then(function () {
      if (map.getZoom() > 15) map.setZoom(15);
    });

  // init balloons

  let balloonChernyakhovsky = document.getElementById("show");
  balloonChernyakhovsky.addEventListener("click", showBal, false);

  function showBal() {
    map.setCenter(cities.EKATERINBURG.addresses.chernyakhovsky),
      map.balloon.open(
        map.getCenter(),
        { content: "Hello Yandex!" },
        { closeButton: true }
      );
  }

  let balloonBlucher = document.getElementById("show2");
  balloonBlucher.addEventListener("click", showBal2, false);

  function showBal2() {
    map.setCenter(cities.EKATERINBURG.addresses.blucher),
      map.balloon.open(
        map.getCenter(),
        { content: "Hello Yandex!" },
        { closeButton: true }
      );
  }

  // init url select for map

  let selectItem = document.querySelectorAll(".select__item");

  function setPosition() {
    (selectCity = this.closest(".select")),
      (currentText = selectCity.querySelector(".select__current"));
    switch (currentText.innerText) {
      case "Екатеринбург":
        map.setCenter(cities.EKATERINBURG.coordinates);
        break;
      case "Санкт-Петербург":
        map.setCenter(cities.PETERBURG.coordinates);
        break;
      case "Москва":
        map.setCenter(cities.MOSKOW.coordinates);
        break;
      case "Казань":
        map.setCenter(cities.KAZAN.coordinates);
        break;
      case "Челябинск":
        map.setCenter(cities.CHELYABINSK.coordinates);
        break;
    }
  }

  selectItem.forEach((item) => {
    item.addEventListener("click", setPosition);
  });
}

ymaps.ready(init);

// custom select location

let selectCity = function () {
  let selectHeader = document.querySelectorAll(".select-city-header");
  let selectItem = document.querySelectorAll(".city-item");

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
      select = this.closest(".select-location"),
      currentText = select.querySelector(".select__current");
    currentText.innerText = text;
    select.classList.remove("is-active");
  }
};

let selectAboutCompany = function () {
  let selectHeader = document.querySelectorAll(".select-company-header");

  selectHeader.forEach((item) => {
    item.addEventListener("click", selectToggle);
  });

  function selectToggle() {
    this.parentElement.classList.toggle("is-active");
  }
};

selectAboutCompany();
selectCity();

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

// set visible

let catalog = document.querySelector(".catalog");
let imgCatalogBtn = document.querySelector("#img-catalog-btn");
let auth = document.getElementById("auth");
let input = document.getElementById("password");

// password auth

function setVisiblePassword(target) {
  if (input.getAttribute("type") == "password") {
    target.classList.add("view");
    input.setAttribute("type", "text");
  } else {
    target.classList.remove("view");
    input.setAttribute("type", "password");
  }
  return false;
}

// auth

function setVisibleAuth() {
  if (auth.classList.contains("active")) {
    auth.classList.remove("active");
    if (catalog.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  } else {
    auth.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// catalog

function setVisibleCatalog() {
  if (catalog.classList.contains("active")) {
    catalog.classList.remove("active");
    document.body.style.overflow = "auto";
    imgCatalogBtn.src = "./img/header/btn-catalog.svg";
  } else {
    catalog.classList.add("active");
    document.body.style.overflow = "hidden";
    imgCatalogBtn.src = "./img/header/close-catalog.svg";
  }
}

// category

function categoryMenu() {
  let catalogItem = document.querySelectorAll(".catalog__item");
  let catalogLi = document.querySelectorAll(
    ".catalog__category-news-products ul"
  );

  function setVisibleCategory() {
    let id = this.id;
    catalogLi.forEach(function (e) {
      e.classList.remove("active");
      if (id == e.id.substr(0, e.id.indexOf("-"))) {
        console.log(e);
        e.classList.add("active");
      }
    });
  }

  catalogItem.forEach((item) => {
    item.addEventListener("click", setVisibleCategory);
  });
}

categoryMenu();
