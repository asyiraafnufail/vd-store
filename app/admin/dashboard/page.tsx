import { createClient } from '@/app/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get counts
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  const { count: newProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('condition', 'Baru')

  const { count: secondProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('condition', 'Second')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Dashboard
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          Ringkasan katalog produk
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="rounded-lg p-6 border"
          style={{
            background: 'var(--color-primary)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
            Total Produk
          </p>
          <p
            className="text-4xl font-bold mt-2"
            style={{ color: 'var(--color-text-on-dark)' }}
          >
            {totalProducts ?? 0}
          </p>
        </div>

        <div
          className="rounded-lg p-6 border"
          style={{
            background: 'var(--color-primary)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
            Produk Baru
          </p>
          <p
            className="text-4xl font-bold mt-2"
            style={{ color: 'var(--color-text-on-dark)' }}
          >
            {newProducts ?? 0}
          </p>
        </div>

        <div
          className="rounded-lg p-6 border"
          style={{
            background: 'var(--color-primary)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
            Produk Second
          </p>
          <p
            className="text-4xl font-bold mt-2"
            style={{ color: 'var(--color-text-on-dark)' }}
          >
            {secondProducts ?? 0}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className="rounded-lg p-6 border"
        style={{
          background: 'var(--color-primary)',
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-on-dark)' }}>
          Quick Actions
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/admin/products/new"
            className="px-6 py-3 rounded-md font-medium transition-colors duration-200 text-center"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-text-on-accent)',
            }}
          >
            + Tambah Produk
          </Link>
          <Link
            href="/admin/products"
            className="px-6 py-3 rounded-md font-medium transition-colors duration-200 text-center border"
            style={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'var(--color-text-on-dark)',
            }}
          >
            Kelola Produk
          </Link>
        </div>
      </div>
    </div>
  )
}

