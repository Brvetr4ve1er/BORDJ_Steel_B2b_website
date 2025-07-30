
import { MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';

export function Contact() {
  const { contact } = companyData.pages;

  return (
    <section id="contact" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{contact.title}</h2>
        </AnimatedWrapper>
        <Card className="shadow-2xl">
          <CardContent className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <AnimatedWrapper animation="fade-in-stagger" staggerIndex={1}>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-primary">Informations de Contact</h3>
                    <p className="mt-2 text-muted-foreground">Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.</p>
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
                   <div className="mt-8">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                       <iframe
                        src="https://maps.google.com/maps?q=N%C2%B01%20lieu-dit%20Mechta%20Fatima%2C%20Bordj%20Bou%20Arr%C3%A9ridj%2C%20Alg%C3%A9rie&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>
              <AnimatedWrapper animation="fade-in-stagger" staggerIndex={2}>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-medium">Nom</label>
                    <Input id="name" placeholder="Votre Nom" />
                  </div>
                  <div className="space-y-2">
                      <label htmlFor="email" className="font-medium">E-mail</label>
                    <Input id="email" type="email" placeholder="Votre E-mail" />
                  </div>
                   <div className="space-y-2">
                      <label htmlFor="subject" className="font-medium">Sujet</label>
                    <Input id="subject" placeholder="Sujet de votre message" />
                  </div>
                  <div className="space-y-2">
                     <label htmlFor="message" className="font-medium">Message</label>
                    <Textarea id="message" placeholder="Votre Message" rows={5} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                    Envoyer le Message
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
