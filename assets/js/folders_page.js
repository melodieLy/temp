get('folders/'+cookies.assoId, getAccessibleFolders);

function getAccessibleFolders(data) {
  console.log(data)
  $.get('folders_table.html', function(templates) {
    var component = $(templates).filter('#basic-folders-table').html();
    $('#folders').append(Mustache.render(component,data));
  })
}