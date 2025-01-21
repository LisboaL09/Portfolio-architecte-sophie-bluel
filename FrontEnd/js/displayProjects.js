import { getProjectsData } from '../api/api.js';
		
export function showProjects() {
    getProjectsData()
    .then(data => {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = '';
        data.forEach(project => {
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
}

showProjects();