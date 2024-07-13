// Fonction principale pour récupérer les données d'enseignant depuis l'API
function getStaffData() {
    fetch('/Getenseignant', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Données d\'enseignant récupérées:', data);
        // Afficher les données d'enseignant dans le tableau
        displayEnseignantData(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données d\'enseignant:', error.message);
        alert('Erreur lors de la récupération des données d\'enseignant: ' + error.message);
    });
}

// Fonction pour afficher les données d'enseignant dans le tableau
function displayEnseignantData(data) {
    const tableBody = document.getElementById("corps-enseignant");
    tableBody.innerHTML = ''; // Effacer le contenu précédent du tableau

    data.forEach(item => {
        // Ajouter une nouvelle ligne au tableau avec les données de l'enseignant
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${item.nomComplet}</td>
            <td>${item.adresseMail}</td>
            <td>${item.telephone}</td>
            <td>${item.domainesExpertise}</td>
            <td>${item.grade}</td>
            <td>${item.responsabilite}</td>
            <td>${item.imageProfil}</td>
            <td><button class="btn-edit">EDIT</button></td>
        `;

        // Créer une nouvelle ligne pour le formulaire d'édition
        const newRowForm = tableBody.insertRow();
        newRowForm.innerHTML = `
            <td colspan="8">
                <form class="modal" style="display:none;">
                    <input type="text" value="${item.nomComplet}" name="nomComplet" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.adresseMail}" name="adresseMail" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.telephone}" name="telephone" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.domainesExpertise}" name="domainesExpertise" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.grade}" name="grade" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.responsabilite}" name="responsabilite" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.imageProfil}" name="imageProfil" oninput="adjustInputWidth(this)">
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
            updateStaffData(`/Updateenseignant/${item._id}`, new FormData(event.target));
        });
    });
}



// Appel de la fonction pour récupérer et afficher les données lors du chargement de la page
getStaffData();
