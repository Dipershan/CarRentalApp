import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";

import moment from "moment";
import { bookCar } from "../redux/actions/bookingAction";


const { RangePicker } = DatePicker;

function BookingCar() {
  const { carid } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      const selectedCar = cars.find((o) => o._id === carid);
      setCar(selectedCar);
    }
  }, [cars, carid, dispatch]);

  useEffect(() => {
    if (!car.rentPerHour) return;

    let amount = totalHours * car.rentPerHour;
    if (driver) {
      amount += 30 * totalHours;
    }
    setTotalAmount(amount);
  }, [driver, totalHours, car.rentPerHour]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
  
    script.onload = () => {
      setPaystackReady(true);
    };
  
    script.onerror = () => {
      console.error("Failed to load Paystack script");
    };
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: { from, to },
    };
    dispatch(bookCar(reqObj));
  }

  function payWithPaystack() {
    if (!paystackReady || !window.PaystackPop) {
      alert("Paystack is not loaded yet. Please wait a second and try again.");
      return;
    }
  
    const handler = window.PaystackPop.setup({
      key: "pk_test_8c058c2afa628c71c71432cbaf0966a016ff38a7",
      email: JSON.parse(localStorage.getItem("user")).email,
      amount: totalAmount * 100,
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (response) {
        const reqObj = {
          transactionRef: response.reference,
          user: JSON.parse(localStorage.getItem("user"))._id,
          car: car._id,
          totalHours,
          totalAmount,
          driverRequired: driver,
          bookedTimeSlots: { from, to },
        };
        dispatch(bookCar(reqObj));
      },
      onClose: function () {
        alert("Payment popup closed");
      },
    });
  
    handler.openIframe();
  }
  
  
  
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" style={{ minHeight: "90vh" }}>
        <Col lg={10} sm={24} xs={24} className="p-3">
           
            <img
              src={car.image}
              className="car-image"
              alt={car.name || "Car Image"}
            />
        
        </Col>

        <Col lg={10} sm={24} xs={24}>
          <div className="car-booking-container">
            <Divider type="horizontal" dashed>
              Car Info
            </Divider>
            <div className="car-info">
              <p><b>{car.name}</b></p>
              <p>{car.rentPerHour} Rent Per hour /-</p>
              <p>Fuel Type: {car.fuelType}</p>
              <p>Max Persons: {car.capacity}</p>
            </div>

            <Divider type="horizontal" dashed>
              Select Time Slots
            </Divider>
            <RangePicker
              className="range-picker"
              showTime={{ format: "HH:mm" }}
              format="MMM DD yyyy HH:mm"
              onChange={selectTimeSlots}
            />
            <div className="date-input-container">
            <button>See Booked Slots</button>
          </div>


            {from && to && (
              <>
                <p>Total Hours: <b>{totalHours}</b></p>
                <p>Rent Per Hour: <b>{car.rentPerHour}</b></p>
                <Checkbox
                  className="driver-checkbox"
                  onChange={(e) => setDriver(e.target.checked)}
                >
                  Driver Required
                </Checkbox>
                <h3>Total Amount: ₹{totalAmount}</h3>
                <button className="action-button" onClick={payWithPaystack}>
                Book Now
              </button>

              </>
            )}
          </div>
        </Col>
      </Row>

      {car.name && (
        <Modal
          open={showModal}
          closable={false}
          footer={false}
          title="Booked time slots"
        >
          <div>
            {car.bookedTimeSlots.map((slot) => (
              <button key={slot.from} className="action-button">
                {slot.from} - {slot.to}
              </button>
            ))}
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)} className="action-button">
                CLOSE
              </button>
            </div>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default BookingCar;
