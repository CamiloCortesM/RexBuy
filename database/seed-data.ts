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
        'IPHONE 12:\nEl iPhone 12 es un smartphone de última generación que combina un diseño elegante con un rendimiento excepcional. Disponible en varios colores atractivos, este dispositivo es perfecto para aquellos que buscan lo mejor en tecnología móvil.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla Super Retina XDR: Disfruta de una experiencia visual impresionante en una pantalla brillante y vibrante.\n• Chip A14 Bionic: Experimenta un rendimiento rápido y eficiente en todas tus tareas, desde juegos hasta productividad.\n• Cámara Dual de 12 MP: Captura fotos y videos de alta calidad en cualquier situación, incluso en condiciones de poca luz.\n• Batería de larga duración: Mantén tu iPhone 12 funcionando durante todo el día con una sola carga.\n• Conectividad 5G: Experimenta velocidades de descarga ultrarrápidas y una conectividad fluida en todo momento.\n\nRESISTENCIA MÁXIMA: Diseñado para soportar el uso diario y los desafíos cotidianos.\n\nGARANTÍA:\nOfrecemos garantía para tu tranquilidad, que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el iPhone 12 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para ayudarte.',
      images: ['iphone12.webp', 'iphone12-2.webp', 'iphone12-3.webp'],
      price: 301.25,
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
          price: 301.25,
        },
        {
          capacity: '128GB',
          ram: '8GB',
          stock: 15,
          price: 351.30,
        },
        {
          capacity: '256GB',
          ram: '4GB',
          stock: 18,
          price: 372.00,
        },
        {
          capacity: '256GB',
          ram: '8GB',
          stock: 12,
          price: 403.99,
        },
        {
          capacity: '512GB',
          ram: '4GB',
          stock: 10,
          price: 450.99,
        },
        {
          capacity: '512GB',
          ram: '8GB',
          stock: 5,
          price: 470.99,
        },
        {
          capacity: '1TB',
          ram: '4GB',
          stock: 8,
          price: 499.99,
        },
        {
          capacity: '1TB',
          ram: '8GB',
          stock: 3,
          price: 530.25,
        },
      ],
    },
    {
      title: 'Dell XPS 13',
      description:
        '¡PORTÁTIL DELL XPS 13!\n\nDESCRIPCIÓN DEL PORTÁTIL DELL XPS 13:\nEl portátil Dell XPS 13 es una maravilla de la tecnología que redefine la experiencia informática. Con un diseño elegante y un rendimiento excepcional, este portátil es perfecto para aquellos que exigen lo mejor en cuanto a portabilidad y productividad. Si buscas un compañero confiable para tus tareas diarias y más, el Dell XPS 13 es la elección ideal.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla InfinityEdge: Disfruta de una experiencia visual envolvente en una pantalla de borde a borde con colores vibrantes y detalles nítidos.\n• Procesador de última generación: Equipado con un potente procesador que te brinda un rendimiento rápido y eficiente en todas tus tareas, desde la navegación web hasta la edición de videos.\n• Almacenamiento SSD ultrarrápido: Experimenta tiempos de carga rápidos y un acceso instantáneo a tus archivos con el almacenamiento en estado sólido.\n• Teclado retroiluminado: Trabaja cómodamente en entornos con poca luz gracias al teclado retroiluminado de alta calidad.\n• Batería de larga duración: Olvídate de preocuparte por la duración de la batería. El Dell XPS 13 está diseñado para seguirte el ritmo durante todo el día.\n\nDISEÑO Y PORTABILIDAD:\nEl Dell XPS 13 no solo es potente, sino que también es sorprendentemente portátil. Su diseño delgado y liviano te permite llevarlo a cualquier lugar con facilidad. Además, la construcción de alta calidad garantiza su durabilidad en tus desplazamientos diarios.\n\nGARANTÍA:\nRespaldamos la calidad de nuestro portátil Dell XPS 13 con una garantía sólida que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el portátil Dell XPS 13 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para ayudarte a encontrar la solución perfecta para tus necesidades informáticas.',
      images: ['xps13.webp', 'xps13-2.webp', 'xps13-3.webp'],
      price: 1449.99,
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
        '¡NINTENDO SWITCH!\n\nLa Nintendo Switch es una consola de videojuegos innovadora y versátil que te permite jugar en cualquier lugar y en cualquier momento. Con su diseño único y su amplia gama de juegos, es la elección perfecta para jugadores de todas las edades.\n\nCARACTERÍSTICAS DESTACADAS:\n• Modo portátil: Lleva tus juegos favoritos contigo en el modo portátil, donde la consola se convierte en una pantalla táctil que puedes sostener en tus manos.\n• Modo TV: Conéctala a tu televisor y disfruta de la experiencia de juego en alta definición en la comodidad de tu hogar.\n• Joy-Cons: Los Joy-Cons son controladores versátiles que ofrecen múltiples formas de jugar, ya sea en solitario o con amigos.\n• Amplia biblioteca de juegos: La Nintendo Switch cuenta con una impresionante selección de juegos, desde aventuras épicas hasta juegos multijugador divertidos.\n• Portabilidad: Lleva la diversión contigo donde quiera que vayas, ya sea en viajes largos o en reuniones con amigos.\n\nDIVERSIÓN SIN LÍMITES:\nLa Nintendo Switch te permite disfrutar de una experiencia de juego sin límites. Ya sea que prefieras explorar mundos fantásticos, competir en emocionantes carreras o sumergirte en desafiantes juegos de estrategia, esta consola tiene algo para todos.\n\nGARANTÍA:\nRespaldamos la calidad de la Nintendo Switch con una garantía sólida que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la Nintendo Switch o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para ayudarte a disfrutar al máximo de tus juegos.',
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
        '¡MACBOOK PRO!\n\nEl MacBook Pro es la culminación de la innovación tecnológica de Apple. Esta potente laptop combina un diseño elegante con un rendimiento excepcional. Si buscas una herramienta confiable para tus tareas profesionales y creativas, el MacBook Pro es la elección ideal.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla Retina de alta resolución: Disfruta de una experiencia visual increíblemente nítida y vibrante en una pantalla de alta resolución.\n• Procesador de última generación: Equipado con un potente procesador que te brinda un rendimiento rápido y eficiente en todas tus tareas, desde la edición de video hasta la programación.\n• Almacenamiento SSD ultrarrápido: Experimenta tiempos de carga rápidos y un acceso instantáneo a tus archivos con el almacenamiento en estado sólido.\n• Teclado Magic Keyboard: Trabaja cómodamente durante horas con el teclado retroiluminado y de alta calidad.\n• Batería de larga duración: Olvídate de preocuparte por la duración de la batería. El MacBook Pro está diseñado para seguirte el ritmo durante todo el día.\n\nDISEÑO Y PORTABILIDAD:\nEl MacBook Pro combina potencia y portabilidad en un diseño delgado y elegante. Llévalo contigo a todas partes y déjate impresionar por su durabilidad y estilo.\n\nGARANTÍA:\nRespaldamos la calidad del MacBook Pro con una garantía sólida que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el MacBook Pro o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para ayudarte a elevar tu experiencia informática.',
      images: ['macbookpro.webp', 'macbookpro-2.webp'],
      inStock: 10,
      price: 1774.00,
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
          price: 1774.00,
        },
        {
          capacity: '',
          ram: '8GB',
          stock: 5,
          price: 1999.99,
        },
      ],
    },
    {
      title: 'Samsung Galaxy S20',
      description:
        '¡SAMSUNG GALAXY S20!\n\nEl Samsung Galaxy S20 es un teléfono inteligente de vanguardia que combina un diseño elegante con un rendimiento excepcional. Si buscas un dispositivo que te ofrezca lo último en tecnología móvil, el Galaxy S20 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla Dynamic AMOLED: Disfruta de colores vibrantes y detalles nítidos en una pantalla de alta resolución.\n• Potente rendimiento: Equipado con un potente procesador y una gran cantidad de RAM para un rendimiento rápido y sin problemas.\n• Cámara de alta calidad: Captura fotos y videos impresionantes con la versátil cámara triple.\n• Batería de larga duración: Mantén tu Galaxy S20 funcionando durante todo el día con una sola carga.\n• Conectividad 5G: Experimenta velocidades de descarga ultrarrápidas y una conectividad fluida.\n\nDISEÑO Y PORTABILIDAD:\nEl Galaxy S20 combina una construcción de alta calidad con un diseño elegante y delgado que se adapta cómodamente a tu mano.\n\nGARANTÍA:\nRespaldamos la calidad del Samsung Galaxy S20 con una garantía sólida que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el Samsung Galaxy S20 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para ayudarte a disfrutar al máximo de tu dispositivo.',
      images: [
        'galaxys20.webp',
        'galaxys20-2.webp',
        'galaxys20-3.webp',
        'galaxys20-4.webp',
      ],
      inStock: 20,
      price: 339.00,
      slug: 'samsung-galaxy-s20',
      tags: ['smartphone', 'Samsung', 'Android'],
      brand: 'Samsung',
      model: 'Galaxy S20',
      type: 'celulares',
    },
    {
      title: 'HP Spectre x360',
      description:
        '¡HP SPECTRE X360!\n\nEl HP Spectre x360 es una joya de la tecnología que combina diseño y rendimiento en un paquete impresionante. Si buscas una laptop que te brinde versatilidad y potencia, el Spectre x360 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla táctil de alta resolución: Experimenta imágenes nítidas y colores vibrantes en su pantalla de alta resolución.\n• Rendimiento excepcional: Equipado con un procesador potente para manejar tus tareas más exigentes.\n• Convertibilidad 2 en 1: Úsalo como laptop o tableta según tus necesidades.\n• Diseño elegante: El Spectre x360 presenta un diseño delgado y elegante que llama la atención.\n• Batería de larga duración: No te preocupes por la duración de la batería; el Spectre x360 está diseñado para durar.\n\nDISEÑO Y PORTABILIDAD:\nEl HP Spectre x360 es un testimonio de ingeniería y diseño. Su construcción de alta calidad y su portabilidad lo convierten en el compañero perfecto para profesionales en movimiento.\n\nGARANTÍA:\nRespaldamos la calidad del HP Spectre x360 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el HP Spectre x360 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para ayudarte a elevar tu experiencia informática.',
      images: [
        'spectre.webp',
        'spectre-2.webp',
        'spectre-3.webp',
        'spectre-4.webp',
      ],
      inStock: 15,
      price: 1639.99,
      slug: 'hp-spectre-x360',
      tags: ['laptop', 'HP', 'Windows'],
      brand: 'HP',
      model: 'Spectre x360',
      type: 'computadores',
    },
    {
      title: 'Sony PlayStation 5',
      description:
        '¡SONY PLAYSTATION 5!\n\nLa Sony PlayStation 5 es la última evolución en el mundo de los videojuegos. Con un rendimiento de vanguardia y una amplia gama de juegos, es la elección definitiva para los amantes de los videojuegos.\n\nCARACTERÍSTICAS DESTACADAS:\n• Potencia de próxima generación: Experimenta juegos con gráficos asombrosos y tiempos de carga ultrarrápidos.\n• Control inmersivo: El controlador DualSense te sumerge en el juego con su retroalimentación háptica y gatillos adaptables.\n• Amplia biblioteca de juegos: La PS5 ofrece una increíble selección de juegos, desde emocionantes aventuras hasta épicas batallas multijugador.\n• Unidad de disco Blu-ray Ultra HD: Disfruta de películas y contenido en alta definición.\n• Conectividad en línea: Juega con amigos en línea y accede a una variedad de servicios de entretenimiento.\n\nDISEÑO Y RENDIMIENTO:\nLa PlayStation 5 presenta un diseño futurista que combina potencia y estilo. Disfruta de una experiencia de juego sin igual en la comodidad de tu hogar.\n\nGARANTÍA:\nRespaldamos la calidad de la Sony PlayStation 5 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la Sony PlayStation 5 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para llevarte al siguiente nivel de juego.',
      images: [
        'ps5.webp',
        'ps5-2.webp',
        'ps5-3.webp',
        'ps5-4.webp',
        'ps5-5.webp',
        'ps5-6.webp',
      ],
      inStock: 5,
      price: 459.99,
      slug: 'sony-playstation-5',
      tags: ['videojuegos', 'Sony', 'Consola'],
      brand: 'Sony',
      model: 'PlayStation 5',
      type: 'videojuegos',
    },
    {
      title: 'LG OLED TV',
      description:
        '¡LG OLED TV!\n\nEl LG OLED TV es una obra maestra de la tecnología de visualización. Si buscas una experiencia de entretenimiento en el hogar que supere tus expectativas, este televisor es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla OLED de alta resolución: Disfruta de colores vibrantes y negros verdaderos en una pantalla de alta resolución.\n• Procesador potente: Experimenta una calidad de imagen asombrosa gracias al potente procesador que impulsa este televisor.\n• Smart TV: Accede a tus aplicaciones y servicios de transmisión favoritos con facilidad.\n• Diseño elegante: El LG OLED TV presenta un diseño delgado y elegante que se adapta a cualquier espacio.\n• Calidad de sonido envolvente: Sumérgete en un audio de alta calidad con altavoces incorporados.\n\nDISEÑO Y CALIDAD:\nEl LG OLED TV ofrece una calidad de imagen inigualable en un diseño que complementa cualquier sala de estar. Experimenta el entretenimiento como nunca antes.\n\nGARANTÍA:\nRespaldamos la calidad del LG OLED TV con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el LG OLED TV o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para llevarte a una experiencia visual excepcional.',
      images: ['lgoled.webp', 'lgoled-2.webp', 'lgoled-3.webp'],
      inStock: 8,
      price: 1589.99,
      slug: 'lg-oled-tv',
      tags: ['accesorios', 'LG', 'Televisor'],
      brand: 'LG',
      model: 'OLED TV',
      type: 'accesorios',
    },
    {
      title: 'Canon EOS R5',
      description: '¡CANON EOS R5!\n\nLa Canon EOS R5 es una cámara digital de última generación que redefine la fotografía y la videografía. Si buscas una herramienta creativa de alto rendimiento, esta cámara es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Sensor de alta resolución: Captura imágenes y videos impresionantes con su sensor de alta resolución.\n• Grabación en 8K: Graba videos en calidad cinematográfica en resolución 8K.\n• Enfoque automático de alta velocidad: Captura sujetos en movimiento con precisión gracias a su enfoque automático de alta velocidad.\n• Estabilización de imagen: Obtén imágenes y videos nítidos en todas las condiciones con la estabilización de imagen incorporada.\n• Pantalla táctil y visor electrónico: Componer y revisar tus fotos y videos es fácil y preciso.\n\nDISEÑO Y RENDIMIENTO:\nLa Canon EOS R5 es una cámara profesional diseñada para adaptarse a tus necesidades creativas. Su construcción robusta y su rendimiento superior la convierten en una elección excepcional.\n\nGARANTÍA:\nRespaldamos la calidad de la Canon EOS R5 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la Canon EOS R5 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para ayudarte a capturar momentos inolvidables.',
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
        '¡GOOGLE PIXEL 5!\n\nEl Google Pixel 5 es un smartphone que combina lo mejor de Android con la innovación de Google. Si buscas un dispositivo que ofrezca una experiencia Android pura y una excelente calidad de cámara, el Pixel 5 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Cámara de alta calidad: Captura fotos y videos impresionantes con la cámara trasera de 12.2 MP y la cámara frontal de 8 MP.\n• Rendimiento sólido: Equipado con un procesador rápido y una experiencia Android pura y fluida.\n• Pantalla OLED: Disfruta de colores vibrantes y detalles nítidos en su pantalla OLED de alta resolución.\n• Batería de larga duración: Mantén tu Pixel 5 funcionando durante todo el día con una sola carga.\n• Actualizaciones rápidas: Recibe actualizaciones de Android directamente de Google para estar siempre actualizado.\n\nDISEÑO Y CALIDAD:\nEl Google Pixel 5 presenta un diseño limpio y minimalista que se siente bien en la mano. Además, su enfoque en la fotografía lo convierte en una excelente opción para los amantes de la fotografía.\n\nGARANTÍA:\nRespaldamos la calidad del Google Pixel 5 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el Google Pixel 5 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para llevarte al siguiente nivel de la fotografía móvil.',
      images: [
        'googlepixel5.webp',
        'googlepixel5-2.webp',
        'googlepixel5-3.webp',
      ],
      inStock: 12,
      price: 125.00,
      slug: 'google-pixel-5',
      tags: ['smartphone', 'Google', 'Android'],
      brand: 'Google',
      model: 'Pixel 5',
      type: 'celulares',
    },
    {
      title: 'Lenovo ThinkPad X1 Carbon',
      description: '¡LENOVO THINKPAD X1 CARBON!\n\nLa Lenovo ThinkPad X1 Carbon es una laptop empresarial de primera clase que combina rendimiento y portabilidad. Si buscas una herramienta confiable para tus tareas empresariales, esta laptop es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla de alta resolución: Experimenta una calidad de imagen impresionante en su pantalla de alta resolución.\n• Rendimiento superior: Equipada con un procesador potente para abordar tus tareas empresariales más exigentes.\n• Teclado cómodo: Trabaja durante horas con comodidad gracias a su teclado de alta calidad.\n• Diseño delgado y ligero: Llévala contigo a todas partes sin sacrificar el rendimiento.\n• Seguridad integrada: Mantén tus datos seguros con características de seguridad avanzadas.\n\nDISEÑO Y PORTABILIDAD:\nLa Lenovo ThinkPad X1 Carbon es conocida por su durabilidad y portabilidad. Su diseño delgado y resistente la convierte en una laptop ideal para profesionales en movimiento.\n\nGARANTÍA:\nRespaldamos la calidad de la Lenovo ThinkPad X1 Carbon con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la Lenovo ThinkPad X1 Carbon o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para ayudarte a aumentar tu productividad empresarial.',
      images: [
        'thinkpadx1carbon.webp',
        'thinkpadx1carbon-2.webp',
        'thinkpadx1carbon-3.webp',
      ],
      inStock: 6,
      price: 1449.90,
      slug: 'lenovo-thinkpad-x1-carbon',
      tags: ['laptop', 'Lenovo', 'Windows'],
      brand: 'Lenovo',
      model: 'ThinkPad X1 Carbon',
      type: 'computadores',
    },
    {
      title: 'Apple Watch Series 6',
      description:
        '¡APPLE WATCH SERIES 6!\n\nEl Apple Watch Series 6 es el último avance en tecnología de relojes inteligentes. Si buscas un compañero para tu estilo de vida activo y conectado, el Series 6 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Monitor de oxígeno en sangre: Obtén información vital sobre tu salud con la función de medición de oxígeno en sangre.\n• Pantalla siempre activa: Consulta la hora y tus notificaciones con solo un vistazo a su pantalla siempre activa.\n• Seguimiento de actividad física: Mantén un registro de tus actividades diarias, desde caminatas hasta sesiones de entrenamiento.\n• Notificaciones y llamadas: Mantente conectado con notificaciones y llamadas directamente en tu muñeca.\n• Personalización: Elige entre una variedad de correas y carátulas para personalizar tu Apple Watch.\n\nDISEÑO Y FUNCIONALIDAD:\nEl Apple Watch Series 6 combina un diseño elegante con una funcionalidad excepcional. Lleva tu salud y bienestar al siguiente nivel con este reloj inteligente.\n\nGARANTÍA:\nRespaldamos la calidad del Apple Watch Series 6 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el Apple Watch Series 6 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para ayudarte a mantener tu vida en movimiento.',
      images: ['applewatch6.webp', 'applewatch6-2.webp', 'applewatch6-3.webp'],
      inStock: 18,
      price: 222.64,
      slug: 'apple-watch-series-6',
      tags: ['accesorios', 'Apple', 'Smartwatch'],
      brand: 'Apple',
      model: 'Watch Series 6',
      type: 'smartwatch',
    },
    {
      title: 'Microsoft Xbox Series X',
      description:
        '¡MICROSOFT XBOX SERIES X!\n\nLa Microsoft Xbox Series X es la consola de próxima generación que redefine la experiencia de juego. Con un rendimiento excepcional y una amplia gama de juegos, es la elección definitiva para los amantes de los videojuegos.\n\nCARACTERÍSTICAS DESTACADAS:\n• Potencia de próxima generación: Experimenta juegos con gráficos asombrosos y tiempos de carga ultrarrápidos.\n• Amplia biblioteca de juegos: La Xbox Series X ofrece una amplia selección de juegos, desde emocionantes aventuras hasta juegos multijugador en línea.\n• Rendimiento sin igual: Disfruta de una experiencia de juego fluida y sin interrupciones gracias a su potente hardware.\n• Compatibilidad hacia atrás: Juega títulos de Xbox anteriores y disfruta de tu biblioteca de juegos existente.\n• Xbox Game Pass: Accede a una amplia biblioteca de juegos con una suscripción a Xbox Game Pass.\n\nDISEÑO Y RENDIMIENTO:\nLa Xbox Series X presenta un diseño llamativo y una construcción de alta calidad. Disfruta de la máxima potencia en un paquete elegante.\n\nGARANTÍA:\nRespaldamos la calidad de la Microsoft Xbox Series X con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la Microsoft Xbox Series X o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para llevarte al siguiente nivel de juego.',
      images: ['xboxseriesx.webp', 'xboxseriesx-2.webp', 'xboxseriesx-3.webp'],
      inStock: 7,
      price: 457.97,
      slug: 'microsoft-xbox-series-x',
      tags: ['videojuegos', 'Microsoft', 'Consola'],
      brand: 'Microsoft',
      model: 'Xbox Series X',
      type: 'videojuegos',
    },
    {
      title: 'Sony WH-1000XM4',
      description:
        '¡SONY WH-1000XM4!\n\nLos auriculares Sony WH-1000XM4 son la elección definitiva para los amantes de la música y el sonido de alta calidad. Si buscas auriculares con cancelación de ruido líder en la industria y una calidad de sonido excepcional, estos auriculares son la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Cancelación de ruido líder en la industria: Bloquea el ruido ambiental y sumérgete en tu música.\n• Calidad de sonido excepcional: Disfruta de un audio de alta resolución y detalles nítidos.\n• Batería de larga duración: Escucha música durante horas con una sola carga.\n• Comodidad premium: Los auriculares WH-1000XM4 están diseñados para ofrecer comodidad durante todo el día.\n• Conectividad versátil: Empareja tus dispositivos fácilmente y disfruta de llamadas claras y sin problemas.\n\nDISEÑO Y COMODIDAD:\nLos Sony WH-1000XM4 ofrecen una combinación de calidad de sonido y comodidad incomparables. Su diseño elegante y ajuste cómodo los convierten en los compañeros perfectos para la música en movimiento.\n\nGARANTÍA:\nRespaldamos la calidad de los Sony WH-1000XM4 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre los Sony WH-1000XM4 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para mejorar tu experiencia auditiva.',
      images: [
        'sonywh1000xm4.webp',
        'sonywh1000xm4-2.webp',
        'sonywh1000xm4-3.webp',
      ],
      inStock: 9,
      price: 348.00,
      slug: 'sony-wh-1000xm4',
      tags: ['accesorios', 'Sony', 'Auriculares'],
      brand: 'Sony',
      model: 'WH-1000XM4',
      type: 'accesorios',
    },
    {
      title: 'OnePlus 9 Pro',
      description:
        '¡ONEPLUS 9 PRO!\n\nEl OnePlus 9 Pro es un smartphone que combina un rendimiento excepcional con una calidad de cámara de primer nivel. Si buscas un dispositivo que te ofrezca una experiencia Android fluida y una capacidad de fotografía impresionante, el OnePlus 9 Pro es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Cámara Leica de 50 MP: Captura fotos y videos excepcionales con la cámara principal de 50 MP co-desarrollada con Leica.\n• Pantalla Fluid AMOLED: Disfruta de colores vibrantes y detalles nítidos en su pantalla Fluid AMOLED de alta resolución.\n• Rendimiento potente: Equipado con un procesador rápido y una experiencia Android pura y fluida.\n• Batería de larga duración: Mantén tu OnePlus 9 Pro funcionando durante todo el día con una sola carga.\n• Carga rápida: Obtén una carga rápida que te permite volver a usar tu teléfono en poco tiempo.\n\nDISEÑO Y CALIDAD:\nEl OnePlus 9 Pro presenta un diseño elegante y una construcción de alta calidad que se siente bien en la mano. Además, su enfoque en la fotografía lo convierte en una excelente opción para los amantes de la fotografía.\n\nGARANTÍA:\nRespaldamos la calidad del OnePlus 9 Pro con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el OnePlus 9 Pro o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para llevarte al siguiente nivel de la fotografía móvil.',
      images: [
        'oneplus9pro.webp',
        'oneplus9pro-2.webp',
        'oneplus9pro-3.webp',
        'oneplus9pro-4.webp',
      ],
      inStock: 14,
      price: 359.00,
      slug: 'oneplus-9-pro',
      tags: ['smartphone', 'OnePlus', 'Android'],
      brand: 'OnePlus',
      model: '9 Pro',
      type: 'celulares',
    },
    {
      title: 'HP Envy 27',
      description: '¡HP ENVY 27!\n\nEl HP Envy 27 es un monitor de alta calidad que brinda una experiencia de visualización excepcional. Si buscas un monitor que ofrezca colores vibrantes y una resolución impresionante, el Envy 27 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla de alta resolución: Experimenta imágenes nítidas y colores vibrantes en su pantalla de alta resolución.\n• Tecnología de panel IPS: Disfruta de ángulos de visión amplios y colores precisos desde cualquier ángulo.\n• Diseño elegante: El HP Envy 27 presenta un diseño delgado y moderno que se adapta a cualquier espacio.\n• Conectividad versátil: Conéctate fácilmente a tus dispositivos con múltiples puertos.\n• Calidad de sonido envolvente: Disfruta de una experiencia de sonido inmersiva con altavoces integrados.\n\nDISEÑO Y CALIDAD:\nEl HP Envy 27 combina un diseño elegante con una calidad de imagen excepcional. Ya sea para trabajar o para entretenimiento, este monitor es una elección ideal.\n\nGARANTÍA:\nRespaldamos la calidad del HP Envy 27 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el HP Envy 27 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para mejorar tu experiencia visual.',
      images: ['hpenvy27.webp', 'hpenvy27-2.webp'],
      inStock: 4,
      price: 499.99,
      slug: 'hp-envy-27',
      tags: ['monitores', 'HP', 'Monitor'],
      brand: 'HP',
      model: 'Envy 27',
      type: 'monitores',
    },
    {
      title: 'Apple AirPods Pro',
      description:
        '¡APPLE AIRPODS PRO!\n\nLos Apple AirPods Pro son auriculares inalámbricos que ofrecen calidad de sonido premium y cancelación activa de ruido. Si buscas una experiencia auditiva excepcional y una comodidad superior, los AirPods Pro son la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Cancelación activa de ruido: Bloquea el ruido ambiental y sumérgete en tu música o llamadas con la cancelación activa de ruido.\n• Sonido de alta calidad: Disfruta de un audio de alta fidelidad con graves profundos y agudos claros.\n• Ajuste personalizable: Los AirPods Pro vienen con puntas intercambiables para un ajuste cómodo y seguro.\n• Resistencia al agua y al sudor: Úsalos durante tus entrenamientos sin preocuparte por el sudor o la lluvia.\n• Conexión fácil con dispositivos Apple: Empareja tus AirPods Pro con un toque y disfruta de una experiencia perfecta con tus dispositivos Apple.\n\nDISEÑO Y COMODIDAD:\nLos Apple AirPods Pro ofrecen un diseño compacto y cómodo que se adapta a tus oídos. Llévalos contigo a todas partes y disfruta de una experiencia auditiva inigualable.\n\nGARANTÍA:\nRespaldamos la calidad de los Apple AirPods Pro con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre los Apple AirPods Pro o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para mejorar tu experiencia auditiva.',
      images: [
        'airpodspro.webp',
        'airpodspro-2.webp',
        'airpodspro-3.webp',
        'airpodspro-4.webp',
      ],
      inStock: 22,
      price: 183.87,
      slug: 'apple-airpods-pro',
      tags: ['accesorios', 'Apple', 'Auriculares'],
      brand: 'Apple',
      model: 'AirPods Pro',
      type: 'accesorios',
    },
    {
      title: 'LG Gram 17',
      description:
        '¡LG GRAM 17!\n\nLa LG Gram 17 es una laptop ultraligera con una pantalla amplia y una portabilidad excepcional. Si buscas una laptop que combine rendimiento y comodidad en un paquete liviano, la Gram 17 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla amplia de 17 pulgadas: Disfruta de una experiencia visual inmersiva en su pantalla de gran tamaño.\n• Ultraligera: La LG Gram 17 es sorprendentemente liviana, lo que la hace perfecta para profesionales en movimiento.\n• Rendimiento sólido: Equipada con un procesador eficiente para manejar tus tareas diarias con facilidad.\n• Batería de larga duración: Olvídate de cargar constantemente; la Gram 17 ofrece una duración de batería excepcional.\n• Teclado cómodo: Trabaja cómodamente durante horas gracias a su teclado de alta calidad.\n\nDISEÑO Y PORTABILIDAD:\nLa LG Gram 17 combina una pantalla amplia con un diseño ultraligero que la hace fácil de transportar. Ya sea para trabajo o entretenimiento, esta laptop ofrece lo mejor de ambos mundos.\n\nGARANTÍA:\nRespaldamos la calidad de la LG Gram 17 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la LG Gram 17 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para mejorar tu experiencia informática.',
      images: ['lggram17.webp', 'lggram17-2.webp'],
      inStock: 7,
      price: 1999.99,
      slug: 'lg-gram-17',
      tags: ['laptop', 'LG', 'Windows'],
      brand: 'LG',
      model: 'Gram 17',
      type: 'computadores',
    },
    {
      title: 'GoPro Hero9 Black',
      description:
        '¡GOPRO HERO9 BLACK!\n\nLa GoPro Hero9 Black es la cámara de acción definitiva para los aventureros y creadores de contenido. Si buscas una cámara versátil y resistente que capture tus momentos épicos, la Hero9 Black es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Grabación en 5K: Captura videos asombrosos en resolución 5K para obtener detalles excepcionales.\n• Pantalla frontal: Encuadra tus selfies y videos con facilidad gracias a la pantalla frontal integrada.\n• Estabilización de imagen: Obtén tomas suaves y estables incluso en condiciones extremas.\n• Resistente al agua: Sumérgete hasta 10 metros de profundidad sin necesidad de una carcasa adicional.\n• Control de voz: Controla tu GoPro con comandos de voz para una operación manos libres.\n\nDISEÑO Y DURABILIDAD:\nLa GoPro Hero9 Black está diseñada para soportar aventuras extremas. Su construcción robusta y resistente al agua la convierte en la compañera ideal para tus actividades al aire libre.\n\nGARANTÍA:\nRespaldamos la calidad de la GoPro Hero9 Black con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la GoPro Hero9 Black o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para capturar tus momentos épicos.',
      images: [
        'goprohero9.webp',
        'goprohero9-2.webp',
        'goprohero9-3.webp',
        'goprohero9-4.webp',
      ],
      inStock: 11,
      price: 217.00,
      slug: 'gopro-hero9-black',
      tags: ['accesorios', 'GoPro', 'Cámara'],
      brand: 'GoPro',
      model: 'Hero9 Black',
      type: 'accesorios',
    },
    {
      title: 'Samsung Galaxy Tab S7',
      description: '¡SAMSUNG GALAXY TAB S7!\n\nLa Samsung Galaxy Tab S7 es una tablet de alto rendimiento que ofrece una experiencia de productividad y entretenimiento excepcional. Si buscas una tablet versátil y potente, la Galaxy Tab S7 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla de alta resolución: Experimenta colores vibrantes y detalles nítidos en su pantalla de alta resolución.\n• S Pen incluido: Dibuja, toma notas y trabaja de manera creativa con el S Pen de alta precisión.\n• Rendimiento potente: Equipada con un procesador rápido y una gran cantidad de RAM para un rendimiento sin interrupciones.\n• Modo DeX: Convierte tu tablet en una experiencia similar a una PC para una productividad máxima.\n• Batería de larga duración: Mantén tu Galaxy Tab S7 funcionando durante todo el día.\n\nDISEÑO Y PORTABILIDAD:\nLa Samsung Galaxy Tab S7 presenta un diseño delgado y elegante que es fácil de llevar a todas partes. Ya sea para trabajo o entretenimiento, esta tablet te ofrece versatilidad.\n\nGARANTÍA:\nRespaldamos la calidad de la Samsung Galaxy Tab S7 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la Samsung Galaxy Tab S7 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para mejorar tu experiencia con tablets.',
      images: [
        'galaxytabs7.webp',
        'galaxytabs7-2.webp',
        'galaxytabs7-3.webp',
        'galaxytabs7-4.webp',
      ],
      inStock: 16,
      price: 369.99,
      slug: 'samsung-galaxy-tab-s7',
      tags: ['tabletas', 'Samsung', 'Android'],
      brand: 'Samsung',
      model: 'Galaxy Tab S7',
      type: 'tabletas',
    },
    {
      title: 'Fitbit Charge 4',
      description:
        '¡FITBIT CHARGE 4!\n\nEl Fitbit Charge 4 es una pulsera de actividad que te ayuda a mantener un estilo de vida saludable y activo. Si buscas un dispositivo que registre tus pasos, ritmo cardíaco y más, el Charge 4 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Monitoreo de ritmo cardíaco: Mantén un registro de tu ritmo cardíaco en tiempo real para un mejor control de tu salud.\n• GPS incorporado: Registra tus rutas de entrenamiento y actividades al aire libre sin necesidad de llevar tu teléfono.\n• Seguimiento de actividad: Registra tus pasos, distancia, calorías quemadas y más para mantener un estilo de vida activo.\n• Duración de la batería de hasta 7 días: Utiliza tu Fitbit Charge 4 durante toda la semana sin preocuparte por cargarlo constantemente.\n• Resistente al agua: Llévalo contigo mientras nadas o te duchas sin preocupaciones.\n\nDISEÑO Y COMODIDAD:\nEl Fitbit Charge 4 presenta un diseño cómodo y discreto que se adapta a tu estilo de vida. Lleva un registro de tu salud y actividad de manera sencilla.\n\nGARANTÍA:\nRespaldamos la calidad del Fitbit Charge 4 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el Fitbit Charge 4 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para ayudarte a mantener un estilo de vida activo y saludable.',
      images: ['fitbitcharge4.webp', 'fitbitcharge4-2.webp'],
      inStock: 20,
      price: 159.80,
      slug: 'fitbit-charge-4',
      tags: ['accesorios', 'Fitbit', 'Fitness'],
      brand: 'Fitbit',
      model: 'Charge 4',
      type: 'smartwatch',
    },
    {
      title: 'Microsoft Surface Pro 7',
      description:
        '¡MICROSOFT SURFACE PRO 7!\n\nLa Microsoft Surface Pro 7 es una tablet 2 en 1 versátil y potente que se adapta a tu estilo de vida y necesidades. Si buscas un dispositivo que combine portabilidad y rendimiento, la Surface Pro 7 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla táctil PixelSense: Disfruta de una experiencia de visualización excepcional en su pantalla táctil PixelSense de alta resolución.\n• Potencia y rendimiento: Equipada con procesadores Intel Core de última generación para un rendimiento sin interrupciones.\n• Portabilidad superior: Su diseño delgado y ligero te permite llevarla a todas partes con facilidad.\n• Surface Pen compatible: Dibuja y toma notas de manera natural con el Surface Pen (se vende por separado).\n• Batería de larga duración: Trabaja y juega durante horas con una sola carga.\n\nDISEÑO Y VERSATILIDAD:\nLa Microsoft Surface Pro 7 combina la portabilidad de una tablet con la potencia de una laptop. Ya sea para trabajar o para entretenimiento, esta 2 en 1 se adapta a tus necesidades.\n\nGARANTÍA:\nRespaldamos la calidad de la Microsoft Surface Pro 7 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la Microsoft Surface Pro 7 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para mejorar tu productividad y entretenimiento.',
      images: ['surfacepro7.webp', 'surfacepro7-2.webp', 'surfacepro7-3.webp'],
      inStock: 9,
      price: 680.00,
      slug: 'microsoft-surface-pro-7',
      tags: ['tabletas', 'Microsoft', 'Windows'],
      brand: 'Microsoft',
      model: 'Surface Pro 7',
      type: 'tabletas',
    },
    {
      title: 'Razer Blade 15',
      description:
        '¡RAZER BLADE 15!\n\nLa Razer Blade 15 es una laptop gaming de alto rendimiento que te ofrece una experiencia de juego excepcional. Si buscas una laptop que combine potencia y estilo para tus sesiones de juego, la Blade 15 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Rendimiento gaming de primera clase: Equipada con procesadores potentes y tarjetas gráficas de alto rendimiento para disfrutar de juegos sin interrupciones.\n• Pantalla de alta velocidad de actualización: Disfruta de una experiencia de juego suave con una pantalla de alta velocidad de actualización.\n• Teclado personalizable Chroma RGB: Personaliza la iluminación del teclado para una experiencia de juego única.\n• Diseño delgado y elegante: La Razer Blade 15 combina rendimiento gaming con un diseño delgado y portátil.\n• Construcción premium: Fabricada con materiales de alta calidad para una durabilidad excepcional.\n\nDISEÑO Y RENDIMIENTO:\nLa Razer Blade 15 es conocida por su diseño elegante y su potencia de juego. Lleva tus juegos a un nivel superior con esta laptop gaming de primera clase.\n\nGARANTÍA:\nRespaldamos la calidad de la Razer Blade 15 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la Razer Blade 15 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para llevar tus juegos al siguiente nivel.',
      images: [
        'razerblade15.webp',
        'razerblade15-2.webp',
        'razerblade15-3.webp',
        'razerblade15-4.webp',
      ],
      inStock: 6,
      price: 2881.49,
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
      price: 790.99,
      slug: 'sony-xperia-1-iii',
      tags: ['smartphone', 'Sony', 'Android'],
      brand: 'Sony',
      model: 'Xperia 1 III',
      type: 'celulares',
    },
    {
      title: 'Logitech MX Master 3',
      description:
        '¡LOGITECH MX MASTER 3!\n\nEl Logitech MX Master 3 es un mouse inalámbrico avanzado que brinda comodidad y productividad excepcionales. Si buscas un mouse que te permita trabajar de manera más eficiente y cómoda, el MX Master 3 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Seguimiento de alta precisión: Experimenta un seguimiento preciso en una variedad de superficies.\n• Botones personalizables: Configura los botones para adaptarse a tus necesidades y flujo de trabajo.\n• Rueda de desplazamiento MagSpeed: Desplázate rápidamente a través de documentos y páginas web con esta rueda de desplazamiento de alta velocidad.\n• Batería de larga duración: Trabaja durante semanas con una sola carga gracias a la batería de larga duración.\n• Diseño ergonómico: El MX Master 3 se adapta cómodamente a tu mano para un uso prolongado.\n\nDISEÑO Y PRODUCTIVIDAD:\nEl Logitech MX Master 3 está diseñado para mejorar tu productividad. Ya sea para tareas creativas o de oficina, este mouse te ayudará a trabajar de manera más eficiente.\n\nGARANTÍA:\nRespaldamos la calidad del Logitech MX Master 3 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el Logitech MX Master 3 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para mejorar tu experiencia con los dispositivos de entrada.',
      images: [
        'logitechmxmaster3.webp',
        'logitechmxmaster3-2.webp',
        'logitechmxmaster3-3.webp',
        'logitechmxmaster3-4.webp',
      ],
      inStock: 25,
      price: 97.99,
      slug: 'logitech-mx-master-3',
      tags: ['accesorios', 'Logitech', 'Ratón'],
      brand: 'Logitech',
      model: 'MX Master 3',
      type: 'accesorios',
    },
    {
      title: 'Acer Predator Helios 300',
      description:
        '¡ACER PREDATOR HELIOS 300!\n\nLa Acer Predator Helios 300 es una laptop gaming de alto rendimiento que te sumerge en el mundo de los juegos de manera excepcional. Si buscas una laptop que ofrezca un rendimiento de juego de vanguardia a un precio asequible, la Helios 300 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Rendimiento gaming de alto nivel: Equipada con una tarjeta gráfica potente y un procesador rápido para juegos sin interrupciones.\n• Pantalla de alta velocidad de actualización: Disfruta de juegos suaves y con detalles nítidos en su pantalla de alta velocidad de actualización.\n• Teclado RGB personalizable: Personaliza la iluminación del teclado para una experiencia de juego única.\n• Diseño llamativo: La Helios 300 presenta un diseño gamer llamativo y audaz que destaca.\n• Refrigeración avanzada: Mantén tu laptop fresca incluso durante las sesiones de juego intensas.\n\nDISEÑO Y RENDIMIENTO:\nLa Acer Predator Helios 300 es conocida por su rendimiento y precio accesible. Lleva tus juegos favoritos al siguiente nivel con esta laptop gaming de alto rendimiento.\n\nGARANTÍA:\nRespaldamos la calidad de la Acer Predator Helios 300 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la Acer Predator Helios 300 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para mejorar tu experiencia de juego.',
      images: [
        'acerpredatorhelios300.webp',
        'acerpredatorhelios300-2.webp',
        'acerpredatorhelios300-3.webp',
        'acerpredatorhelios300-4.webp',
      ],
      inStock: 8,
      price: 1136.00,
      slug: 'acer-predator-helios-300',
      tags: ['laptop', 'Acer', 'Windows'],
      brand: 'Acer',
      model: 'Predator Helios 300',
      type: 'computadores',
    },
    {
      title: 'Alienware Aurora R10',
      description:
        '¡ALIENWARE AURORA R10!\n\nLa Alienware Aurora R10 es una PC de escritorio gaming de alto rendimiento que te ofrece una experiencia de juego de primera clase. Si buscas una PC que te permita disfrutar de juegos de alta calidad y rendimiento, la Aurora R10 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Potencia de juego extrema: Equipada con procesadores de alto rendimiento y tarjetas gráficas potentes para juegos de alta calidad.\n• Diseño futurista: La Aurora R10 presenta un diseño futurista y llamativo que destaca en tu configuración de juego.\n• Refrigeración avanzada: Mantén tu PC fresca incluso durante sesiones de juego intensas con su sistema de refrigeración avanzado.\n• Fácil actualización: Actualiza y personaliza tu Aurora R10 para mantenerla al día con las últimas tecnologías de juego.\n• Iluminación AlienFX: Personaliza la iluminación de tu PC para una experiencia de juego inmersiva.\n\nDISEÑO Y RENDIMIENTO:\nLa Alienware Aurora R10 es conocida por su potencia y estilo. Lleva tus juegos favoritos al siguiente nivel con esta PC de escritorio gaming de alto rendimiento.\n\nGARANTÍA:\nRespaldamos la calidad de la Alienware Aurora R10 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la Alienware Aurora R10 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para llevar tu experiencia de juego a otro nivel.',
      images: [
        'alienwareaurorar10.webp',
        'alienwareaurorar10-2.webp',
        'alienwareaurorar10-3.webp',
        'alienwareaurorar10-4.webp',
        'alienwareaurorar10-5.webp',
      ],
      inStock: 3,
      price: 2699.99,
      slug: 'alienware-aurora-r10',
      tags: ['computadores', 'Alienware', 'Gaming'],
      brand: 'Alienware',
      model: 'Aurora R10',
      type: 'computadores',
    },
    {
      title: 'Lenovo Yoga C940',
      description:
        '¡LENOVO YOGA C940!\n\nLa Lenovo Yoga C940 es una laptop 2 en 1 premium que combina estilo, rendimiento y versatilidad. Si buscas una laptop que se adapte a tu estilo de vida activo y creativo, la Yoga C940 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla táctil 4K HDR: Disfruta de una experiencia visual excepcional en su pantalla táctil 4K HDR.\n• Diseño delgado y elegante: La Yoga C940 presenta un diseño premium que destaca en cualquier lugar.\n• Rendimiento de alto nivel: Equipada con procesadores potentes y una gran cantidad de RAM para una productividad sin igual.\n• Bisagra giratoria: Convierte tu laptop en una tablet o en una presentación con su bisagra giratoria versátil.\n• Sonido de alta calidad: Experimenta un audio inmersivo con altavoces Dolby Atmos.\n\nDISEÑO Y VERSATILIDAD:\nLa Lenovo Yoga C940 se adapta a tu estilo de vida activo y creativo. Ya sea para trabajar o para entretenimiento, esta 2 en 1 te ofrece versatilidad y rendimiento.\n\nGARANTÍA:\nRespaldamos la calidad de la Lenovo Yoga C940 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre la Lenovo Yoga C940 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para mejorar tu productividad y creatividad.',
      images: [
        'lenovoyogac940.webp',
        'lenovoyogac940-2.webp',
        'lenovoyogac940-3.webp',
      ],
      inStock: 6,
      price: 1096.99,
      slug: 'lenovo-yoga-c940',
      tags: ['laptop', 'Lenovo', 'Windows'],
      brand: 'Lenovo',
      model: 'Yoga C940',
      type: 'computadores',
    },
    {
      title: 'Xiaomi Mi 11',
      description:
        '¡XIAOMI MI 11!\n\nEl Xiaomi Mi 11 es un smartphone de alto rendimiento que ofrece características de primera clase a un precio asequible. Si buscas un dispositivo que te brinde un rendimiento excepcional y una calidad de cámara impresionante, el Mi 11 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Cámara de 108 MP: Captura fotos y videos excepcionales con la cámara principal de 108 MP.\n• Pantalla AMOLED de alta resolución: Disfruta de colores vibrantes y detalles nítidos en su pantalla AMOLED de alta resolución.\n• Rendimiento potente: Equipado con un procesador rápido y una gran cantidad de RAM para un rendimiento sin igual.\n• Batería de larga duración: Mantén tu Mi 11 funcionando durante todo el día con una sola carga.\n• Carga rápida: Obtén una carga rápida que te permite volver a usar tu teléfono en poco tiempo.\n\nDISEÑO Y CALIDAD:\nEl Xiaomi Mi 11 presenta un diseño elegante y una construcción de alta calidad que se siente bien en la mano. Además, su enfoque en la fotografía lo convierte en una excelente opción para los amantes de la fotografía.\n\nGARANTÍA:\nRespaldamos la calidad del Xiaomi Mi 11 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el Xiaomi Mi 11 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para llevarte al siguiente nivel de la fotografía móvil.',
      images: [
        'xiaomimi11.webp',
        'xiaomimi11-2.webp',
        'xiaomimi11-3.webp',
        'xiaomimi11-4.webp',
      ],
      inStock: 14,
      price: 764.99,
      slug: 'xiaomi-mi-11',
      tags: ['smartphone', 'Xiaomi', 'Android'],
      brand: 'Xiaomi',
      model: 'Mi 11',
      type: 'celulares',
    },
    {
      title: 'AOC CQ32G1',
      description:
        '¡AOC CQ32G1!\n\nEl AOC CQ32G1 es un monitor curvo de alta calidad que brinda una experiencia de visualización inmersiva. Si buscas un monitor que ofrezca colores vibrantes y una experiencia de juego envolvente, el CQ32G1 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla curva de 32 pulgadas: Sumérgete en tus juegos y contenido multimedia con su pantalla curva de gran tamaño.\n• Alta velocidad de actualización: Disfruta de juegos suaves con una alta velocidad de actualización y un tiempo de respuesta rápido.\n• Colores vibrantes: La tecnología de panel VA ofrece colores precisos y negros profundos.\n• Diseño sin bordes: El CQ32G1 presenta un diseño sin bordes que maximiza tu espacio de pantalla.\n• Conexión versátil: Conéctate a tus dispositivos con múltiples puertos, incluidos HDMI y DisplayPort.\n\nDISEÑO Y EXPERIENCIA DE JUEGO:\nEl AOC CQ32G1 combina un diseño curvo con una alta velocidad de actualización para una experiencia de juego envolvente. Ya sea para juegos o para trabajo, este monitor te impresionará.\n\nGARANTÍA:\nRespaldamos la calidad del AOC CQ32G1 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el AOC CQ32G1 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para mejorar tu experiencia visual.',
      images: [
        'aoccq32g1.webp',
        'aoccq32g1-2.webp',
        'aoccq32g1-3.webp',
        'aoccq32g1-4.webp',
      ],
      inStock: 6,
      price: 395.99,
      slug: 'aoc-cq32g1',
      tags: ['monitores', 'AOC', 'Monitor'],
      brand: 'AOC',
      model: 'CQ32G1',
      type: 'monitores',
    },
    {
      title: 'JBL Flip 5',
      description:
        '¡JBL FLIP 5!\n\nEl JBL Flip 5 es un altavoz portátil que ofrece un sonido de alta calidad en un diseño compacto. Si buscas un altavoz que te permita llevar la música contigo a cualquier lugar, el Flip 5 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Sonido impresionante: Disfruta de un sonido claro y potente en un altavoz compacto.\n• Conectividad Bluetooth: Empareja tu dispositivo fácilmente y reproduce música de forma inalámbrica.\n• Resistente al agua: Lleva tu Flip 5 a la playa o la piscina sin preocuparte por salpicaduras.\n• Batería de larga duración: Escucha música durante horas con una sola carga de batería.\n• Diseño portátil: El diseño compacto y liviano del Flip 5 lo hace perfecto para llevarlo a cualquier lugar.\n\nDISEÑO Y MOVILIDAD:\nEl JBL Flip 5 combina un sonido impresionante con un diseño portátil que te permite disfrutar de tu música en movimiento. Ya sea en interiores o al aire libre, este altavoz te brinda una experiencia auditiva excepcional.\n\nGARANTÍA:\nRespaldamos la calidad del JBL Flip 5 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el JBL Flip 5 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para mejorar tu experiencia auditiva en cualquier lugar.',
      images: ['jblflip5.webp', 'jblflip5-2.webp', 'jblflip5-3.webp'],
      inStock: 18,
      price: 89.95,
      slug: 'jbl-flip-5',
      tags: ['accesorios', 'JBL', 'Altavoz'],
      brand: 'JBL',
      model: 'Flip 5',
      type: 'accesorios',
    },
    {
      title: 'Samsung Galaxy S21',
      description: '¡SAMSUNG GALAXY S21!\n\nEl Samsung Galaxy S21 es un smartphone de vanguardia que combina un diseño elegante con un rendimiento excepcional. Si buscas un dispositivo que te brinde una experiencia móvil de primer nivel, el Galaxy S21 es la elección perfecta.\n\nCARACTERÍSTICAS DESTACADAS:\n• Pantalla Dynamic AMOLED 2X: Disfruta de colores vibrantes y detalles nítidos en su pantalla Dynamic AMOLED 2X de alta resolución.\n• Rendimiento de alto nivel: Equipado con un potente procesador y una gran cantidad de RAM para un rendimiento sin igual.\n• Cámara versátil: Captura fotos y videos impresionantes con su sistema de cámara versátil que incluye una cámara principal de alta resolución.\n• 5G: Experimenta la velocidad y la conectividad de próxima generación con la compatibilidad 5G.\n• Diseño elegante: El Galaxy S21 presenta un diseño elegante y moderno que destaca en cualquier entorno.\n\nDISEÑO Y RENDIMIENTO:\nEl Samsung Galaxy S21 ofrece un diseño elegante y una calidad de construcción de alta gama. Su rendimiento de vanguardia te permite disfrutar de aplicaciones, juegos y multitarea sin problemas.\n\nGARANTÍA:\nRespaldamos la calidad del Samsung Galaxy S21 con una sólida garantía que cubre defectos de fabricación. Ten en cuenta que esta garantía no incluye daños causados por un uso inadecuado o accidentes.\n\nSi deseas obtener más información sobre el Samsung Galaxy S21 o tienes alguna pregunta adicional, no dudes en contactarnos. Estamos aquí para llevarte al siguiente nivel de experiencia móvil.',
      images: [
        'galaxys21.webp',
        'galaxys21-2.webp',
        'galaxys21-3.webp',
        'galaxys21-4.webp',
      ],
      inStock: 30,
      price: 579.97,
      capacity: ['256GB', '512GB'],
      slug: 'samsung-galaxy-s21',
      tags: ['smartphone', 'Samsung', 'Android'],
      brand: 'Samsung',
      model: 'Galaxy S21',
      type: 'celulares',
    },
  ],
};
