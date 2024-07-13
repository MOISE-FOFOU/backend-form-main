
    // Tableau pour stocker les données d'administration

    function getStaffData() {
        let staffData = [];

        fetch('/Getmission', {
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
            console.error('Erreur lors de la récupération des données:', error.message);
            // Afficher une alerte en cas d'erreur de récupération des données
        });
    }

    // Fonction pour afficher les données d'administration dans le tableau
    function displayStaffData(data) {
        const tableBody = document.getElementById("corps-mission"); // Correction de la méthode pour obtenir l'élément
            tableBody.innerHTML = ''; // Effacer le contenu précédent du tableau
    
            data.forEach(item => {
                // Parcourir toutes les personnes de l'item
                    // Ajouter une nouvelle ligne au tableau avec les données de la personne
                    const newRow = tableBody.insertRow();
                    newRow.innerHTML = `
                        <td>${item.Description}</td>
                        <td>${item.Image}</td>
                        <td><button class="btn-edit">EDIT</button></td>
                    `;
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
            updateStaffData(`/Updatemission/${item._id}`, new FormData(event.target));
        });
            });
    }

    // Appel de la fonction pour récupérer et afficher les données lors du chargement de la page
    getStaffData();