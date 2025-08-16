import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CarCardProps {
  image: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  features: string[];
  isElectric?: boolean;
}

const CarCard = ({ image, name, price, originalPrice, discount, features, isElectric }: CarCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border">
      <CardContent className="p-0">
        {/* Badge */}
        {discount && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-primary text-primary-foreground">
              {discount}
            </Badge>
          </div>
        )}
        
        {/* Car Image */}
        <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-b from-background to-muted">
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Car Details */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            {isElectric && (
              <Badge variant="outline" className="mt-2">
                Electric
              </Badge>
            )}
          </div>
          
          {/* Features */}
          <div className="text-sm text-muted-foreground">
            {features.join(" • ")}
          </div>
          
          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-foreground">
                {price}
              </span>
              {originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {originalPrice}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Ex-showroom price
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button variant="outline" className="flex-1">
          View Details
        </Button>
        <Button className="flex-1 bg-primary hover:bg-primary-dark">
          Get Best Price
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;