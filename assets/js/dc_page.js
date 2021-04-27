const names = ['startDate', 'endDate', 'debitDate'];

if(window.location.pathname.includes("debit-calendar"))
    get("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar", getAllCalendar);
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
                if (element.startDate) element.startDate = moment(element.startDate).format('YYYY-MM-DDYY');
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
        $('#dc-update').append(Mustache.render(component, {
            "startDate": moment(data.startDate).format('YYYY-MM-DD'),
            "endDate": moment(data.endDate).format('YYYY-MM-DD'),
            "debitDate": moment(data.debitDate).format('YYYY-MM-DD')
        }));
    });

    saveMainData(data);
}

function checkModifiedData(form) {
    const modified = form.getElementsByTagName("input");
    var data = {};
    data.startDate = modified.startDate.value;
    data.endDate = modified.endDate.value;
    data.debitDate = modified.debitDate.value;
    data.associationId = modified.id.value;

    put("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar", data);
}

function isDateAnteriorTo(date1, date2) {
    if(date1 > date2) return false;
    else if (date1 = date2) return false;
    else return true;
}