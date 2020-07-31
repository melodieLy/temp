
//Get element with Jquery
$(function(){
  $("#sidebar").load("sidebar.html");
});

get("context/current-user",callheader);
get("/users/"+cookies.username+"/roles",callMailSum);

//Get element with Jquery + moustache
function callheader(result){
    $.get('header.html', function(templates) {
        var header = $(templates).filter('#tpl-header').html();
        $('#header').append(Mustache.render(header, result));
    });
}

$.get('footer.html', function(templates) {
    // Fetch the <script /> block from the loaded external
    // template file which contains our greetings template.
    var footer = $(templates).filter('#tpl-footer').html();
    let footerData = {};
    $('#footer').append(Mustache.render(footer, footerData));
});

$.get('sidebar-configuration.html', function(templates) {
    // Fetch the <script /> block from the loaded external
    // template file which contains our greetings template.
    var sidebarConfig = $(templates).filter('#tpl-sidebar-config').html();
    let sidebarConfigData = {};
    $('#sidebarConfig').append(Mustache.render(sidebarConfig, sidebarConfigData));
});

//From here, we call specifics components
// * Call the mails summary 
function callMailSum(result) {
    for (let i = 0; i < result.length; i++) {
        const element = array[i];
        console.log(element.Role)
    }
}

$.get('components/mails-summary.html', function(templates) {
    var component = $(templates).filter('#tpl-mails-sum').html();
    $.getJSON("./assets/js/index.json", function (data){
        $('#mailSummary').append(Mustache.render(component,data));
    })
});