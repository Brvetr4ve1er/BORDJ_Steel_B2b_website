
"use client";

import { ProductPageLayout } from '@/components/product-page-layout';
import React, { useState } from 'react';
import { Search, MapPin, Clock, Briefcase, Building2, ChevronDown } from 'lucide-react';
import { companyData } from '@/config/company-data';
import { Logo } from '@/components/logo';
import { Cairo } from 'next/font/google';
import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';

const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
  weight: ['700'],
});


const RecruitmentPage = () => {
  const [filters, setFilters] = useState({
    category: '',
    employmentType: '',
  });

  const jobListings = [
    {
      id: 1,
      title: "Ingénieur Maintenance",
      company: "SPA BORDJSTEEL",
      postedTime: "Publié il y a 1 mois",
      description: "Missions principales : Profil recherché : Capacité à travailler en équipe et à gérer les urgences. Diplôme de [...]",
      type: "",
      location: ""
    },
    {
      id: 2,
      title: "Technicien En Informatique",
      company: "Spa BordjSteel",
      postedTime: "Publié il y a 2 mois",
      description: "Missions principales : Profil recherché :",
      type: "Temps plein",
      location: "BORDJ BOU ARRERIDJ - ALGERIE"
    }
  ];
  
  const heroImage = {
      src: "https://i.pinimg.com/736x/8c/d3/e8/8cd3e8544c17356b4049442f2957e521.jpg",
      alt: "Team of professionals in a modern office",
      aiHint: "professional team office"
  }


  return (
    <ProductPageLayout>
      <div className="min-h-screen bg-gray-50">
        <section className="relative h-[80vh] w-full flex items-center justify-center text-white overflow-hidden p-0">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              className="z-0 object-cover"
              priority
              data-ai-hint={heroImage.aiHint}
            />
             <div className="relative z-20 container mx-auto px-4 text-center">
              <AnimatedWrapper animation="zoom-in">
                <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white">
                  Nous recrutons
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select
                  name="selected_category"
                  id="category"
                  className="form-control w-full border border-gray-300 rounded-md px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="-1">Catégorie</option>
                  <option className="level-0" value="achats">Achats</option>
                  <option className="level-0" value="approvisionnement">Approvisionnement</option>
                  <option className="level-0" value="bureau-detudes">Bureau d’études</option>
                  <option className="level-0" value="commercial">Commercial</option>
                  <option className="level-0" value="direction-generale">Direction Générale</option>
                  <option className="level-0" value="finance-comptabilite">Finance et Comptabilité</option>
                  <option className="level-0" value="informatique">Informatique</option>
                  <option className="level-0" value="juridique">Juridique</option>
                  <option className="level-0" value="maintenance">Maintenance</option>
                  <option className="level-0" value="marketing">Marketing</option>
                  <option className="level-0" value="procces-developpement">Procces et Développement (P&D)</option>
                  <option className="level-0" value="production">Production</option>
                  <option className="level-0" value="qhse">Qhse</option>
                  <option className="level-0" value="ressources-humaines">Ressources Humaines (RH)</option>
                </select>
                <ChevronDown className="absolute right-3 top-11 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Employment Type Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type d'emploi</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  value={filters.employmentType}
                  onChange={(e) => setFilters({...filters, employmentType: e.target.value})}
                >
                  <option value="">Tous les types</option>
                  <option value="temps-plein">Temps plein</option>
                  <option value="temps-partiel">Temps partiel</option>
                  <option value="cdd">CDD</option>
                  <option value="cdi">CDI</option>
                </select>
                <ChevronDown className="absolute right-3 top-11 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Search Button */}
              <div className="flex items-end col-span-1 md:col-span-1">
                <button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center">
                  <Search className="w-5 h-5 mr-2" />
                  Rechercher
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {jobListings.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Company Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-accent" />
                        </div>
                      </div>
                      
                      {/* Job Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-accent font-semibold mb-3">{job.company}</p>
                        
                        {/* Meta Information */}
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
                        
                        {/* Description */}
                        <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>
                      </div>
                    </div>
                    
                    {/* Apply Button */}
                    <div className="ml-4 flex-shrink-0">
                      <button className="bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200 whitespace-nowrap">
                        Postuler maintenant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Spontaneous Application Section */}
          <div className="mt-12 relative rounded-xl overflow-hidden" style={{ height: '300px' }}>
            {/* Background with blur effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700">
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-4xl font-bold text-white mb-6 tracking-wide">
                CANDIDATURE SPONTANÉE
              </h2>
              <button className="bg-accent hover:bg-accent/90 text-white font-bold py-4 px-10 rounded-lg transition-colors duration-200 text-lg shadow-lg">
                Cliquez ici
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProductPageLayout>
  );
};

export default RecruitmentPage;
