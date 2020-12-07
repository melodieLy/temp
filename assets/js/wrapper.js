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

function download(path, param) {
    $.ajax({
        url: "https://recette-api.song-fr.com/"+path,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": cookies.token
        },
        method: "GET",
        success: function (data, statut) {
            const jsonBlob = new Blob([data])
            const blobUrl = window.URL.createObjectURL(jsonBlob);
                //Create a link element
            const link = document.createElement("a");

            //Set link's href to point to the blob URL
            link.href = blobUrl;
            link.download = param

            //Append link tot he body
            document.body.appendChild(link);

            //Dispatch click event ont he link
            // This is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(
                new MouseEvent('click', { 
                bubbles: true, 
                cancelable: true, 
                view: window 
                })
            );
            
            // Remove link from body
            document.body.removeChild(link);
        },
        error: function (result, statut, error) {
            console.error(result + '- code : ' + statut + 'message : ' +error)
        }
    })

    .fail(function(xhr) {
        getError(xhr);
    });
}

async function fecthTest (path,funct) {
    await fetch('https://recette-api.song-fr.com/'+path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept':'application/json',
            "Authorization": cookies.token
        }
    })
    .then(function(response){
        if(response.ok) {
            funct;
        }
    })
    .catch(function(error){
        console.log("error with fetch : "+ error.message);
    })
}