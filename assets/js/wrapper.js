function getError(info) {
    switch(info.status){
        case 401 :
            deleteCookie();
            alert('Un problème a eu lieu lors du chargement. Veuillez étreindre et rallumer le navigateur.')
            break;
        default:
            break;
    }

}

function getCookie() {
    if(!document.cookie){
        return undefined;
    }

    let array = document.cookie.split(";");
    let result = new Array();

    result.expires = (array[0].split('=').pop());
    result.token = "bearer " + (array[1].split('=').pop());
    result.username = (array[2].split('=').pop());
    result.asso = (array[3].split('=').pop());
    result.assoId = (array[4].split('=').pop());

    return result;
};

function deleteCookie() {
    var t = new Date();
    document.cookie = "expires=" + t.setTime(00)+';';
    document.token = "";
    document.username = "";
    document.asso = "";
    document.assoId = "";
    // window.location.replace("index.html");
}

const cookies = getCookie();

$(document).ready(function() {
        if(cookies === undefined) {
        //window.location.replace("index.html");
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
    
    .fail(function(xhr) {
        getError(xhr);
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

    .fail(function(xhr) {
        getError(xhr);
    });
};

async function fecthTest (path,funct) {
    await fetch('https://recette-api.song-fr.com/'+path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept':'application/json',
        }
    })
    .then(function(response){
        if(response.ok) {
            funct(response);
        }
    })
    .catch(function(error){
        console.log("error with fetch : "+ error.message);
    })
}