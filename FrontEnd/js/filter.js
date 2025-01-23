import { getCategoriesData, getWorksData } from '../api/api.js';
import { setActiveButton } from "./activeButton.js";
import { displayWorks } from './displayWorks.js';

async function FilteredWorksByCategory () {
    try {
        const data_categories = await getCategoriesData();
        const data_works = await getWorksData();

        const filter = document.querySelector('.filter');
        filter.innerHTML = '';

        const allButton = document.createElement('button');
        allButton.textContent = 'Tous';
        allButton.addEventListener('click', () => {
            setActiveButton(allButton);
            displayWorks(data_works);
        });
        filter.appendChild(allButton);

        data_categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.addEventListener('click', () => {
                setActiveButton(button);
                const filtered_works = data_works.filter(work => work.categoryId === category.id);
                displayWorks(filtered_works);
            });
            filter.appendChild(button);
        });

        displayWorks(data_works);

        setActiveButton(allButton);
        
    } catch (error) {   
        console.error('Erreur dans la récupération des données :', error);
    }
}

FilteredWorksByCategory();