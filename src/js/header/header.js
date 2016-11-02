(() => {

    'use strict';

    /**
     * Elemento .header-options
     * @type {Element}
     */
    let $headerOptions = document.querySelector('.header-options');

    /**
     * Elemento body
     */
    let $body = null;

    /**
     * Inicialização
     */
    function init() {

        $headerOptions.addEventListener('click', function() {

            if (!$body) {
                $body = document.querySelector('body');
            }

            $body.classList.toggle('menu-active');

        });
    }

    init();

})();