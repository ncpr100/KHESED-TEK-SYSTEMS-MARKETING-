'use client';

import { useEffect, useState } from 'react';

export default function DebugEnvPage() {
  const [serverEnv, setServerEnv] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch server-side environment variables
    fetch('/api/debug-env?key=khesed-debug-2024')
      .then(res => res.json())
      .then(data => {
        setServerEnv(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch server env:', err);
        setLoading(false);
      });
  }, []);

  const clientEnv = {
    NEXT_PUBLIC_LATAM_DEMO_VIDEO: process.env.NEXT_PUBLIC_LATAM_DEMO_VIDEO,
    NEXT_PUBLIC_USA_DEMO_VIDEO: process.env.NEXT_PUBLIC_USA_DEMO_VIDEO,
    NEXT_PUBLIC_LATAM_QUICK_TOUR: process.env.NEXT_PUBLIC_LATAM_QUICK_TOUR,
    NEXT_PUBLIC_USA_QUICK_TOUR: process.env.NEXT_PUBLIC_USA_QUICK_TOUR,
    NEXT_PUBLIC_GLOBAL_DEMO: process.env.NEXT_PUBLIC_GLOBAL_DEMO,
    NEXT_PUBLIC_VIDEO_CACHE_BUST: process.env.NEXT_PUBLIC_VIDEO_CACHE_BUST,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
  };

  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>This debug page is only available in development.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔧 Environment Variables Debug</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Client-side Environment */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 text-[var(--brand)]">Client-side Environment</h2>
            <pre className="bg-[var(--surface)] p-4 rounded-lg text-sm overflow-auto">
              {JSON.stringify(clientEnv, null, 2)}
            </pre>
          </div>

          {/* Server-side Environment */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 text-[var(--brand2)]">Server-side Environment</h2>
            {loading ? (
              <div className="text-[var(--muted)]">Loading server environment...</div>
            ) : (
              <pre className="bg-[var(--surface)] p-4 rounded-lg text-sm overflow-auto">
                {JSON.stringify(serverEnv, null, 2)}
              </pre>
            )}
          </div>
        </div>

        <div className="mt-8 card p-6">
          <h2 className="text-xl font-semibold mb-4">🎬 Video URL Test</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">LATAM Demo Video:</h3>
              <code className="text-[var(--brand)]">
                {clientEnv.NEXT_PUBLIC_LATAM_DEMO_VIDEO || 'NOT SET'}
              </code>
            </div>
            <div>
              <h3 className="font-medium">Cache Bust Value:</h3>
              <code className="text-[var(--brand2)]">
                {clientEnv.NEXT_PUBLIC_VIDEO_CACHE_BUST || 'NOT SET'}
              </code>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/latam" 
            className="gradient-btn text-black font-semibold px-6 py-3 rounded-lg hover:scale-105 transition"
          >
            Back to LATAM Demo
          </a>
        </div>
      </div>
    </div>
  );
}