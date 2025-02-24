const mongoose = require("mongoose");
const Car = require("./models/car.model");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const cars = [
  {
    name: "Tata Altroz",
    image: "https://img.gaadicdn.com/images/car-images/large/Tata/Altroz/10707/1706785701598/223_Arcade-Grey_323333.jpg",
    capacity: 5,
    fuelType: "Petrol",
    rentPerHour: 500,
    bookedTimeSlots: [{ from: "2024-02-18T10:00:00", to: "2024-02-18T14:00:00" }]
  },
  {
    name: "Mahindra XUV700",
    image: "https://www.agnimahindra.com/assets/img/blue.jpg",
    capacity: 7,
    fuelType: "Diesel", 
    rentPerHour: 600,
    bookedTimeSlots: [{ from: "2024-02-19T12:00:00", to: "2024-02-19T16:00:00" }]
  },
  {
    name: "Hyundai Creta",
    image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201910/New_Creta_0.png?size=690:388",
    capacity: 5,
    fuelType: "Petrol",
    rentPerHour: 550,
    bookedTimeSlots: []
  },
  {
    name: "Maruti Suzuki Swift",
    image: "https://shivamautozone.com/wp-content/uploads/2024/05/Swift-8-768x433.webp",
    capacity: 5,
    fuelType: "Petrol",
    rentPerHour: 550,
    bookedTimeSlots: []
  },
  {
    name: "Scorpio S11",
    image: "https://imgd.aeplcdn.com/1056x594/n/q2tasra_1425655.jpg?q=80",
    capacity: 5,
    fuelType: "Petrol",
    rentPerHour: 550,
    bookedTimeSlots: []
  },
  {
    name: "Deepal- SL03",
    image: "https://techlekh.com/wp-content/uploads/2023/11/Deepal-SL03.jpg",
    capacity: 7,
    fuelType: "Electric",
    rentPerHour: 2000,
    bookedTimeSlots: [{ "from": "2024-02-19T12:00:00", "to": "2024-02-19T16:00:00" }]
  },
  {
    name: "Toyota Fortuner",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW69pevV3p538Wc-NTPovdUnXwcONd4qscrw&s",
    capacity: 7,
    fuelType: "Diesel",
    rentPerHour: 800,
    bookedTimeSlots: [{ "from": "2024-02-20T10:00:00", "to": "2024-02-20T14:00:00" }]
  },
  {
    name: "Mercedes SL roaster",
    image: "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my25/sl-class/gallery/amg/gallery-class/2025-AMG-SL-ROADSTER-GAL-009-L-FE-DR.jpg",
    capacity: 2,
    fuelType: "Petrol",
    rentPerHour: 4000,
    bookedTimeSlots: [{ "from": "2024-02-21T09:00:00", "to": "2024-02-21T12:00:00" }]
  },
  {
    name: "Tata Harrier",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/139139/harrier-facelift-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80",
    capacity: 5,
    fuelType: "Diesel",
    rentPerHour: 550,
    bookedTimeSlots: [{ "from": "2024-02-22T11:00:00", "to": "2024-02-22T15:00:00" }]
  },
  {
    name: "Kia Seltos",
    image: "https://www.kia-uae.com/wp-content/themes/kia/360/Seltos/Pluton_blue_PLU/12.png",
    capacity: 5,
    fuelType: "Petrol",
    rentPerHour: 480,
    bookedTimeSlots: [{ "from": "2024-02-23T14:00:00", "to": "2024-02-23T18:00:00" }]
  },
  {
    name: "BMW M4",
    image: "https://www.bmwusa.com/content/dam/bmw/common/limited-edition/2024/soc25/m4-cs/BMW-LimitedEdition-M4-CSL-all.jpg.bmwimg.small.jpg",
    capacity: 5,
    fuelType: "Diesel",
    rentPerHour: 30000,
    bookedTimeSlots: [{ "from": "2024-02-24T10:00:00", "to": "2024-02-24T13:00:00" }]
  },
  {
    name: "Honda City",
    image: "https://mfcwl-vehicle-live-web-images.s3.us-west-2.amazonaws.com/live_web_images/usedcarsimg/mfc/4235/517617/cover_image-20220625190355.jpeg",
    capacity: 5,
    fuelType: "Petrol",
    rentPerHour: 450,
    bookedTimeSlots: [{ "from": "2024-02-25T09:00:00", "to": "2024-02-25T11:00:00" }]
  },
  {
    name: "Omada E5",
    image: "https://techlekh.com/wp-content/uploads/2023/10/Side-Styling-in-Omoda-5-EV.jpg",
    capacity: 7,
    fuelType: "Electric",
    rentPerHour: 1070,
    bookedTimeSlots: [{ "from": "2024-02-26T08:00:00", "to": "2024-02-26T12:00:00" }]
  },
  {
    name: "Ford Endeavour",
    image: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/37640/endeavour-exterior-right-front-three-quarter-149471.jpeg?q=80&q=80",
    capacity: 7,
    fuelType: "Diesel",
    rentPerHour: 850,
    bookedTimeSlots: [{ "from": "2024-02-27T13:00:00", "to": "2024-02-27T17:00:00" }]
  },
  {
    name: "Skoda Kushaq",
    image: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/175993/kushaq-exterior-right-front-three-quarter.jpeg?isig=0&q=80&q=80",
    capacity: 5,
    fuelType: "Petrol",
    rentPerHour: 490,
    bookedTimeSlots: [{ "from": "2024-02-28T11:00:00", "to": "2024-02-28T15:00:00" }]
  },
  {
    name: "Porche 911",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIcLDtEgdECRMXndh0nix51mwjNq7Fr0V_Eg&s",
    capacity: 5,
    fuelType: "Petrol",
    rentPerHour: 9000,
    bookedTimeSlots: [{ "from": "2024-02-28T11:00:00", "to": "2024-02-28T15:00:00" }]
  }
];


const insertCars = async () => {
  try {
      await Car.deleteMany(); 
      await Car.insertMany(cars); 
      console.log("Cars Inserted Successfully!");
      mongoose.connection.close();
  } catch (error) {
      console.error("Error Inserting Cars:", error);
      mongoose.connection.close();
  }
};

insertCars();