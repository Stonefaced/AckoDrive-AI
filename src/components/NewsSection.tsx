import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const NewsSection = () => {
  const newsArticles = [
    {
      category: "NEWS",
      title: "Ola S1 Pro+, Roadster X+",
      subtitle: "Launched In India",
      description: "Ola Electric launches new electric scooters with advanced 4680 battery technology and improved range.",
      readTime: "3 min read",
      isVideo: false
    },
    {
      category: "REVIEW", 
      title: "2025 Mahindra Thar",
      subtitle: "Complete Road Test",
      description: "Our comprehensive review of the updated Mahindra Thar with new features and improved performance.",
      readTime: "8 min read",
      isVideo: true
    },
    {
      category: "NEWS",
      title: "Tata Nexon EV Max",
      subtitle: "Price Drop Announced",
      description: "Tata Motors reduces prices of Nexon EV Max variants by up to ₹1.2 lakh to boost electric vehicle adoption.",
      readTime: "2 min read", 
      isVideo: false
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Latest Automotive News
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest from the automotive world
            </p>
          </div>
          <Button variant="outline" size="lg" className="flex items-center space-x-2">
            <span>View All News</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border">
              <CardContent className="p-0">
                {/* News Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <div className="text-4xl text-primary/30 font-bold">
                    {article.title.split(' ')[0]}
                  </div>
                  {article.isVideo && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-primary rounded-full p-3">
                        <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Category Badge */}
                  <Badge 
                    variant="outline" 
                    className={`${article.category === 'NEWS' ? 'border-primary text-primary' : 'border-orange-500 text-orange-500'}`}
                  >
                    {article.category}
                  </Badge>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <h4 className="text-lg font-semibold text-muted-foreground mt-1">
                      {article.subtitle}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {article.description}
                  </p>

                  {/* Meta */}
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {article.readTime}
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark">
                      {article.isVideo ? 'Watch Now' : 'Read More'}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with Latest Car News
              </h3>
              <p className="text-primary-foreground/90 mb-6">
                Get the latest automotive news, reviews, and deals delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg text-foreground"
                />
                <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;