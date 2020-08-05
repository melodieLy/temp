$.get('members.html', function(templates) {
    var component = $(templates).filter('#members').html();
    $.getJSON("./assets/js/data_table.json", function (data){
        $('#tpl-members-table').append(Mustache.render(component,data));
    })
});