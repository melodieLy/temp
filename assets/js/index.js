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
      createCookie(result,expire);
      window.location.replace("dashboard.html");
    })

    .fail(function(xhr, status, error) {
      var errorMessage = xhr.status + ': ' + xhr.statusText
      alert('Error - ' + errorMessage);
    })
}

function createCookie(setup,time) {
    document.cookie = "expires=" + time +";"; 
    document.cookie = "token="+setup.access_token+";";
    console.log(document.cookie);
}