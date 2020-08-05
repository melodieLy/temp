$.get('components/members_table.html', function(templates) {
    var component = $(templates).filter('#tpl-members-table').html();
    $.getJSON("/assets/js/data_table.json", function (data){
        console.log(data);
        // $('#members').append(Mustache.render(component,data));
    })
});