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
    var header = $(templates).filter('#tpl-footer').html();
    let headerData = {};
    $('#footer').append(Mustache.render(header, headerData));
});