import React from 'react'
import {  Dropdown, Button , Row , Col } from "antd";
import {Link} from 'react-router-dom'

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const menu = {
    items: [
      {
        key: '1',
        label: <a href="/">Home</a>,
      },
      {
        key: '2',
        label: <a href="/userbookings">Bookings</a>,
      },
      {
        key: '3',
        label: <a href="/admin">Admin</a>,
      },
      {
        key: '4',
        label: (
          <span
            style={{ color: 'orangered' }}
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
          >
            Logout
          </span>
        ),
      },
    ],
  };
  
  return (
    <div>
    <div className="header bs1">
        <Row gutter={16} justify='center'>
            <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
           <h1 ><b><Link to='/' style={{color:'black'}}>RevCar</Link></b></h1>

        <Dropdown menu={menu} placement="bottom">
          <Button>{user.username}</Button>
        </Dropdown>
      </div>
            </Col>
        </Row>
      
    </div>
    <div className="content">{props.children}</div>

    <div className="footer text-center">
    <hr />

         <p>Desinged and Developed By</p>

         

         <p>SHEY</p>
        
    </div>
  </div>
  )
}

export default DefaultLayout