var path = window.location.search;
$(document).ready(function() {

  if (path != "") {
    console.log("somethong")
    path = path.replace('?id=', '');
    get('folders/'+cookies.assoId+'/'+ path,getAccesibleFiles);
  } 
  else {
    console.log("nonthing")
    get('folders/'+cookies.assoId, getAccessibleFolders);
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
    data.link ='https://recette-api.song-fr.com/folders/'+cookies.assoId+'/'+ path + '/';
    $('#folders').append(Mustache.render(component,data))
  })
}