// Fonction principale pour récupérer les données de formation depuis l'API
function getStaffData() {
    fetch('/Getformation', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Données de formation récupérées:', data);
        // Afficher les données de formation dans le tableau
        displayFormationData(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données de formation:', error.message);
        alert('Erreur lors de la récupération des données de formation: ' + error.message);
    });
}

// Fonction pour afficher les données de formation dans le tableau
function displayFormationData(data) {
    const tableBody = document.getElementById("corps-formation");
    tableBody.innerHTML = ''; // Effacer le contenu précédent du tableau

    data.forEach(item => {
        // Ajouter une nouvelle ligne au tableau avec les données de la formation
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${item.titre}</td>
            <td>${item.presentation}</td>
            <td>${item.admission}</td>
            <td>${item.parcours}</td>
            <td>${item.parcoursImage}</td>
            <td><button class="btn-edit">EDIT</button></td>
        `;

        // Créer une nouvelle ligne pour le formulaire d'édition
        const newRowForm = tableBody.insertRow();
        newRowForm.innerHTML = `
            <td colspan="6">
                <form class="modal" style="display:none;">
                    <input type="text" value="${item.titre}" name="titre" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.presentation}" name="presentation" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.admission}" name="admission" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.parcours}" name="parcours" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.parcoursImage}" name="parcoursImage" oninput="adjustInputWidth(this)">
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
            updateStaffData(`/Updateformation/${item._id}`, new FormData(event.target));
        });
    });
}



// Appel de la fonction pour récupérer et afficher les données lors du chargement de la page
getStaffData();
