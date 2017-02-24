class App {

    constructor() {

        /**
         * Elemento body
         * @type {Element}
         */
        this.$body = document.querySelector('body');

        /**
         * Elemento .header-options
         * @type {Element}
         */
        this.$headerOptions = document.querySelector('.header-options');

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
                callback: null,
                next: 'about'
            },
            about: {
                callback: null,
                prev: 'home',
                next: 'skills'
            },
            skills: {
                callback: null,
                prev: 'about'
            }
        };
    }

    /**
     * Inicialização
     */
    init() {
        this.setMaxHeight();
        this.registerEvents();
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
    }

    getPageOnScroll(deltaY) {

        let direction = deltaY > 0 ? 'next' : 'prev';

        // Não mexe a tela ao dar scroll
        event.preventDefault();

        // Próxima página
        return this.pages[this.page][direction];
    }

    /**
     * Eventos
     */
    registerEvents() {

        // Recalcula o tamanho máximo ao dar resize
        window.addEventListener('resize', () => {
            this.setMaxHeight();
        });

        // Troca de página
        this.$main.addEventListener('mousewheel', event => {

            let page = this.getPageOnScroll(event.deltaY);

            if (page) {
                this.changePage(page);
            }
        });

        // Abre o menu
        this.$headerOptions.addEventListener('click', () => this.$body.classList.toggle('menu-active'));
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
}

export default App;