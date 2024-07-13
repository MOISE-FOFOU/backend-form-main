// Fonction principale pour récupérer les données d'administration depuis l'API
function getStaffData() {
    let staffData = [];

    fetch('/Getpresentation', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Données de staff récupérées:', data);
        // Stocker les données dans le tableau
        staffData = data;
        // Appeler la fonction pour afficher les données dans le tableau
        displayStaffData(staffData);
    })
    .catch(error => {
    });
}

// Fonction pour ajuster la largeur des champs de saisie en fonction du contenu
function adjustInputWidth(input) {
    input.style.width = `${input.value.length + 1}ch`;
}

// Fonction pour afficher les données d'administration dans le tableau
function displayStaffData(data) {
    const tableBody = document.getElementById("corps-presentation");
    tableBody.innerHTML = ''; // Effacer le contenu précédent du tableau

    data.forEach(item => {
        // Ajouter une nouvelle ligne au tableau avec les données de l'élément
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${item.Description}</td>
            <td>${item.Image}</td>
            <td><button class="btn-edit">EDIT</button></td>
        `;

        // Créer une nouvelle ligne pour le formulaire d'édition
        const newRowForm = tableBody.insertRow();
        newRowForm.innerHTML = `
            <td colspan="3">
                <form class="modal" style="display:none;">
                    <input type="text" value="${item.Description}" name="Description" oninput="adjustInputWidth(this)">
                    <input type="text" value="${item.Image}" name="Image" oninput="adjustInputWidth(this)">
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
            updateStaffData(`/Updatepresentation/${item._id}`, new FormData(event.target));
        });
    });
}

// Fonction pour mettre à jour les données du staff via l'API


// Appel de la fonction pour récupérer et afficher les données lors du chargement de la page
getStaffData();
