//Search the association of the user
function retrieveRole(result) {
    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        if(element.Role.Id === "asso-admin") {
            document.cookie = "association:" + element.Association.name+";";
            document.cookie = "assoId:" + element.Association.Id+";";
        }
    }
}

function getCookie() {
    if(!document.cookie){
        return undefined;
    }

    get("context/current-roles",retrieveRole);

    let array = document.cookie.split(";");
    let result = new Array();

    result.expires = (array[0].split('=').pop());
    result.token = "bearer " + (array[1].split('=').pop());
    result.username = (array[2].split('=').pop());
    result.asso = (array[3].split('=').pop());
    result.assoId = (array[4].split('=').pop());
    return result;
};

const cookies = getCookie();
$(document).ready(function() {
        if(cookies === undefined) {
        window.location.replace("index.html");
        alert("cookies not found");

    } else if (cookies.expires < $.now()) {
        console.log("cookies expired");
    }
});

function get(path) {
    $.ajax({
        url: "https://recette-api.song-fr.com/"+path,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": cookies.token
        },
        method: "GET"
    })

    .fail(function(xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText
        alert('Error - ' + errorMessage);
        return xhr;
    });
};


function get(path,funct) {
    $.ajax({
        url: "https://recette-api.song-fr.com/"+path,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": cookies.token
        },
        method: "GET",
        success: funct
    })

    .fail(function(xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText
        alert('Error - ' + errorMessage);
        return xhr;
    });
};

function getPublic(path,funct) {
    $.ajax({
        url: "https://recette-api.song-fr.com/"+path,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
        },
        method: "GET",
        success: funct
    })

    .fail(function(xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText
        alert('Error - ' + errorMessage);
        return xhr;
    });
};