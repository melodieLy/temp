//Call the new sidebar function for the recette version

$.getScript("assets/js/config.js", function () {
    if(environment == "prod") {
        $(function(){
            callSidebar(data);
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

function callSidebar(){
    $.get('sidebar.html', function(templates) {
        var sidebar = $(templates).filter('#tpl-sidebar').html();
        $.getJSON("sidebar_data.json", function(data) {
            $('#sidebar').append(Mustache.render(sidebar, data));
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
