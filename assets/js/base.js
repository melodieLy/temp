//Call the new sidebar function for the recette version

$.getScript("assets/js/config.js", function () {
    //Verify if the user did the authentification
    $(document).ready(function() {
        if(cookies === undefined) {
            window.location.replace("index.html");
            alert("Aucune connexion trouvé. Veuillez-vous authentifier");
            
        } else if (cookies.expires < $.now()) {
            deleteCookie();
            window.location.replace('index.html');
            showAlert("Connexion expirée. Veuillez-vous reconnecter");
        }
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
        //to remove
        if(!window.location.pathname.includes("welcome-call")) {
            window.location.replace("welcome-call.html");
        }
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

function callSidebar(){
    $.get('sidebar.html', function(templates) {
        var sidebar = $(templates).filter('#tpl-sidebar').html();
        $.getJSON("assets/js/sidebar_data.json", function(data) {
            let result = [];
            data.forEach(element => {
                if(element.rights == sessionStorage.getItem("rights")) result.push(element);
            });
            $('#sidebar').append(Mustache.render(sidebar, JSON.stringify(result)));
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
