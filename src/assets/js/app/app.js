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
        }, 1500);

        this.execCallbackPage();

        this.activateItemNavbar();

        this.toggleScrollArrow();
    }

    getPageOnScroll(deltaY) {

        let direction = deltaY > 0 ? 'next' : 'prev',
            nextPage  = null;

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

    nextPage() {

        let next = this.pages[this.page].next;

        if (next) {
            this.changePage(next);
        }
    }

    toggleMenu() {
        this.$body.classList.toggle('menu-active');
    };
}

export default App;