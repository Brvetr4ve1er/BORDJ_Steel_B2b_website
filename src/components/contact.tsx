
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export function Contact() {
  const { contact } = companyData.pages;

  return (
    <section id="contact" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{contact.title}</h2>
        </AnimatedWrapper>
        <Card className="shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <AnimatedWrapper animation="fade-in-stagger" staggerIndex={1}>
                <div className="bg-accent text-accent-foreground p-8 lg:p-12 h-full flex flex-col justify-center">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-medium">{contact.content.form.name}</Label>
                      <Input id="name" placeholder={contact.content.form.namePlaceholder} className="bg-accent-foreground/10 border-accent-foreground/20 placeholder:text-accent-foreground/70 focus:bg-accent-foreground/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-medium">{contact.content.form.email}</Label>
                      <Input id="email" type="email" placeholder={contact.content.form.emailPlaceholder} className="bg-accent-foreground/10 border-accent-foreground/20 placeholder:text-accent-foreground/70 focus:bg-accent-foreground/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-medium">{contact.content.form.subject}</Label>
                      <Input id="subject" placeholder={contact.content.form.subjectPlaceholder} className="bg-accent-foreground/10 border-accent-foreground/20 placeholder:text-accent-foreground/70 focus:bg-accent-foreground/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-medium">{contact.content.form.message}</Label>
                      <Textarea id="message" placeholder={contact.content.form.messagePlaceholder} rows={5} className="bg-accent-foreground/10 border-accent-foreground/20 placeholder:text-accent-foreground/70 focus:bg-accent-foreground/20" />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-background text-primary hover:bg-background/90 group">
                      {contact.content.form.button}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </Button>
                  </form>
                </div>
              </AnimatedWrapper>
               <AnimatedWrapper animation="fade-in-stagger" staggerIndex={2}>
                <div className="p-8 lg:p-12 h-full flex flex-col">
                  <div className="space-y-8 flex-grow">
                     <div>
                      <h3 className="font-headline text-2xl font-bold text-primary">{contact.content.info.title}</h3>
                      <p className="mt-2 text-muted-foreground">{contact.content.info.description}</p>
                    </div>
                    <div className="space-y-4">
                      {contact.content.phones.map(phone => (
                          <div key={phone} className="flex items-center gap-4">
                              <Phone className="h-5 w-5 text-accent" />
                              <span>{phone}</span>
                          </div>
                      ))}
                      {contact.content.emails.map(email => (
                           <div key={email} className="flex items-center gap-4">
                              <Mail className="h-5 w-5 text-accent" />
                              <span>{email}</span>
                          </div>
                      ))}
                      <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-accent mt-1" />
                        <span>{contact.content.address}</span>
                      </div>
                    </div>
                  </div>
                   <div className="mt-8 flex-shrink-0">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-4 border-accent">
                       <iframe
                        src="https://maps.google.com/maps?q=N%C2%B01%20lieu-dit%20Mechta%20Fatima%2C%20Bordj%20Bou%20Arr%C3%A9ridj%2C%20Alg%C3%A9rie&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
