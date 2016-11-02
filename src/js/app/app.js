(() => {

    /**
    * Elementos Section
    * @type {NodeList}
    */
    let $sections = document.querySelectorAll('section');

    /**
     * Retorna a altura da tela
     * @returns {string}
     */
    function getWindowHeight() {
        return `${window.innerHeight}px`;
    }

    /**
     * Seta a altura dos elementos Section com a altura da tela
     */
    function setSectionsHeight() {

        $sections.forEach(section => {
            section.style.height = getWindowHeight();
        });
    }

    /**
     * Inicialização
     */
    function init() {

        window.addEventListener('resize', () => {
            setSectionsHeight();
        });

        setSectionsHeight();

    }
    
    init();

})();