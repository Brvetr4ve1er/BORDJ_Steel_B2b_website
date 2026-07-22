

import { AnimatedWrapper } from '@/components/animated-wrapper';
import Image from 'next/image';
import { Users, TrendingUp, Factory, ClipboardCheck, HardHat, UserCheck, DollarSign, Network, Wrench } from 'lucide-react';

const teams = [
  {
    id: 'engineering',
    icon: <TrendingUp className="w-8 h-8 text-accent" />,
    title: "Bureau d'études",
    description: "Véritable moteur de l’innovation, notre bureau d’études conçoit et optimise les structures métalliques selon les besoins spécifiques de chaque client. Il veille à la faisabilité technique, à la solidité et à la performance de nos réalisations.",
    detail: "Il veille à la faisabilité technique, à la solidité et à la performance de nos réalisations.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/dd/d2/b8/ddd2b884a8cdf6c38c4fe8c6ea24c7e0.jpg"
  },
  {
    id: 'production',
    icon: <Factory className="w-8 h-8 text-accent" />,
    title: "Équipe Production",
    description: "Au cœur de notre activité, l’équipe de production assure la fabrication, l’assemblage et le contrôle des différents composants. Grâce à une maîtrise technique avancée et à des équipements modernes, elle garantit la fiabilité et la durabilité de nos produits.",
    detail: "Grâce à une maîtrise technique avancée et à des équipements modernes, elle garantit la fiabilité et la durabilité de nos produits.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/c1/22/d0/c122d0a87b9a67655d2af2921bc6b69a.jpg"
  },
  {
    id: 'quality',
    icon: <ClipboardCheck className="w-8 h-8 text-accent" />,
    title: "Équipe Contrôle Qualité",
    description: "Cette équipe veille à la conformité de nos produits aux normes nationales et internationales. Des contrôles rigoureux sont effectués à chaque étape – de la conception à la livraison – afin d’assurer une qualité irréprochable.",
    detail: "Des contrôles rigoureux sont effectués à chaque étape pour assurer une qualité irréprochable.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/36/1f/d5/361fd5991471a9382f7e7cada21ff2da.jpg"
  },
  {
    id: 'hse',
    icon: <HardHat className="w-8 h-8 text-accent" />,
    title: "Équipe QHSE",
    description: "(Qualité, Hygiène, Sécurité et Environnement) Notre équipe QHSE veille à la qualité de nos processus, à la sécurité de nos collaborateurs, à la prévention des risques professionnels et à la protection de l’environnement. La sécurité, la qualité et la durabilité font partie intégrante de la culture BordjSteel.",
    detail: "La sécurité et la durabilité font partie intégrante de la culture BordjSteel.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/99/14/b3/9914b30d1923fb9585db5fa692769658.jpg"
  },
  {
    id: 'commercial',
    icon: <UserCheck className="w-8 h-8 text-accent" />,
    title: "Équipe Commerciale et Marketing",
    description: "Toujours à l’écoute du marché, notre équipe commerciale et marketing accompagne nos clients à chaque étape de leurs projets. Elle met un point d’honneur à offrir des solutions personnalisées, un suivi attentif et un service de qualité.",
    detail: "Elle met un point d'honneur à offrir des solutions personnalisées, un suivi attentif et un service de qualité.",
    color: "bg-primary",
    image: "https://i.pinimg.com/474x/2c/79/22/2c792262ee0e5c2f3a1290cd06825f9a.jpg"
  },
  {
    id: 'finance',
    icon: <DollarSign className="w-8 h-8 text-accent" />,
    title: "Équipe Comptabilité et Finances",
    description: "(Chargée de la gestion rigoureuse des ressources financières, cette équipe assure le suivi comptable, le contrôle budgétaire et la transparence de toutes les opérations économiques de l’entreprise. Son objectif : garantir une santé financière solide et durable.)",
    detail: "Son objectif : garantir une santé financière solide et durable.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/47/96/a1/4796a1c0ca2eeec68b8721a16d75c1a2.jpg"
  },
  {
    id: 'hr',
    icon: <Users className="w-8 h-8 text-accent" />,
    title: "Équipe Ressources Humaines",
    description: "(Au centre de la vie de l’entreprise, l’équipe RH veille au bien-être, à la formation et à l’évolution de nos collaborateurs. Elle favorise un environnement de travail motivant et valorisant, essentiel à la performance collective.)",
    detail: "Elle favorise un environnement de travail motivant et valorisant, essentiel à la performance collective.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/f1/51/10/f151108391838728e14d8cfa85af221b.jpg"
  },
  {
    id: 'it',
    icon: <Network className="w-8 h-8 text-accent" />,
    title: "Équipe Système d’Information",
    description: "Responsable de la gestion et du développement des outils numériques, cette équipe garantit la sécurité, la performance et la continuité des systèmes informatiques. Elle joue un rôle clé dans la transformation digitale de BordjSteel.",
    detail: "Elle joue un rôle clé dans la transformation digitale de BordjSteel.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/6a/c8/6a/6ac86a94f2a9c05bf62c26abddb13d67.jpg"
  },
  {
    id: 'assembly',
    icon: <Wrench className="w-8 h-8 text-accent" />,
    title: "Équipe Réalisation et Montage",
    description: "Spécialisée dans l’installation sur site, cette équipe assure le montage précis et sécurisé de nos structures métalliques. Son savoir-faire garantit la conformité, la stabilité et la qualité de chaque projet livré.",
    detail: "Son savoir-faire garantit la conformité, la stabilité et la qualité de chaque projet livré.",
    color: "bg-primary",
    image: "https://i.pinimg.com/736x/a3/0d/65/a30d652c6e58b3aebe5ca3561af436a6.jpg"
  }
];

const TeamFeature = ({
  title,
  description,
  icon,
  image
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}) => {
  return (
    <div className="group bg-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex overflow-hidden border border-border">
      <div className="w-[35%] flex-shrink-0 relative aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 35vw, 18vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="w-[65%] p-6 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-secondary p-3 rounded-full">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-primary">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};


export function TeamsSection() {
  return (
    <section>
      <AnimatedWrapper animation="fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl md:text-7xl font-bold text-primary mb-12 text-center">Nos équipes spécialisées</h2>
        </div>
      </AnimatedWrapper>
       <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {teams.map((team, index) => (
            <AnimatedWrapper key={team.id} animation="fade-in-stagger" staggerIndex={index}>
              <TeamFeature {...team} />
            </AnimatedWrapper>
        ))}
      </div>
    </section>
  );
}

    