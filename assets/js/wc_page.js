/// Verify if this 's the first call of the page, load the elements of the page
/// and create the sessionStorage for the "Reached" or "no reached"
if(!window.location.hash.includes("#")) {
    let data = 1;
    getWCPage(data, null);
    sessionStorage.setItem("rnr","rnr");
}

/// Remove some DOM Elements for reload then for the page "Welcome-calls"
function removeOldDOMElement() {
    if ($('#basic-wc-table')) {
        $('#basic-wc-table').remove();
        $('nav#nav-page').remove();
        $('a#btn-export').remove();
    }
}

/// Refill the "area" combo-box. Call the request and show or hide the element depending of the result
get("associations/"+sessionStorage.getItem("assoId")[cookies.actualAsso]+"/areas", getWCSearchbar);

function getWCSearchbar(data) {
    $.get('components/wc-search.html', function(templates) {
        var component = $(templates).filter('#tpl-wc-search').html();
        $('#search-zone').append(Mustache.render(component,data));

        if(data == null) {
            let selectToHide = document.getElementsByClassName("col");
            selectToHide[0].setAttribute("style","display:none;");
        }

        fillSearchPageWithSessionStorage();
    });
};
 
function getWCPage (data,param) {
    //Update the sessionStorage if only the "RNR" was send
    if (typeof(param) == 'string') sessionStorage.setItem("rnr", param);
    const urlParam = getUrlParam(param);
    try {
        getWelcomeCall(data + urlParam);
        chooseOption(sessionStorage.getItem("rnr"));
    } catch (e) {
        console.error(e);
    }
};

/// Return a url's parameter for the request
function getUrlParam (form) {
    if(form !== null) {
        let url = '';
        const yourSelect = document.getElementById("area-select").value;
        const input = document.getElementById("search-form").getElementsByTagName("input");
        if (yourSelect !== "") url += '&Area=' + yourSelect;
        for (const element of input) {
            url += '&' + element.name + '=' + element.value;
        };

        url += "&rnr=" + sessionStorage.getItem("rnr");

        createSearchHistory(yourSelect, input, form);
        return url;
    }
    else return "";
}

/// Copy the element (here a id) in the clipboard
function copyId(ongId) {
    const el = document.createElement('textarea');
    el.value = ongId;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    showAlert("Id copié","info")
}

/// Refill the inputs elements with the data saved in the sesssionStorage.
function fillSearchPageWithSessionStorage() {
    let area = document.getElementById('area-select');
    area.value = sessionStorage.getItem("area");

    let inputs = document.getElementById("search-form").getElementsByTagName('input');
    for(const element of inputs) {
        element.value = sessionStorage.getItem(element.name);
    };

    chooseOption(sessionStorage.getItem("rnr"));
}

/// Save the search parameters 
function createSearchHistory(select,inputs,form) {
    if(select != "") sessionStorage.setItem("area", select.value);
    for(const element of inputs) {
        if(element.value) sessionStorage.setItem(element.name, element.value);
    };
}

/// return a array of data saved as search parameters
function getSearchHistory() {
    const names = ["area","from", "to","search","rnr"];
    let obj = [];
    for(const name of names) {
        if(sessionStorage.getItem(name) == null) obj.push('');
        else obj.push(sessionStorage.getItem(name));
    }
    return obj;
}

/// clear the data in the input element. Doesn't remove data saved in the sesssionStorage
function deleteSeachHistory() {
    sessionStorage.clear();
    document.getElementById( "area-select" ).value = "";

    let input = document.getElementById("search-form").getElementsByTagName('input');
    for(const element of input) {
        element.value = "";
    };

    getWCPage(1, null);
}

///Remove and Select the right type of "RNR" filted
function chooseOption(idType) {
    $('.btn-group').children().each(function (index, element) {
        if (element.classList.contains('btn-primary')) {
            element.removeAttribute('class');
            element.setAttribute('class', 'btn btn-sm btn-outline-primary');
            return;
        }
    });
    $('#' + idType).removeClass('btn-outline-primary').addClass('btn-primary').blur();
};

/// To download files, 
function downloadCalls(pageNumber) {
    showAlert("Téléchargement lancé. Cela peut prendre quelques secondes.", 'info');
    const names = ["Area","from", "to","search","rnr"];
    
    // Search all the filter saved and create a the url's parameter
    const param = getSearchHistory();
    let urlParam = '';
    for (let i = 0; i < names.length; i++) {
        const element = param[i];
        urlParam += '&' + names[i] + '=' +element;
    }
    const url = 'calls/called/'+sessionStorage.getItem("assoId")+'/download?Page='+pageNumber+urlParam;
    
    //Send a request. The request will start the download
    let data = downloadCSV(url);
};