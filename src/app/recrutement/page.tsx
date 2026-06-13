import type { Metadata } from 'next';
import { RecruitmentPage } from '@/components/pages/recruitment-page';

export const metadata: Metadata = {
  title: 'Recrutement',
  description:
    "Rejoignez les équipes de Bordj Steel. Consultez nos offres d'emploi en construction métallique ou envoyez-nous une candidature spontanée.",
};

export default function Page() {
  return <RecruitmentPage />;
}
