/// Main parameters for the request. Please change them if you need
const pageSize = '10';
const apiPath = "https://recette-api.song-fr.com/";

/// Create a Alert pop-up in the DOM
/// Type: define the type of pop-up (color)
function showAlert(Info, type) {
    if (!document.getElementById("alertColumn")) addTheAlertColumn();

    $.get('components/alert.html', function(templates) {
      var alert = $(templates).filter('#tpl-alert').html();
      let data = {"info" : Info,
    "type":type};
        $('#alertColumn').append(Mustache.render(alert, data));
    });
}

/// Call ShowAlert depending of the type of error.
function getError(info) {
    const type = 'danger';
    switch(info.status) {
        case 401 :
            deleteSession();
            console.log(info);
            showAlert("401 : Erreur lors de l'authentification Vous avez été redirigé.", type);
            break;
        case 403 :
            showAlert("403 : Vous n'avez pas les authorisations nécessaires.", type);
            break;
        case 404 :
            showAlert("404 : La ressource n'a pas été trouvé.", type);
            break;
        case 408 :
            showAlert("408 : Une connexion ouverte n'est pas utilisé. Fermeture du la connexion.", type);
            break;
        case 413 :
            showAlert("413 : La requête au serveur dépasse la limite définie. Veuillez réessayer.", type);
            break;
        case 415 :
            showAlert("415 : Le format média demandées n'est pas supporté apr le serveur.", type);
            break;
        case 429 :
            showAlert("429 : Nombre de requêtes émis trop important. Veuillez patientez avant de lancer une nouvelle requête.", type);
            break;
        default:
            showAlert(info.status + " : " + info.responseJSON.Message, type);
            if (info.responseJSON.ExceptionsStack) {
                const exceptions = info.responseJSON.ExceptionsStack;
                for (let i = 0; i < exceptions.length; i++) {
                    const element = exceptions[i];
                    console.error(element);
                }
            }
            break;
    }
}

//Rework this part (thiking with sessionStorage) until *const cookies = getCookie();*

/// Retrieve all associations where the user have some rights
function createCookieAsso(setup) {
    let assoNameList = "";
    let assoIdList = "";
    let sesssionRights = [];
    
    const rightName = ["FORMS-MANAGER", "QUALITY-WATCH", "ADMIN"];
    for ( i = 0; i < setup.length; i++) {
        for (let j = 0; j < rightName.length; j++) {
            if(setup[i].Role.Id.toUpperCase() === rightName[j]) {
                if(sesssionRights.indexOf(rightName[j]) == -1) sesssionRights.push(rightName[j]);
                if(i < 1) {
                    assoNameList = setup[i].Association.Name +",";
                    assoIdList = setup[i].Association.Id +",";
                } else if (i == setup.length - 1) {
                    assoNameList += setup[i].Association.Name;
                    assoIdList += setup[i].Association.Id ;
                } else {
                    assoNameList += setup[i].Association.Name +",";
                    assoIdList += setup[i].Association.Id +",";
                }
            }
        }
    }
    if(!sessionStorage.getItem("rights")) sessionStorage.setItem("rights", JSON.stringify(sesssionRights));


    if(assoIdList.length == 0) return false;
    document.cookie = "assoName=" + assoNameList +";";
    document.cookie = "assoId=" + assoIdList + ";";
    document.cookie = "actualAsso=" + 0 + ';';
};

///Verify the rights of the user
function checkAdminRight(data) {
    for (let j = 0; j < data.length; j++) {
        if(data[j].Role.Id.toUpperCase() === "ADMIN") return true;
    }
    return false;
};

///Request : Work only if the user is a admin
function getAllAsso(param) {
    $.ajax({
        url: apiPath + "associations/digest-list",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": param
        },
        method: "GET"
    })
    .done(function(result) {
        getAllExistingAsso(result);
        //EnvironmentRedirection();
    });
};

/// Create a list of all the existing associations, will be add to the cookies
function getAllExistingAsso(result) {
    let assoNameList = "";
    let assoIdList = "";

    for (let i = 0; i < result.length; i++) {
        if(i < 1) {
            assoNameList = result[i].Value +",";
            assoIdList = result[i].Id +",";
        } else if (i == result.length - 1) {
            assoNameList += result[i].Name;
            assoIdList += result[i].Id ;
        } else {
            assoNameList += result[i].Name +",";
            assoIdList += result[i].Id +",";
        }
    }

    if(!sessionStorage.getItem("rights")) sessionStorage.setItem("rights", "ADMIN");

    document.cookie = "assoName=" + assoNameList +";";
    document.cookie = "assoId=" + assoIdList + ";";
    document.cookie = "actualAsso=" + 0 + ';';
};

/// Return all the data in the cookie, so that could be use easily
function getCookie() {
    if(!document.cookie){
        return undefined;
    }

    let cookieData = document.cookie.split(";");
    let result = new Array();
    const names = ["f", "token","assoName", "assoId", "expires","actualAsso"]

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

/// TO CHECK IF THIS COULD BE USEFUL
// function createNewCookie() {
//     if(!document.cookie){
//         return undefined;
//     }

//     let cookieData = document.cookie.split(";");
//     let result = new Array();
//     const names = ["username", "token","assoName", "assoId", "expires","actualAsso"]

//     cookieData.forEach(element => {
//         for (let i = 0; i < names.length; i++) {
//             const actualName = names[i];
//             if(element.includes(actualName)) {
//                 if(actualName == "assoName" || actualName == "assoId") {
//                     let toSplit = (element.split('=').pop());
//                     const arrayAsso = toSplit.split(',');
//                     result[actualName] = arrayAsso;
//                 } 
//                 else {
//                     result[actualName] = (element.split('=').pop());
//                 }
//                 break;
//             } 
//         }
//     });
//     return result;
// };

//Delete all the cookies and data in the storages
function deleteSession() {
    document.cookie = "expires=Thu Jan 01 1970 00:00:00 UTC; token=; username=; asso=; assoId=; actualAsso=;";
    sessionStorage.clear();
    localStorage.clear();
}

const cookies = getCookie();

/// General Request : Doesn't seem to be use. Please check
// function get(path) {
//     $.ajax({
//         url: apiPath + path,
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             "Accept":"application/json",
//             "Authorization": "bearer " + cookies.token
//         },
//         method: "GET"
//     })
    
//     .fail(function(xhr) {
//         getError(xhr);
//     });
// };

/// Main request : Call the funct if the request is a success
function get(path,funct) {
    $.ajax({
        url: apiPath + path,
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

/// Main request : launch the download of a file if the request is a success.
/// param : Desired name of the document 
function download(path, param) {
    $.ajax({
        url: apiPath + path,
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

            //Dispatch click event on the link
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

/// Main request : if success, retrieve the data and transofrm them on a CSV file
function downloadCSV(path) {
    $.ajax({
        url: apiPath + path,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": "bearer " + cookies.token
        },
        method: "GET",
        success: function (data, statut, request) {
            const jsonBlob = new Blob([data])
            const blobUrl = window.URL.createObjectURL(jsonBlob);
                //Create a link element
            const link = document.createElement("a");
            let fileInfo = request.getResponseHeader("content-disposition");
            fileInfo = fileInfo.replace('attachment; ', '');
            fileInfo = fileInfo.replace('filename=', '');
            //Set link's href to point to the blob URL
            link.href = blobUrl;
            link.download = fileInfo;

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

/// To Check - Specific request : If success, will load all the element with mustacheJS
function getWelcomeCall(path) {
    $.ajax({
        url: apiPath + "calls/called/" + sessionStorage.getItem("assoId") +'?Page='+path + '&PageSize=' + pageSize,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": "bearer " + cookies.token
        },
        method: "GET",
        success: function (data, textStatus, request) {
            removeOldDOMElement();

            //Calling the template
            $.get('components/wc_table.html', function(templates) {
                var component = $(templates).filter('#tpl-wc-table').html();
                if(data) {
                    //Change the dateTime format 
                    data.forEach(element => {
                        if(element.LastContact) element.LastContact = moment(element.LastContact).format('DD/MM/YYYY');
                        if (element.CompletionDate) element.CompletionDate = moment(element.CompletionDate).format('DD/MM/YYYY');
                    });
                }
                //append the template to the main html file wc_page.html where the ID is
                $('#welcome-call').append(Mustache.render(component,data));
            });
            
            $.get('components/pagination.html', function(templates) {
                var component = $(templates).filter('#pagination-comp').html();
                
                //Retrieve the pagination data from the header X-Pagination.
                // Set totalPages to 1 to avoid conflict for request or on template
                let paginSetup = JSON.parse(request.getResponseHeader("X-Pagination"));
                if(paginSetup.TotalPages == 0) paginSetup.TotalPages = 1;

                // The data is add manually because we can't access directly to the X-Pagination header
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

/// Specific Request : Retrieve all associations where the user work
function findAsso(param) {
    const token ="bearer " + param.access_token;
    $.ajax({
        url: apiPath + "context/current-roles",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": token
        },
        method: "GET"
    })
    .done(function(result) {
        if (checkAdminRight(result)) {
            sessionStorage.setItem("assoId", "ACF")
            sessionStorage.setItem("rights","ADMIN")
            sessionStorage.setItem("assoName", "Action Contre la Faim")
            EnvironmentRedirection();
        }
        else {
            const rights = createCookieAsso(result);
            if(rights === false) alert("Vous n'avez pas les droits pour accéder au site. ");
            else EnvironmentRedirection();
        }
    })

    .fail(function(xhr) {
        window.location.reload();
        alert(xhr.status + ' : Erreur lors du chargement des données. Veuillez-vous authentifier de nouveau. ');
    });
};

/// To update for a more general one
/// Speficic request : send updated data from a debit calendar for the server
function put(path, form) {
    $.ajax ({
        url: apiPath + path,
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "bearer " + cookies.token
        },
        data : {
            Id:form.Id,
            startDate:form.startDate,
            endDate: form.endDate,
            debitDate: form.debitDate
        },
        success: function (data, textStatus, request) {
            sessionStorage.setItem("updated", true);
            window.location.replace('debit-calendar.html');
        }
    })
    .fail(function (xhr) {
        getError(xhr)
    })
};

/// Main request : send new data element for the server. For more information please chek the api
function create(path,data) {
    $.ajax({
        url: apiPath + path,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "bearer " + cookies.token
        },
        data: data,
        success: function (data, textStatus, request) {
            showAlert("L'élement a bien été créé", "success");
        }
    })
    .fail(function (xhr) {
        getError(xhr);
    })
}

///Alternative version depending of how we decide to manage - To check
/// Main request : 
function createData(path, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: apiPath + path,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "bearer " + cookies.token
            },
            data: data,
            success: function (data, textStatus, request) {
                showAlert("L'élement a bien été créé", "success");
                resolve(true);
            }
        })
        .fail(function (xhr) {
            getError(xhr);
            resolve(false);
        })
    })
    
}

/// To create a main request - to check
///Specific Request : Delete a specific element with his ID
function deleteData(path, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: apiPath + path + "?Id=" + data,
            headers: {
                "Authorization": "bearer " + cookies.token,
            },
            method: "DELETE",
            success: function (data, textStatus, request) {
                resolve(true);
            }
        })
        .fail(function (xhr) {
            getError(xhr);
            reject(false);
        }) 
    })
}