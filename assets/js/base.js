get("context/current-user",callheader);


//Get element with Jquery + moustache
function callheader(result){
    $.get('header.html', function(templates) {
        var header = $(templates).filter('#tpl-header').html();
        $('#header').append(Mustache.render(header, result));
    });
}

$.get('footer.html', function(templates) {
    var footer = $(templates).filter('#tpl-footer').html();
    let footerData = {};
    $('#footer').append(Mustache.render(footer, footerData));
});

if(environnement == "prod") {
    $(function(){
        $("#sidebar").load("sidebar.html");
    });
}
else {
    $(function(){
        $("#sidebar").load("sidebar.recette.html");
    });
}

// $.get('sidebar-configuration.html', function(templates) {
//     var sidebarConfig = $(templates).filter('#tpl-sidebar-config').html();
//     let sidebarConfigData = {};
//     $('#sidebarConfig').append(Mustache.render(sidebarConfig, sidebarConfigData));
// });    

