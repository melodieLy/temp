$.getScript("assets/js/config.js", function () {});

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
      if(xhr.status === 400) {
        alert('Connexion impossible. Veuillez vérifier votre nom et mot de passe.');
      }
    })
}

function createCookieAuth(setup,time,username) {
  document.cookie = "expires=" + time +";"; 
  document.cookie = "token="+setup.access_token+";";
  document.cookie = "username="+username+";";
};

function createCookieAsso(setup) {
  setup.forEach(element => {
    if(element.Role.Id === "asso-admin") {
      document.cookie = "asso=" + element.Association.Name;
      document.cookie = "assoId=" + element.Association.Id;
    }
  });
};

function findAsso(param) {
  const token ="bearer " + param.access_token;
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
    EnvironmentRedirection();
  })

  .fail(function(xhr, status, error) {
      var errorMessage = xhr.status + ': ' + xhr.statusText
      alert('Fail to get association - ' + errorMessage);
      return xhr;
  });
}