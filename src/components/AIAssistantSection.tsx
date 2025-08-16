import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, Star, Zap, Shield } from "lucide-react";

const AIAssistantSection = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi! I'm your AI car assistant. I can help you find the perfect car based on your needs, budget, and preferences. What are you looking for?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages(prev => [...prev, { type: "user", content: inputMessage }]);
    
    // Simulate AI response (this will be replaced with actual ChatGPT integration)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: "bot",
        content: "I'd be happy to help! Please connect to our backend service to enable full AI capabilities including personalized recommendations, price comparisons, and detailed car analysis."
      }]);
    }, 1000);
    
    setInputMessage("");
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
    <section className="py-16 bg-muted/30">
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
                  <Badge className="bg-primary text-primary-foreground">
                    COMING SOON
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Full ChatGPT integration will be available once backend is connected. 
                  This will enable advanced car analysis, market insights, and personalized financing options.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-96 flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>Chat with AI Assistant</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex items-start space-x-2 max-w-[80%]">
                        {message.type === "bot" && (
                          <div className="bg-primary rounded-full p-1">
                            <Bot className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        {message.type === "user" && (
                          <div className="bg-muted rounded-full p-1">
                            <User className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="border-t border-border p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me anything about cars..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-primary hover:bg-primary-dark"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantSection;