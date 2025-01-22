export async function getSwaggerData() {
    try {
        const response_categories = await fetch("http://localhost:5678/api/categories");
        const response_works = await fetch("http://localhost:5678/api/works");

        const data_categories = await response_categories.json();
        const data_works = await response_works.json();

        return { data_categories, data_works };
    } catch (error) {
        console.error('Erreur dans la récupération des données:', error);
    }
}