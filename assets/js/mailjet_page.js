$(document).ready(function() {
    jQuery('#basic-data-table').DataTable({
     "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">'
    });
   });


   $.get('components/mailjet-table.html', function(templates) {
    var component = $(templates).filter('#tpl-mailjet-table').html();
    $.getJSON("assets/js/data_mailjet.json", function (data){
        console.log("o");
        $('#mailjet-table').append(Mustache.render(component,data));
    })
});