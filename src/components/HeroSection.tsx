import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-primary min-h-[400px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      
      {/* Green Banner */}
      <div className="absolute top-0 left-0 right-0 bg-primary-dark text-primary-foreground py-3">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="bg-primary-foreground text-primary px-3 py-1 rounded-full text-sm font-semibold">
                INTRODUCING PRICE LOCK
              </span>
            </div>
            <h2 className="text-xl font-bold">
              CAR PRICES GO UP, YOURS WON'T
            </h2>
            <div className="text-sm">
              Book An Express Delivery Car On ACKO Drive And<br />
              Pay Exactly What You Booked.
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground space-y-6">
            <div className="space-y-2">
              <div className="inline-block bg-primary-light text-primary-foreground px-3 py-1 rounded text-sm font-semibold">
                VIDEO
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Mahindra's Global Growth Strategy
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold">
                With the nu_IQ Platform
              </h2>
            </div>
            <Button size="lg" variant="secondary" className="text-primary bg-primary-foreground hover:bg-primary-foreground/90">
              WATCH HERE
            </Button>
          </div>

          {/* Right Content */}
          <div className="space-y-4">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 text-primary-foreground">
              <div className="inline-block bg-primary-light text-primary-foreground px-3 py-1 rounded text-sm font-semibold mb-3">
                NEWS
              </div>
              <h3 className="text-xl font-bold mb-2">
                Mahindra's nu_iQ Platform
              </h3>
              <p className="text-lg mb-4">
                To Help It Go Global
              </p>
              <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                READ HERE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;