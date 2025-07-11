import React from 'react';

export default function PatientDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Patient Details (Migration Placeholder) - ID: {params.id}</h1>
    </div>
  );
} 