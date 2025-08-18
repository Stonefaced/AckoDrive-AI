import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CarRecommendationRequest {
  budget: string;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  bodyStyle: 'SUV' | 'sedan' | 'hatchback';
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
    if (budgetNum <= 700000) {
      if (fuelType === 'petrol') {
        recommendation = {
          name: 'Renault Kiger',
          price: '₹6.50 - 11.23 Lakh',
          fuelEfficiency: '20.5 kmpl',
          features: ['8" Touchscreen', 'Wireless Android Auto', 'Cooled Glovebox', 'Ambient Lighting'],
          pros: ['Affordable pricing', 'Good ground clearance', 'Spacious cabin', 'Modern features'],
          cons: ['Build quality concerns', 'Limited rear space', 'Engine refinement'],
          rating: 4.0,
          reviews: [
            {
              author: 'Ravi Kumar',
              rating: 4,
              comment: 'Great value for money compact SUV. Perfect for first-time buyers.',
              date: '2024-01-25'
            },
            {
              author: 'Sneha Patel',
              rating: 4,
              comment: 'Affordable and feature-rich. Good for city driving.',
              date: '2024-01-20'
            }
          ]
        };
      } else {
        recommendation = {
          name: 'Nissan Magnite',
          price: '₹6.00 - 11.27 Lakh',
          fuelEfficiency: '20.0 kmpl',
          features: ['8" Touchscreen', 'Around View Monitor', 'JBL Audio', 'Connected Car Tech'],
          pros: ['Aggressive pricing', 'Bold design', 'Good features', 'Comfortable ride'],
          cons: ['Interior quality', 'Limited service network', 'Engine noise'],
          rating: 4.1,
          reviews: [
            {
              author: 'Mohit Sharma',
              rating: 4,
              comment: 'Impressive features at this price point. Bold and stylish design.',
              date: '2024-01-22'
            },
            {
              author: 'Priya Gupta',
              rating: 4,
              comment: 'Good value proposition. The 360-degree camera is helpful.',
              date: '2024-01-18'
            }
          ]
        };
      }
    } else if (budgetNum <= 1200000) {
      if (fuelType === 'petrol') {
        recommendation = {
          name: 'Honda Elevate',
          price: '₹11.50 - 16.20 Lakh',
          fuelEfficiency: '15.31 kmpl',
          features: ['10.25" Touchscreen', 'Honda SENSING', 'Panoramic Sunroof', 'Wireless Charging'],
          pros: ['Premium build quality', 'Advanced safety features', 'Spacious interior', 'Refined engine'],
          cons: ['Higher price', 'Limited variants', 'Fuel efficiency could be better'],
          rating: 4.3,
          reviews: [
            {
              author: 'Rajesh Verma',
              rating: 5,
              comment: 'Excellent build quality and safety features. Honda reliability at its best.',
              date: '2024-01-24'
            },
            {
              author: 'Kavita Singh',
              rating: 4,
              comment: 'Very comfortable and well-built. Premium feel throughout.',
              date: '2024-01-21'
            }
          ]
        };
      } else if (fuelType === 'hybrid') {
        recommendation = {
          name: 'Toyota Hyryder',
          price: '₹11.14 - 19.99 Lakh',
          fuelEfficiency: '27.97 kmpl',
          features: ['9" Touchscreen', 'Toyota Safety Sense', 'Panoramic Sunroof', 'Head-Up Display'],
          pros: ['Excellent fuel efficiency', 'Hybrid technology', 'Strong build quality', 'Good resale value'],
          cons: ['CVT performance', 'Road noise', 'Limited power'],
          rating: 4.2,
          reviews: [
            {
              author: 'Sunil Agarwal',
              rating: 4,
              comment: 'Amazing fuel efficiency with hybrid technology. Very reliable.',
              date: '2024-01-23'
            },
            {
              author: 'Meera Reddy',
              rating: 4,
              comment: 'Great for long drives. The hybrid system works seamlessly.',
              date: '2024-01-19'
            }
          ]
        };
      } else {
        recommendation = {
          name: 'Citroen C3 Aircross',
          price: '₹10.00 - 12.54 Lakh',
          fuelEfficiency: '18.0 kmpl',
          features: ['10" Touchscreen', 'Wireless Android Auto', 'LED DRLs', 'Connected Car'],
          pros: ['Unique design', 'Comfortable seats', 'Good ground clearance', 'Spacious cabin'],
          cons: ['Limited service network', 'Build quality concerns', 'Manual transmission only'],
          rating: 3.9,
          reviews: [
            {
              author: 'Arjun Malhotra',
              rating: 4,
              comment: 'Unique French design and comfortable ride quality.',
              date: '2024-01-20'
            },
            {
              author: 'Nisha Kapoor',
              rating: 4,
              comment: 'Stands out in the crowd. Good space and comfort.',
              date: '2024-01-17'
            }
          ]
        };
      }
    } else if (budgetNum <= 2000000) {
      if (fuelType === 'petrol') {
        recommendation = {
          name: 'Skoda Kushaq',
          price: '₹11.89 - 19.79 Lakh',
          fuelEfficiency: '18.09 kmpl',
          features: ['10" Touchscreen', 'Virtual Cockpit', 'Ventilated Seats', 'Wireless Charging'],
          pros: ['European build quality', 'Refined engines', 'Premium interior', 'Good handling'],
          cons: ['Higher maintenance cost', 'Limited service network', 'Rear AC vents missing'],
          rating: 4.4,
          reviews: [
            {
              author: 'Vikram Singh',
              rating: 5,
              comment: 'European quality and engineering. Excellent driving dynamics.',
              date: '2024-01-26'
            },
            {
              author: 'Deepika Sharma',
              rating: 4,
              comment: 'Premium feel and great build quality. Love the virtual cockpit.',
              date: '2024-01-22'
            }
          ]
        };
      } else if (fuelType === 'electric') {
        recommendation = {
          name: 'Hyundai Kona Electric',
          price: '₹23.84 - 24.03 Lakh',
          fuelEfficiency: '452 km range',
          features: ['8" Touchscreen', 'Blue Link', 'Wireless Charging', 'Ventilated Seats'],
          pros: ['Long range', 'Premium features', 'Silent operation', 'Instant torque'],
          cons: ['High price', 'Limited charging infrastructure', 'Long charging time'],
          rating: 4.2,
          reviews: [
            {
              author: 'Ankit Jain',
              rating: 4,
              comment: 'Great electric SUV with good range. Future of mobility.',
              date: '2024-01-24'
            },
            {
              author: 'Pooja Agarwal',
              rating: 4,
              comment: 'Silent and smooth. Charging infrastructure is improving.',
              date: '2024-01-21'
            }
          ]
        };
      } else {
        recommendation = {
          name: 'MG Astor',
          price: '₹10.52 - 18.69 Lakh',
          fuelEfficiency: '17.2 kmpl',
          features: ['10.1" Touchscreen', 'AI Assistant', 'Panoramic Sunroof', 'ADAS Level 2'],
          pros: ['Advanced AI features', 'Premium interior', 'Good value for money', 'Strong build'],
          cons: ['Brand perception', 'Service network', 'Turbo lag'],
          rating: 4.1,
          reviews: [
            {
              author: 'Rohit Gupta',
              rating: 4,
              comment: 'AI assistant is impressive. Good features for the price.',
              date: '2024-01-23'
            },
            {
              author: 'Sanya Malhotra',
              rating: 4,
              comment: 'Feature-rich SUV with AI technology. Great value.',
              date: '2024-01-19'
            }
          ]
        };
      }
    } else if (budgetNum <= 3500000) {
      if (fuelType === 'diesel') {
        recommendation = {
          name: 'Jeep Compass',
          price: '₹21.73 - 32.41 Lakh',
          fuelEfficiency: '17.1 kmpl',
          features: ['10.1" Touchscreen', 'Panoramic Sunroof', 'Uconnect', 'Trail Rated 4x4'],
          pros: ['Authentic SUV character', 'Off-road capability', 'Premium interior', 'Strong build'],
          cons: ['High maintenance', 'Fuel efficiency', 'Limited rear space'],
          rating: 4.3,
          reviews: [
            {
              author: 'Aditya Sharma',
              rating: 5,
              comment: 'True SUV with excellent off-road capabilities. Premium feel.',
              date: '2024-01-25'
            },
            {
              author: 'Ritika Jain',
              rating: 4,
              comment: 'Solid build and great for adventures. Fuel efficiency could be better.',
              date: '2024-01-20'
            }
          ]
        };
      } else {
        recommendation = {
          name: 'Toyota Fortuner',
          price: '₹33.00 - 51.44 Lakh',
          fuelEfficiency: '14.4 kmpl',
          features: ['9" Touchscreen', '360-degree Camera', 'JBL Audio', 'Multi-terrain Select'],
          pros: ['Legendary reliability', 'Strong resale value', 'Powerful engine', 'Off-road capability'],
          cons: ['High price', 'Fuel efficiency', 'Third-row space'],
          rating: 4.6,
          reviews: [
            {
              author: 'Rajat Singh',
              rating: 5,
              comment: 'The king of SUVs! Unmatched reliability and resale value.',
              date: '2024-01-26'
            },
            {
              author: 'Neha Gupta',
              rating: 5,
              comment: 'Premium SUV with excellent build quality. Worth every penny.',
              date: '2024-01-22'
            }
          ]
        };
      }
    } else {
      recommendation = {
        name: 'Mahindra Bolero Neo',
        price: '₹9.63 - 12.15 Lakh',
        fuelEfficiency: '17.28 kmpl',
        features: ['7" Touchscreen', 'Dual Airbags', 'ABS with EBD', 'Manual AC'],
        pros: ['Rugged build', 'Good ground clearance', 'Reliable engine', 'Value for money'],
        cons: ['Basic interior', 'Ride quality', 'Limited features'],
        rating: 3.8,
        reviews: [
          {
            author: 'Suresh Kumar',
            rating: 4,
            comment: 'Reliable workhorse. Great for rural and tough conditions.',
            date: '2024-01-24'
          },
          {
            author: 'Ravi Patel',
            rating: 4,
            comment: 'Robust and practical. Good for utility purposes.',
            date: '2024-01-21'
          }
        ]
      };
    }
  } else if (bodyStyle === 'sedan') {
    if (budgetNum <= 1000000) {
      if (fuelType === 'petrol') {
        recommendation = {
          name: 'Honda Amaze',
          price: '₹7.00 - 9.71 Lakh',
          fuelEfficiency: '18.3 kmpl',
          features: ['7" Touchscreen', 'Android Auto', 'Dual Airbags', 'ABS with EBD'],
          pros: ['Honda reliability', 'Spacious cabin', 'Good fuel efficiency', 'Comfortable ride'],
          cons: ['Basic interior', 'Engine refinement', 'Limited features'],
          rating: 4.0,
          reviews: [
            {
              author: 'Amit Sharma',
              rating: 4,
              comment: 'Reliable Honda sedan. Good space and fuel efficiency.',
              date: '2024-01-25'
            },
            {
              author: 'Priyanka Singh',
              rating: 4,
              comment: 'Comfortable and practical. Perfect for small families.',
              date: '2024-01-21'
            }
          ]
        };
      } else if (fuelType === 'electric') {
        recommendation = {
          name: 'Tata Tigor EV',
          price: '₹12.49 - 13.75 Lakh',
          fuelEfficiency: '306 km range',
          features: ['7" Touchscreen', 'Connected Car', 'Dual Airbags', 'Fast Charging'],
          pros: ['Zero emissions', 'Low running cost', 'Silent operation', 'Government incentives'],
          cons: ['Limited range', 'Charging infrastructure', 'Higher price'],
          rating: 3.9,
          reviews: [
            {
              author: 'Rahul Jain',
              rating: 4,
              comment: 'Good electric sedan for city use. Low running costs.',
              date: '2024-01-24'
            },
            {
              author: 'Sneha Kapoor',
              rating: 4,
              comment: 'Eco-friendly and economical. Range is adequate for city driving.',
              date: '2024-01-20'
            }
          ]
        };
      } else {
        recommendation = {
          name: 'Maruti Baleno',
          price: '₹6.61 - 9.88 Lakh',
          fuelEfficiency: '22.35 kmpl',
          features: ['9" SmartPlay Pro+', 'Head-Up Display', 'Cruise Control', '360° Camera'],
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
            }
          ]
        };
      }
    } else if (budgetNum <= 1500000) {
      if (fuelType === 'petrol') {
        recommendation = {
          name: 'Skoda Slavia',
          price: '₹11.30 - 18.39 Lakh',
          fuelEfficiency: '19.47 kmpl',
          features: ['10" Touchscreen', 'Virtual Cockpit', 'Ventilated Seats', 'Wireless Charging'],
          pros: ['European build quality', 'Refined engines', 'Premium interior', 'Good handling'],
          cons: ['Higher maintenance', 'Limited service network', 'Road noise'],
          rating: 4.4,
          reviews: [
            {
              author: 'Karan Singh',
              rating: 5,
              comment: 'European quality sedan with excellent driving dynamics.',
              date: '2024-01-26'
            },
            {
              author: 'Ritu Sharma',
              rating: 4,
              comment: 'Premium feel and great build quality. Love the virtual cockpit.',
              date: '2024-01-23'
            }
          ]
        };
      } else {
        recommendation = {
          name: 'Volkswagen Virtus',
          price: '₹11.50 - 18.57 Lakh',
          fuelEfficiency: '19.40 kmpl',
          features: ['10" Touchscreen', 'Digital Cockpit', 'Ventilated Seats', 'Connected Car'],
          pros: ['German engineering', 'Premium interior', 'Refined engines', 'Good safety'],
          cons: ['Higher maintenance', 'Limited service network', 'Expensive parts'],
          rating: 4.5,
          reviews: [
            {
              author: 'Arjun Gupta',
              rating: 5,
              comment: 'German engineering at its best. Excellent build and refinement.',
              date: '2024-01-25'
            },
            {
              author: 'Nidhi Agarwal',
              rating: 4,
              comment: 'Premium sedan with great features. Very comfortable.',
              date: '2024-01-21'
            }
          ]
        };
      }
    } else {
      recommendation = {
        name: 'Honda City',
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
          }
        ]
      };
    }
  } else if (bodyStyle === 'hatchback') {
    if (fuelType === 'electric') {
      recommendation = {
        name: 'MG Comet EV',
        price: '₹7.98 - 9.98 Lakh',
        fuelEfficiency: '230 km range',
        features: ['10.25" Touchscreen', 'Connected Car', 'Dual Airbags', 'Fast Charging'],
        pros: ['Compact electric car', 'Easy to drive', 'Low running cost', 'Unique design'],
        cons: ['Limited range', 'Two-door only', 'Small size', 'Limited practicality'],
        rating: 3.7,
        reviews: [
          {
            author: 'Rohan Jain',
            rating: 4,
            comment: 'Perfect city electric car. Unique and fun to drive.',
            date: '2024-01-23'
          },
          {
            author: 'Kavya Reddy',
            rating: 3,
            comment: 'Good for short city trips. Range could be better.',
            date: '2024-01-20'
          }
        ]
      };
    } else {
      recommendation = {
        name: 'Maruti Swift',
        price: '₹5.92 - 8.67 Lakh',
        fuelEfficiency: '23.20 kmpl',
        features: ['7" SmartPlay Studio', 'Auto AC', 'Keyless Entry', 'ABS with EBD'],
        pros: ['Excellent fuel efficiency', 'Sporty design', 'Good handling', 'Strong resale value'],
        cons: ['Limited rear space', 'Basic interior', 'Engine refinement'],
        rating: 4.2,
        reviews: [
          {
            author: 'Rahul Singh',
            rating: 4,
            comment: 'Fun to drive hatchback with great fuel efficiency.',
            date: '2024-01-24'
          },
          {
            author: 'Neha Patel',
            rating: 4,
            comment: 'Reliable and economical. Perfect for young buyers.',
            date: '2024-01-22'
          }
        ]
      };
    }
  }
  
  return recommendation;
}