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

    let cookieData = document.cookie.split(";");
    let result = new Array();
    const names = ["username", "token","assoName", "assoId", "expires","actualAsso"]

    cookieData.forEach(element => {
        for (let i = 0; i < names.length; i++) {
            const actualName = names[i];
            if(element.includes(actualName)) {
                if(actualName == "assoName" || actualName == "assoId") {
                    let toSplit = (element.split('=').pop());
                    const arrayAsso = toSplit.split(',');
                    result[actualName] = arrayAsso;
                } 
                else {
                    result[actualName] = (element.split('=').pop());
                }
                break;
            } 
        }
    });
    return result;
};

function createNewCookie() {
    if(!document.cookie){
        return undefined;
    }

    let cookieData = document.cookie.split(";");
    let result = new Array();
    const names = ["username", "token","assoName", "assoId", "expires","actualAsso"]

    cookieData.forEach(element => {
        for (let i = 0; i < names.length; i++) {
            const actualName = names[i];
            if(element.includes(actualName)) {
                if(actualName == "assoName" || actualName == "assoId") {
                    let toSplit = (element.split('=').pop());
                    const arrayAsso = toSplit.split(',');
                    result[actualName] = arrayAsso;
                } 
                else {
                    result[actualName] = (element.split('=').pop());
                }
                break;
            } 
        }
    });
    return result;
};

function deleteCookie() {
    document.cookie = "expires=Thu Jan 01 1970 00:00:00 UTC; token=; username=; asso=; assoId=; actualAsso=;";
}

function removeOldTable() {
    if($('#basic-wc-table')) {
        $('#basic-wc-table').remove();
        $('nav#nav-page').remove();
    }
}

const cookies = getCookie();

function getPublic(path, funct) {
    $.ajax({
        url: "https://recette-api.song-fr.com/"+path,
        method: "GET"
    })
    
    .fail(function(xhr) {
        getError(xhr);
    });
}


function get(path) {
    $.ajax({
        url: "https://recette-api.song-fr.com/"+path,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": "bearer " + cookies.token
        },
        method: "GET",
        success: funct
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
            "Authorization": "bearer " + cookies.token
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
            "Authorization": "bearer " + cookies.token
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

function getWelcomeCall(path) {
    $.ajax({
        url: "https://recette-api.song-fr.com/calls/called/"+cookies.assoId[cookies.actualAsso]+'?Page='+path,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": "bearer " + cookies.token
        },
        method: "GET",
        success: function (data, textStatus, request) {
            removeOldTable();

            $.get('components/wc_table.html', function(templates) {
                var component = $(templates).filter('#tpl-wc-table').html();
                if(data) {
                    data.forEach(element => {
                        if(element.LastContact) element.LastContact = moment(element.LastContact).format('L');
                    });
                }
                $('#welcome-call').append(Mustache.render(component,data));
            });
            
            $.get('components/pagination.html', function(templates) {
                var component = $(templates).filter('#pagination-comp').html();
                let paginSetup = JSON.parse(request.getResponseHeader("X-Pagination"));
                if(paginSetup.TotalPages == 0) paginSetup.TotalPages = 1;
                $('#pagination-row').append(Mustache.render(component, {
                    "PageSize":paginSetup.PageSize,
                    "PageNumber":paginSetup.PageNumber,
                    "TotalCount":paginSetup.TotalCount,
                    "TotalPages":paginSetup.TotalPages,
                    "nextPage": function () {
                        const result = paginSetup.PageNumber + 1;
                        if(result == 0) return result;
                        else if(result >= paginSetup.TotalPages) return paginSetup.TotalPages;
                        else return result;
                    },
                    "previousPage": function () {
                        const result = paginSetup.PageNumber - 1;
                        if(result == 0) return 1;
                        else return result;
                    }
                }));

            });
        }
    })
    .fail(function(xhr) {
        getError(xhr);
    });
}