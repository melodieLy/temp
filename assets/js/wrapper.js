function getCookie() {
    if(!document.cookie){
        return undefined;
    }
    let array = document.cookie.split(";");
    let result = new Array();
    result.expires = (array[0].split('=').pop());
    result.token = "bearer " + (array[1].split('=').pop());
    return result;
};

function hello() {
    alert("hello");
}

const cookies = getCookie();
$(document).ready(function() {
        if(cookies === undefined) {
        // window.location.replace("index.html");
        alert("cookies not found");

    } else if (cookies.expires < $.now()) {
        console.log("cookies expired");
    } else if (cookies) {
        console.log(cookies.token);
        console.log(cookies.expires);
    }
});

function callback(data) {
    const result = data;
    return result;
}

function get(path) {
    $.ajax({
        url: "https://recette-api.song-fr.com/"+path,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": cookies.token
        },
        method: "GET",
        success: function (result) {
            callback(result);
        }
    })

    .fail(function(xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText
        alert('Error - ' + errorMessage);
        return xhr;
    })
};