// ponytail: hardcode → upgrade ke CMS saat produk > 30
export type Product = {
  id: string
  name: string
  brand: 'Apple' | 'Samsung'
  storage: string
  condition: 'Baru' | 'Second'
  quality: 'Mulus' | 'Normal' | 'Brand New'
  warranty: 'Resmi' | 'Bea Cukai' | 'All Operator'
  price: number
  priceMax?: number
  image: string
  waLink: string
}

const WA = '6281234567890' // ganti nomor WA toko
const msg = (name: string) =>
  `https://wa.me/${WA}?text=Halo%20VD%20Phone%20Store%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(name)}`

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15',
    brand: 'Apple',
    storage: '128GB',
    condition: 'Baru',
    quality: 'Brand New',
    warranty: 'Resmi',
    price: 13_500_000,
    image: '/products/iphone15.svg',
    waLink: msg('iPhone 15 128GB'),
  },
  {
    id: '2',
    name: 'iPhone 13',
    brand: 'Apple',
    storage: '128GB',
    condition: 'Second',
    quality: 'Mulus',
    warranty: 'Resmi',
    price: 6_200_000,
    priceMax: 6_500_000,
    image: '/products/iphone13.svg',
    waLink: msg('iPhone 13 128GB'),
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    storage: '256GB',
    condition: 'Baru',
    quality: 'Brand New',
    warranty: 'Resmi',
    price: 12_800_000,
    image: '/products/s24.svg',
    waLink: msg('Samsung Galaxy S24 256GB'),
  },
  {
    id: '4',
    name: 'Samsung Galaxy S23',
    brand: 'Samsung',
    storage: '256GB',
    condition: 'Second',
    quality: 'Normal',
    warranty: 'Bea Cukai',
    price: 7_500_000,
    priceMax: 7_900_000,
    image: '/products/s23.svg',
    waLink: msg('Samsung Galaxy S23 256GB'),
  },
]

export const brands = ['Semua', 'Apple', 'Samsung']
export const conditions = ['Semua', 'Baru', 'Second']
