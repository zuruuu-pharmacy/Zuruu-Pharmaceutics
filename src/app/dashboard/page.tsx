"use client";

import React, { useState } from 'react';
import { GlobalNavigation } from '@/components/layout/global-navigation';
import { OverviewDashboard } from '@/components/dashboard/overview-dashboard';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewDashboard />;
      case 'inventory':
        return (
          <div className="p-6">
            <h1 className="text-h1">Products / Inventory</h1>
            <p className="text-body mt-2">Inventory management system coming soon...</p>
          </div>
        );
      case 'prescriptions':
        return (
          <div className="p-6">
            <h1 className="text-h1">Prescriptions</h1>
            <p className="text-body mt-2">Prescription management system coming soon...</p>
          </div>
        );
      case 'refills':
        return (
          <div className="p-6">
            <h1 className="text-h1">Refill Queue</h1>
            <p className="text-body mt-2">Refill management system coming soon...</p>
          </div>
        );
      case 'patients':
        return (
          <div className="p-6">
            <h1 className="text-h1">Patients</h1>
            <p className="text-body mt-2">Patient management system coming soon...</p>
          </div>
        );
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
      case 'analytics':
        return (
          <div className="p-6">
            <h1 className="text-h1">Analytics / Reports</h1>
            <p className="text-body mt-2">Analytics dashboard coming soon...</p>
          </div>
        );
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