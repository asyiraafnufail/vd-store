import type { Database } from '@/app/lib/supabase'

export async function seedProducts() {
  const { createClient } = await import('@/app/lib/supabase/server')
  const supabase = await createClient()

  const products: Database['public']['Tables']['products']['Insert'][] = [
    {
      name: 'iPhone 15',
      brand: 'Apple',
      storage: '128GB',
      condition: 'Baru',
      quality: 'Brand New',
      warranty: 'Resmi',
      price: 13_500_000,
      image: 'https://res.cloudinary.com/demo/image/upload/w_400,q_auto/iphone15.jpg',
      wa_link: 'https://wa.me/6281234567890?text=Halo%20VD%20Phone%20Store%2C%20saya%20tertarik%20dengan%20iPhone%2015%20128GB',
    },
    {
      name: 'iPhone 13',
      brand: 'Apple',
      storage: '128GB',
      condition: 'Second',
      quality: 'Mulus',
      warranty: 'Resmi',
      price: 6_200_000,
      price_max: 6_500_000,
      image: 'https://res.cloudinary.com/demo/image/upload/w_400,q_auto/iphone13.jpg',
      wa_link: 'https://wa.me/6281234567890?text=Halo%20VD%20Phone%20Store%2C%20saya%20tertarik%20dengan%20iPhone%2013%20128GB',
    },
    {
      name: 'Samsung Galaxy S24',
      brand: 'Samsung',
      storage: '256GB',
      condition: 'Baru',
      quality: 'Brand New',
      warranty: 'Resmi',
      price: 12_800_000,
      image: 'https://res.cloudinary.com/demo/image/upload/w_400,q_auto/s24.jpg',
      wa_link: 'https://wa.me/6281234567890?text=Halo%20VD%20Phone%20Store%2C%20saya%20tertarik%20dengan%20Samsung%20Galaxy%20S24%20256GB',
    },
    {
      name: 'Samsung Galaxy S23',
      brand: 'Samsung',
      storage: '256GB',
      condition: 'Second',
      quality: 'Normal',
      warranty: 'Bea Cukai',
      price: 7_500_000,
      price_max: 7_900_000,
      image: 'https://res.cloudinary.com/demo/image/upload/w_400,q_auto/s23.jpg',
      wa_link: 'https://wa.me/6281234567890?text=Halo%20VD%20Phone%20Store%2C%20saya%20tertarik%20dengan%20Samsung%20Galaxy%20S23%20256GB',
    },
  ]

  const { error } = await supabase.from('products').insert(products)
  if (error) {
    console.error('Error seeding products:', error)
    return false
  }

  console.log('✅ Seeded', products.length, 'products')
  return true
}
