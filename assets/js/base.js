//Call the new sidebar function for the recette version
$.getScript("assets/js/config.js", function () {
    //Verify if the user did the authentification
    $(document).ready(function() {
        checkValidateCookie();
    });

    if(environment == "prod") {
        $(function(){
            callSidebar();
            $.getScript("assets/js/sidebar.js", function () {
                if(cookies.assoName.length <= 1) loadSimplySidebarHeader();
                else loadSidebarHeader();
            });
            get("context/current-user",callheader);
        });
    }
    else {
        $(function(){
            $("#sidebar").load("sidebar.recette.html");
            $.getScript("assets/js/sidebar.js", function () {
                if(cookies.assoName.length <= 1) loadSimplySidebarHeader();
                else loadSidebarHeader();
            });
            get("context/current-user",callheaderDev);
        });
    }
   
});
//
//Please be careful of the path for the prod
//
function checkRightForthePage() {
    const userRights = sessionStorage.getItem('rights');
    $.getJSON("assets/js/sidebar_data.json", function(data) {
        data.forEach(element => {
            if(element.rights == userRights) {
                for (let i = 0; i < data.length; i++) {
                    const url = "/temp/" + element.category[i].URL;
                    if(url.includes(window.location.pathname)) return true;
                }
            }
        })
        window.location.replace("404.html");
    })
};

function checkValidateCookie() {
    if(cookies === undefined) {
        window.location.replace("index.html");
        alert("Aucune connexion trouvé. Veuillez-vous authentifier");
        
    } else if (cookies.expires < $.now()) {
        deleteCookie();
        window.location.replace('index.html');
        showAlert("Connexion expirée. Veuillez-vous reconnecter");
    }
}

function callSidebar(){
    $.get('sidebar.html', function(templates) {
        var sidebar = $(templates).filter('#tpl-sidebar').html();
        $.getJSON("assets/js/sidebar_data.json", function(data) {
            let result = [];
            data.forEach(element => {
                if(element.rights == sessionStorage.getItem("rights")) result.push(element);
            });
            $('#sidebar').append(Mustache.render(sidebar, result));
        })
    });
}

//Get element with Jquery + moustache
function callheader(result){
    $.get('header.html', function(templates) {
        var header = $(templates).filter('#tpl-header').html();
        $('#header').append(Mustache.render(header, result));
    });
}

//Get element with Jquery + moustache
function callheaderDev(result){
    $.get('header.recette.html', function(templates) {
        var header = $(templates).filter('#tpl-header').html();
        $('#header').append(Mustache.render(header, result));
    });
}
