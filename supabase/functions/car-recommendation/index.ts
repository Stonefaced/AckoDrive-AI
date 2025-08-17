import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CarRecommendationRequest {
  budget: string;
  fuelType: 'petrol' | 'diesel';
  bodyStyle: 'SUV' | 'sedan';
}

interface CarRecommendation {
  name: string;
  price: string;
  fuelEfficiency: string;
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  reviews: {
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { budget, fuelType, bodyStyle }: CarRecommendationRequest = await req.json();
    
    console.log('Received request:', { budget, fuelType, bodyStyle });

    // For now, we'll use a mock recommendation system since gpt4free requires more setup
    // In production, you would integrate with gpt4free here
    const recommendation = generateMockRecommendation(budget, fuelType, bodyStyle);
    
    return new Response(JSON.stringify(recommendation), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in car-recommendation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateMockRecommendation(budget: string, fuelType: string, bodyStyle: string): CarRecommendation {
  const budgetNum = parseInt(budget.replace(/[^\d]/g, ''));
  
  let recommendation: CarRecommendation;
  
  if (bodyStyle === 'SUV') {
    if (budgetNum <= 1000000) {
      recommendation = {
        name: fuelType === 'petrol' ? 'Hyundai Venue' : 'Hyundai Venue Diesel',
        price: '₹7.94 - 12.72 Lakh',
        fuelEfficiency: fuelType === 'petrol' ? '17.52 kmpl' : '23.7 kmpl',
        features: ['Touchscreen Infotainment', 'Wireless Phone Charging', 'Sunroof', 'Connected Car Tech'],
        pros: ['Compact size perfect for city driving', 'Good fuel efficiency', 'Modern features'],
        cons: ['Limited rear space', 'Road noise at high speeds'],
        rating: 4.2,
        reviews: [
          {
            author: 'Rajesh Kumar',
            rating: 5,
            comment: 'Excellent compact SUV! Perfect for city driving and weekend trips. Great fuel efficiency.',
            date: '2024-01-15'
          },
          {
            author: 'Priya Sharma',
            rating: 4,
            comment: 'Love the features and build quality. Rear seat could be more spacious.',
            date: '2024-01-10'
          },
          {
            author: 'Amit Patel',
            rating: 4,
            comment: 'Good value for money. The connected car features are really useful.',
            date: '2024-01-05'
          }
        ]
      };
    } else if (budgetNum <= 1500000) {
      recommendation = {
        name: fuelType === 'petrol' ? 'Hyundai Creta' : 'Hyundai Creta Diesel',
        price: '₹11.00 - 20.15 Lakh',
        fuelEfficiency: fuelType === 'petrol' ? '17.4 kmpl' : '21.4 kmpl',
        features: ['10.25" Touchscreen', 'Panoramic Sunroof', 'Ventilated Seats', 'ADAS Level 1'],
        pros: ['Spacious cabin', 'Premium features', 'Strong build quality', 'Good resale value'],
        cons: ['Engine noise in diesel variant', 'Rear AC vents missing in base variants'],
        rating: 4.5,
        reviews: [
          {
            author: 'Sanjay Gupta',
            rating: 5,
            comment: 'Outstanding SUV! Perfect balance of features, comfort, and performance.',
            date: '2024-01-20'
          },
          {
            author: 'Meera Singh',
            rating: 4,
            comment: 'Very comfortable for long drives. Love the panoramic sunroof.',
            date: '2024-01-18'
          },
          {
            author: 'Vikram Reddy',
            rating: 5,
            comment: 'Best in segment! Great features and build quality.',
            date: '2024-01-12'
          }
        ]
      };
    } else {
      recommendation = {
        name: fuelType === 'petrol' ? 'Kia Sonet' : 'Kia Sonet Diesel',
        price: '₹7.79 - 15.77 Lakh',
        fuelEfficiency: fuelType === 'petrol' ? '18.4 kmpl' : '24.1 kmpl',
        features: ['10.25" HD Touchscreen', 'UVO Connect', 'Air Purifier', 'Bose Premium Sound'],
        pros: ['Feature-rich', 'Stylish design', 'Good engine options', 'Premium interior'],
        cons: ['Firm suspension', 'Limited service network'],
        rating: 4.3,
        reviews: [
          {
            author: 'Arjun Malhotra',
            rating: 4,
            comment: 'Feature-loaded SUV with great styling. Suspension is a bit firm.',
            date: '2024-01-16'
          },
          {
            author: 'Kavya Nair',
            rating: 5,
            comment: 'Love the premium features and sound system. Great value for money.',
            date: '2024-01-14'
          },
          {
            author: 'Rohit Joshi',
            rating: 4,
            comment: 'Excellent features and design. Service network needs improvement.',
            date: '2024-01-08'
          }
        ]
      };
    }
  } else {
    // Sedan recommendations
    if (budgetNum <= 1000000) {
      recommendation = {
        name: fuelType === 'petrol' ? 'Maruti Baleno' : 'Maruti Baleno CNG',
        price: '₹6.61 - 9.88 Lakh',
        fuelEfficiency: fuelType === 'petrol' ? '22.35 kmpl' : '30.61 km/kg',
        features: ['9" SmartPlay Pro+ Infotainment', 'Head-Up Display', 'Cruise Control', '360° Camera'],
        pros: ['Excellent fuel efficiency', 'Spacious interior', 'Good reliability', 'Strong resale value'],
        cons: ['Build quality concerns', 'Engine noise'],
        rating: 4.1,
        reviews: [
          {
            author: 'Anita Desai',
            rating: 4,
            comment: 'Great fuel efficiency and space. Perfect for daily commuting.',
            date: '2024-01-22'
          },
          {
            author: 'Suresh Iyer',
            rating: 4,
            comment: 'Reliable and economical. The head-up display is very useful.',
            date: '2024-01-19'
          },
          {
            author: 'Deepak Agarwal',
            rating: 4,
            comment: 'Good value for money sedan. Comfortable for city driving.',
            date: '2024-01-11'
          }
        ]
      };
    } else {
      recommendation = {
        name: fuelType === 'petrol' ? 'Honda City' : 'Honda City Hybrid',
        price: '₹11.82 - 16.35 Lakh',
        fuelEfficiency: fuelType === 'petrol' ? '17.8 kmpl' : '26.5 kmpl',
        features: ['8" Touchscreen', 'Honda SENSING', 'Sunroof', 'Alexa Remote Capability'],
        pros: ['Premium build quality', 'Smooth engine', 'Advanced safety features', 'Spacious cabin'],
        cons: ['Higher price point', 'Road noise'],
        rating: 4.4,
        reviews: [
          {
            author: 'Ravi Thakur',
            rating: 5,
            comment: 'Premium sedan with excellent build quality. Honda SENSING is impressive.',
            date: '2024-01-17'
          },
          {
            author: 'Sunita Kapoor',
            rating: 4,
            comment: 'Very comfortable and feature-rich. Good fuel efficiency.',
            date: '2024-01-13'
          },
          {
            author: 'Manoj Kumar',
            rating: 4,
            comment: 'Reliable Honda quality. Great for both city and highway driving.',
            date: '2024-01-06'
          }
        ]
      };
    }
  }
  
  return recommendation;
}