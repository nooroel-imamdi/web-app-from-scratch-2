(function() {
    "use strict";

    var app = {
        init: function() {
            routes.init();
        }
    };

    // Eventlistener for when the user clicks on a link and the hash changes
    var routes = {
        init: function() {
            window.addEventListener('hashchange', function(){
                sections.toggle(window.location.hash);
            })
        }
    };

    // Gets the change in hash from routes() and searches DOM for 'section' and hides/shows the section selected.
    var sections = {
        toggle: function(route) {
            var mySection = document.querySelectorAll('section');

            mySection.forEach( function(el) {
                if('#' + el.id === route) {
                    el.classList.remove('section__hide');
                } else {
                    el.classList.add('section__hide');
                }
            });
        }
    };

    app.init();

    }()
);