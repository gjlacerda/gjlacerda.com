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
        console.log(event);
        let windowHeight = -window.innerHeight;

        // Evita que mexa a tela
        event.preventDefault();

        if (loadingPage) {
            return false;
        }

        loadingPage = true;
        page        = event.deltaY > 0 ? ++page : --page;

        $sections.forEach(section => {
            section.style.transform = `translateY(${windowHeight * page}px)`;
        });

        setTimeout(() => {
            loadingPage = false;
            event.canceled = true;
        }, 2000);
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