import { getSwaggerData } from '../api/api.js';

getSwaggerData()
    .then(({ data_works }) => {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = '';
        data_works.forEach(project => {
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');
            img.src = project.imageUrl;
            img.alt = project.title;
            figcaption.textContent = project.title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
    })
    .catch(error => {
        console.error('Erreur dans la récupération des projets:', error);
    });