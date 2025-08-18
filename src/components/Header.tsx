import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SearchResults from "./SearchResults";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        try {
          const { data, error } = await supabase.functions.invoke('car-search', {
            body: { query: searchQuery }
          });
          
          if (error) throw error;
          
          setSearchResults(data?.cars || []);
          setShowResults(true);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim().length >= 2) {
      setShowResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowResults(false), 200);
  };
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
            <a 
              href="#ai-assistant" 
              className="text-foreground hover:text-primary transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
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
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
                {showResults && (
                  <SearchResults 
                    cars={searchResults} 
                    isLoading={isSearching} 
                    query={searchQuery}
                  />
                )}
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