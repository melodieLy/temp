
$(function(){
  $("#sidebar").load("sidebar.html"); 
});

$.get('header.html', function(templates) {
    // Fetch the <script /> block from the loaded external
    // template file which contains our greetings template.
    console.log("test")
    var header = $(templates).filter('#tpl-header').html();
    let headerData = {};
    $('.page-wrapper').append(Mustache.render(header, headerData));
});