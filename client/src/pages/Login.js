import React from 'react';
import {Row ,  Col , Form , Input} from "antd";
import { Link } from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import Spinner from '../components/Spinner';
import { userLogin } from '../redux/actions/userActions';


const Login = () => {

  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state.alertsReducer);
  const onFinish =(values)=>{
    dispatch(userLogin(values))
    console.log(values)
  }
  
  return (
    <div className='login'>
      {loading && (<Spinner />)}
      <Row gutter={16} className='d-flex align-items-center'>      
        <Col lg={16} style={{position:'relative'}}>
          <img src="https://www.shutterstock.com/shutterstock/videos/1097136775/thumb/8.jpg?ip=x480" 
          className='img-large' />
          <h1 className='login-logo'>RevRent</h1>
        </Col>

        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>  
            <h1>Login</h1>       
            <hr />    
              < Form.Item name='email' label='Email' rules={[
              { required: true, message: "Email is required" }, 
              { type: "email", message: "Please enter a valid email!" }
  ]}>
                  <Input/>
              </ Form.Item>
              < Form.Item name='password' label='Password' rules={[{required: true}]}>
                  <Input/>
              </ Form.Item>
              
              <button className='btn1 mt-2 '>Login</button>
              <hr />
              <Link to="/register">Not Registered? Click Here </Link>
              <hr />
              <Link to="/register">Forgot Password? </Link>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login
