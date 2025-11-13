
"use client";

import { ProductPageLayout } from '@/components/product-page-layout';
import React, { useState } from 'react';
import { Search, MapPin, Clock, Briefcase, Building2, ChevronDown } from 'lucide-react';
import { companyData } from '@/config/company-data';
import { Logo } from '@/components/logo';
import { Cairo } from 'next/font/google';

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
    location: ''
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

  return (
    <ProductPageLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden" style={{ height: '400px' }}>
          {/* Red geometric background */}
          <div className="absolute inset-0">
            <div className="absolute left-0 top-0 w-1/3 h-full bg-accent"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)' }}>
            </div>
          </div>
          
          {/* Chair image area - Simplified as per request */}
          <div className="absolute left-8 bottom-0" style={{ width: '250px', height: '250px' }}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="relative" style={{ width: '180px', height: '180px' }}>
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-primary rounded-3xl shadow-2xl"
                       style={{ transform: 'translateX(-50%) perspective(400px) rotateX(-10deg)' }}>
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-primary rounded-t-3xl"></div>
                  </div>
                  <div className="absolute bottom-0 left-8 w-2 h-16 bg-yellow-600 rounded"></div>
                  <div className="absolute bottom-0 right-8 w-2 h-16 bg-yellow-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              {/* Logo */}
              <div className="mb-6 inline-block">
                <div className="flex flex-col items-center">
                  <div className="w-24 mb-2">
                    <Logo />
                  </div>
                  <div className={`text-xs text-muted-foreground mt-1 ${cairo.variable} font-cairo`}>{companyData.siteMetadata.sloganArabic}</div>
                </div>
              </div>
              
              {/* Main Title */}
              <div className="relative inline-block">
                <span className="absolute -left-12 top-1/2 transform -translate-y-1/2 text-3xl font-bold text-foreground">\</span>
                <span className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-3xl font-bold text-foreground">/</span>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                  Nous<br/>recrutons
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-1 bg-gradient-to-r from-accent via-gray-300 to-gray-300"></div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Search Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="">Toutes les catégories</option>
                  <option value="ingenieur">Ingénieur</option>
                  <option value="technicien">Technicien</option>
                  <option value="administratif">Administratif</option>
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

              {/* Location Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                >
                  <option value="">Tous les lieux</option>
                  <option value="bordj">Bordj Bou Arreridj</option>
                  <option value="alger">Alger</option>
                  <option value="oran">Oran</option>
                </select>
                <ChevronDown className="absolute right-3 top-11 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
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
