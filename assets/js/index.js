function Auth(theForm) {
  $.ajax({
    url: "https://recette-api.song-fr.com/swatoken",
    headers: {
      'content-Type': "application/x-www-form-urlencoded"
    },
    method: "POST",
    withCredentials: true,
    data : {
      grant_type:"password",            
      username: theForm.email.value,
      password: theForm.password.value,
    }
  })
    .done(function(result) {
      const time = 1000;
      let expire = new Date();
      expire.setTime(expire.getTime()+ (result.expires_in * time));
      createCookieAuth(result,expire, theForm.email.value);
      findAsso(result);
    })

    .fail(function(xhr, status, error) {
      var errorMessage = xhr.status + ': ' + xhr.statusText
      alert('Error - ' + errorMessage);
    })
}

function createCookieAuth(setup,time,username) {
  document.cookie = "expires=" + time +";"; 
  document.cookie = "token="+setup.access_token+";";
  document.cookie = "username="+username+";";
};

function createCookieAsso(setup) {
  document.cookie = "asso=" + setup.association.Name;
  document.cookie = "assoId=" + setup.association.Id;
  console.log(document.cookie);
};

function findAsso(param) {
  const token = "bearer " + param.access_token;
  $.ajax({
    url: "https://recette-api.song-fr.com/context/current-roles",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept":"application/json",
        "Authorization": token
    },
    method: "GET"
  })
  .done(function(result) {
    createCookieAsso(result);
    window.location.replace("dashboard.html");
  })

  .fail(function(xhr, status, error) {
      var errorMessage = xhr.status + ': ' + xhr.statusText
      alert('Fail to get association - ' + errorMessage);
      return xhr;
  });
}