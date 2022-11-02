jQuery(document).ready(function($) {
    $("nav#menu").mmenu({
        "extensions": [
            "pagedim-black",
            "shadow-page"
        ],
        "offCanvas": {
            zposition: "front"
        },
        // "searchfield": {
        //     "placeholder": 'Need some fresh vegatables?'
        // },
        "navbar": {
            title: 'Ursi Galletti Orfebrería'
        },
        "navbars": [{
                "position": "top",
                "content": [
                    '<a routerLink="/home"><img src="./assets/images/logo.png" class="img-responsive" alt="Image"></a>'
                ]
            },
            {
                "position": 'top',
                "content": ['searchfield']
            },
            {
                "position": 'top',
                "content": ['breadcrumbs']
            },
            // {
            //     "position": "bottom",
            //     "content": [
            //         "<a class='fa fa-envelope' routerLink='/contact'></a>",
            //         "<a class='fa fa-twitter' href='#/'></a>",
            //         "<a class='fa fa-facebook' href='#/'></a>"
            //     ]
            // }
        ]
    });
});