'use client';

import { useState } from 'react';

export default function AdminCarouselPage() {
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [newImage, setNewImage] = useState({
    market: 'LATAM',
    filename: '',
    title: '',
    description: '',
    alt: ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('market', newImage.market);

    try {
      setUploadStatus('Uploading...');
      const response = await fetch('/api/admin/upload-carousel', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (response.ok) {
        setUploadStatus(`✅ Image uploaded: ${result.filename}`);
        setNewImage({ ...newImage, filename: result.filename });
      } else {
        setUploadStatus(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setUploadStatus(`❌ Upload failed: ${error}`);
    }
  };

  const generateConfigCode = () => {
    if (!newImage.filename || !newImage.title) return '';

    return `{
  src: '/images/product-screenshots/${newImage.filename}',
  alt: '${newImage.alt}',
  title: '${newImage.title}',
  description: '${newImage.description}'
},`;
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 gradient-text">🔧 Super Admin - Carousel Manager</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 text-[var(--brand)]">Upload New Image</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Market</label>
                <select 
                  value={newImage.market}
                  onChange={(e) => setNewImage({ ...newImage, market: e.target.value })}
                  className="w-full p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg"
                >
                  <option value="LATAM">LATAM (Spanish)</option>
                  <option value="USA">USA (English)</option>
                  <option value="GLOBAL">GLOBAL (Multi-language)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image File</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg"
                />
                <p className="text-sm text-[var(--muted)] mt-1">
                  Recommended: 1920x1080 (16:9) JPG/PNG
                </p>
              </div>

              {uploadStatus && (
                <div className="p-3 bg-[var(--surface)] rounded-lg border border-[var(--border)]">
                  {uploadStatus}
                </div>
              )}
            </div>
          </div>

          {/* Metadata Section */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 text-[var(--brand2)]">Image Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input 
                  type="text"
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  placeholder="e.g., Panel de Control Principal"
                  className="w-full p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea 
                  value={newImage.description}
                  onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                  placeholder="e.g., Vista general del dashboard con métricas clave"
                  rows={3}
                  className="w-full p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Alt Text</label>
                <input 
                  type="text"
                  value={newImage.alt}
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                  placeholder="e.g., Panel Principal KHESED-TEK"
                  className="w-full p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Generated Code */}
        {generateConfigCode() && (
          <div className="mt-8 card p-6">
            <h2 className="text-xl font-semibold mb-4">📋 Generated Configuration Code</h2>
            <p className="text-[var(--muted)] mb-4">
              Copy this code and add it to <code>/lib/product-screenshots.ts</code> in the appropriate market array:
            </p>
            <pre className="bg-[var(--surface)] p-4 rounded-lg overflow-auto text-sm border border-[var(--border)]">
              {generateConfigCode()}
            </pre>
          </div>
        )}

        {/* Current Images Preview */}
        <div className="mt-8 card p-6">
          <h2 className="text-xl font-semibold mb-4">📁 Current Carousel Images</h2>
          <div className="text-[var(--muted)]">
            <p>Current images are stored in:</p>
            <code className="block mt-2 p-2 bg-[var(--surface)] rounded">
              /public/images/product-screenshots/
            </code>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/latam" 
            className="gradient-btn text-black font-semibold px-6 py-3 rounded-lg hover:scale-105 transition mr-4"
          >
            Preview LATAM Carousel
          </a>
          <a 
            href="/usa" 
            className="border border-[var(--border)] hover:border-[var(--brand)] px-6 py-3 rounded-lg transition font-medium"
          >
            Preview USA Carousel
          </a>
        </div>
      </div>
    </div>
  );
}