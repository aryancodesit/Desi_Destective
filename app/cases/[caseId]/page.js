'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Case001 from '@/components/cases/Case001';
import Case002 from '@/components/cases/Case002';

import Case003 from '@/components/cases/Case003';
import Case004 from '@/components/cases/Case004';
import Case005 from '@/components/cases/Case005';

// -------------------------------------------------------------
// DYNAMIC CASE ROUTER
// This page acts as a wrapper. It reads the URL ID directly
// and serves the correct Case File component.
// -------------------------------------------------------------

const CasePage = ({ params }) => {
  // Unwrap params for React/Next.js compatibility
  const { caseId } = React.use(params);

  // MAPPING: Add new cases here as you build them.
  const caseRegistry = {
    '001': <Case001 />,
    '002': <Case002 />,
    '003': <Case003 />,
    '004': <Case004 />,
    '005': <Case005 />
  };

  const ActiveCase = caseRegistry[caseId];

  // If ID doesn't exist, show 404
  if (!ActiveCase) {
    return (
      <div className="h-screen w-full bg-zinc-950 flex flex-col items-center justify-center text-red-500 font-mono">
        <h1 className="text-4xl font-bold mb-4">ERROR 404: FILE NOT FOUND</h1>
        <p className="mb-8 text-zinc-500">The requested case file is corrupted or missing.</p>
        <Link href="/" className="flex items-center gap-2 text-green-500 hover:text-green-400">
          <ChevronLeft /> RETURN TO SYSTEM ROOT
        </Link>
      </div>
    );
  }

  // Render the specific Case Component
  return ActiveCase;
};

export default CasePage;