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
        figure.setAttribute('data-id', work.id);
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


function initModal() {
    const modal = document.getElementsByClassName('modal')[0]; 
    const modalButton = document.getElementById('modal-button');
    const closeButton = document.getElementsByClassName('close-button')[0];

    const addWorkButton = document.querySelector('#add-galerie-div button');
    const modalAddWork = document.getElementsByClassName('modal-add-work')[0];
    const closeAddWorkButton = document.getElementsByClassName('close-add-work-button')[0];
    const backArrow = document.getElementsByClassName('back-arrow')[0];

    // Ouvre la modale principale
    modalButton.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.classList.add('no-scroll-modal');
        displayWorksInModal(data_works);
    });

    // Ferme la modale principale (avec button)
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll-modal');
    });

    // Ferme la modale principale (avec clic en dehors)
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            document.body.classList.remove('no-scroll-modal');
        }
    });

    // Ouvre la modale pour ajouter une photo
    addWorkButton.addEventListener('click', () => {
        modal.style.display = 'none';
        modalAddWork.style.display = 'block';
    });

    // Ferme la modale pour ajouter une photo (avec button)
    closeAddWorkButton.addEventListener('click', () => {
        modalAddWork.style.display = 'none';
        document.body.classList.remove('no-scroll-modal');
    });

    // Ferme la modale pour ajouter une photo (avec clic en dehors)
    window.addEventListener('click', (e) => {
        if (e.target == modalAddWork) {
            modalAddWork.style.display = 'none';
            document.body.classList.remove('no-scroll-modal');
        }
    });

    // Retour à la première modale
    backArrow.addEventListener('click', () => {
        modalAddWork.style.display = 'none';
        modal.style.display = 'block';
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

        const deleteWorkIcon = document.createElement('div');
        deleteWorkIcon.classList.add('deletedWorkIcon');

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fas', 'fa-trash');
        deleteWorkIcon.appendChild(trashIcon);
        
        deleteWorkIcon.addEventListener('click', async () => {
            await deleteWork(work.id);
            figure.remove();
        });

        figure.appendChild(deleteWorkIcon);
        figure.appendChild(img);
        modalGallery.appendChild(figure);
    });
}

async function deleteWork(workId) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
            }
        });

        if (response.ok) {
            const gallery = document.querySelector('.gallery');
            const workFigure = gallery.querySelector(`figure[data-id="${workId}"]`);
            if (workFigure) {
                workFigure.remove();
            }
        } else {
            alert('Une erreur est survenue pendant la suppression du projet');
        }
    } catch (e) {
        console.error('Erreur:', e);
        alert('Erreur lors du try and catch lié à la suppression du projet');
    }
}