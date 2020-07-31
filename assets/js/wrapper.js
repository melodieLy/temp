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

function get(path) {
    $.ajax({
        url: "https://recette-api.song-fr.com/"+path,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": "bearer z_hp-2hlYHiTVGd2RiL9C1Aic76hEabnjnaBgeXaYQRlK0tBDJx-qbRJ2BmmKT93oeOkmjTP75dFFyKSbRxPtFtvNHP9zxCQF1FFNtQ0oeXhwOlRkmlDtbCoAV-okBFUzYz8zmm7TvgBcwt0LFRxDUDqeAksg_yVzgf8UpGW2_WrAK9rflWutqaojx-zo58F_hgwescpSdZjdFrOgAsbYJ6U3dnkVZsj0vlCRrWpN1vNpKqeLGYW0xWFQ_85pIBBfHBJ5hhkAFec1wHMSCtkQAs0HGq7Lw2PWCrYFpQfvSMhqjWh4Z4jwRVT7gLFg9qPuH1VAJ3mSASN496xfY4R1G7I8XW7-kGV_6ngYdiaKW0Ol-o9t95NFz0sV0j926W9NQ3uXjyZCD7s6n3c83hNcw" 
        },
        method: "GET",
    })
    .done(function(result) {
        return console.log(result);
    })

    .fail(function(xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText
        alert('Error - ' + errorMessage);
        return xhr;
    })
};