import { Button } from "@/components/ui/button";
import CarCard from "./CarCard";
import hyundaiCreta from "@/assets/hyundai-creta.jpg";
import hyundaiVenue from "@/assets/hyundai-venue.jpg";
import marutiBaleno from "@/assets/maruti-baleno.jpg";
import kiaJonet from "@/assets/kia-sonet.jpg";

const CarDealsSection = () => {
  const carDeals = [
    {
      image: hyundaiCreta,
      name: "Hyundai Creta",
      price: "₹11.00 Lakh",
      originalPrice: "₹12.50 Lakh",
      discount: "₹1.5L Off",
      features: ["1.5L Petrol", "Manual", "16.8 kmpl"]
    },
    {
      image: hyundaiVenue,
      name: "Hyundai Venue",
      price: "₹7.94 Lakh", 
      originalPrice: "₹8.50 Lakh",
      discount: "₹56K Off",
      features: ["1.0L Turbo", "Manual", "18.2 kmpl"]
    },
    {
      image: kiaJonet,
      name: "Kia Sonet",
      price: "₹7.99 Lakh",
      originalPrice: "₹8.75 Lakh", 
      discount: "₹76K Off",
      features: ["1.2L Petrol", "Manual", "18.4 kmpl"]
    },
    {
      image: marutiBaleno,
      name: "Maruti Suzuki Baleno (2022-2025)",
      price: "₹6.61 Lakh",
      originalPrice: "₹7.25 Lakh",
      discount: "₹64K Off", 
      features: ["1.2L Petrol", "Manual", "22.35 kmpl"]
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Hot deals on new car
            </h2>
            <p className="text-lg text-primary">
              Best price guaranteed
            </p>
          </div>
          <Button variant="outline" size="lg">
            View more
          </Button>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {carDeals.map((car, index) => (
            <CarCard key={index} {...car} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Looking for something specific?
            </h3>
            <p className="text-muted-foreground mb-6">
              Browse our complete inventory of new cars or get personalized recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary-dark">
                Browse All Cars
              </Button>
              <Button size="lg" variant="outline">
                Get Recommendations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDealsSection;