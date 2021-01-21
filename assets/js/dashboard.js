get('mail/stats/counters/'+cookies.assoId, retrieveAssoMail);
changeWeek();

//From here, we call specifics components
// * Call the mails summary 
function retrieveAssoMail(data) {
    $.get('components/mails-summary.html', function(templates) {
        var component = $(templates).filter('#tpl-mails-sum').html();
        try {
            $('#mailSummary').append(Mustache.render(component,data));
        }
        catch(e) {
             alert("hello");
            $('#mailSummary').append(Mustache.render(component,data));
        }
    });
}

function changeWeek() {
    let date = new Date();
    let month = date.getMonth()+1;
    if(month < 10) month = "0"+month;

    let firstDate = "01/"+month+"/"+date.getFullYear();
    let lastDate = date.getDate()+"/"+month+"/"+date.getFullYear();

    $(document).ready(function() {
        document.getElementById('assoDay').innerHTML = "<h3>Statistique de l'association du :"+firstDate+" - "+lastDate+"</h3>";
    })
}

function checkmonth(month) {
}

//Get association data (Volume réalisé, %, etc)
// $.get('footer.html', function(templates) {
//     var footer = $(templates).filter('#tpl-footer').html();
//     let footerData = {};
//     $('#footer').append(Mustache.render(footer, footerData));
// });