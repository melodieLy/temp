var path = window.location.search;
$(document).ready(function() {

  if (path != "") {
    path = path.replace('?id=', '');
    get('folders/'+sessionStorage.getItem("assoId")+'/'+ path,getAccesibleFiles);
  } 
  else {
    get('folders/'+sessionStorage.getItem("assoId"), getAccessibleFolders);
  }
});

function getAccessibleFolders(data) {
  $.get('components/folders_table.html', function(templates) {
    var component = $(templates).filter('#tpl-folders-table').html()
    $('#folders').append(Mustache.render(component,data))
  })
}

function getAccesibleFiles(data) {
  var result = data;
  let type = ['text/', 'image/', 'application/'];

  $.get('components/files_table.html', function(templates) {
    var component = $(templates).filter('#tpl-folders-table').html()
    data.forEach(element => {
      type.forEach(type => {
        if(element.MimeType.includes(type)) {
          element.MimeType = element.MimeType.replace(type,'')
          if(element.MimeType === "plain") element.MimeType = element.MimeType.replace('plain','txt')
        }
      });
    });
    $('#folders').append(Mustache.render(component,data))
  })
}

function downloadBlob(blob, name) {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const url = 'folders/'+sessionStorage.getItem("assoId")+'/'+ path+ '/' +blob;
  let data = download(url, name);
}