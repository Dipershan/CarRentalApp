import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendSOSAlert } from "../redux/actions/sosActions";
import { Spin, Alert, Select } from "antd";

const { Option } = Select;

const SOSButton = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.sosReducer);

  const [selectedIssue, setSelectedIssue] = useState("Vehicle breakdown");

  const handleSOS = () => {
    const emergencyData = {
      userId: "12345",
      issue: selectedIssue,
      location: "Unknown",
    };

    dispatch(sendSOSAlert(emergencyData));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 300 }}>
      <Select
        value={selectedIssue}
        onChange={(value) => setSelectedIssue(value)}
        disabled={loading}
      >
        <Option value="Vehicle breakdown">🚗 Vehicle Breakdown</Option>
        <Option value="Accident">💥 Accident</Option>
        <Option value="Medical">🩺 Medical Emergency</Option>
        <Option value="Fire">🔥 Fire</Option>
      </Select>

      <button
        onClick={handleSOS}
        disabled={loading}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        🚨 SOS Emergency
      </button>

      {loading && <Spin />}
      {message && <Alert message={message} type="success" showIcon />}
      {error && <Alert message={error} type="error" showIcon />}
    </div>
  );
};

export default SOSButton;
