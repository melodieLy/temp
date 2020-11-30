get('folders/'+cookies.assoId, getAccessibleFolders);

function getAccessibleFolders(data) {
  console.log(data)
  $.get('components/folders_table.html', function(templates) {
    var component = $(templates).filter('#tpl-folders-table').html();
    $('#folders').append(Mustache.render(component,data));
  })
}

function hello(lol) {
  console.log('hi')
  alert(lol)
}