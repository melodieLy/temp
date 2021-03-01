//Call the new sidebar function for the recette version

$.getScript("assets/js/config.js", function () {
    if(environment == "prod") {
        $(function(){
            get("sidebarbar_data.js",callSidebar);
            $.getScript("assets/js/sidebar.js", function () {
                if(cookies.assoName.length <= 1) loadSimplySidebarHeader();
                else loadSidebarHeader();
            });
            get("context/current-user",callheader);
        });
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

function callSidebar(result){
    $.get('sidebar.html', function(templates) {
        var header = $(templates).filter('#tpl-sidebar').html();
        $('#sidebar').append(Mustache.render(header, result));
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
