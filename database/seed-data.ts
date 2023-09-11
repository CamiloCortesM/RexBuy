import { PriceAndStockVariations } from '@/interfaces';
import bcrypt from 'bcryptjs';

interface SeedProduct {
  description             : string;
  images                  : string[];
  inStock                 : number;
  price                   : number;
  slug                    : string;
  tags                    : string[];
  title                   : string;
  brand                   : string;
  model                   : string;
  capacity?               : string[];
  ram?                    : string[];
  type                    : TechnologyType;
  priceAndStockVariations?: PriceAndStockVariations[];
}

interface SeedUser {
  name    : string;
  email   : string;
  password: string;
  role    : 'admin' | 'client' | 'employee';
}

type TechnologyType =
  | 'celulares'
  | 'computadores'
  | 'videojuegos'
  | 'accesorios'
  | 'tabletas'
  | 'smartwatch'
  | 'monitores';

interface SeedData {
  users   : SeedUser[];
  products: SeedProduct[];
}

export const initialData: SeedData = {
  users: [
    {
      name: 'Daniel Silva',
      email: 'daniel@google.com',
      password: bcrypt.hashSync('123456'),
      role: 'admin',
    },
    {
      name: 'Camilo Cortes',
      email: 'camilo@google.com',
      password: bcrypt.hashSync('123456'),
      role: 'admin',
    },
    {
      name: 'Santiago Salamanca',
      email: 'santiago@google.com',
      password: bcrypt.hashSync('123456'),
      role: 'employee',
    },
    {
      name: 'Goku',
      email: 'goku@google.com',
      password: bcrypt.hashSync('123456'),
      role: 'employee',
    },
    {
      name: 'Vegeta',
      email: 'vegeta@google.com',
      password: bcrypt.hashSync('123456'),
      role: 'client',
    },
  ],

  products: [
    {
      title: 'iPhone 12',
      description:
        'Potente smartphone de Apple con cámara dual y pantalla OLED.',
      images: ['iphone12.webp', 'iphone12-2.webp', 'iphone12-3.webp'],
      price: 999.99,
      slug: 'iphone-12',
      tags: ['smartphone', 'Apple', 'iOS'],
      brand: 'Apple',
      model: 'iPhone 12',
      inStock: 50,
      capacity: ['128GB', '256GB', '512GB', '1TB'],
      ram: ['4GB', '8GB'],
      type: 'celulares',
      priceAndStockVariations: [
        {
          capacity: '128GB',
          ram: '4GB',
          stock: 20,
          price: 999.99,
        },
        {
          capacity: '128GB',
          ram: '8GB',
          stock: 15,
          price: 1049.99,
        },
        {
          capacity: '256GB',
          ram: '4GB',
          stock: 18,
          price: 1099.99,
        },
        {
          capacity: '256GB',
          ram: '8GB',
          stock: 12,
          price: 1149.99,
        },
        {
          capacity: '512GB',
          ram: '4GB',
          stock: 10,
          price: 1199.99,
        },
        {
          capacity: '512GB',
          ram: '8GB',
          stock: 5,
          price: 1249.99,
        },
        {
          capacity: '1TB',
          ram: '4GB',
          stock: 8,
          price: 1299.99,
        },
        {
          capacity: '1TB',
          ram: '8GB',
          stock: 3,
          price: 1349.99,
        },
      ],
    },
    {
      title: 'Dell XPS 13',
      description:
        'Portátil ultradelgado con pantalla táctil y potente rendimiento.',
      images: ['xps13.webp', 'xps13-2.webp', 'xps13-3.webp'],
      price: 1499.99,
      slug: 'dell-xps-13',
      tags: ['laptop', 'Dell', 'Windows'],
      brand: 'Dell',
      model: 'XPS 13',
      inStock: 20,
      capacity: ['512GB', '1TB'],
      ram: ['4GB', '8GB'],
      type: 'computadores',
      priceAndStockVariations: [
        {
          capacity: '512GB',
          ram: '4GB',
          stock: 10,
          price: 1499.99,
        },
        {
          capacity: '512GB',
          ram: '8GB',
          stock: 5,
          price: 1599.99,
        },
        {
          capacity: '1TB',
          ram: '4GB',
          stock: 8,
          price: 1699.99,
        },
        {
          capacity: '1TB',
          ram: '8GB',
          stock: 4,
          price: 1799.99,
        },
      ],
    },
    {
      title: 'Nintendo Switch',
      description:
        'Consola de videojuegos híbrida para jugar en casa y en movimiento.',
      images: [
        'switch.webp',
        'switch-2.webp',
        'switch-3.webp',
        'switch-4.webp',
      ],
      inStock: 15,
      price: 299.99,
      slug: 'nintendo-switch',
      tags: ['videojuegos', 'Nintendo', 'Consola'],
      brand: 'Nintendo',
      model: 'Switch',
      type: 'videojuegos',
    },
    {
      title: 'MacBook Pro',
      description:
        'Potente portátil de Apple con pantalla Retina y procesador Intel.',
      images: ['macbookpro.webp', 'macbookpro-2.webp'],
      inStock: 10,
      price: 1999.99,
      slug: 'macbook-pro',
      ram: ['4GB', '8GB'],
      tags: ['laptop', 'Apple', 'macOS'],
      brand: 'Apple',
      model: 'MacBook Pro',
      type: 'computadores',
      priceAndStockVariations: [
        {
          capacity: '',
          ram: '4GB',
          stock: 10,
          price: 1499.99,
        },
        {
          capacity: '',
          ram: '8GB',
          stock: 5,
          price: 1599.99,
        },
      ],
    },
    {
      title: 'Samsung Galaxy S20',
      description:
        'Teléfono Android con cámara de alta resolución y pantalla AMOLED.',
      images: [
        'galaxys20.webp',
        'galaxys20-2.webp',
        'galaxys20-3.webp',
        'galaxys20-4.webp',
      ],
      inStock: 20,
      price: 799.99,
      slug: 'samsung-galaxy-s20',
      tags: ['smartphone', 'Samsung', 'Android'],
      brand: 'Samsung',
      model: 'Galaxy S20',
      type: 'celulares',
    },
    {
      title: 'HP Spectre x360',
      description:
        'Portátil convertible con pantalla táctil y diseño elegante.',
      images: [
        'spectre.webp',
        'spectre-2.webp',
        'spectre-3.webp',
        'spectre-4.webp',
      ],
      inStock: 15,
      price: 1299.99,
      slug: 'hp-spectre-x360',
      tags: ['laptop', 'HP', 'Windows'],
      brand: 'HP',
      model: 'Spectre x360',
      type: 'computadores',
    },
    {
      title: 'Sony PlayStation 5',
      description:
        'Consola de videojuegos de última generación con gráficos impresionantes.',
      images: [
        'ps5.webp',
        'ps5-2.webp',
        'ps5-3.webp',
        'ps5-4.webp',
        'ps5-5.webp',
        'ps5-6.webp',
      ],
      inStock: 5,
      price: 499.99,
      slug: 'sony-playstation-5',
      tags: ['videojuegos', 'Sony', 'Consola'],
      brand: 'Sony',
      model: 'PlayStation 5',
      type: 'videojuegos',
    },
    {
      title: 'LG OLED TV',
      description:
        'Televisor con tecnología OLED para una calidad de imagen excepcional.',
      images: ['lgoled.webp', 'lgoled-2.webp', 'lgoled-3.webp'],
      inStock: 8,
      price: 1499.99,
      slug: 'lg-oled-tv',
      tags: ['accesorios', 'LG', 'Televisor'],
      brand: 'LG',
      model: 'OLED TV',
      type: 'accesorios',
    },
    {
      title: 'Canon EOS R5',
      description: 'Cámara digital de alta resolución y calidad profesional.',
      images: [
        'canoneosr5.webp',
        'canoneosr5-2.webp',
        'canoneosr5-3.webp',
        'canoneosr5-4.webp',
        'canoneosr5-5.webp',
      ],
      inStock: 3,
      price: 3499.99,
      slug: 'canon-eos-r5',
      tags: ['accesorios', 'Canon', 'Cámara'],
      brand: 'Canon',
      model: 'EOS R5',
      type: 'accesorios',
    },
    {
      title: 'Google Pixel 5',
      description:
        'Teléfono Android con cámara de calidad excepcional y experiencia de software pura.',
      images: [
        'googlepixel5.webp',
        'googlepixel5-2.webp',
        'googlepixel5-3.webp',
      ],
      inStock: 12,
      price: 699.99,
      slug: 'google-pixel-5',
      tags: ['smartphone', 'Google', 'Android'],
      brand: 'Google',
      model: 'Pixel 5',
      type: 'celulares',
    },
    {
      title: 'Lenovo ThinkPad X1 Carbon',
      description: 'Portátil ultradelgado y duradero con teclado ergonómico.',
      images: [
        'thinkpadx1carbon.webp',
        'thinkpadx1carbon-2.webp',
        'thinkpadx1carbon-3.webp',
      ],
      inStock: 6,
      price: 1599.99,
      slug: 'lenovo-thinkpad-x1-carbon',
      tags: ['laptop', 'Lenovo', 'Windows'],
      brand: 'Lenovo',
      model: 'ThinkPad X1 Carbon',
      type: 'computadores',
    },
    {
      title: 'Apple Watch Series 6',
      description:
        'Reloj inteligente con monitorización de la salud y conectividad mejorada.',
      images: ['applewatch6.webp', 'applewatch6-2.webp', 'applewatch6-3.webp'],
      inStock: 18,
      price: 399.99,
      slug: 'apple-watch-series-6',
      tags: ['accesorios', 'Apple', 'Smartwatch'],
      brand: 'Apple',
      model: 'Watch Series 6',
      type: 'smartwatch',
    },
    {
      title: 'Microsoft Xbox Series X',
      description:
        'Consola de videojuegos de próxima generación con potencia y rendimiento mejorados.',
      images: ['xboxseriesx.webp', 'xboxseriesx-2.webp', 'xboxseriesx-3.webp'],
      inStock: 7,
      price: 499.99,
      slug: 'microsoft-xbox-series-x',
      tags: ['videojuegos', 'Microsoft', 'Consola'],
      brand: 'Microsoft',
      model: 'Xbox Series X',
      type: 'videojuegos',
    },
    {
      title: 'Sony WH-1000XM4',
      description:
        'Auriculares inalámbricos con cancelación de ruido y calidad de sonido excepcional.',
      images: [
        'sonywh1000xm4.webp',
        'sonywh1000xm4-2.webp',
        'sonywh1000xm4-3.webp',
      ],
      inStock: 9,
      price: 349.99,
      slug: 'sony-wh-1000xm4',
      tags: ['accesorios', 'Sony', 'Auriculares'],
      brand: 'Sony',
      model: 'WH-1000XM4',
      type: 'accesorios',
    },
    {
      title: 'OnePlus 9 Pro',
      description:
        'Teléfono Android con pantalla fluida de 120 Hz y potente rendimiento.',
      images: [
        'oneplus9pro.webp',
        'oneplus9pro-2.webp',
        'oneplus9pro-3.webp',
        'oneplus9pro-4.webp',
      ],
      inStock: 14,
      price: 899.99,
      slug: 'oneplus-9-pro',
      tags: ['smartphone', 'OnePlus', 'Android'],
      brand: 'OnePlus',
      model: '9 Pro',
      type: 'celulares',
    },
    {
      title: 'HP Envy 27',
      description: 'Monitor 4K con diseño elegante y amplia gama de colores.',
      images: ['hpenvy27.webp', 'hpenvy27-2.webp'],
      inStock: 4,
      price: 599.99,
      slug: 'hp-envy-27',
      tags: ['monitores', 'HP', 'Monitor'],
      brand: 'HP',
      model: 'Envy 27',
      type: 'monitores',
    },
    {
      title: 'Apple AirPods Pro',
      description:
        'Auriculares inalámbricos con cancelación de ruido y sonido de alta calidad.',
      images: [
        'airpodspro.webp',
        'airpodspro-2.webp',
        'airpodspro-3.webp',
        'airpodspro-4.webp',
      ],
      inStock: 22,
      price: 249.99,
      slug: 'apple-airpods-pro',
      tags: ['accesorios', 'Apple', 'Auriculares'],
      brand: 'Apple',
      model: 'AirPods Pro',
      type: 'accesorios',
    },
    {
      title: 'LG Gram 17',
      description:
        'Portátil ultraligero con pantalla de 17 pulgadas y batería de larga duración.',
      images: ['lggram17.webp', 'lggram17-2.webp'],
      inStock: 7,
      price: 1499.99,
      slug: 'lg-gram-17',
      tags: ['laptop', 'LG', 'Windows'],
      brand: 'LG',
      model: 'Gram 17',
      type: 'computadores',
    },
    {
      title: 'GoPro Hero9 Black',
      description:
        'Cámara de acción resistente al agua con grabación de video 5K y estabilización avanzada.',
      images: [
        'goprohero9.webp',
        'goprohero9-2.webp',
        'goprohero9-3.webp',
        'goprohero9-4.webp',
      ],
      inStock: 11,
      price: 449.99,
      slug: 'gopro-hero9-black',
      tags: ['accesorios', 'GoPro', 'Cámara'],
      brand: 'GoPro',
      model: 'Hero9 Black',
      type: 'accesorios',
    },
    {
      title: 'Samsung Galaxy Tab S7',
      description: 'Tableta con pantalla AMOLED y soporte para S Pen.',
      images: [
        'galaxytabs7.webp',
        'galaxytabs7-2.webp',
        'galaxytabs7-3.webp',
        'galaxytabs7-4.webp',
      ],
      inStock: 16,
      price: 649.99,
      slug: 'samsung-galaxy-tab-s7',
      tags: ['tabletas', 'Samsung', 'Android'],
      brand: 'Samsung',
      model: 'Galaxy Tab S7',
      type: 'tabletas',
    },
    {
      title: 'Fitbit Charge 4',
      description:
        'Rastreador de actividad física con GPS integrado y monitorización continua del ritmo cardíaco.',
      images: ['fitbitcharge4.webp', 'fitbitcharge4-2.webp'],
      inStock: 20,
      price: 149.99,
      slug: 'fitbit-charge-4',
      tags: ['accesorios', 'Fitbit', 'Fitness'],
      brand: 'Fitbit',
      model: 'Charge 4',
      type: 'smartwatch',
    },
    {
      title: 'Microsoft Surface Pro 7',
      description:
        'Tableta convertible con potencia de laptop y versatilidad de estudio.',
      images: ['surfacepro7.webp', 'surfacepro7-2.webp', 'surfacepro7-3.webp'],
      inStock: 9,
      price: 999.99,
      slug: 'microsoft-surface-pro-7',
      tags: ['tabletas', 'Microsoft', 'Windows'],
      brand: 'Microsoft',
      model: 'Surface Pro 7',
      type: 'tabletas',
    },
    {
      title: 'Razer Blade 15',
      description:
        'Portátil para juegos con pantalla de alta frecuencia de actualización y rendimiento de vanguardia.',
      images: [
        'razerblade15.webp',
        'razerblade15-2.webp',
        'razerblade15-3.webp',
        'razerblade15-4.webp',
      ],
      inStock: 6,
      price: 1999.99,
      slug: 'razer-blade-15',
      tags: ['laptop', 'Razer', 'Windows'],
      brand: 'Razer',
      model: 'Blade 15',
      type: 'computadores',
    },
    {
      title: 'Sony Xperia 1 III',
      description:
        'Teléfono Android con pantalla 4K y cámara Zeiss de alta resolución.',
      images: ['sonyxperia1iii.webp'],
      inStock: 13,
      price: 1199.99,
      slug: 'sony-xperia-1-iii',
      tags: ['smartphone', 'Sony', 'Android'],
      brand: 'Sony',
      model: 'Xperia 1 III',
      type: 'celulares',
    },
    {
      title: 'Logitech MX Master 3',
      description:
        'Ratón inalámbrico avanzado con seguimiento preciso y personalización de botones.',
      images: [
        'logitechmxmaster3.webp',
        'logitechmxmaster3-2.webp',
        'logitechmxmaster3-3.webp',
        'logitechmxmaster3-4.webp',
      ],
      inStock: 25,
      price: 99.99,
      slug: 'logitech-mx-master-3',
      tags: ['accesorios', 'Logitech', 'Ratón'],
      brand: 'Logitech',
      model: 'MX Master 3',
      type: 'accesorios',
    },
    {
      title: 'Acer Predator Helios 300',
      description:
        'Portátil para juegos con potente rendimiento y pantalla de alta frecuencia de actualización.',
      images: [
        'acerpredatorhelios300.webp',
        'acerpredatorhelios300-2.webp',
        'acerpredatorhelios300-3.webp',
        'acerpredatorhelios300-4.webp',
      ],
      inStock: 8,
      price: 1399.99,
      slug: 'acer-predator-helios-300',
      tags: ['laptop', 'Acer', 'Windows'],
      brand: 'Acer',
      model: 'Predator Helios 300',
      type: 'computadores',
    },
    {
      title: 'Alienware Aurora R10',
      description:
        'PC de escritorio para juegos con procesador AMD Ryzen y tarjeta gráfica NVIDIA GeForce.',
      images: [
        'alienwareaurorar10.webp',
        'alienwareaurorar10-2.webp',
        'alienwareaurorar10-3.webp',
        'alienwareaurorar10-4.webp',
        'alienwareaurorar10-5.webp',
      ],
      inStock: 3,
      price: 2499.99,
      slug: 'alienware-aurora-r10',
      tags: ['computadores', 'Alienware', 'Gaming'],
      brand: 'Alienware',
      model: 'Aurora R10',
      type: 'computadores',
    },
    {
      title: 'Lenovo Yoga C940',
      description:
        'Portátil convertible con pantalla táctil y altavoces Dolby Atmos.',
      images: [
        'lenovoyogac940.webp',
        'lenovoyogac940-2.webp',
        'lenovoyogac940-3.webp',
      ],
      inStock: 6,
      price: 1299.99,
      slug: 'lenovo-yoga-c940',
      tags: ['laptop', 'Lenovo', 'Windows'],
      brand: 'Lenovo',
      model: 'Yoga C940',
      type: 'computadores',
    },
    {
      title: 'Xiaomi Mi 11',
      description:
        'Teléfono Android con procesador Snapdragon y cámara de alta resolución.',
      images: [
        'xiaomimi11.webp',
        'xiaomimi11-2.webp',
        'xiaomimi11-3.webp',
        'xiaomimi11-4.webp',
      ],
      inStock: 14,
      price: 699.99,
      slug: 'xiaomi-mi-11',
      tags: ['smartphone', 'Xiaomi', 'Android'],
      brand: 'Xiaomi',
      model: 'Mi 11',
      type: 'celulares',
    },
    {
      title: 'AOC CQ32G1',
      description:
        'Monitor gaming curvo de 32 pulgadas con alta frecuencia de actualización.',
      images: [
        'aoccq32g1.webp',
        'aoccq32g1-2.webp',
        'aoccq32g1-3.webp',
        'aoccq32g1-4.webp',
      ],
      inStock: 6,
      price: 399.99,
      slug: 'aoc-cq32g1',
      tags: ['monitores', 'AOC', 'Monitor'],
      brand: 'AOC',
      model: 'CQ32G1',
      type: 'monitores',
    },
    {
      title: 'JBL Flip 5',
      description:
        'Altavoz Bluetooth portátil con sonido potente y resistencia al agua.',
      images: ['jblflip5.webp', 'jblflip5-2.webp', 'jblflip5-3.webp'],
      inStock: 18,
      price: 119.99,
      slug: 'jbl-flip-5',
      tags: ['accesorios', 'JBL', 'Altavoz'],
      brand: 'JBL',
      model: 'Flip 5',
      type: 'accesorios',
    },
    {
      title: 'Samsung Galaxy S21',
      description: 'Teléfono Android con pantalla AMOLED y potente procesador.',
      images: [
        'galaxys21.webp',
        'galaxys21-2.webp',
        'galaxys21-3.webp',
        'galaxys21-4.webp',
      ],
      inStock: 30,
      price: 899.99,
      capacity: ['256GB', '512GB'],
      slug: 'samsung-galaxy-s21',
      tags: ['smartphone', 'Samsung', 'Android'],
      brand: 'Samsung',
      model: 'Galaxy S21',
      type: 'celulares',
    },
  ],
};
