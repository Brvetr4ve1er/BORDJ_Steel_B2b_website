import { MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AnimatedWrapper } from './animated-wrapper';
import { useLanguage } from '@/context/language-context';
import { companyData } from '@/config/company-data';

export function Contact() {
  const { language } = useLanguage();
  const { contact, contactCta } = companyData[language];

  return (
    <section id="contact" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{contactCta.title}</h2>
        </AnimatedWrapper>
        <Card className="shadow-2xl">
          <CardContent className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <AnimatedWrapper animation="fade-in-stagger" staggerIndex={1}>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-primary">{contactCta.info.title}</h3>
                    <p className="mt-2 text-muted-foreground">{contactCta.info.description}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5 text-accent" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-accent" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-accent mt-1" />
                      <span>{contact.address}</span>
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>
              <AnimatedWrapper animation="fade-in-stagger" staggerIndex={2}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-medium">{contactCta.form.name}</label>
                      <Input id="name" placeholder={contactCta.form.namePlaceholder} />
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="email" className="font-medium">{contactCta.form.email}</label>
                      <Input id="email" type="email" placeholder={contactCta.form.emailPlaceholder} />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label htmlFor="message" className="font-medium">{contactCta.form.message}</label>
                    <Textarea id="message" placeholder={contactCta.form.messagePlaceholder} rows={5} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                    {contactCta.form.button}
                  </Button>
                </form>
              </AnimatedWrapper>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
