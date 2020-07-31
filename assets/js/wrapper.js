function getCookie() {
    if(!document.cookie){
        return undefined;
    }
    let array = document.cookie.split(";");
    let result = new Array();
    result.expires = (array[0].split('=').pop());
    result.token = (array[1].split('=').pop());
    return result;
};

function hello() {
    console.log("hello");
}

const cookies = getCookie();
$(document).ready(function() {
        if(cookies === undefined) {
        window.location.replace("index.html");
        alert("cookies not found");

    } else if (cookies.expires < $.now()) {
        console.log("cookies expired");
    } else if (cookies) {
        console.log(cookies.token);
        console.log(cookies.expires);
    }
});

function get(path) {
    $.ajax({
        url: "https://recette-api.song-fr.com/"+path,
        headers: {
            "Accept":"application/json",
            "Authorization": + "bearer " + cookies.token
        },
        method: "GET",
    })
    .done(function(result) {
        console.log(result);
    })

    .fail(function(xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText
        alert('Error - ' + errorMessage);
    })
}

 export {cookies,getCookie, get, hello};