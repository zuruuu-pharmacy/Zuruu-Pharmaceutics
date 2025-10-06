"use client";

import React from 'react';
import CurriculumDataAdmin from '@/components/admin/curriculum-data-admin';

export default function CurriculumAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CurriculumDataAdmin />
      </div>
    </div>
  );
}
