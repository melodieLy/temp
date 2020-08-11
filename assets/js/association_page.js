$.get('components/flux-model.html', function(templates) {
    var component = $(templates).filter('#tpl-flux-pri').html();
    const data = {}
    $('#flux').append(Mustache.render(component,data));
});

$.get('components/FTP-serv-model.html', function(templates) {
    var component = $(templates).filter('#tpl-ftp-serv').html();
    const data = {}
    $('#serv').append(Mustache.render(component,data));
});