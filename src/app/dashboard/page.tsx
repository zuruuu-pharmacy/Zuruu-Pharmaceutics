"use client";

import React, { useState } from 'react';
import { GlobalNavigation } from '@/components/layout/global-navigation';
import { OverviewDashboard } from '@/components/dashboard/overview-dashboard';
import ProductList from '@/components/inventory/product-list';
import ExpiryManagement from '@/components/inventory/expiry-management';
import PrescriptionWorkflow from '@/components/prescriptions/prescription-workflow';
import PatientManagement from '@/components/patients/patient-management';
import AnalyticsDashboard from '@/components/analytics/analytics-dashboard';
import SecurityCompliance from '@/components/security/security-compliance';
import QAFramework from '@/components/testing/qa-framework';
import RefillAdherenceTracker from '@/components/refill/refill-adherence-tracker';
import ChronicDiseaseTracker from '@/components/chronic/chronic-disease-tracker';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewDashboard />;
      case 'inventory':
        return <ProductList />;
      case 'expiry':
        return <ExpiryManagement />;
      case 'prescriptions':
        return <PrescriptionWorkflow />;
      case 'refills':
        return <RefillAdherenceTracker />;
      case 'patients':
        return <PatientManagement />;
      case 'suppliers':
        return (
          <div className="p-6">
            <h1 className="text-h1">Suppliers</h1>
            <p className="text-body mt-2">Supplier management system coming soon...</p>
          </div>
        );
      case 'sales':
        return (
          <div className="p-6">
            <h1 className="text-h1">Sales / Revenue</h1>
            <p className="text-body mt-2">Sales analytics system coming soon...</p>
          </div>
        );
      case 'chronic':
        return <ChronicDiseaseTracker />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'adr':
        return (
          <div className="p-6">
            <h1 className="text-h1">ADR (Adverse Drug Reaction)</h1>
            <p className="text-body mt-2">ADR reporting system coming soon...</p>
          </div>
        );
      case 'controlled':
        return (
          <div className="p-6">
            <h1 className="text-h1">Controlled Substances</h1>
            <p className="text-body mt-2">Controlled substances management coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-h1">Settings</h1>
            <p className="text-body mt-2">Settings panel coming soon...</p>
          </div>
        );
      case 'security':
        return <SecurityCompliance />;
      case 'testing':
        return <QAFramework />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <GlobalNavigation activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderContent()}
    </GlobalNavigation>
  );
}