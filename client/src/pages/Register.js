import React from 'react';
import {Row ,  Col , Form , Input} from "antd";
import {Link} from "react-router-dom";
import {useDispatch} from 'react-redux';
import { userRegister } from '../redux/actions/userActions';


const Register = () => {

   const dispatch = useDispatch();  
 
   const onFinish =(values)=>{
     dispatch(userRegister(values))
     console.log(values)
   }

  return (
    <div className='login'>
      <Row gutter={16} className='d-flex align-items-center'>

        <Col lg={16} style={{position:'relative'}}>
          <img src="https://www.shutterstock.com/shutterstock/videos/1097136775/thumb/8.jpg?ip=x480" 
          className='img-large' />
          <h1 className='login-logo'>RevRent</h1>
        </Col>

        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>  
            <h1>Register</h1>       
            <hr />    
              < Form.Item name='username' label='Username' rules={[{required: true}]}>
                  <Input/>
              </ Form.Item>
               < Form.Item name='email' label='Email' 
               rules={[
                            { required: true, message: "Email is required" }, 
                            { type: "email", message: "Please enter a valid email!" }
                ]}>
                                <Input/>
                </ Form.Item>
              < Form.Item name='password' label='Password' rules={[{required: true}]}>
                  <Input/>
              </ Form.Item>
              < Form.Item name='cpassword' label='Confirm Password' rules={[{required: true}]}>
                  <Input/>
              </ Form.Item>
              
              <button className='btn1'>Register</button>
              <hr />
              <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register;
