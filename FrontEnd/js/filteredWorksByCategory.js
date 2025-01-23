import { getCategoriesData, getWorksData } from '../api/api.js';
import { displayWorks } from '../index.js';
import { filter } from './filter.js';

async function FilteredWorksByCategory () {
    try {
        const data_categories = await getCategoriesData();
        const data_works = await getWorksData();

        filter(data_categories, data_works);
        displayWorks(data_works);
        
    } catch (error) {   
        console.error('Erreur dans la récupération des données :', error);
    }
}

FilteredWorksByCategory();