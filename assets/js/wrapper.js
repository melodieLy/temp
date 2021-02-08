function showAlert(errorInfo) {
    $.get('components/alert-danger.html', function(templates) {
      var alert = $(templates).filter('#tpl-alert-danger').html();
      let data = {"error" : errorInfo};
      $('#body').append(Mustache.render(alert, data));
    });
  }

$(document).ready(function() {
    if(cookies === undefined) {
        window.location.replace("index.html");
        alert("Aucune connexion trouvé. Veuillez-vous authentifier");
        
    } else if (cookies.expires < $.now()) {
        deleteCookie();
        window.location.replace('index.html');
        showAlert("Connexion expirée. Veuillez-vous reconnecter");
    }
});

function getError(info) {
    switch(info.status) {
        case 401 :
            deleteCookie();
            showAlert("401 : Erreur lors de l'authentification Veuillez redémarrer le navigateur.")
            break;
        case 403 :
            showAlert("403 : Vous n'avez pas les authorisations nécessaires.");
            break;
        case 404 :
            showAlert("404 : La ressource n'a pas été trouvé.");
            break;
        case 408 :
            showAlert("408 : Une connexion ouverte n'est pas utilisé. Fermeture du la connexion.");
            break;
        case 413 :
            showAlert("413 : La requête au serveur dépasse la limite définie. Veuillez réessayer.");
            break;
        case 415 :
            showAlert("415 : Le format média demandées n'est pas supporté apr le serveur.");
            break;
        case 429 :
            showAlert("429 : Nombre de requêtes émis trop important. Veuillez patientez avant de lancer une nouvelle requête.");
            break;
        default:
            showAlert(info.status + " : " + info.textStatus)
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
}

const cookies = getCookie();

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