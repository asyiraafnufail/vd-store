'use client'

import { logout } from '@/app/actions/auth'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 border-b"
        style={{
          background: 'var(--color-primary)',
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/admin/dashboard"
              className="font-bold text-lg"
              style={{ color: 'var(--color-accent)' }}
            >
              VD Admin
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/admin/dashboard"
                className="font-medium transition-colors duration-200"
                style={{ color: 'var(--color-text-on-dark)' }}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="font-medium transition-colors duration-200"
                style={{ color: 'var(--color-text-on-dark)' }}
              >
                Produk
              </Link>
              <Link
                href="/admin/settings"
                className="font-medium transition-colors duration-200"
                style={{ color: 'var(--color-text-on-dark)' }}
              >
                Pengaturan
              </Link>
            </nav>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="font-medium transition-colors duration-200 px-4 py-2 rounded-md"
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-text-on-accent)',
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}

