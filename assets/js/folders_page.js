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
    $('#folders').append(Mustache.render(component,data))
  })
}

function test (data) {
  console.log(data);

}

function downloadBlob(blob, name) {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const jsonBlob = new Blob(['{"name":"'+blob+'"}'])
  const url = 'folders/'+cookies.assoId+'/'+ path+ '/' +blob;
  let data = get(url, test);
  // const blobUrl = window.URL.createObjectURL(jsonBlob);
  // //Create a link element
  // const link = document.createElement("a");

  // //Set link's href to point to the blob URL
  // link.href = _blank;
  // link.download = name;

  // //Append link tot he body
  // document.body.appendChild(link);

  // //Dispatch click event ont he link
  // // This is necessary as link.click() does not work on the latest firefox
  // link.dispatchEvent(
  //   new MouseEvent('click', { 
  //     bubbles: true, 
  //     cancelable: true, 
  //     view: window 
  //   })
  // );
  
  // // Remove link from body
  // document.body.removeChild(link);
}