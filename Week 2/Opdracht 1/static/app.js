(function() {
    "use strict";

    var app = {
        init: function () {
            routes.init();
            myData.init();
            searchRes.search();
        }
    };

    // Eventlistener for when the user clicks on a link and the hash changes
    var routes = {
        init: function () {
            window.addEventListener('hashchange', function () {
                sections.toggle(window.location.hash);
            })
        }
    };

    // Gets the change in hash from routes() and searches DOM for 'section' and hides/shows the section selected.
    var sections = {
        toggle: function (route) {
            document.querySelectorAll('section');.forEach(function (el) {
                if ('#' + el.id === route) {
                    el.classList.remove('section__hide');
                } else {
                    el.classList.add('section__hide');
                }
            });
        }
    };

    // Gets dat from Rijksmuseum API
    var myData = {
        init: function () {
            var request = new window.XMLHttpRequest();
            var searchQuery = "blauw";
            var api = "https://www.rijksmuseum.nl/api/nl/collection?q=" + searchQuery + "&key=NG2q9L0R&format=json";

            request.open("GET", api, true);
            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    var data = JSON.parse(request.responseText);
                    searchRes.search(data , searchQuery);
                    // console.log(data , searchQuery);
                } else {
                    console.log('We reached our target server, but it returned an error');
                }
            };

            request.onerror = function () {
                // There was a connection error of some sort
            };

            request.send();
        }
    };

    // When user search -> Show information
    var searchRes = {
        search: function (query, searchQuery) {
            query.artObjects.forEach(function (el) {
                console.log(el.webImage.url + "for searchquery: " + searchQuery);
            });
        }
    };

    app.init();

}());