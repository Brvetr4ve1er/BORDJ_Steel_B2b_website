
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from './ui/card';

export function SandwichPanelsPage() {
  const { units } = companyData.pages;
  const product = units.items.find(item => item.title === 'Panneaux Sandwichs');

  if (!product) {
    return (
        <section className="bg-background py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold">Produit non trouvé</h2>
            </div>
        </section>
    );
  }

  return (
    <section id="product-details" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedWrapper animation="zoom-in">
                <Card className="overflow-hidden shadow-2xl group sticky top-32">
                    <div className="relative aspect-video">
                        <Image
                            src={product.image.src}
                            alt={product.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint={product.image.aiHint}
                        />
                    </div>
                </Card>
            </AnimatedWrapper>
            <AnimatedWrapper animation="slide-up">
                <div className="space-y-6">
                    <h1 className="font-headline text-5xl font-bold text-primary">{product.title} PEB</h1>
                    <p className="text-xl text-muted-foreground">{product.description}</p>
                    
                    <div className="space-y-4">
                        <h3 className="font-headline text-2xl font-bold text-primary border-b pb-2">Description Détaillée</h3>
                        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Nos panneaux sandwichs pour bâtiments préfabriqués (PEB) sont conçus pour offrir une performance d'isolation supérieure, une installation rapide et une durabilité exceptionnelle. Ils constituent une solution idéale pour les toitures et les bardages de bâtiments industriels, commerciaux et agricoles.
                                </p>
                                <p>
                                    **Composition :** Chaque panneau est composé de deux parements en acier galvanisé et pré-laqué, adhérant à une âme isolante en mousse de polyuréthane (PUR) ou polyisocyanurate (PIR) de haute densité. Cette structure composite garantit une excellente rigidité et une résistance mécanique élevée.
                                </p>
                                <p>
                                    **Avantages :**
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>**Isolation Thermique :** L'âme isolante de haute qualité minimise les ponts thermiques, assurant un contrôle efficace de la température intérieure et des économies d'énergie significatives.</li>
                                    <li>**Isolation Acoustique :** La structure des panneaux contribue à réduire la transmission du bruit, créant un environnement de travail plus calme et confortable.</li>
                                    <li>**Légèreté et Rapidité de Pose :** Leur faible poids facilite la manipulation et accélère le processus de construction, réduisant ainsi les coûts de main-d'œuvre.</li>
                                    <li>**Étanchéité :** Le système d'emboîtement précis assure une parfaite étanchéité à l'air et à l'eau, protégeant le bâtiment contre les intempéries.</li>
                                    <li>**Esthétique :** Disponibles dans une large gamme de couleurs et de finitions, nos panneaux permettent de créer des façades modernes et personnalisées.</li>
                                </ul>
                                <p>
                                    **Spécifications Techniques (Exemples) :**
                                </p>
                                 <ul className="list-disc pl-6 space-y-2">
                                    <li>**Épaisseurs disponibles :** 30mm, 40mm, 50mm, 60mm, 80mm, 100mm, 120mm, 150mm, 200mm.</li>
                                    <li>**Largeur utile :** 1000 mm.</li>
                                    <li>**Longueur :** Sur mesure, jusqu'à 13 mètres.</li>
                                    <li>**Densité de la mousse :** 40-42 kg/m³.</li>
                                    <li>**Classement au feu :** B-s2,d0 (PIR).</li>
                                </ul>
                                <p>
                                    Contactez notre équipe technique pour obtenir un devis personnalisé et des conseils sur la solution la mieux adaptée à votre projet. Nous vous accompagnerons de la conception à la réalisation.
                                </p>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}
