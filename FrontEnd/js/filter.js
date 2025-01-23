import { getCategoriesData, getWorksData } from '../api/api.js';
import { setActiveButton } from "./activeButton.js";
import { displayWorks } from './displayWorks.js';
import { displayCategories } from './displayCategories.js';

async function FilteredWorksByCategory () {
    try {
        const data_categories = await getCategoriesData();
        const data_works = await getWorksData();

        displayCategories(data_categories, data_works);

        displayWorks(data_works);

        setActiveButton(allButton);
        
    } catch (error) {   
        console.error('Erreur dans la récupération des données :', error);
    }
}

FilteredWorksByCategory();