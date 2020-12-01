get('folders/'+cookies.assoId, getAccessibleFolders);

var test;

function getAccessibleFolders(data) {
  test = data;
  $.get('components/folders_table.html', function(templates) {
    var component = $(templates).filter('#tpl-folders-table').html();
    $('#folders').append(Mustache.render(component,test));
  })
}

function hello(lol) {
  console.log('hi');
  console.log(lol);
}