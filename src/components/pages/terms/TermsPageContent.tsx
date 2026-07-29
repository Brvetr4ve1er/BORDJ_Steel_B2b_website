import { companyData } from '@/config/company-data';

const LAST_UPDATED = '2 juin 2026';

export function TermsPageContent() {
  const { contact } = companyData.pages;
  const email = contact.content.emails[0];

  return (
    <>
      <section className="bg-primary pb-20 pt-32 text-primary-foreground md:pt-36">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Conditions d'Utilisation
          </h1>
          <p className="mt-4 text-primary-foreground/70">Dernière mise à jour : {LAST_UPDATED}</p>
        </div>
      </section>

      <article className="container mx-auto max-w-3xl px-4 py-16 space-y-8 text-foreground/90 [&_h2]:font-headline [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-8 [&_p]:mt-3">
        <p>
          L'accès et l'utilisation du site de Bordj Steel impliquent l'acceptation pleine et entière
          des présentes conditions.
        </p>

        <div>
          <h2>Objet du site</h2>
          <p>
            Ce site a une vocation informative : il présente l'entreprise Bordj Steel, ses produits
            et ses réalisations en construction métallique. Il ne constitue pas une plateforme de
            vente en ligne.
          </p>
        </div>

        <div>
          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, images, logos, mise en page) est la
            propriété de Bordj Steel ou de ses partenaires, sauf mention contraire. Toute
            reproduction ou réutilisation sans autorisation préalable est interdite. Les logos des
            sociétés clientes restent la propriété de leurs détenteurs respectifs.
          </p>
        </div>

        <div>
          <h2>Limitation de responsabilité</h2>
          <p>
            Les informations diffusées sur ce site sont fournies à titre indicatif et peuvent être
            modifiées sans préavis. Bordj Steel s'efforce d'en assurer l'exactitude mais ne saurait
            être tenue responsable d'éventuelles erreurs ou omissions, ni de l'indisponibilité
            temporaire du site.
          </p>
        </div>

        <div>
          <h2>Liens externes</h2>
          <p>
            Ce site peut contenir des liens vers des sites tiers. Bordj Steel n'exerce aucun contrôle
            sur ces sites et décline toute responsabilité quant à leur contenu.
          </p>
        </div>

        <div>
          <h2>Droit applicable</h2>
          <p>
            Les présentes conditions sont régies par le droit algérien. Pour toute question, vous
            pouvez nous contacter à{' '}
            <a className="text-accent underline" href={`mailto:${email}`}>
              {email}
            </a>
            .
          </p>
        </div>

      </article>
    </>
  );
}
