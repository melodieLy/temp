/// Call the new sidebar function (Only for the recette version)
$.getScript("assets/js/config.js", function () {
    
    let validCookie = false;
    $(document).ready(function() {
        try {
            /// Verify if the user did the authentification
            validCookie = isValidateCookie();
            if(!validCookie) throw "authentification invalide";

            $(function () {
                // Select the right navigation elements, will be remove when all pages will be show in prod
                //The recette element is more live a save
                if (environment == "prod") callSidebar("sidebar_data");
                else callSidebar("sidebar_data.recette");

                $.getScript("assets/js/sidebar.js", function () {
                    if (sessionStorage.getItem('rights') != "ADMIN") loadSimplySidebarHeader();
                    else loadSidebarHeader();
                });
                get("context/current-user", callheader);

            });
        }
        catch (error) {
            /// Delete all the data
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
            document.cookie = "expires=Thu Jan 01 1970 00:00:00 UTC; token=; username=; asso=; assoId=; actualAsso=;";
            sessionStorage.clear();
            localStorage.clear();

            window.location.replace("index.html");
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

/// Verify if each right of a element in the navigation is the same with tue user's right
/// TO check, becarful of the link !
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
    var node = document.createElement("div");
    node.setAttribute("id","alertColumn");
    var doc = document.getElementsByClassName('content');
    doc[0].append(node);
}

/// Retrieve the navigation elements on the sidebar_data
// fileData = name of the file in data
function callSidebar(fileData){
    $.get('sidebar.html', function(templates) {
        var sidebar = $(templates).filter('#tpl-sidebar').html();
        $.getJSON("assets/data/"+fileData+".json", function(data) {
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

function callheader(result){
    $.get('header.html', function(templates) {
        var header = $(templates).filter('#tpl-header').html();
        $('#header').append(Mustache.render(header, result));
    });
}

function callheaderDev(result){
    $.get('header.recette.html', function(templates) {
        var header = $(templates).filter('#tpl-header').html();
        $('#header').append(Mustache.render(header, result));
    });
}
  