(function() {
    "use strict";

    var app = {
        init: function () {
            routes.init();
            myData.init();
            sections.toggle("#app__list");
            onSearch.init();
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
            var mySection = document.querySelectorAll('section');

            mySection.forEach(function (el) {
                if ('#' + el.id === route) {
                    el.classList.remove('section__hide');
                } else {
                    el.classList.add('section__hide');
                }
            });
        }
    };

    // Get value from searchbox so i can send it to data
    var onSearch = {
        init: function() {
            document.getElementById("searchBar__btn").addEventListener('click', this.getQuery);
        },
        getQuery: function(el) {
            var query = document.getElementById('searchBar').value;
            myData.init(query);
        }
    };

    // Gets dat from Rijksmuseum API
    var myData = {
        init: function (query) {
            var request = new window.XMLHttpRequest();
            var searchQuery = query;
            var api = "https://www.rijksmuseum.nl/api/nl/collection?q=" + searchQuery + "&key=NG2q9L0R&format=json";

            request.open("GET", api, true);
            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    var data = JSON.parse(request.responseText);
                    createHTML.search(data , searchQuery);
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

    // Get the data and render on the page what i want
    // When user search -> Show information
    var createHTML = {
        search: function (data, searchQuery) {
            var compTemp = Handlebars.compile(document.getElementById("artObjects").innerHTML);
            var renderedHTML = compTemp(data);

            document.getElementById('artContainer').innerHTML = renderedHTML;
        }
    };

    app.init();

}());