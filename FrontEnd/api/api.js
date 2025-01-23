export async function getCategoriesData() {
    try {
        const response_categories = await fetch("http://localhost:5678/api/categories");
        const data_categories = await response_categories.json();
        return data_categories;
    } catch (error) {
        console.error('Erreur dans la récupération des données de catégories :', error);
    }
}

export async function getWorksData () {
    try {
        const response_works = await fetch("http://localhost:5678/api/works");
        const data_works = await response_works.json();
        return data_works;
    } catch (error) {
        console.error('Erreur dans la récupération des données de projets :', error);
    }
}