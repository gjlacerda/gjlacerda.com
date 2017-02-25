/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App() {
        _classCallCheck(this, App);

        /**
         * Elemento body
         * @type {Element}
         */
        this.$body = document.querySelector('body');

        /**
         * Elemento Main
         * @type {Element}
         */
        this.$main = document.querySelector('main');

        /**
         * Elementos Section
         * @type {NodeList}
         */
        this.$sections = document.querySelectorAll('section');

        /**
         * Elemento MainContent
         * @type {Element}
         */
        this.$mainContent = document.querySelector('.main-content');

        /**
         * Lista de links da navbar
         * @type {NodeList}
         */
        this.$headerNavLi = document.querySelectorAll('.header-nav li');

        /**
         * Elemento com a seta de troca de página
         * @type {Element}
         */
        this.$scrollArrow = document.querySelector('.scroll-arrow');

        /**
         * Página atual
         * @type {string}
         */
        this.page = 'home';

        /**
         * Indica se está transitando para outra página
         * @type {boolean}
         */
        this.loadingPage = false;

        /**
         * Páginas e configurações
         */
        this.pages = {
            home: {
                next: 'skills'
            },
            skills: {
                next: 'about',
                prev: 'home'
            },
            about: {
                prev: 'skills'
            }
        };
    }

    /**
     * Seta a altura dos elementos com a altura da tela
     */


    _createClass(App, [{
        key: 'setMaxHeight',
        value: function setMaxHeight() {

            var windowHeight = window.innerHeight + 'px';

            this.$sections.forEach(function (section) {
                section.style.height = windowHeight;
            });

            this.$main.style.height = windowHeight;
        }
    }, {
        key: 'changePage',
        value: function changePage(page) {
            var _this = this;

            var pageIndex = Object.keys(this.pages).indexOf(page),
                translateY = -(window.innerHeight * pageIndex);

            if (this.loadingPage) {
                return false;
            }

            this.loadingPage = true;
            this.page = page;

            this.$mainContent.style.transform = 'translateY(' + translateY + 'px)';

            setTimeout(function () {
                _this.loadingPage = false;
            }, 1500);

            this.execCallbackPage();

            this.activateItemNavbar();

            this.toggleScrollArrow();
        }
    }, {
        key: 'getPageOnScroll',
        value: function getPageOnScroll(deltaY) {

            var direction = deltaY > 0 ? 'next' : 'prev',
                nextPage = null;

            // Não mexe a tela ao dar scroll
            event.preventDefault();

            // Próxima página
            nextPage = this.pages[this.page][direction];

            if (nextPage) {
                this.changePage(nextPage);
            }
        }

        /**
         * Marca o item da navbar como ativo
         */

    }, {
        key: 'activateItemNavbar',
        value: function activateItemNavbar() {

            var pageIndex = Object.keys(this.pages).indexOf(this.page);

            this.$headerNavLi.forEach(function (li, i) {

                var method = pageIndex === i ? 'add' : 'remove';

                li.classList[method]('active');
            });
        }

        /**
         * Executa uma ação ao trocar para uma certa página
         */

    }, {
        key: 'execCallbackPage',
        value: function execCallbackPage() {

            var callbackPage = this.pages[this.page].callback;

            if (!callbackPage) {
                return;
            }

            callbackPage();

            // Limpa depois de executar
            this.pages[this.page].callback = null;
        }

        /**
         * Mostra/esconde a seta de navegação
         */

    }, {
        key: 'toggleScrollArrow',
        value: function toggleScrollArrow() {

            var classMethod = this.pages[this.page].next ? 'remove' : 'add';

            this.$scrollArrow.classList[classMethod]('hide');
        }
    }, {
        key: 'nextPage',
        value: function nextPage() {

            var next = this.pages[this.page].next;

            if (next) {
                this.changePage(next);
            }
        }
    }, {
        key: 'toggleMenu',
        value: function toggleMenu() {
            this.$body.classList.toggle('menu-active');
        }
    }]);

    return App;
}();

exports.default = App;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QUART = Math.PI / 2;
var PI2 = Math.PI * 2;
var PIXEL_RATIO = 2;

var Skills = function () {
    function Skills() {
        _classCallCheck(this, Skills);

        /**
         * Objeto de configuração de acordo com o tamanho da tela
         * @type {{}}
         */
        this.configSize = {};

        /**
         * Lista de skills
         */
        this.skills = [{
            canvas: document.getElementById('javascript'),
            label: document.querySelector('.javascript-label'),
            name: 'javascript',
            percent: 0,
            maxPercent: 90,
            color: '189, 92, 185'
        }, {
            canvas: document.getElementById('angular1'),
            label: document.querySelector('.angular1-label'),
            name: 'angular1',
            percent: 0,
            maxPercent: 90,
            color: '45, 126, 165'

        }, {
            canvas: document.getElementById('angular2'),
            label: document.querySelector('.angular2-label'),
            name: 'angular2',
            percent: 0,
            maxPercent: 60,
            color: '254, 94, 65'
        }, {
            canvas: document.getElementById('react'),
            label: document.querySelector('.react-label'),
            name: 'react',
            percent: 0,
            maxPercent: 50,
            color: '46, 204, 113'
        }, {
            canvas: document.getElementById('gulp'),
            label: document.querySelector('.gulp-label'),
            name: 'gulp',
            percent: 0,
            maxPercent: 75,
            color: '192, 57, 43'
        }, {
            canvas: document.getElementById('html5'),
            label: document.querySelector('.html5-label'),
            name: 'html5',
            percent: 0,
            maxPercent: 95,
            color: '51, 139, 231'
        }, {
            canvas: document.getElementById('css3'),
            label: document.querySelector('.css3-label'),
            name: 'css3',
            percent: 0,
            maxPercent: 90,
            color: '254, 134, 31'
        }, {
            canvas: document.getElementById('less'),
            label: document.querySelector('.less-label'),
            name: 'less',
            percent: 0,
            maxPercent: 85,
            color: '52, 73, 94'
        }, {
            canvas: document.getElementById('git'),
            label: document.querySelector('.git-label'),
            name: 'git',
            percent: 0,
            maxPercent: 70,
            color: '142, 68, 173'
        }, {
            canvas: document.getElementById('php'),
            label: document.querySelector('.php-label'),
            name: 'php',
            percent: 0,
            maxPercent: 80,
            color: '26, 188, 156'
        }];
    }

    _createClass(Skills, [{
        key: 'init',
        value: function init() {
            this.getConfigurationSize();
            this.configureElements();
        }
    }, {
        key: 'configureElements',
        value: function configureElements() {
            var _this = this;

            this.skills.forEach(function (skill) {
                skill.canvas.width = _this.configSize.canvasWidth * PIXEL_RATIO;
                skill.canvas.height = _this.configSize.canvasWidth * PIXEL_RATIO;
                skill.canvas.style.width = _this.configSize.canvasWidth + 'px';
                skill.canvas.style.height = _this.configSize.canvasWidth + 'px';
                skill.label.style.color = 'rgb(' + skill.color + ')';
            });
        }
    }, {
        key: 'render',
        value: function render(skill) {

            var $canvas = skill.canvas,
                ctx = $canvas.getContext("2d"),
                pct = skill.percent / 100,
                extent = parseInt(skill.maxPercent * pct),
                current = skill.maxPercent / 100 * PI2 * pct - QUART,
                x = $canvas.width / 2,
                y = $canvas.height / 2,
                radius = $canvas.width / 2 - this.configSize.lineWidth / 2 * PIXEL_RATIO;

            ctx.lineWidth = this.configSize.lineWidth * PIXEL_RATIO;
            ctx.font = this.configSize.font + 'px Arial';

            ctx.clearRect(0, 0, $canvas.width, $canvas.height);

            ctx.beginPath();
            ctx.arc(x, y, radius, -QUART, 100);
            ctx.fillStyle = 'rgba(' + skill.color + ',.1)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, radius, -QUART, current);
            ctx.strokeStyle = 'rgb(' + skill.color + ')';
            ctx.stroke();
            ctx.fillStyle = '#666';
            ctx.fillText(extent + '%', $canvas.width / 2 - this.configSize.textX, $canvas.height / 2 + 10);
        }
    }, {
        key: 'startAnimation',
        value: function startAnimation() {
            var _this2 = this;

            setTimeout(function () {
                _this2.skills.forEach(function (skill, index) {
                    setTimeout(function () {
                        _this2.animateElements(skill.canvas);
                        _this2.animateCanvas(skill);
                    }, 300 * index);
                });
            }, 400);
        }
    }, {
        key: 'animateCanvas',
        value: function animateCanvas(skill) {
            var _this3 = this;

            if (skill.percent < 100) {
                requestAnimationFrame(function () {
                    return _this3.animateCanvas(skill);
                });
            }

            this.render(skill);

            skill.percent += 1;
        }
    }, {
        key: 'animateElements',
        value: function animateElements(element) {
            element.parentNode.style.transform = 'scale(1)';
            element.parentNode.style.opacity = 1;
        }
    }, {
        key: 'getConfigurationSize',
        value: function getConfigurationSize() {

            var width = window.innerWidth;

            this.configSize = {
                canvasWidth: 65,
                lineWidth: 3,
                font: 12 * PIXEL_RATIO,
                textX: 10 * PIXEL_RATIO
            };

            if (width >= 600) {
                this.configSize = {
                    canvasWidth: 90,
                    lineWidth: 4,
                    font: 12 * PIXEL_RATIO,
                    textX: 10 * PIXEL_RATIO
                };
            }

            if (width >= 600) {
                this.configSize = {
                    canvasWidth: 120,
                    lineWidth: 4,
                    font: 14 * PIXEL_RATIO,
                    textX: 10 * PIXEL_RATIO
                };
            }

            if (width >= 1415) {
                this.configSize = {
                    canvasWidth: 180,
                    lineWidth: 5,
                    font: 16 * PIXEL_RATIO,
                    textX: 12 * PIXEL_RATIO
                };
            }
        }
    }]);

    return Skills;
}();

exports.default = Skills;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(0);

var _app2 = _interopRequireDefault(_app);

var _skills = __webpack_require__(1);

var _skills2 = _interopRequireDefault(_skills);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _app2.default(),
    skills = new _skills2.default();

app.setMaxHeight();
app.pages.skills.callback = function () {
    return skills.startAnimation();
};

window.addEventListener('resize', function () {
    app.setMaxHeight();
});

skills.init();

window.App = app;

/***/ })
/******/ ]);