import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send, Bot, User, Star, Zap, Shield, Car, Fuel, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CarRecommendation {
  cars: {
    name: string;
    price: string;
    bodyStyle: string;
    transmission: string;
    engine: string;
    fuelType: string;
    fuelEfficiency: string;
    features: string[];
    pros: string[];
    cons: string[];
    rating: number;
    reviews: {
      author: string;
      rating: number;
      comment: string;
    }[];
  }[];
}

const AIAssistantSection = () => {
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<CarRecommendation | null>(null);
  const [formData, setFormData] = useState({
    budget: "",
    fuelType: "",
    bodyStyle: ""
  });

  const handleFormSubmit = async () => {
    if (!formData.budget || !formData.fuelType || !formData.bodyStyle) {
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('car-recommendation', {
        body: {
          budget: formData.budget,
          fuelType: formData.fuelType,
          bodyStyle: formData.bodyStyle
        }
      });
      
      if (error) throw error;
      
      if (data && data.cars) {
        setRecommendation(data);
        setShowForm(false);
      } else {
        console.error('Invalid recommendation data:', data);
      }
    } catch (error) {
      console.error('Error getting recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(true);
    setRecommendation(null);
    setFormData({ budget: "", fuelType: "", bodyStyle: "" });
  };

  const aiFeatures = [
    {
      icon: <Star className="w-5 h-5" />,
      title: "Smart Recommendations",
      description: "Get personalized car suggestions based on your lifestyle and preferences"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Answers",
      description: "Ask any question about cars, pricing, features, or comparisons"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Expert Analysis",
      description: "Detailed analysis of safety ratings, reliability, and value for money"
    }
  ];

  return (
    <section id="ai-assistant" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Bot className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">AI POWERED</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Personal Car Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant, intelligent answers about any car. From recommendations to detailed comparisons, 
            our AI assistant is here to help you make the perfect choice.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Features */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-4">
              What I can help with:
            </h3>
            {aiFeatures.map((feature, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-lg p-2 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-green-600 text-white">
                    AI POWERED
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Advanced AI engine now active! Get personalized car recommendations based on your specific requirements.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Interface */}
          <div className="lg:col-span-2">
            {showForm ? (
              <Card className="min-h-96">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="w-5 h-5 text-primary" />
                    <span>Find Your Perfect Car</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Budget Range</span>
                      </Label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5-10 lakh">₹5 - 10 Lakh</SelectItem>
                          <SelectItem value="10-15 lakh">₹10 - 15 Lakh</SelectItem>
                          <SelectItem value="15-20 lakh">₹15 - 20 Lakh</SelectItem>
                          <SelectItem value="20+ lakh">₹20+ Lakh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fuelType" className="flex items-center space-x-2">
                        <Fuel className="w-4 h-4" />
                        <span>Fuel Type</span>
                      </Label>
                      <Select value={formData.fuelType} onValueChange={(value) => setFormData({...formData, fuelType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bodyStyle" className="flex items-center space-x-2">
                        <Car className="w-4 h-4" />
                        <span>Body Style</span>
                      </Label>
                      <Select value={formData.bodyStyle} onValueChange={(value) => setFormData({...formData, bodyStyle: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select body style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SUV">SUV</SelectItem>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="MPV">MPV</SelectItem>
                          <SelectItem value="pickup">Pickup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={handleFormSubmit} 
                    disabled={!formData.budget || !formData.fuelType || !formData.bodyStyle || loading}
                    className="w-full"
                  >
                    {loading ? "Getting AI Recommendation..." : "Get AI Recommendation"}
                  </Button>
                </CardContent>
              </Card>
            ) : recommendation && recommendation.cars && (
              <div className="space-y-6">
                {/* Multiple Recommendations */}
                {recommendation.cars.map((car, carIndex) => (
                  <Card key={carIndex}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <Bot className="w-5 h-5 text-primary" />
                          <span>AI Recommendation {carIndex + 1}</span>
                        </CardTitle>
                        {carIndex === 0 && (
                          <Button variant="outline" onClick={resetForm}>
                            New Search
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="border-l-4 border-primary pl-4">
                        <h3 className="text-xl font-bold text-foreground">{car.name}</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <p className="text-lg text-primary font-semibold">{car.price}</p>
                          <p className="text-muted-foreground">Body: {car.bodyStyle}</p>
                          <p className="text-muted-foreground">Transmission: {car.transmission}</p>
                          <p className="text-muted-foreground">Engine: {car.engine}</p>
                          <p className="text-muted-foreground">Fuel: {car.fuelType}</p>
                          <p className="text-muted-foreground">Efficiency: {car.fuelEfficiency}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Key Features</h4>
                          <ul className="space-y-1">
                            {car.features.map((feature, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                                <Star className="w-3 h-3 text-primary" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold">Rating:</span>
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < car.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">({car.rating}/5)</span>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <h5 className="text-sm font-semibold text-green-600">Pros:</h5>
                              <ul className="text-xs text-muted-foreground">
                                {car.pros.slice(0, 2).map((pro, index) => (
                                  <li key={index}>• {pro}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-semibold text-red-600">Cons:</h5>
                              <ul className="text-xs text-muted-foreground">
                                {car.cons.slice(0, 2).map((con, index) => (
                                  <li key={index}>• {con}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Customer Reviews */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-foreground mb-3">Customer Reviews</h4>
                        <div className="space-y-3">
                          {car.reviews.map((review, index) => (
                            <div key={index} className="border-l-2 border-border pl-4">
                              <div className="flex items-center space-x-2 mb-1">
                                <div className="flex space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">– {review.author}</span>
                              </div>
                              <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantSection;