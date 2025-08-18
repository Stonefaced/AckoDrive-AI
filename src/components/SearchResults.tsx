import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Fuel, Star } from "lucide-react";

interface CarResult {
  name: string;
  bodyStyle: string;
  fuelType: string;
  transmission: string;
  engine: string;
  price: string;
  fuelEfficiency: string;
  features: string[];
  rating: number;
}

interface SearchResultsProps {
  cars: CarResult[];
  isLoading: boolean;
  query: string;
}

const SearchResults = ({ cars, isLoading, query }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-lg z-50 p-4">
        <div className="text-center text-muted-foreground">Searching cars...</div>
      </div>
    );
  }

  if (!query || query.trim().length < 2) {
    return null;
  }

  if (cars.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-lg z-50 p-4">
        <div className="text-center text-muted-foreground">
          No cars found for "{query}"
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2 border-b border-border">
        <span className="text-sm text-muted-foreground">
          {cars.length} car{cars.length !== 1 ? 's' : ''} found for "{query}"
        </span>
      </div>
      <div className="p-2 space-y-2">
        {cars.map((car, index) => (
          <Card key={index} className="hover:bg-muted/50 cursor-pointer transition-colors">
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{car.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      <Car className="w-3 h-3 mr-1" />
                      {car.bodyStyle}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Fuel className="w-3 h-3 mr-1" />
                      {car.fuelType}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Star className="w-3 h-3 mr-1 text-yellow-400" />
                      {car.rating}/5
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                    <span>Engine: {car.engine}</span>
                    <span>Efficiency: {car.fuelEfficiency}</span>
                    <span>Transmission: {car.transmission}</span>
                    <span className="font-semibold text-primary">{car.price}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;