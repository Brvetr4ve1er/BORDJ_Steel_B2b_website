import { companyData } from '@/config/company-data';

const LAST_UPDATED = '2 juin 2026';

export function PrivacyPageContent() {
  const { contact } = companyData.pages;
  const email = contact.content.emails[0];

  return (
    <>
      <section className="bg-primary pb-20 pt-32 text-primary-foreground md:pt-36">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Politique de Confidentialité
          </h1>
          <p className="mt-4 text-primary-foreground/70">Dernière mise à jour : {LAST_UPDATED}</p>
        </div>
      </section>

      <article className="container mx-auto max-w-3xl px-4 py-16 space-y-8 text-foreground/90 [&_h2]:font-headline [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-8 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1">
        <p>
          Chez Bordj Steel, nous accordons de l'importance à la protection de votre vie privée. Cette
          politique décrit les données que ce site collecte et la manière dont elles sont utilisées.
        </p>

        <div>
          <h2>Données que nous collectons</h2>
          <p>
            Ce site est un site vitrine. Nous ne créons pas de comptes utilisateurs et n'effectuons
            aucune vente en ligne. Les seules données personnelles collectées sont celles que vous
            nous transmettez volontairement via le formulaire de contact ou par e-mail :
          </p>
          <ul>
            <li>votre nom ;</li>
            <li>votre adresse e-mail ;</li>
            <li>le contenu de votre message.</li>
          </ul>
        </div>

        <div>
          <h2>Utilisation des données</h2>
          <p>
            Ces informations sont utilisées uniquement pour répondre à votre demande et assurer le
            suivi commercial correspondant. Elles ne sont ni vendues, ni louées, ni transmises à des
            tiers à des fins commerciales.
          </p>
        </div>

        <div>
          <h2>Services tiers</h2>
          <p>
            Certaines pages intègrent une carte Google Maps afin d'afficher notre localisation. Le
            chargement de cette carte peut entraîner le dépôt de cookies par Google, conformément à
            la politique de confidentialité de ce service.
          </p>
        </div>

        <div>
          <h2>Conservation et sécurité</h2>
          <p>
            Les messages reçus sont conservés le temps nécessaire au traitement de votre demande.
            Nous mettons en œuvre des mesures raisonnables pour protéger ces données contre tout
            accès non autorisé.
          </p>
        </div>

        <div>
          <h2>Vos droits</h2>
          <p>
            Vous pouvez demander l'accès, la rectification ou la suppression des données vous
            concernant en nous écrivant à{' '}
            <a className="text-accent underline" href={`mailto:${email}`}>
              {email}
            </a>
            .
          </p>
        </div>

        <p className="border-t border-border pt-6 text-sm text-muted-foreground">
          Ce document est fourni à titre informatif. Bordj Steel se réserve le droit de le mettre à
          jour à tout moment.
        </p>
      </article>
    </>
  );
}
