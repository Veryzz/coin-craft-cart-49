import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How fast is delivery?",
      answer: "All products are delivered automatically within 2-5 minutes after payment confirmation. Digital goods are sent directly to your email address."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Bitcoin (BTC), Ethereum (ETH), USDT, and PayPal. For PayPal, payments must be sent as 'Friends & Family' to jibiop45@gmail.com."
    },
    {
      question: "Are the products guaranteed to work?",
      answer: "Yes! All products come with a replacement guarantee. If any item doesn't work as described, we provide instant replacements or full refunds."
    },
    {
      question: "Is this service anonymous?",
      answer: "Absolutely. We don't store personal information, logs, or payment details. Crypto payments ensure complete anonymity for your purchases."
    },
    {
      question: "What if I need support?",
      answer: "Our Telegram support (@CCREAP) is available 24/7 for instant assistance. We typically respond within minutes to resolve any issues."
    },
    {
      question: "Do you provide replacements?",
      answer: "Yes, we offer instant replacements for any non-working products. Simply contact our support with your order details for immediate assistance."
    }
  ];

  return (
    <section className="py-16 bg-gradient-card">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            <p className="text-muted-foreground">
              Everything you need to know about our products and services
            </p>
          </div>

          <Card className="bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Still have questions? Our support team is here to help!
            </p>
            <button
              onClick={() => window.open('https://t.me/balancedcards', '_blank')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary rounded-lg font-semibold hover:shadow-glow transition-all duration-300"
            >
              💬 Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;