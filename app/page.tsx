import Image from 'next/image'
import { products } from './data/products'
import Catalog from './components/Catalog'

const WA_LINK =
  'https://wa.me/6281234567890?text=Halo%20VD%20Phone%20Store%2C%20saya%20ingin%20bertanya%20tentang%20produk'

const features = [
  { title: 'Harga Transparan', desc: 'Tidak ada biaya tersembunyi. Harga yang kami tampilkan adalah harga final.' },
  { title: 'Kondisi Teruji', desc: 'Setiap unit dicek secara menyeluruh sebelum sampai ke tangan Anda.' },
  { title: 'Garansi Toko', desc: 'Semua produk bergaransi toko untuk ketenangan pikiran Anda.' },
  { title: 'Pengiriman Cepat', desc: 'Order hari ini, dikirim hari ini ke seluruh Indonesia.' },
]

const steps = [
  { num: '01', title: 'Pilih Produk', desc: 'Temukan iPhone atau Samsung yang sesuai kebutuhan dari katalog kami.' },
  { num: '02', title: 'Hubungi Kami', desc: 'Chat langsung via WhatsApp untuk info detail, kondisi, dan negosiasi harga.' },
  { num: '03', title: 'Terima Pesanan', desc: 'Bayar dan produk dikirim ke alamat Anda dengan aman.' },
]

const testimonials = [
  { name: 'Andi R.', text: 'Kondisi HP sesuai deskripsi, harga juga kompetitif. Pelayanan cepat dan profesional.' },
  { name: 'Siti M.', text: 'Sudah dua kali beli di sini. Selalu puas dengan kondisi barang dan responsnya.' },
  { name: 'Budi S.', text: 'Prosesnya mudah. Chat, deal, barang datang. Garansi toko bikin tenang.' },
]

const divider = { borderTop: '1px solid var(--color-border)' }

export default function Home() {
  return (
    <main className="flex flex-col bg-white">

      {/* HERO — putih, 2 kolom */}
      <section className="bg-white px-6 md:px-12 lg:px-20 min-h-[92vh] flex items-center">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 py-10">

          {/* Kiri — teks */}
          <div className="flex-1 flex flex-col items-start text-left max-w-lg">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: 'var(--color-accent)' }}
            >
              iPhone &amp; Samsung — Baru dan Second
            </p>
            <h1
              className="font-extrabold leading-[1.08] mb-5"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)', color: 'var(--color-text-primary)' }}
            >
              Smartphone<br />Terbaik,<br />Harga Terjangkau.
            </h1>
            <p
              className="mb-10 leading-relaxed max-w-sm"
              style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)', color: 'var(--color-text-secondary)' }}
            >
              Pilihan iPhone dan Samsung — baru maupun second — kondisi teruji, garansi toko, harga transparan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="#katalog"
                className="font-bold tracking-wide uppercase text-center transition-colors duration-200"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-text-on-accent)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 36px',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.06em',
                  boxShadow: 'var(--shadow-cta)',
                }}
              >
                Lihat Katalog
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold tracking-wide uppercase text-center transition-colors duration-200"
                style={{
                  border: '1.5px solid var(--color-primary)',
                  color: 'var(--color-text-primary)',
                  background: 'transparent',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 36px',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.06em',
                }}
              >
                Hubungi Kami
              </a>
            </div>
          </div>

          {/* Kanan — foto HP */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="relative w-72 sm:w-96 md:w-[28rem] lg:w-[32rem]" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/products/17.png"
                alt="iPhone VD Phone Store"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="py-14 md:py-20 px-4 md:px-8 bg-white" style={divider}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-bold text-center mb-3"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', color: 'var(--color-text-primary)' }}
          >
            Kenapa VD Phone Store?
          </h2>
          <p className="text-center text-sm mb-10 md:mb-12" style={{ color: 'var(--color-text-secondary)' }}>
            Kepercayaan pelanggan adalah prioritas utama kami
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 md:p-6"
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="w-8 h-0.5 mb-4" style={{ background: 'var(--color-accent)' }} />
                <h3 className="font-semibold mb-2" style={{ fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KATALOG */}
      <section className="bg-white" style={divider}>
        <Catalog products={products} />
      </section>

      {/* CARA BELI */}
      <section className="py-14 md:py-20 px-4 md:px-8 bg-white" style={divider}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-bold text-center mb-3"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', color: 'var(--color-text-primary)' }}
          >
            Cara Beli
          </h2>
          <p className="text-center text-sm mb-10 md:mb-14" style={{ color: 'var(--color-text-secondary)' }}>
            Tiga langkah sederhana
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span
                  className="font-bold mb-4 block"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: 'var(--color-accent)', lineHeight: 1 }}
                >
                  {s.num}
                </span>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)', fontSize: '0.9375rem' }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONI */}
      <section className="py-14 md:py-20 px-4 md:px-8 bg-white" style={divider}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-bold text-center mb-3"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', color: 'var(--color-text-primary)' }}
          >
            Kata Pelanggan
          </h2>
          <p className="text-center text-sm mb-10 md:mb-12" style={{ color: 'var(--color-text-secondary)' }}>
            Pengalaman nyata dari pembeli kami
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-5 md:p-6"
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="w-6 h-0.5 mb-4" style={{ background: 'var(--color-accent)' }} />
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: 'var(--color-text-secondary)' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-text-primary)' }}>
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA AKHIR */}
      <section className="py-16 md:py-24 px-6 md:px-12 text-center bg-white" style={divider}>
        <div className="max-w-lg mx-auto">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Siap Beli?
          </p>
          <h2
            className="font-bold mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: 'var(--color-text-primary)' }}
          >
            Temukan HP yang Tepat untuk Anda
          </h2>
          <p className="mb-10 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Chat kami sekarang dan dapatkan rekomendasi terbaik sesuai budget.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-bold tracking-wide uppercase transition-colors duration-200"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-text-on-accent)',
              borderRadius: 'var(--radius-md)',
              padding: '15px 48px',
              fontSize: '0.8125rem',
              letterSpacing: '0.06em',
              boxShadow: 'var(--shadow-cta)',
            }}
          >
            Chat WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-8 px-4 md:px-8"
        style={{ background: 'var(--color-primary)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-bold tracking-wide" style={{ color: 'var(--color-accent)', fontSize: '1rem' }}>
            VD Phone Store
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-on-dark)', opacity: 0.4 }}>
            &copy; 2026 VD Phone Store. All rights reserved.
          </span>
        </div>
      </footer>

    </main>
  )
}
