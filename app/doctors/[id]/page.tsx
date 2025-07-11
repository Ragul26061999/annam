import React from 'react';

export default function DoctorDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Doctor Details (Migration Placeholder) - ID: {params.id}</h1>
    </div>
  );
} 