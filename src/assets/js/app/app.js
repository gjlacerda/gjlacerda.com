(() => {

    'use strict';

    /**
     * Indica se está carregando uma página
     * @type {boolean}
     */
    let loadingPage = false;

    /**
     * Página atual
     * @type {number}
     */
    let page = 0;

    /**
    * Elementos Section
    * @type {NodeList}
    */
    let $sections = document.querySelectorAll('section');

    /**
     * Elemento Main
     * @type {Element}
     */
    let $main = document.querySelector('main');

    /**
     * Navbar principal
     * @type {Element}
     */
    let $liHeaderNavbar = document.querySelectorAll('.header-nav li');

    /**
     * Seta a altura dos elementos com a altura da tela
     */
    function setMaxHeight() {

        let windowHeight = `${window.innerHeight}px`;

        $sections.forEach(section => {
            section.style.height = windowHeight;
        });

        $main.style.height = windowHeight;
    }

    /**
     * Troca de página de acordo com a direção do scroll
     * @param event
     */
    function changePage(event) {

        let windowHeight = -window.innerHeight,
            direction    = event.deltaY > 0 ? 'down' : 'up';

        // Evita que mexa a tela
        event.preventDefault();

        if (loadingPage) {
            return false;
        }

        if ((page === 0 && direction === 'up') || (page === $sections.length - 1 && direction === 'down')) {
            return false;
        }

        loadingPage = true;
        page        = direction === 'down' ? ++page : --page;

        $sections.forEach(section => {
            section.style.transform = `translateY(${windowHeight * page}px)`;
        });

        setTimeout(() => {
            loadingPage = false;
            event.canceled = true;
        }, 1500);

        checkNavbar(page);
    }

    /**
     * Marca o item da navbar como ativo
     * @param index
     */
    function checkNavbar(index) {

        $liHeaderNavbar.forEach((li, i) => {

            let method = index === i ? 'add' : 'remove';

            li.classList[method]('active');

        });
    }

    /**
     * Inicialização
     */
    function init() {

        // Recalcula o tamanho máximo ao dar resize
        window.addEventListener('resize', setMaxHeight);

        // Troca de página
        $main.addEventListener('mousewheel', event => {
            changePage(event);
        });

        setMaxHeight();
    }
    
    init();

})();