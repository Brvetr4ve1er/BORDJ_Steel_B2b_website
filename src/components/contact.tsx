
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
              </AnimatedWrapper>
              <AnimatedWrapper animation="fade-in-stagger" staggerIndex={2}>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-medium">{contact.content.form.name}</label>
                    <Input id="name" placeholder={contact.content.form.namePlaceholder} />
                  </div>
                  <div className="space-y-2">
                      <label htmlFor="email" className="font-medium">{contact.content.form.email}</label>
                    <Input id="email" type="email" placeholder={contact.content.form.emailPlaceholder} />
                  </div>
                   <div className="space-y-2">
                      <label htmlFor="subject" className="font-medium">{contact.content.form.subject}</label>
                    <Input id="subject" placeholder={contact.content.form.subjectPlaceholder} />
                  </div>
                  <div className="space-y-2">
                     <label htmlFor="message" className="font-medium">{contact.content.form.message}</label>
                    <Textarea id="message" placeholder={contact.content.form.messagePlaceholder} rows={5} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                    {contact.content.form.button}
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
