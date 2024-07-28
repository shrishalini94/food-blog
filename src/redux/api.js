// const YOUR_APP_ID="db6f33d6";
// const YOUR_APP_KEY="d612ca5563ac55edeacdaba15ed45b2d";
// export const getRecipes = async (query) => {
// const url=`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
// await axios.get(url);
// }

// import axios from 'axios';

// const YOUR_APP_ID = "db6f33d6";
// const YOUR_APP_KEY = "d612ca5563ac55edeacdaba15ed45b2d";

// export const getRecipes = async (query) => {
//   const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
//   try {
//     const response = await axios.get(url);
//     return response.data; // Return the data from the API response
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//     throw error; // Re-throw the error to be handled by the caller
//   }
// };


import axios from 'axios';

const YOUR_APP_ID = "db6f33d6";
const YOUR_APP_KEY = "d612ca5563ac55edeacdaba15ed45b2d";

export const getRecipes = async (query) => {
    if (!query || query === 'undefined') {
        throw new Error('Query is required and cannot be undefined');
    }
    const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=20&calories=591-722&health=alcohol-free`
   
    return await axios.get(url);
};


