const names = ['startDate', 'endDate', 'debitDate'];

if(window.location.pathname.includes("debit-calendar"))
    get("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar", getAllCalendar);
    if (window.location.search.includes("updated=true")) {
        document.addEventListener('DOMContentLoaded', (event) => {
            showAlert('Votre modification à bien été prise en compte.', 'success');
        })
    }
else 
    get("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar/"+sessionStorage.getItem('calendarId'), getCalendarById);

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
                if (element.startDate) element.startDate = moment(element.startDate).format('YYYY-MM-DD');
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
    var data = {};
    data.Id = modified.id.value;
    data.startDate = modified.startDate.value;
    data.endDate = modified.endDate.value;
    data.debitDate = modified.debitDate.value;
    data.associationId = cookies.assoId[cookies.actualAsso];

    put("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar", data);
}

function shouldBeDelete(dataId) {
    if(confirm("Voulez-vous supprimer ce calendrier ?")) {
        deleteData("associations/" + cookies.assoId[cookies.actualAsso] + "debitCalendar", dataId);
    }
}