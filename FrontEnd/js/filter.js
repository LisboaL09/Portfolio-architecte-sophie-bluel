import { getSwaggerData } from '../api/api.js';
import { displayProjects } from './displayProjects.js';

getSwaggerData()
    .then(({ data_categories, data_works }) => {
        const filter = document.querySelector('.filter');
        filter.innerHTML = '';

        const allButton = document.createElement('button');
        allButton.textContent = 'Tous';
        allButton.addEventListener('click', () => {
            setActiveButton(allButton);
            displayProjects(data_works);
        });
        filter.appendChild(allButton);

        data_categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.addEventListener('click', () => {
                setActiveButton(button);
                const filtered_works = data_works.filter(work => work.categoryId === category.id);
                displayProjects(filtered_works);
            });
            filter.appendChild(button);
        });

        displayProjects(data_works);

        function setActiveButton(activeButton) {
            const buttons = filter.querySelectorAll('button');
            buttons.forEach(button => {
                button.classList.remove('active');
            });
            activeButton.classList.add('active');
        }
    })
    .catch(error => {
        console.error('Erreur dans la récupération des catégories:', error);
    });