(function() {
    "use strict";

    var app = {
        init: function() {
            routes.init();
            myData.init();
            sections.toggle("#app__list");
            onSearch.init();
            createHTML.moreInfo();
        }
    };

    // Eventlistener for when the user clicks on a link and the hash changes
    var routes = {
        init: function() {
            routie({
                'app__home': function() {
                    sections.toggle(window.location.hash);
                },
                'app__list': function() {
                    sections.toggle(window.location.hash);
                },
                'app__list/:id': function(id) {
                    createHTML.hash(id);
                    // Wat ik wil: #app_list/nl-SK-A-2860
                }
            });
        }
    };

    var sections = {
        toggle: function(route) {
            document.querySelectorAll('section').forEach(function (el) {
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
        getQuery: function() {
            myData.init(document.getElementById('searchBar').value);
        }
    };

    // Gets data from Rijksmuseum API
    var myData = {
        init: function (query) {
            var request = new window.XMLHttpRequest();
            var api = "https://www.rijksmuseum.nl/api/nl/collection?q=" + query + "&key=NG2q9L0R&format=json";

            request.open("GET", api, true);
            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    var data = JSON.parse(request.responseText);
                    createHTML.search(data);
                    var artObj = data.artObjects;
                } else {
                    // No succes
                    console.log('We reached our target server, but it returned an error');
                }
            };

            request.onerror = function () {
                // There was a connection error of some sort
            };

            request.send();
        }
    };

    // Get the data and render on the page a couple of art pieces
    // When user search -> Show information
    var createHTML = {
        search: function (data) {
            document.getElementById('artContainer').innerHTML = Handlebars.compile(document.getElementById("artObjects").innerHTML)(data);

            [].forEach.call(document.getElementsByClassName("art__moreinfo"), this.moreInfo);
        },
        hash: function(hashname) {
            console.log(hashname);
            var hashId = hashname;
        },
        // More info function for when user selects more info
        moreInfo: function(el) {
            createHTML.hash();

            console.log(sasas);

            if("#" + el === window.location.hash) {
                routie({
                    '*': function() {
                        console.log(window.location.hash);
                    }
                })
            }
        }
    };

    app.init();

}());