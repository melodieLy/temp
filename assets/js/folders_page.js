$(document).ready(function() {
  var path = window.location.search;

  if (path != "") {
    path = path.replace('?id=', '');
    get('folder/'+cookies.assoId+'/'+path,getAccesibleFiles);
  } 
  else {
    get('folders/'+cookies.assoId, getAccessibleFolders);
  }
});

function getAccessibleFolders(data) {
  $.get('components/files_table.html', function(templates) {
    var component = $(templates).filter('#tpl-folders-table').html();
    $('#folders').append(Mustache.render(component,data));
  })
}

function getAccesibleFiles(data) {
  $.get('components/folders_table.html', function(templates) {
    var component = $(templates).filter('#tpl-folders-table').html();
    data.forEach(element => {
      if(element.MimeType === "image/png") console.log("img")
      else if (element.MimeType === "text/plain") console.log("txt")
    });
    $('#folders').append(Mustache.render(component,data));
  })
}