"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { companyData } from '@/config/company-data';
import { useToast } from '@/hooks/use-toast';
import { AnimatedWrapper } from '../animated-wrapper';

type ContactFormValues = {
    name: string;
    email: string;
    subject: string;
    message: string;
    /** Honeypot — always empty for a real visitor. */
    company?: string;
};

export function HomePageContactForm() {
    const { contact } = companyData.pages;
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>();

    // Shown when the server could not take the message, so the visitor is never
    // left with a dead button. The direct address is the fallback — stated, not
    // silently attempted.
    const [failed, setFailed] = React.useState<string | null>(null);
    // Mount time, used server-side to reject submissions filled impossibly fast.
    const startedAt = React.useRef<number>(0);
    /**
     * False until this component has hydrated, and the submit button stays
     * disabled until it flips.
     *
     * Not defensive padding — this was observed. Click submit before React has
     * hydrated this subtree and the browser performs a NATIVE GET: the page
     * reloads with the message sitting in the query string and the enquiry is
     * gone. React 18 replays the click once it hydrates, but the native
     * submission has already escaped. The homepage is heavy, so a visitor who
     * fills quickly can genuinely hit that window.
     *
     * The direct address below the form is what makes this safe rather than
     * merely blocked: with JavaScript off the button never enables, and the
     * address is the path that still works.
     */
    const [ready, setReady] = React.useState(false);
    React.useEffect(() => {
        startedAt.current = Date.now();
        setReady(true);
    }, []);

    const directEmail = contact.content.emails[0];

    /**
     * Posts to /api/contact, which delivers the message and sets reply-to so a
     * reply from the inbox reaches the sender.
     *
     * This used to set `window.location.href` to a `mailto:` and declare
     * success. For anyone on webmail that did nothing whatsoever, and the
     * "Merci pour votre message !" toast fired regardless — the site claimed to
     * have received something nobody would ever see. Success is now only
     * reported when the server says so.
     */
    const onSubmit = async (data: ContactFormValues) => {
        setFailed(null);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, startedAt: startedAt.current }),
            });

            if (!res.ok) {
                const payload = (await res.json().catch(() => null)) as { error?: string } | null;
                setFailed(payload?.error ?? "L'envoi a échoué. Merci de réessayer.");
                return;
            }

            toast({
                title: 'Merci pour votre message !',
                description: 'Notre équipe vous répond sous 24 heures.',
            });
            reset();
            startedAt.current = Date.now();
        } catch {
            setFailed("L'envoi a échoué. Vérifiez votre connexion et réessayez.");
        }
    };

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
                                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium text-primary">{contact.content.form.name}</label>
                                                <Input
                                                    id="name"
                                                    placeholder={contact.content.form.namePlaceholder}
                                                    aria-invalid={!!errors.name}
                                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                                    {...register('name', { required: 'Veuillez indiquer votre nom.' })}
                                                />
                                                {errors.name && <p id="name-error" role="alert" className="text-sm text-destructive">{errors.name.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium text-primary">{contact.content.form.email}</label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder={contact.content.form.emailPlaceholder}
                                                    aria-invalid={!!errors.email}
                                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                                    {...register('email', {
                                                        required: 'Veuillez indiquer votre e-mail.',
                                                        pattern: {
                                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                            message: 'Adresse e-mail invalide.',
                                                        },
                                                    })}
                                                />
                                                {errors.email && <p id="email-error" role="alert" className="text-sm text-destructive">{errors.email.message}</p>}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-medium text-primary">{contact.content.form.subject}</label>
                                            <Input
                                                id="subject"
                                                placeholder={contact.content.form.subjectPlaceholder}
                                                {...register('subject')}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium text-primary">{contact.content.form.message}</label>
                                            <Textarea
                                                id="message"
                                                placeholder={contact.content.form.messagePlaceholder}
                                                rows={5}
                                                aria-invalid={!!errors.message}
                                                aria-describedby={errors.message ? 'message-error' : undefined}
                                                {...register('message', { required: 'Veuillez saisir votre message.' })}
                                            />
                                            {errors.message && <p id="message-error" role="alert" className="text-sm text-destructive">{errors.message.message}</p>}
                                        </div>
                                        {/* Honeypot. Hidden from people and from
                                            assistive tech, left for bots to fill. */}
                                        <div className="hidden" aria-hidden="true">
                                            <label htmlFor="company">Société (ne pas remplir)</label>
                                            <input
                                                id="company"
                                                type="text"
                                                tabIndex={-1}
                                                autoComplete="off"
                                                {...register('company')}
                                            />
                                        </div>

                                        {failed && (
                                            <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
                                                <p className="font-medium text-destructive">{failed}</p>
                                                <p className="mt-1 text-muted-foreground">
                                                    Vous pouvez aussi nous écrire directement à{' '}
                                                    <a
                                                        href={`mailto:${directEmail}`}
                                                        className="font-semibold text-accent underline-offset-4 hover:underline"
                                                    >
                                                        {directEmail}
                                                    </a>
                                                    .
                                                </p>
                                            </div>
                                        )}

                                        <Button type="submit" size="lg" disabled={!ready || isSubmitting} className="w-full bg-accent hover:bg-accent/90">
                                            {isSubmitting ? 'Envoi en cours…' : contact.content.form.button}
                                            <Send className="ml-2 h-5 w-5" />
                                        </Button>

                                        {/* Always present, not only on failure: it is the path that
                                            works with JavaScript disabled, when the button above
                                            never enables. */}
                                        <p className="text-center text-sm text-muted-foreground">
                                            Ou écrivez-nous directement à{' '}
                                            <a
                                                href={`mailto:${directEmail}`}
                                                className="font-medium text-accent underline-offset-4 hover:underline"
                                            >
                                                {directEmail}
                                            </a>
                                        </p>
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
                                        title="Localisation de Bordj Steel"
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
