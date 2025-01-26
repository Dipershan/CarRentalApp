const intialData  =  {
    loading :false
};


  const alertsReducer =(state=intialData ,  action) =>{
    switch(action.type){
        case 'LOADING' : {
            return {
                ...state,
                loading : action.payload
            }
        }
        default : return state
    }
}

export default alertsReducer;