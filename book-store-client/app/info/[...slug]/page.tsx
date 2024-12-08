"use client";
import { useParams } from 'next/navigation';
import React from 'react';

const InfoPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string[] | undefined;

  return (
    <div>
      <h1>Info Page</h1>
      {slug && slug.length > 0 ? (
        <p>Current Route: /info/{slug.join('/')}</p>
      ) : (
        <p>Welcome to the Info Section</p>
      )}
    </div>
  );
};

export default InfoPage;
