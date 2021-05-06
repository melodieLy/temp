const names = ['startDate', 'endDate', 'debitDate'];

if(window.location.pathname.includes("debit-calendar")) {
    get("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar", getAllCalendar);
    if (sessionStorage.getItem("updated") == "true") {
        document.addEventListener('DOMContentLoaded', (event) => {
            showAlert('Votre modification à bien été prise en compte.', 'success');
        })
        sessionStorage.setItem("updated", false);
    }
    else if (window.location.search.includes("deleted")) {
        document.addEventListener('DOMContentLoaded', (event) => {
            console.log('t')
        })
        sessionStorage.setItem("deleted", false);

    } 
}
else {
    get("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar/"+sessionStorage.getItem('calendarId'), getCalendarById);
}

function saveMainData(data) {
    names.forEach(name => {
        sessionStorage.setItem(name,data.name);
    });
}

function saveId(data) {
    sessionStorage.setItem("calendarId", data);
}

function getAllCalendar(data) {
    $.get('components/dc_table.html', function (templates) {
        var component = $(templates).filter('#tpl-dc-table').html();
        if (data) {
            data.forEach(element => {
                if (element.startDate) element.startDate = moment(element.startDate).format('DD/MM/YYYY');
                if (element.endDate) element.endDate = moment(element.endDate).format('DD/MM/YYYY');
                if (element.debitDate) element.debitDate = moment(element.debitDate).format('DD/MM/YYYY');
            });
        }
        $('#debit-calendar').append(Mustache.render(component, data));
    });
}

function getCalendarById(data) {
    $.get('components/dc_form.html', function (templates) {
        var component = $(templates).filter('#tpl-dc-form').html();
        data.startDate = moment(data.startDate).format('YYYY-MM-DD');
        data.endDate = moment(data.endDate).format('YYYY-MM-DD');
        data.debitDate = moment(data.debitDate).format('YYYY-MM-DD');
        $('#dc-update').append(Mustache.render(component,data));
    });

    saveMainData(data);
}

function checkModifiedData(form) {
    const modified = form.getElementsByTagName("input");
    const data = createDate(modified);

    put("associations/" + data.associationId + "/debitCalendar", data);
}

function checkNewCalendar(form) {
    const newData = form.getElementsByTagName("input");
    const data = createDate(newData);

    return createData("associations/" + data.associationId + "/debitCalendar", data)
        .then(function () {
            removeOldDom();
            get("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar", getAllCalendar);
        })
}

function shouldBeDelete(dataId) {
    if(confirm("Voulez-vous supprimer ce calendrier ?")) {
        window.stop();
        return deleteData("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar", dataId)
            .then(function () {
                removeOldDom();
                get("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar", getAllCalendar);
                showAlert('Votre suppression à bien été prise en compte.', 'success')
            })
    }
    else {
        window.stop();
    }
}

function createDate(form) {
    var data = {};
    if(form.id != undefined) data.Id = form.id.value;
    data.startDate = form.startDate.value;
    data.endDate = form.endDate.value;
    data.debitDate = form.debitDate.value;
    data.associationId = cookies.assoId[cookies.actualAsso];
    return data;
}

function removeOldDom() {
    if ($('#basic-dc-table')) {
        $('#basic-dc-table').remove();
    }
}