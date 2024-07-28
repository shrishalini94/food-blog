// import {takeLatest,all, put,fork,call} from "redux-saga/effects";
// import * as types from "./actionTypes";
// import { getRecipes } from "./api";

// export function* onLoadRecipeAsync({query}){
//     try{
//         console.log("query",query);
        
//         const response = yield call(getRecipes, query);
//         yield put ({type: types.FETCH_RECIPE_SUCCESS,payload: response.data});

//     } catch(error){
//         yield put({type: types.FETCH_RECIPE_FAIL,payload: error})
//     }
// }
//  export function* onLoadRecipe(){
//     yield takeLatest(types.FETCH_RECIPE_START,onLoadRecipeAsync)
 
// }
// const recipesaga=[fork(onLoadRecipe)];
// export default function* rootSaga(){
//     yield all([...recipesaga]);
// }

import { takeLatest, all, put, fork, call } from "redux-saga/effects";
import * as types from "./actionTypes";
import { getRecipes } from "./api";

export function* onLoadRecipeAsync(action) {
    try {
        const { query } = action;
        if (!query) {
            throw new Error('Query is required and cannot be undefined');
        }
        const response = yield call(getRecipes, query);
        yield put({ type: types.FETCH_RECIPE_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: types.FETCH_RECIPE_FAIL, payload: error.message });
    }
}

export function* onLoadRecipe() {
    yield takeLatest(types.FETCH_RECIPE_START, onLoadRecipeAsync);
}

const recipesSaga = [fork(onLoadRecipe)];

export default function* rootSaga() {
    yield all([...recipesSaga]);
}
