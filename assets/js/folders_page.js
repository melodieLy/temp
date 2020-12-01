$(document).ready(function() {
  let path = window.location.search;

  if (path != "") {
    path = path.replace('?id=', '');
    // get('folder/'+cookies.assoId+'/'+path)
    console.log(path)
  } 
  else {
    get('folders/'+cookies.assoId, getAccessibleFolders);
  }
});

var test;

function getAccessibleFolders(data) {
  test = data;
  $.get('components/folders_table.html', function(templates) {
    var component = $(templates).filter('#tpl-folders-table').html();
    $('#folders').append(Mustache.render(component,test));
  })
}