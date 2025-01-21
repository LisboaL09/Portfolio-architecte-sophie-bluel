export async function getProjectsData() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur dans la récupération des données:', error);
    }
}

// export async function testCategorie() {
//     try {
//         const response = await fetch("http://localhost:5678/api/categories");
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Erreur dans la récupération des données:', error);
//     }
// }