//Get element with Jquery
$(function(){
  $("#sidebar").load("sidebar.html");
});

$(document).ready(function() {
    console.log("ready for cookies");
    const cookies = getCookie();
    if(cookies.token === 'undefined') {
        console.log("cookies not found");
    } else if (cookies.expires < $.now()) {
        console.log("cookies expired");
    } else if (cookies.token) {
        console.log(document.cookie.token);
        console.log(document.cookie.expires);
    }
});

function getCookie() {
    let array = document.cookie.split(";");
    let result = new Array();
    result.expires = (array[0].split('=').pop());
    result.token = (array[1].split('=').pop());
    return result;
}

//Get elment with Jquery + moustache
$.get('header.html', function(templates) {
    // Fetch the <script /> block from the loaded external
    // template file which contains our greetings template.
    var header = $(templates).filter('#tpl-header').html();
    let headerData = {};
    $('#header').append(Mustache.render(header, headerData));
});

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
$.get('components/mails-summary.html', function(templates) {
    var component = $(templates).filter('#tpl-mails-sum').html();
    $.getJSON("./assets/js/index.json", function (data){
        $('#mailSummary').append(Mustache.render(component,data));
    })
});