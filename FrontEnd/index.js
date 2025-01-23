import { getCategoriesData, getWorksData } from './api/api.js';

export async function initDisplay() {
    const data_categories = await getCategoriesData();
    const data_works = await getWorksData();

    displayCategories(data_categories, data_works);
    displayWorks(data_works);
}

// Affiche les catégories (1)
export async function displayCategories(data_categories, data_works) {
    const filter = document.querySelector('.filter');
    filter.innerHTML = '';

    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.addEventListener('click', () => {
        setActiveButton(allButton);
        displayWorks((data_works)); 
    });
    filter.appendChild(allButton);

    data_categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.addEventListener('click', () => {
            setActiveButton(button);
            displayWorks(filterWorksByCategory(data_works, category.id))
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
export function filterWorksByCategory(works, categoryId) {
    return works.filter(work => work.categoryId === categoryId);
}

initDisplay();

// Affiche l'état du button (4)
export function setActiveButton(activeButton) {
    const filter = document.querySelector('.filter');
    const buttons = filter.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}