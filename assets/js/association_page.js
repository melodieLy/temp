$.get('components/flux-model.html', function(templates) {
    var component = $(templates).filter('#tpl-flux-pri').html();
    const data = {}
    $('#flux').append(Mustache.render(component,data));
});

get('associations/'+cookies.assoId + '/flows', retrieveFlows);

function retrieveFlows(data) {
    $.get('components/flux-model.html', function(templates) {
        var component = $(templates).filter('#tpl-flux-pri').html();
        console.log(data[0]);
        const result = data[0];
        console.log(result);
        $('#flux').append(Mustache.render(component,result));
    });
}


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
        "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">'
    });
});
