import { getSwaggerData } from '../api/api.js';
import { displayProjects } from './displayProjects.js';

getSwaggerData()
    .then(({ data_categories, data_works }) => {
        const filter = document.querySelector('.filter');
        filter.innerHTML = '';

        const allButton = document.createElement('button');
        allButton.textContent = 'Tous';
        allButton.addEventListener('click', () => displayProjects(data_works));
        filter.appendChild(allButton);

        data_categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.addEventListener('click', () => {
                const filtered_works = data_works.filter(work => work.categoryId === category.id);
                displayProjects(filtered_works);
            });
            filter.appendChild(button);
        });

        displayProjects(data_works);
    })
    .catch(error => {
        console.error('Erreur dans la récupération des catégories:', error);
    });