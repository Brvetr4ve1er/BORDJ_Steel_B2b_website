/**
 * Admin Dashboard Page
 * Central management interface for orders, inventory, and analytics
 */

import React from 'react';
import { Metadata } from 'next';
import { DashboardContent } from '@/components/dashboard/dashboard-content';

export const metadata: Metadata = {
  title: 'Dashboard - Gestion',
  description: 'Tableau de bord de gestion pour BORDJ Home Appliances',
};

export default function DashboardPage() {
  return <DashboardContent />;
}
