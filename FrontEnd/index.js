import { getCategoriesData, getWorksData } from './api/api.js';

// Affiche les catégories (1)
export async function displayCategories(data_categories, data_works) {
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
}

// Affiche les works (2)
export function displayWorks(works) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    works.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

// Gère le filtre (3)
export async function filter() {
    try {
        const data_categories = await getCategoriesData();
        const data_works = await getWorksData();

        displayCategories(data_categories, data_works);
        displayWorks(data_works);
        
    } catch (error) {   
        console.error('Erreur dans la récupération des données :', error);
    }
}

filter();

// Affiche l'état du button (4)
export function setActiveButton(activeButton) {
    const filter = document.querySelector('.filter');
    const buttons = filter.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}