$.getScript("assets/js/config.js", function () {
    if(environment == "prod") {
        $(function(){
            $("#sidebar").load("sidebar.html");
            get("context/current-user",callheader);
        });
        if(!window.location.pathname.includes("welcome-call")) {
            window.location.replace("welcome-call.html");
        }
    }
    else {
        $(function(){
            $("#sidebar").load("sidebar.recette.html");
            get("context/current-user",callheaderDev);
        });
    }
});

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

$.get('footer.html', function(templates) {
    var footer = $(templates).filter('#tpl-footer').html();
    let footerData = {};
    $('#footer').append(Mustache.render(footer, footerData));
});

// $.get('sidebar-configuration.html', function(templates) {
//     var sidebarConfig = $(templates).filter('#tpl-sidebar-config').html();
//     let sidebarConfigData = {};
//     $('#sidebarConfig').append(Mustache.render(sidebarConfig, sidebarConfigData));
// });    

