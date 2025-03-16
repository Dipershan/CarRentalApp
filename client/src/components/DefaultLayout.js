import React from "react";
import { Dropdown, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "../index.css"; // ✅ Import global styles

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = {
    items: [
      { key: "1", label: <Link to="/">🏠 Home</Link> },
      { key: "2", label: <Link to="/userbookings">📅 My Bookings</Link> },
      { key: "3", label: <Link to="/admin">⚙️ Admin</Link> },
      {
        key: "4",
        label: (
          <span
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            🚪 Logout
          </span>
        ),
      },
    ],
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="navbar">
              <h1 className="logo">
                <Link to="/" className="logo-text">
                  Rev<span className="highlight">Car</span>
                </Link>
              </h1>

              <Dropdown menu={menu} placement="bottom">
                <Button className="user-btn">
                  {user?.username || "User"}
                </Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>

      {/* Content */}
      <div className="content">{props.children}</div>

      {/* Footer */}
      <div className="footer">
        <hr />
        <p>Designed and Developed By</p>
        <h3 className="footer-brand">🚗 RevCar</h3>
      </div>
    </div>
  );
};

export default DefaultLayout;
