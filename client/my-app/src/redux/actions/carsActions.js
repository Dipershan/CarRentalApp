import axios from 'axios';

export const getAllCars =()=>async dispatch =>{
    dispatch({type: 'LOADING' ,  payload: true})


    try{
        const cars = await axios.get('/api/cars/getAllCars')
        dispatch({type: 'GET_ALL_CARS' ,  payload:response.data})
        dispatch({type: 'LOADING' ,  payload: false})
    }catch(error){
            console.log(error);
            dispatch({type: 'LOADING' ,  payload: false})
    }
}