
        function render() {
            fetch('ong_sidebar.mustache')
                .then((Response) => Response.text())
                .then((template) => {
                    var rendered = Mustache.render(sidebarTemplate);
                    document.getElementById('target').innerHTML = rendered;
                })
        }