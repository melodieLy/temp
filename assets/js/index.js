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
        createCookie(result);
      })
      .fail(function(xhr, status, error) {
        console.log("status : "+ xhr.status);
        console.log("message : "+ xhr.statusText);
      })
}

function createCookie(setup) {
    document.cookie = setup;
    console.log(document.cookie)
}