import React, { useEffect } from 'react';
import {useSelector , useDispatch} from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';

const Home = () => {
  const {cars , loading} =  useSelector(state=>state.carsReducer)
  const dispatch = useDispatch();

  useEffect(()=>{

  },[])
  return (
    
    <DefaultLayout>
      <h1>Home Page</h1>
      <h1>The length of car array is {cars.length}</h1>
    </DefaultLayout>
  )
}

export default Home