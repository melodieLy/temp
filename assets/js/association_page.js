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


$.get('components/flux-histo-model.html', function(templates) {
    var component = $(templates).filter('#tpl-flux-histo').html();
    const data = {}
    $('#histo').append(Mustache.render(component,data));
    $('#data-table').DataTable({
        "aLengthMenu": [[20, 30, 50, 75, -1], [20, 30, 50, 75, "All"]],
        "pageLength": 20,
        "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">'
    });
});
