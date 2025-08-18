import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CarData {
  name: string;
  bodyStyle: string;
  fuelType: string;
  transmission: string;
  engine: string;
  price: string;
  priceValue: number;
  fuelEfficiency: string;
  features: string[];
  rating: number;
}

const cars: CarData[] = [
  {
    name: "Maruti Suzuki Baleno",
    bodyStyle: "Hatchback", 
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.2L K12C",
    price: "₹6.61L",
    priceValue: 6.61,
    fuelEfficiency: "22-23 kmpl",
    features: ["Infotainment System", "Automatic Climate Control", "Keyless Entry", "Push Button Start"],
    rating: 4
  },
  {
    name: "Hyundai Creta",
    bodyStyle: "SUV",
    fuelType: "Petrol",
    transmission: "Manual/Auto", 
    engine: "1.5L NA",
    price: "₹11.00L",
    priceValue: 11.00,
    fuelEfficiency: "16-17 kmpl",
    features: ["Panoramic Sunroof", "Wireless Charging", "360-degree Camera", "Ventilated Seats"],
    rating: 4
  },
  {
    name: "Honda Elevate",
    bodyStyle: "SUV",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.5L i-VTEC",
    price: "₹13.85L",
    priceValue: 13.85,
    fuelEfficiency: "15-16 kmpl",
    features: ["Honda SENSING", "Panoramic Sunroof", "Wireless Charging", "Premium Audio"],
    rating: 4
  },
  {
    name: "Skoda Kushaq",
    bodyStyle: "SUV",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.0L/1.5L TSI",
    price: "₹15.84L",
    priceValue: 15.84,
    fuelEfficiency: "16-17 kmpl",
    features: ["Virtual Cockpit", "Ventilated Seats", "Wireless Charging", "Premium Audio"],
    rating: 4
  },
  {
    name: "Volkswagen Taigun",
    bodyStyle: "SUV",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.0L/1.5L TSI",
    price: "₹15.72L",
    priceValue: 15.72,
    fuelEfficiency: "16-17 kmpl",
    features: ["Digital Cockpit", "Wireless Charging", "Premium Audio", "Connected Car"],
    rating: 4
  },
  {
    name: "MG Astor",
    bodyStyle: "SUV",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.5L NA / 1.3L Turbo",
    price: "₹14.61L",
    priceValue: 14.61,
    fuelEfficiency: "16-17 kmpl",
    features: ["AI Assistant", "Panoramic Sunroof", "360-degree Camera", "Level 2 ADAS"],
    rating: 4
  },
  {
    name: "Toyota Hyryder",
    bodyStyle: "SUV",
    fuelType: "Petrol Hybrid",
    transmission: "Manual/Auto",
    engine: "1.5L",
    price: "₹15.57L",
    priceValue: 15.57,
    fuelEfficiency: "27-28 kmpl",
    features: ["Strong Hybrid", "AWD", "Connected Car", "9-inch Touchscreen"],
    rating: 4
  },
  {
    name: "Renault Kiger",
    bodyStyle: "SUV",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.0L Turbo",
    price: "₹8.87L",
    priceValue: 8.87,
    fuelEfficiency: "18-19 kmpl",
    features: ["8-inch Touchscreen", "Wireless Charging", "Premium Audio", "Connected Car"],
    rating: 3
  },
  {
    name: "Nissan Magnite",
    bodyStyle: "SUV",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.0L Turbo",
    price: "₹8.64L",
    priceValue: 8.64,
    fuelEfficiency: "18-19 kmpl",
    features: ["8-inch Touchscreen", "360-degree Camera", "Wireless Charging", "Connected Car"],
    rating: 3
  },
  {
    name: "Honda Amaze",
    bodyStyle: "Sedan",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.2L i-VTEC",
    price: "₹8.36L",
    priceValue: 8.36,
    fuelEfficiency: "18-19 kmpl",
    features: ["CVT Gearbox", "Touchscreen Infotainment", "Rear AC Vents", "Honda SENSING"],
    rating: 4
  },
  {
    name: "Skoda Slavia",
    bodyStyle: "Sedan",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.0L/1.5L TSI",
    price: "₹14.85L",
    priceValue: 14.85,
    fuelEfficiency: "17-18 kmpl",
    features: ["Virtual Cockpit", "Ventilated Seats", "Wireless Charging", "Premium Audio"],
    rating: 4
  },
  {
    name: "Volkswagen Virtus",
    bodyStyle: "Sedan",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.0L/1.5L TSI",
    price: "₹15.04L",
    priceValue: 15.04,
    fuelEfficiency: "17-18 kmpl",
    features: ["Digital Cockpit", "Wireless Charging", "Premium Audio", "Connected Car"],
    rating: 4
  },
  {
    name: "MG Comet EV",
    bodyStyle: "Hatchback",
    fuelType: "Electric",
    transmission: "Automatic",
    engine: "17.3kWh battery",
    price: "₹8.98L",
    priceValue: 8.98,
    fuelEfficiency: "230 km range",
    features: ["Fast Charging", "Connected Car", "Digital Cluster", "Premium Interior"],
    rating: 3
  },
  {
    name: "Renault Kwid",
    bodyStyle: "Hatchback",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.0L",
    price: "₹4.70L",
    priceValue: 4.70,
    fuelEfficiency: "22-23 kmpl",
    features: ["Touchscreen", "Digital Cluster", "Rear Parking Sensors", "Power Steering"],
    rating: 3
  },
  {
    name: "Tata Tiago EV",
    bodyStyle: "Hatchback",
    fuelType: "Electric",
    transmission: "Automatic",
    engine: "24kWh Battery",
    price: "₹8.50L",
    priceValue: 8.50,
    fuelEfficiency: "315 km range",
    features: ["Fast Charging", "Connected Car", "Tata's ZConnect", "Eco Mode"],
    rating: 4
  },
  {
    name: "Honda City Hybrid",
    bodyStyle: "Sedan",
    fuelType: "Petrol Hybrid",
    transmission: "Automatic",
    engine: "1.5L e:HEV",
    price: "₹19.00L",
    priceValue: 19.00,
    fuelEfficiency: "26-27 kmpl",
    features: ["Honda SENSING", "Hybrid Technology", "Premium Audio", "Wireless Charging"],
    rating: 4
  },
  {
    name: "Skoda Superb",
    bodyStyle: "Sedan",
    fuelType: "Petrol",
    transmission: "Automatic",
    engine: "2.0L TSI",
    price: "₹36.00L",
    priceValue: 36.00,
    fuelEfficiency: "14-15 kmpl",
    features: ["Panoramic Sunroof", "Canton Audio", "Ventilated Seats", "Virtual Cockpit"],
    rating: 5
  },
  {
    name: "Mahindra Scorpio Classic",
    bodyStyle: "SUV",
    fuelType: "Diesel",
    transmission: "Manual",
    engine: "2.2L mHawk",
    price: "₹13.25L",
    priceValue: 13.25,
    fuelEfficiency: "15-16 kmpl",
    features: ["7-seater", "4WD Option", "Tough Build", "Ground Clearance"],
    rating: 4
  },
  {
    name: "Hyundai Alcazar",
    bodyStyle: "SUV",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "2.0L MPi",
    price: "₹16.77L",
    priceValue: 16.77,
    fuelEfficiency: "14-15 kmpl",
    features: ["7-seater", "Panoramic Sunroof", "Ventilated Seats", "ADAS"],
    rating: 4
  },
  {
    name: "Kia Carens",
    bodyStyle: "MPV",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.5L NA",
    price: "₹10.45L",
    priceValue: 10.45,
    fuelEfficiency: "16-17 kmpl",
    features: ["7-seater", "UVO Connect", "Wireless Charging", "Premium Audio"],
    rating: 4
  },
  {
    name: "Toyota Vellfire",
    bodyStyle: "MPV",
    fuelType: "Petrol Hybrid",
    transmission: "Automatic",
    engine: "2.5L",
    price: "₹96.00L",
    priceValue: 96.00,
    fuelEfficiency: "16-17 kmpl",
    features: ["Luxury Lounge", "Executive Seats", "JBL Audio", "Hybrid Technology"],
    rating: 5
  },
  {
    name: "Maruti Celerio",
    bodyStyle: "Hatchback",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.0L K10C",
    price: "₹5.37L",
    priceValue: 5.37,
    fuelEfficiency: "25-26 kmpl",
    features: ["AMT Gearbox", "Touchscreen", "Dual Airbags", "ABS"],
    rating: 3
  },
  {
    name: "Tata Harrier",
    bodyStyle: "SUV",
    fuelType: "Diesel",
    transmission: "Manual/Auto",
    engine: "2.0L Kryotec",
    price: "₹15.49L",
    priceValue: 15.49,
    fuelEfficiency: "16-17 kmpl",
    features: ["Panoramic Sunroof", "JBL Audio", "ConnectNext", "Drive Modes"],
    rating: 4
  },
  {
    name: "Hyundai Tucson",
    bodyStyle: "SUV",
    fuelType: "Petrol",
    transmission: "Automatic",
    engine: "2.0L",
    price: "₹29.02L",
    priceValue: 29.02,
    fuelEfficiency: "13-14 kmpl",
    features: ["ADAS", "Panoramic Sunroof", "Ventilated Seats", "Wireless Charging"],
    rating: 4
  },
  {
    name: "Tesla Model 3",
    bodyStyle: "Sedan",
    fuelType: "Electric",
    transmission: "Automatic",
    engine: "60kWh Battery",
    price: "₹60.00L",
    priceValue: 60.00,
    fuelEfficiency: "500+ km range",
    features: ["Autopilot", "Supercharging", "OTA Updates", "Minimalist Interior"],
    rating: 5
  },
  {
    name: "Maruti WagonR",
    bodyStyle: "Hatchback",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.0L/1.2L",
    price: "₹5.54L",
    priceValue: 5.54,
    fuelEfficiency: "24-25 kmpl",
    features: ["Tall Boy Design", "SmartPlay Infotainment", "Dual Airbags", "ABS"],
    rating: 4
  },
  {
    name: "Kia Seltos",
    bodyStyle: "SUV",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "1.5L NA",
    price: "₹10.90L",
    priceValue: 10.90,
    fuelEfficiency: "16-17 kmpl",
    features: ["UVO Connect", "Air Purifier", "Sound Mood Lighting", "Bose Audio"],
    rating: 4
  },
  {
    name: "Mahindra XUV700",
    bodyStyle: "SUV",
    fuelType: "Petrol",
    transmission: "Manual/Auto",
    engine: "2.0L Turbo",
    price: "₹14.03L",
    priceValue: 14.03,
    fuelEfficiency: "13-14 kmpl",
    features: ["ADAS", "Sky Roof", "Sony 3D Audio", "AdrenoX Connect"],
    rating: 4
  }
];

function searchCars(query: string): CarData[] {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return cars.filter(car => 
    car.name.toLowerCase().includes(searchTerm) ||
    car.bodyStyle.toLowerCase().includes(searchTerm) ||
    car.fuelType.toLowerCase().includes(searchTerm) ||
    car.engine.toLowerCase().includes(searchTerm)
  ).slice(0, 10); // Limit to 10 results
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    console.log('Car search request:', { query });
    
    const results = searchCars(query);
    
    return new Response(JSON.stringify({ cars: results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in car-search function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});