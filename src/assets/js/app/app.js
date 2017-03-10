const DIRECTION = {
    NEXT: 'next',
    PREV: 'prev'
};

class App {

    constructor() {

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
                prev: 'skills',
            },
        };

        /**
         * Lista com as posições do touch Y
         */
        this.touchList = [];

        /**
         * Momentou que disparou o último evento wheel
         * @type {number}
         */
        this.lastWheelTime = new Date().getDate();

        /**
         * Timeout para resetar a ultima hora do ultimo wheel
         * @type {null}
         */
        this.lastWheelTimeout = null;

        /**
         * Variáveis que armazenagem a posição do touch
         * @type {null}
         */
        this.touchStart = null;
        this.touchEnd   = null;

        this.registerEvent();
    }

    /**
     * Seta a altura dos elementos com a altura da tela
     */
    setMaxHeight() {

        let windowHeight = `${window.innerHeight}px`;

        this.$sections.forEach(section => {
            section.style.height = windowHeight;
        });

        this.$main.style.height = windowHeight;
    }

    changePage(page) {

        let pageIndex  = Object.keys(this.pages).indexOf(page),
            translateY = -(window.innerHeight * pageIndex);

        if (this.loadingPage) {
            return false;
        }

        this.loadingPage = true;
        this.page        = page;

        this.$mainContent.style.transform = `translateY(${translateY}px)`;

        setTimeout(() => {
            this.loadingPage = false;
        }, 600);

        this.execCallbackPage();

        this.activateItemNavbar();

        this.toggleScrollArrow();
    }

    /**
     * Troca de página ao dar scroll
     * @param event
     */
    getPageOnScroll(event) {

        let direction = event.deltaY > 0 ? DIRECTION.NEXT : DIRECTION.PREV,
            timeNow   = new Date().getTime(),
            abort     = false;

        event.preventDefault();

        if ((timeNow - this.lastWheelTime) / 1000 < 0.1) {
            abort = true;
        }

        this.lastWheelTime = timeNow;

        if (abort) {
            return;
        }

        if (this.lastWheelTimeout) {
            clearTimeout(this.lastWheelTimeout);
        }

        this.lastWheelTimeout = setTimeout(() => {
            this.lastWheelTime = this.lastWheelTime - 10000;
        }, 1500);

        // Não mexe a tela ao dar scroll
        event.preventDefault();

        this.changePageByDirection(direction);
    }

    /**
     * Trouca de página pelo touch
     * @param event
     */
    getPageOnTouch(event) {

        this.touchList.push(event.touches[0].pageY);

        if (this.touchList.length >= 10) {

            let firstPosition = this.touchList[0],
                lastPosition  = this.touchList[this.touchList.length - 1],
                direction     = firstPosition > lastPosition ? DIRECTION.NEXT : DIRECTION.PREV;

            this.resetTouch();

            this.changePageByDirection(direction);
        }
    }

    /**
     * Marca o item da navbar como ativo
     */
    activateItemNavbar() {

        let pageIndex = Object.keys(this.pages).indexOf(this.page);

        this.$headerNavLi.forEach((li, i) => {

            let method = pageIndex === i ? 'add' : 'remove';

            li.classList[method]('active');
        });
    }

    /**
     * Executa uma ação ao trocar para uma certa página
     */
    execCallbackPage() {

        let callbackPage = this.pages[this.page].callback;

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
    toggleScrollArrow() {

        let classMethod = this.pages[this.page].next ? 'remove' : 'add';

        this.$scrollArrow.classList[classMethod]('hide');
    }

    /**
     * Navega para próxima página
     */
    nextPage() {

        let next = this.pages[this.page].next;

        if (next) {
            this.changePage(next);
        }
    }

    /**
     * Mostra/esconde o menu
     */
    toggleMenu() {
        this.$body.classList.toggle('menu-active');
    };

    /**
     * Troca de página de acordo com a direção
     * @param direction
     */
    changePageByDirection(direction) {

        let nextPage = this.pages[this.page][direction];

        if (nextPage) {
            this.changePage(nextPage);
        }
    }

    /**
     * Registra os eventos
     */
    registerEvent() {
        this.$body.addEventListener('mousewheel', () => this.getPageOnScroll(event));
        this.$body.addEventListener('touchstart', () => this.onTouchStart(event));
        this.$body.addEventListener('touchmove', () => this.onTouchMove(event));
        this.$body.addEventListener('touchend', () => this.onTouchEnd(event));
    }

    /**
     * Evento touch start
     * @param event
     */
    onTouchStart(event) {
        this.touchStart = event.touches[0].pageY;
        this.touchEnd   = undefined;
    }

    /**
     * Evento touch move
     * @param event
     */
    onTouchMove(event) {
        this.touchEnd = event.touches[0].pageY;
    }

    /**
     * Evento touch end
     */
    onTouchEnd() {

        let distance  = Math.abs(this.touchStart - this.touchEnd),
            direction = this.touchStart > this.touchEnd ? DIRECTION.NEXT : DIRECTION.PREV;
        
        if (isNaN(distance) || distance < 50) {
            return;
        }

        this.changePageByDirection(direction);
    }
}

export default App;