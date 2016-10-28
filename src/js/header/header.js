(() => {

    'use strict';

    let $headerOptions = document.querySelector('.header-options'),
        $body;

    $headerOptions.addEventListener('click', function() {

        if (!$body) {
            $body = document.querySelector('body');
        }

        $body.classList.toggle('menu-active');

    });

})();