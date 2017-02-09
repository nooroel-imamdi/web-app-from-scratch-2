(function() {
    "use strict";

    var app = {
        init: function() {
            routes.init();
            console.log(location.hash);
//             console.log(Date()) niet relevant, wel leuk man.
        }
    };

    var routes = {
        init: function() {
            window.addEventListener('hashchange', function(){
                sections.toggle(location.hash);
            })
        }
    };

    var sections = {
        toggle: function(route) {
            var mySection = document.querySelectorAll('section');
            mySection.forEach( function(e) {
                if('#' + e.id === route) {
                    e.classList.remove('section__hide');
                } else {
                    e.classList.add('section__hide');
                }
            });
        }
    };

    app.init();

    }()
);
