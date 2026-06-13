"use client";

import React, { useMemo, useState } from 'react';
import { Search, MapPin, Clock, Briefcase, Building2, ChevronDown, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { ProductPageLayout } from '@/components/product-page-layout';
import { AnimatedWrapper } from '@/components/animated-wrapper';

type Job = {
  id: number;
  title: string;
  company: string;
  postedTime: string;
  description: string;
  type: string;
  location: string;
  category: string;
  employmentType: string;
};

const jobListings: Job[] = [
  {
    id: 1,
    title: "Ingénieur Maintenance",
    company: "SPA BORDJSTEEL",
    postedTime: "Publié il y a 1 mois",
    description:
      "Missions principales : Profil recherché : Capacité à travailler en équipe et à gérer les urgences. Diplôme de [...]",
    type: "Temps plein",
    location: "Bordj Bou Arréridj - Algérie",
    category: "maintenance",
    employmentType: "temps-plein",
  },
  {
    id: 2,
    title: "Technicien En Informatique",
    company: "SPA BordjSteel",
    postedTime: "Publié il y a 2 mois",
    description: "Missions principales : Profil recherché :",
    type: "Temps plein",
    location: "Bordj Bou Arréridj - Algérie",
    category: "informatique",
    employmentType: "temps-plein",
  },
];

const categoryOptions = [
  { value: "achats", label: "Achats" },
  { value: "approvisionnement", label: "Approvisionnement" },
  { value: "bureau-detudes", label: "Bureau d’études" },
  { value: "commercial", label: "Commercial" },
  { value: "direction-generale", label: "Direction Générale" },
  { value: "finance-comptabilite", label: "Finance et Comptabilité" },
  { value: "informatique", label: "Informatique" },
  { value: "juridique", label: "Juridique" },
  { value: "maintenance", label: "Maintenance" },
  { value: "marketing", label: "Marketing" },
  { value: "procces-developpement", label: "Procces et Développement (P&D)" },
  { value: "production", label: "Production" },
  { value: "qhse", label: "Qhse" },
  { value: "ressources-humaines", label: "Ressources Humaines (RH)" },
];

const employmentTypeOptions = [
  { value: "temps-plein", label: "Temps plein" },
  { value: "temps-partiel", label: "Temps partiel" },
  { value: "cdd", label: "CDD" },
  { value: "cdi", label: "CDI" },
];

const heroImage = {
  src: "https://i.ibb.co/b5M7sxTW/Chat-GPT-Image-16-nov-2025-10-56-58.png",
  alt: "Équipe de professionnels dans un bureau moderne",
  aiHint: "professional team office",
};

const RECRUITMENT_EMAIL = "recrutement@bordjsteel.dz";

export function RecruitmentPage() {
  const [filters, setFilters] = useState({ category: '', employmentType: '' });

  const filteredJobs = useMemo(
    () =>
      jobListings.filter(
        (job) =>
          (!filters.category || job.category === filters.category) &&
          (!filters.employmentType || job.employmentType === filters.employmentType)
      ),
    [filters]
  );

  const hasFilters = filters.category !== '' || filters.employmentType !== '';

  return (
    <ProductPageLayout>
      <div className="min-h-screen bg-gray-50">
        <section className="relative h-[80vh] w-full flex items-center justify-start text-white overflow-hidden p-0">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="z-0 object-cover"
            priority
            data-ai-hint={heroImage.aiHint}
          />
          <div className="relative z-20 container mx-auto px-4 text-left">
            <AnimatedWrapper animation="zoom-in">
              <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter uppercase text-accent">
                Nous recrutons...
              </h1>
            </AnimatedWrapper>
          </div>
        </section>

        {/* Divider */}
        <div className="h-1 bg-gradient-to-r from-accent via-gray-300 to-gray-300"></div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Filter */}
              <div className="relative">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select
                  name="category"
                  id="category"
                  className="form-control w-full border border-gray-300 rounded-md px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">Toutes les catégories</option>
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-11 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Employment Type Filter */}
              <div className="relative">
                <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-2">Type d'emploi</label>
                <select
                  id="employmentType"
                  name="employmentType"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  value={filters.employmentType}
                  onChange={(e) => setFilters({ ...filters, employmentType: e.target.value })}
                >
                  <option value="">Tous les types</option>
                  {employmentTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-11 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Result count + reset */}
              <div className="flex items-center justify-between col-span-1 md:col-span-2 pt-2">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  {filteredJobs.length} offre{filteredJobs.length !== 1 ? 's' : ''} trouvée{filteredJobs.length !== 1 ? 's' : ''}
                </p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={() => setFilters({ category: '', employmentType: '' })}
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Réinitialiser
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Job Listings */}
          {filteredJobs.length === 0 ? (
            <p className="text-center text-lg text-gray-600 py-16">
              Aucune offre ne correspond à ces critères pour le moment.
            </p>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-accent" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                          <p className="text-accent font-semibold mb-3">{job.company}</p>

                          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                            {job.type && (
                              <div className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-1" />
                                <span>{job.type}</span>
                              </div>
                            )}
                            {job.location && (
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{job.location}</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{job.postedTime}</span>
                            </div>
                          </div>

                          <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>
                        </div>
                      </div>

                      {/* Apply Button */}
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={`mailto:${RECRUITMENT_EMAIL}?subject=${encodeURIComponent(`Candidature : ${job.title}`)}`}
                          className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200 whitespace-nowrap"
                        >
                          Postuler maintenant
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Spontaneous Application Section */}
          <div className="mt-12 relative rounded-xl overflow-hidden" style={{ height: '300px' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700">
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-wide">
                CANDIDATURE SPONTANÉE
              </h2>
              <p className="text-white font-bold mb-6">{RECRUITMENT_EMAIL}</p>
              <a
                href={`mailto:${RECRUITMENT_EMAIL}?subject=${encodeURIComponent('Candidature Spontanée')}`}
                className="bg-accent hover:bg-accent/90 text-white font-bold py-4 px-10 rounded-lg transition-colors duration-200 text-lg shadow-lg"
              >
                Envoyez nous votre CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </ProductPageLayout>
  );
}
