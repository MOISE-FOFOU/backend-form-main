// Fonction principale pour récupérer les données du staff depuis l'API
function getStaffData() {
    fetch('/Getrealisation', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Données de staff récupérées:', data);
        // Afficher les données dans le tableau
        displayStaffData(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error.message);
        alert('Erreur lors de la récupération des données: ' + error.message);
    });
}

// Fonction pour ajuster la largeur des champs de saisie en fonction du contenu


// Fonction pour afficher les données d'administration dans le tableau
function displayStaffData(data) {
    const tableBody = document.getElementById("corps-realisation");
    tableBody.innerHTML = ''; // Effacer le contenu précédent du tableau

    data.forEach(item => {
        const newRow = tableBody.insertRow();

        newRow.innerHTML = `
            <td>${item.titre}</td>
            <td>${item.annee}</td>
            <td>${item.description}</td>
            <td><button class="btn-edit">EDIT</button></td>
        `;

        // Créer une nouvelle ligne pour le formulaire d'édition
        const newRowForm = tableBody.insertRow();
        newRowForm.innerHTML = `
            <td colspan="4">
                <form class="modal" style="display:none;">
                    <input type="text" value="${item.titre}" name="titre" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.annee}" name="annee" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.description}" name="description" oninput="adjustInputWidth(this)">
                    <input type="submit" value="Mettre à jour">
                </form>
            </td>
        `;

        // Gestionnaire d'événements pour le bouton d'édition
        newRow.querySelector('.btn-edit').addEventListener('click', () => {
            const form = newRowForm.querySelector('.modal');
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
            // Ajuster les largeurs des champs de saisie initialement
            form.querySelectorAll('input[type="text"]').forEach(adjustInputWidth);
        });

        // Ajouter un gestionnaire d'événements pour la soumission du formulaire via AJAX
        newRowForm.querySelector('form').addEventListener('submit', event => {
            event.preventDefault(); // Empêcher la soumission par défaut du formulaire
            updateStaffData(`/Updaterealisation/${item._id}`, new FormData(event.target));
        });
    });
}

// Fonction pour mettre à jour les données du staff via l'API


// Appel de la fonction pour récupérer et afficher les données lors du chargement de la page
getStaffData();
