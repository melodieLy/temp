//Get element with Jquery
$(function(){
  $("#sidebar").load("sidebar.html"); 
});

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

$.getJson('index.json', function(data) {
    $('#mailSummary').data("mails", data);
        
});