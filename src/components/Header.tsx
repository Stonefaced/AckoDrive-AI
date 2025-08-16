import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl text-foreground">ACKO DRIVE</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              HOME
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              BUY NEW CAR
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              BLOG
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              AI ASSISTANT
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* City selector */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Delhi</span>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search all cars" 
                  className="pl-10 w-64"
                />
              </div>
            </div>

            {/* Login */}
            <Button variant="ghost" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Login / Signup</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;