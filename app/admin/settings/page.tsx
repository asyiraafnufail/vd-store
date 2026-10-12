'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const DEFAULT_WA_NUMBER = '6281234567890'
const DEFAULT_STORE_NAME = 'VD Phone Store'

interface Settings {
  waNumber: string
  storeName: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    waNumber: DEFAULT_WA_NUMBER,
    storeName: DEFAULT_STORE_NAME,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('vd_store_settings')
    if (stored) {
      try {
        setSettings(JSON.parse(stored))
      } catch (e) {
        // Invalid JSON, use defaults
      }
    }
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    // Validate WA number (basic check)
    if (!settings.waNumber || settings.waNumber.length < 10) {
      alert('Nomor WA minimal 10 digit')
      setSaving(false)
      return
    }

    if (!settings.storeName.trim()) {
      alert('Nama toko tidak boleh kosong')
      setSaving(false)
      return
    }

    try {
      // Save to localStorage
      localStorage.setItem('vd_store_settings', JSON.stringify(settings))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      alert('Gagal menyimpan settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/dashboard"
          className="text-sm font-medium mb-4 inline-block transition-colors"
          style={{ color: 'var(--color-accent)' }}
        >
          ← Kembali
        </Link>
        <h1
          className="font-bold text-2xl"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Pengaturan Toko
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          Kelola informasi toko dan kontak WhatsApp
        </p>
      </div>

      {/* Status Message */}
      {saved && (
        <div
          className="mb-6 p-4 rounded-lg text-sm"
          style={{
            background: '#D1FAE5',
            borderColor: '#6EE7B7',
            color: '#065F46',
            border: '1px solid #6EE7B7',
          }}
        >
          ✅ Pengaturan berhasil disimpan
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="max-w-xl">
        {/* Store Name */}
        <div
          className="rounded-lg p-6 border mb-6"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <label
            className="block text-sm font-semibold mb-3"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Nama Toko
          </label>
          <input
            type="text"
            value={settings.storeName}
            onChange={(e) => setSettings((prev) => ({ ...prev, storeName: e.target.value }))}
            disabled={saving}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
            placeholder="VD Phone Store"
          />
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
            Nama yang tampil di pesan WA ke customer
          </p>
        </div>

        {/* WA Number */}
        <div
          className="rounded-lg p-6 border mb-6"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <label
            className="block text-sm font-semibold mb-3"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Nomor WhatsApp
          </label>
          <input
            type="tel"
            value={settings.waNumber}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                waNumber: e.target.value.replace(/\D/g, ''),
              }))
            }
            disabled={saving}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
            placeholder="6281234567890"
          />
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
            Format: kode negara + nomor (contoh: 6281234567890)
          </p>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-md font-semibold transition-colors disabled:opacity-50"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-text-on-accent)',
          }}
        >
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </form>

      {/* Info Box */}
      <div
        className="mt-8 p-4 rounded-lg border"
        style={{
          background: 'var(--color-accent-soft)',
          borderColor: 'var(--color-border)',
        }}
      >
        <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
          <strong>ℹ️ Catatan:</strong> Pengaturan disimpan di browser Anda. Jika clear cache atau ganti device, akan kembali ke default.
        </p>
      </div>
    </div>
  )
}
