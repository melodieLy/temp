$.getScript("assets/js/config.js", function () {});
$.getScript("assets/js/wrapper.js", function () {});

function Auth(theForm) {
  $.ajax({
    url: "https://localhost:2846/swatoken",
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
      let actualDate = new Date();
      actualDate.setTime(actualDate.getTime()+ (result.expires_in * time));
      createCookieAuth(result, actualDate, theForm.email.value);
      findAsso(result);
    })

    .fail(function(xhr) {
      if(xhr.status === 400) {
        alert('Connexion impossible. Veuillez vérifier votre identifiant et mot de passe.');
      }
    })
}

function createCookieAuth(setup,time,username) {
  document.cookie = "expires=" + time +";"; 
  document.cookie = "token="+setup.access_token+";";
  document.cookie = "username="+username+";";
};