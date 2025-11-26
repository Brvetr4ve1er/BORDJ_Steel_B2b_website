
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { companyData } from '@/config/company-data';
import { AnimatedWrapper } from '../animated-wrapper';

export function HomePageContactForm() {
    const { contact } = companyData.pages;

    return (
        <section id="contact" className="w-full">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <AnimatedWrapper animation="slide-up" staggerIndex={1}>
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-3xl font-bold text-primary">Contactez-nous</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium text-primary">{contact.content.form.name}</label>
                                                <Input id="name" placeholder={contact.content.form.namePlaceholder} />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium text-primary">{contact.content.form.email}</label>
                                                <Input id="email" type="email" placeholder={contact.content.form.emailPlaceholder} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-medium text-primary">{contact.content.form.subject}</label>
                                            <Input id="subject" placeholder={contact.content.form.subjectPlaceholder} />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium text-primary">{contact.content.form.message}</label>
                                            <Textarea id="message" placeholder={contact.content.form.messagePlaceholder} rows={5} />
                                        </div>
                                        <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                                            {contact.content.form.button} <Send className="ml-2 h-5 w-5" />
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </AnimatedWrapper>
                    </div>
                    <div className="lg:col-span-5">
                        <AnimatedWrapper animation="slide-up">
                            <Card className="bg-secondary/50 border-none shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-3xl font-bold text-primary">{contact.content.info.title}</CardTitle>
                                    <p className="text-muted-foreground">{contact.content.info.description}</p>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-lg">Adresse</h4>
                                            <p className="text-muted-foreground">{contact.content.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-lg">Téléphone</h4>
                                            {contact.content.phones.map(phone => (
                                                <p key={phone} className="text-muted-foreground">{phone}</p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Mail className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-lg">Email</h4>
                                            <p className="text-muted-foreground">{contact.content.emails[0]}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-accent">
                                        <iframe
                                        src="https://maps.google.com/maps?q=N%C2%B01%20lieu-dit%20Mechta%20Fatima%2C%20Bordj%20Bou%20Arr%C3%A9ridj%2C%20Alg%C3%A9rie&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                        width="100%"
                                        height="250"
                                        style={{ border: 0 }}
                                        allowFullScreen={false}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedWrapper>
                    </div>
                </div>
            </div>
        </section>
    );
}
