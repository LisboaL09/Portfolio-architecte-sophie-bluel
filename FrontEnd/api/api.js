// À optimiser pour la rendre async, retirer un des then, gérer le côté asynchrone et renvoyer juste les datas, la gestion de données se fait
// sur l'index.html, sans la fonction de callback mais avec des then and catch
export async function getProjectsData() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur dans la récupération des données:', error);
    }
}