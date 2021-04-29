//Call the new sidebar function for the recette version
$.getScript("assets/js/config.js", function () {
    //Verify if the user did the authentification
    let validCookie = false;
    $(document).ready(function() {
        try {
            validCookie = isValidateCookie();
            if(!validCookie) throw "authentification invalide";
            if (environment == "prod") {
                $(function () {
                    callSidebar();
                    $.getScript("assets/js/sidebar.js", function () {
                        if (cookies.assoName.length <= 1) loadSimplySidebarHeader();
                        else loadSidebarHeader();
                    });
                    get("context/current-user", callheader);
                });
            }
            else {
                $(function () {
                    $("#sidebar").load("sidebar.recette.html");
                    $.getScript("assets/js/sidebar.js", function () {
                        if (cookies.assoName.length <= 1) loadSimplySidebarHeader();
                        else loadSidebarHeader();
                    });
                    get("context/current-user", callheaderDev);
                });
            }
            //if(window.location.pathname != "") addTheAlertColumn();
                
        }
        catch (error) {
            console.error(error);
            document.cookie = "expires=Thu Jan 01 1970 00:00:00 UTC; token=; username=; asso=; assoId=; actualAsso=;";
            sessionStorage.clear();
            localStorage.clear();

            window.location.replace("index.html");
        }
    });

    
});

setInterval(() => {
    $(document).ready(function () {
        try{
            isValidateCookie();
        }
        catch (error) {

        }
    });
}, 60000 * 1);

//
//Please be careful of the path for the prod
//
function checkRightForthePage() {
    const r = $.getJSON("assets/data/sidebar_data.json", searchRights);
    return r;
};

function searchRights(data) {
    const userRights = sessionStorage.getItem('rights');

    data.forEach( sidebarElement => {
        sidebarElement.rights.forEach(sidebarRight => {
            if( userRights == sidebarRight ) {
                for (let j = 0; j < sidebarElement.category.length; j++) {
                    const url = "/temp/" + sidebarElement.category[j].URL;
                    if(url.includes(window.location.pathname)) return true;
                }
            }
        })
        return false;
    });
};

function addTheAlertColumn() {
    var node = document.createElement("div").setAttribute("class","alertColumn");
    var doc = document.getElementsByTagName('content');
    doc.append(node);
}

function callSidebar(){
    $.get('sidebar.html', function(templates) {
        var sidebar = $(templates).filter('#tpl-sidebar').html();
        $.getJSON("assets/data/sidebar_data.json", function(data) {
            let result = [];
            data.forEach(element => {
                element.rights.forEach(right => {
                    if(right== sessionStorage.getItem("rights")) result.push(element);
                });
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
  