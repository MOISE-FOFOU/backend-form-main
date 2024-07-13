function clickRubrique(chemin) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', chemin, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            var mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.innerHTML = xhr.responseText;

                // Importez le script correspondant après avoir changé la page
                switch (chemin) {
                    case '/Administration':
                        importScript('js/fill-table-admin.js');
                        break;
                    case '/Presentationbio':
                    case '/Historique':
                        importScript('js/fill-table-historique.js');
                        break;
                    case '/Mission':
                        importScript('js/fill-table-mission.js');
                        break;
                    case '/Realisation':
                        importScript('js/fill-table-realisation.js');
                        break;
                    case '/Presentation':
                        importScript('js/fill-table-presentation.js');
                        break;
                    case '/Enseignant':
                        importScript('js/fill-table-enseignant.js');
                        break;
                    case '/Formation':
                        importScript('js/fill-table-formation.js');
                        break;
                    case '/Actualite':
                        importScript('js/fill-table-actualite.js');
                        break;
                    default:
                        console.warn('Script de remplissage non trouvé pour:', chemin);
                }
            } else {
                console.error('Élément #main-content non trouvé dans le DOM.');
            }
        }
    };
    xhr.send();
}

// Fonction pour importer un script dynamiquement
function importScript(scriptSrc) {
    var script = document.createElement('script');
    script.src = scriptSrc;
    document.body.appendChild(script);
}

// Écouteurs d'événements pour les boutons reset
const buttons = document.querySelectorAll('.reset-button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => {
            btn.classList.remove('clicked');
        });
        this.classList.add('clicked');
    });
});

// Fonction pour ajuster la largeur de l'entrée en fonction de la longueur de la valeur
function adjustInputWidth(input) {
    input.style.width = `${input.value.length + 1}ch`;
}

// Fonction pour envoyer des données via AJAX
function sendDataViaAjax(formId, url, callback) {
    var form = document.getElementById(formId);
    if (!form) {
        console.error('Formulaire non trouvé');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire

        // Récupérer les valeurs des champs
        var formData = new FormData(form);
        var headers = {
            'Content-Type': 'application/json' // Assurez-vous que le type de contenu est correct
        };

        // Envoyer les données via AJAX avec les en-têtes d'autorisation
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => {
            if (response.ok) {
                // Traitement à effectuer en cas de succès
                if (callback && typeof callback === 'function') {
                    // Appel de callback si nécessaire
                }
            } else {
                // Traitement à effectuer en cas d'échec
                console.error('Erreur lors de l\'envoi des données');
                if (callback && typeof callback === 'function') {
                    callback('Erreur lors de l\'envoi des données');
                }
            }
        })
        .catch(error => {
            console.error('Erreur réseau lors de l\'envoi des données:', error.message);
            if (callback && typeof callback === 'function') {
                callback('Erreur réseau lors de l\'envoi des données');
            }
        });
    });
}
