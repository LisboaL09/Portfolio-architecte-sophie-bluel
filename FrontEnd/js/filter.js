import { displayWorks, setActiveButton } from '../index.js';

export async function filter(data_categories, data_works) {

    const filter = document.querySelector('.filter'); // Afficher
    filter.innerHTML = ''; // Afficher

    const allButton = document.createElement('button');  // Afficher
    allButton.textContent = 'Tous'; // Afficher
    allButton.addEventListener('click', () => {  // Filtrer
        setActiveButton(allButton); // Filtrer
        displayWorks(data_works); // Filtrer
    });
    filter.appendChild(allButton); // Afficher
    
    data_categories.forEach(category => { // Afficher / Filtrer
        const button = document.createElement('button'); //Afficher
        button.textContent = category.name; // Afficher
        button.addEventListener('click', () => { // Filtrer
            setActiveButton(button); // Afficher
            const filtered_works = data_works.filter(work => work.categoryId === category.id); // Filtrer
            displayWorks(filtered_works); // Filtrer
        });
        filter.appendChild(button); // Afficher
    });
}