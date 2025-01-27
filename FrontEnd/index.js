import { getCategoriesData, getWorksData } from './api/api.js';

const data_categories = await getCategoriesData();
const data_works = await getWorksData();

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

displayCategories(data_categories, data_works);


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
displayWorks(data_works);

// Gère le filtre (3)
export function filterWorksByCategory(works, categoryId) {
    return works.filter(work => work.categoryId === categoryId);
}

// Affiche l'état du button (4)
export function setActiveButton(activeButton) {
    const filter = document.querySelector('.filter');
    const buttons = filter.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Login
const login_link = document.getElementById('login-link');
login_link.addEventListener('click', () => {
    window.location.href = 'login.html'; 
});

// Permet de changer le bouton "login" en "logout"
export function LoginLogout() {

    const loginButton = document.getElementById('login-link');
    const modalButton = document.getElementById('modal-button');
    const userToken = sessionStorage.getItem('userToken');
    if (userToken) {
        modalButton.style.display = "block";
        loginButton.textContent = "logout"
        loginButton.addEventListener('click', () => {
            sessionStorage.removeItem('userToken');
            sessionStorage.removeItem('userEmail');
            window.location.href = 'index.html';
        })
    } else {
        modalButton.style.display = "none";
        login_link.addEventListener('click', () => {
            window.location.href = 'login.html'; 
        });
    }
}

LoginLogout();


// Gère la modal
function initModal() {

    // Prend que l'index 0, car y a qu'une utilisation de la class modal
    const modal = document.getElementsByClassName('modal')[0]; 
    const modalButton = document.getElementById('modal-button');
    const closeButton = document.getElementsByClassName('close-button')[0];

    // Ouvre la modal
    modalButton.addEventListener('click', () => {
        modal.style.display = 'block';
        displayWorksInModal(data_works);
    });

    // Ferme la modal (avec button)
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Ferme la modal (avec clic en dehors)
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
}

initModal();


function displayWorksInModal(works) {
    const modalGallery = document.querySelector('.modal-galerie');
    modalGallery.innerHTML = '';

    works.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = work.imageUrl;
        figure.appendChild(img);
        modalGallery.appendChild(figure);
    });
}