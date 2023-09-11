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

ymaps.ready(function () {
  var map = new ymaps.Map(
    "map",
    {
      center: cities.EKATERINBURG,
      zoom: 11,
      controls: [],
    },
    { suppressMapOpenBlock: true }
  );

  var btnLocation = new ymaps.control.Button({
    options: {
      layout: ymaps.templateLayoutFactory.createClass(
        "<div class='customLocationBtn'><div/>"
      ),
      maxWidth: 150,
    },
  });
  btnLocation.events.add("click", function (event) {
    var geolocation = ymaps.geolocation;
    geolocation
      .get({
        provider: "browser",
        mapStateAutoApply: true,
      })
      .then(function (result) {
        result.geoObjects.options.set("preset", "islands#blueCircleIcon");
        map.geoObjects.add(result.geoObjects);
      });
  });
  map.controls.add(btnLocation, {
    float: "none",
    position: {
      bottom: "270px",
      right: "12px",
    },
  });

  var btnPlus = new ymaps.control.Button({
    options: {
      layout: ymaps.templateLayoutFactory.createClass(
        "<div class='customZoomBtn plus'><div/>"
      ),
      maxWidth: 150,
    },
  });
  map.controls.add(btnPlus, {
    float: "none",
    position: {
      bottom: "365px",
      right: "12px",
    },
  });

  btnPlus.events.add("click", function (event) {
    map.setZoom(map.getZoom() + 1, {
      duration: 500,
    });
  });

  var btnMinus = new ymaps.control.Button({
    options: {
      layout: ymaps.templateLayoutFactory.createClass(
        "<div class='customZoomBtn minus'><div/>"
      ),
      maxWidth: 150,
    },
  });
  map.controls.add(btnMinus, {
    float: "none",
    position: {
      bottom: "320px",
      right: "12px",
    },
  });
  btnMinus.events.add("click", function (event) {
    console.log("click btn minus");
    map.setZoom(map.getZoom() - 1, {
      duration: 500,
    });
  });

  // init shops adress

  (MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
    '<div class="popover top">' +
      '<a class="close" href="#"><img src="./img/icons/close-btn.svg"></a>' +
      '<div class="arrows"></div>' +
      '<div class="popover-inner">' +
      "$[[options.contentLayout observeSize minWidth=440 maxWidth=440 maxHeight=350]]" +
      "</div>" +
      "</div>",
    {
      build: function () {
        this.constructor.superclass.build.call(this);

        this._element = this.getParentElement().querySelector(".popover");
        this._onCloseClick = this.onCloseClick.bind(this);

        this.applyElementOffset();

        this._element
          .querySelector(".close")
          .addEventListener("click", this._onCloseClick);
      },

      clear: function () {
        this._element
          .querySelector(".close")
          .removeEventListener("click", this._onClickClick);

        this.constructor.superclass.clear.call(this);
      },

      onSublayoutSizeChange: function () {
        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

        if (!this._isElement(this._element)) {
          return;
        }

        this.applyElementOffset();

        this.events.fire("shapechange");
      },

      applyElementOffset: function () {
        Object.assign(this._element.style, {
          left: -(this._element.offsetWidth / 2) + "px",
          top:
            -(
              this._element.offsetHeight +
              this._element.querySelector(".arrows").offsetHeight
            ) + "px",
        });
      },
      onCloseClick: function (e) {
        e.preventDefault();

        this.events.fire("userclose");
      },

      _isElement: function (element) {
        return element && element.querySelector(".arrows");
      },
    }
  )),
    (MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="balloon-header"><h3>Магазин на Черняховского</h3></div>' +
        '<ul class="balloon-body"><li>улица Черняховского, 99</li><li>+7 (999) 012-34-56<li>Ежедневно с 09:00 до 22:00</li></li></ul>' +
        '<button class="route">Построить маршрут</button>' +
        '<div class="links-map"><a target="blank" href="https://yandex.by/maps/157/minsk/?ll=27.555691%2C53.902735&mode=routes&rtext=&rtt=auto&z=12"><img src="./img/map/yandex-navigator.svg"></img></a><a target="blank" href="https://maps.google.com"><img src="./img/map/google-maps.svg"></img></a></div>'
    ));

  shopСhernyakhovsky = window.shopСhernyakhovsky = new ymaps.Placemark(
    cities.EKATERINBURG.addresses.chernyakhovsky,
    { balloonContent: "Это красивая метка" },
    {
      iconLayout: "default#image",
      iconImageHref: "./img/map/placemark.svg",
      iconImageSize: [48, 54],
      iconImageOffset: [-19, -44],
      balloonShadow: false,
      hideIconOnBalloonOpen: false,
      balloonLayout: MyBalloonLayout,
      balloonContentLayout: MyBalloonContentLayout,
      balloonPanelMaxMapArea: 0,
      balloonOffset: [-220, -120],
    }
  );

  shopСhernyakhovsky.events.add("click", function () {
    map.setCenter(cities.EKATERINBURG.addresses.chernyakhovsky);
  });

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
});

// ymaps.ready(init);

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

// custom select about company

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
let authActive = document.querySelector(".active");
let wrapper = document.querySelector(".wrapper");

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

let rootElement = document.documentElement;

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function setVisibleAuth(elem) {
  scrollToTop();
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

// adaptive-menu

const adaptiveMenu = document.querySelector(".adaptiv-menu");
const imgAdaptiveMenuBtn = document.querySelector("#visible-menu");
const btnVisibleMenu = document.querySelector("#btn-visible-menu");
const novelties = document.querySelector(".novelties");

function setVisibleMenu() {
  if (adaptiveMenu.classList.contains("active")) {
    adaptiveMenu.classList.remove("active");
    imgAdaptiveMenuBtn.src = "./img/header/table-burger.svg";
    btnVisibleMenu.style.backgroundColor = "#F2F7FD";
    novelties.style.display = "block";
  } else {
    adaptiveMenu.classList.add("active");
    imgAdaptiveMenuBtn.src = "./img/header/close-catalog.svg";
    btnVisibleMenu.style.backgroundColor = "#0064D8";
    setTimeout(() => {
      novelties.style.display = "none";
    }, 600);
  }
}

// adaptive-catalog

const adaptiveCatalog = document.querySelector(".adaptiv-catalog");
let adaptiveCategoriesUl = document.querySelectorAll(
  ".adaptiv-category-items .adaptiv-category"
);
let adaptiveCategory = document.querySelector(".adaptiv-category");
let adaptiveGroup = document.querySelector(".adaptiv-group");

function setVisibleAdaptiveCatalog() {
  adaptiveCatalog.classList.toggle("active");
}

// close adaptive-category

function closeAdaptiveCatalog() {
  adaptiveCategory.classList.remove("active");
}

// close adaptive-group

function closeAdaptiveGroup() {
  adaptiveGroup.classList.remove("active");
}

// category

let typeItem = document.querySelectorAll(".catalog__types-goods ul li button");
let typeAdaptiveItem = document.querySelectorAll(
  ".adaptiv-catalog__btns .adaptiv-catalog__container-btn"
);
let categoryUl = document.querySelectorAll(
  ".catalog__category-news-products ul"
);
let adaptiveCategoryItem = document.querySelectorAll(
  ".adaptiv-category-btns .adaptiv-catalog__container-btn"
);

let categoryItem = document.querySelectorAll(
  ".catalog__category-news-products ul li button"
);
let groupItem = document.querySelectorAll(".catalog__groups-goods ul");
let adaptivGroupItem = document.querySelectorAll(
  ".adaptiv-group-items .adaptiv-group"
);

function categoryMenu() {
  function setVisibleAdaptiveCategory() {
    let elem = this;
    console.log(elem);
    adaptiveCategoriesUl.forEach(function (e) {
      if (elem.id == e.id.substr(0, e.id.indexOf("-"))) {
        e.classList.add("active");
      }
    });
  }

  function setVisibleCategory() {
    let elem = this;

    typeItem.forEach(function (e) {
      e.classList.remove("active-focus");
      elem.classList.add("active-focus");
    });

    groupItem.forEach(function (e) {
      e.classList.remove("active");
    });

    categoryUl.forEach(function (e) {
      e.classList.remove("active");
      if (elem.id == e.id.substr(0, e.id.indexOf("-"))) {
        e.classList.add("active");
      }
    });
  }

  // group

  function setVisibleGroup() {
    let elem = this;

    categoryItem.forEach(function (e) {
      e.classList.remove("active-focus");
      elem.classList.add("active-focus");
    });

    groupItem.forEach(function (e) {
      e.classList.remove("active");
      if (elem.id == e.id.substr(0, e.id.indexOf("-"))) {
        e.classList.add("active");
      }
    });
  }

  function setVisibleAdaptivGroup() {
    let elem = this;

    adaptivGroupItem.forEach(function (e) {
      if (elem.id == e.id.substr(0, e.id.indexOf("-"))) {
        console.log(e);
        e.classList.add("active");
      }
    });
  }

  typeItem.forEach((item) => {
    item.addEventListener("click", setVisibleCategory);
  });

  typeAdaptiveItem.forEach((item) => {
    item.addEventListener("click", setVisibleAdaptiveCategory);
  });

  categoryItem.forEach((item) => {
    item.addEventListener("click", setVisibleGroup);
  });

  adaptiveCategoryItem.forEach((item) => {
    item.addEventListener("click", setVisibleAdaptivGroup);
  });
}

categoryMenu();

// scroll achievements

const achievements = document.querySelector(".achievements__row");

achievements.onmousemove = mousemove;
achievements.onmousedown = function (e) {
  e = e || window.event;
  down = 1;
  x = e.clientX;
  y = e.clientY;
};

document.onmouseup = function (e) {
  e = e || window.event;
  down = 0;
};

function mousemove(e) {
  if (down == 1) {
    if (x && y) {
      achievements.scrollBy(x - e.clientX, y - e.clientY);
    }
    x = e.clientX;
    y = e.clientY;
  }
}

///

let lastScroll = 0;
const defaultOffset = 100;
const navbar = document.querySelector(".navbar");

const scrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => navbar.classList.contains("hide");

window.addEventListener("scroll", () => {
  if (
    scrollPosition() > lastScroll &&
    !containHide() &&
    scrollPosition() > defaultOffset
  ) {
    //scroll down
    navbar.classList.add("hide");
  } else if (scrollPosition() < lastScroll && containHide()) {
    //scroll up
    navbar.classList.remove("hide");
  }

  lastScroll = scrollPosition();
});
