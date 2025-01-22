import { getSwaggerData } from '../api/api.js';

getSwaggerData()
    .then(({ data_categories }) => {
        const filter = document.querySelector('.filter');
        filter.innerHTML = '';

        const allButton = document.createElement('button');
        allButton.textContent = 'Tous';
        filter.appendChild(allButton);

        data_categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            filter.appendChild(button);
        });
    })
    .catch(error => {
        console.error('Erreur dans la récupération des catégories:', error);
    });