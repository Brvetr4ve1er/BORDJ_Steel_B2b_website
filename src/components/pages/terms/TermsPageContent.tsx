import { companyData } from '@/config/company-data';
import {
  LegalDocument,
  type LegalSection,
} from '@/components/pages/privacy/PrivacyPageContent';

const LAST_UPDATED = '2 juin 2026';

/**
 * Conditions d'Utilisation.
 *
 * Same shell as the Politique de Confidentialité (see `LegalDocument`), so the
 * two legal pages read as a pair. The conditions themselves are untouched:
 * every sentence is the client's, moved out of one long <article> and into the
 * `sections` list so the table of contents and the body are generated from the
 * same array.
 *
 * Server component: no hooks, no handlers.
 */
export function TermsPageContent() {
  const { contact } = companyData.pages;
  const email = contact.content.emails[0];

  const sections: readonly LegalSection[] = [
    {
      id: 'objet-du-site',
      heading: 'Objet du site',
      body: (
        <p>
          Ce site a une vocation informative : il présente l'entreprise Bordj Steel, ses produits
          et ses réalisations en construction métallique. Il ne constitue pas une plateforme de
          vente en ligne.
        </p>
      ),
    },
    {
      id: 'propriete-intellectuelle',
      heading: 'Propriété intellectuelle',
      body: (
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, logos, mise en page) est la
          propriété de Bordj Steel ou de ses partenaires, sauf mention contraire. Toute
          reproduction ou réutilisation sans autorisation préalable est interdite. Les logos des
          sociétés clientes restent la propriété de leurs détenteurs respectifs.
        </p>
      ),
    },
    {
      id: 'limitation-de-responsabilite',
      heading: 'Limitation de responsabilité',
      body: (
        <p>
          Les informations diffusées sur ce site sont fournies à titre indicatif et peuvent être
          modifiées sans préavis. Bordj Steel s'efforce d'en assurer l'exactitude mais ne saurait
          être tenue responsable d'éventuelles erreurs ou omissions, ni de l'indisponibilité
          temporaire du site.
        </p>
      ),
    },
    {
      id: 'liens-externes',
      heading: 'Liens externes',
      body: (
        <p>
          Ce site peut contenir des liens vers des sites tiers. Bordj Steel n'exerce aucun contrôle
          sur ces sites et décline toute responsabilité quant à leur contenu.
        </p>
      ),
    },
    {
      id: 'droit-applicable',
      heading: 'Droit applicable',
      body: (
        <p>
          Les présentes conditions sont régies par le droit algérien. Pour toute question, vous
          pouvez nous contacter à{' '}
          <a className="text-accent underline underline-offset-4" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      ),
    },
  ];

  return (
    <LegalDocument
      title="Conditions d'Utilisation"
      lastUpdated={LAST_UPDATED}
      lead="L'accès et l'utilisation du site de Bordj Steel impliquent l'acceptation pleine et entière des présentes conditions."
      sections={sections}
    />
  );
}
