/**
 * EmprendeIgual - Datos Iniciales de Demostración
 * Fieles a la identidad de la Nacionalidad Épera (Eperãra Siapidaarã)
 * "Pueblo de la caña brava" / "Voz de caña brava"
 * Pueblo indígena de origen Emberá originario del Chocó y asentado en la costa norte de Ecuador
 * (ríos Cayapas y Santiago, Borbón, Eloy Alfaro / San Lorenzo, Esmeraldas).
 */

const INITIAL_DEMO_DATA = {
  // Información académica e institucional
  academicInfo: {
    institution: "Instituto Superior Tecnológico Alberto Enríquez",
    career: "Desarrollo de Software",
    subject: "Emprendimiento",
    project: "EmprendeIgual",
    motto: "Conectamos ideas, oportunidades y talento sin barreras",
    members: [
      "Darwin David Cabezas Alvarez",
      "Anny Canche"
    ],
    teacher: "Ana Solís",
    location: "Costa norte de Esmeraldas (San Lorenzo / Eloy Alfaro), Ecuador",
    year: 2026,
    summary: "EmprendeIgual es un prototipo web inclusivo dedicado a la Nacionalidad Épera (Eperãra Siapidaarã, pueblo de origen Emberá procedente del Chocó asentado en la costa norte de Ecuador), facilitando la comercialización directa de su cestería tradicional en paja tetera, tejidos en damagua, tallados y productos de la selva húmeda del río Cayapas."
  },

  // Perfil inicial de demostración (Usuario activo de la comunidad)
  defaultUserProfile: {
    id: "usr_epera_01",
    fullName: "Darwin David Cabezas Alvarez",
    email: "darwin.epera@emprendeigual.ec",
    userType: "emprendedor",
    gender: "prefiero_no_decir",
    termsAccepted: true,
    venture: {
      name: "Taller Épera Siapidaarã - Voz de Caña Brava",
      description: "Iniciativa artesanal de la nacionalidad Épera dedicada a la preservación del tejido fino en paja tetera y damagua con tintes vegetales del bosque húmedo del río Cayapas.",
      category: "Cestería y Fibras Naturales",
      location: "Río Cayapas / Borbón, Costa Norte de Esmeraldas",
      contactChannel: "Contacto comunitario demostrativo (+593 90 000 0000 / siapidaara@emprendeigual.ec)",
      responsibleName: "Darwin Cabezas",
      image: "assets/images/epera-mujer-chaquiras.jpg"
    }
  },

  // Catálogo representativo de productos Épera (Eperãra Siapidaarã)
  products: [
    {
      id: "prod_01",
      name: "Canasto Épera Tradicional en Fibra de Paja Tetera",
      ventureName: "Taller Épera Siapidaarã - Voz de Caña Brava",
      category: "Artesanías y Cestería",
      description: "Canasto tradicional tejido con fibras de paja tetera y tinturado con hojas y cortezas del bosque tropical.",
      extendedDescription: "Pieza emblemática del arte cestero de la nacionalidad Épera (Eperãra Siapidaarã), pueblo de origen Emberá de la cuenca del Chocó asentado en el norte de Esmeraldas. Las mujeres recolectan la paja tetera en las orillas de los afluentes del río Cayapas, la procesan en tiras finas y trenzan patrones geométricos que representan espíritus protectores (Jai) y elementos de la selva.",
      price: 26.00,
      image: "assets/images/epera-cesteria-collage.jpg",
      materials: "Fibra natural de paja tetera seleccionada, tintes vegetales extraídos de achiote y corteza de mangle.",
      elaborationProcess: "Cosecha en luna menguante, raspado con concha o cuchillo, secado al sol, tinturado en fogón de leña y tejido concéntrico a mano (requiere entre 4 y 6 días).",
      productUsage: "Canasto utilitario, almacenamiento de semillas o pieza decorativa de colección cultural.",
      location: "Río Cayapas (Borbón / Eloy Alfaro), Esmeraldas",
      contactChannel: "artesanias-epera@emprendeigual.ec",
      status: "aprobado",
      ownerId: "usr_epera_01",
      createdAt: "2026-03-01T10:00:00.000Z",
      featured: true
    },
    {
      id: "prod_02",
      name: "Lienzo y Tapiz de Corteza Vegetal de Damagua Tinturada",
      ventureName: "Artesanos del Río Santiago",
      category: "Artesanías y Cestería",
      description: "Tapiz elaborado a partir de la corteza interna del árbol de damagua (Poulsenia armata), con pintura corporal tradicional.",
      extendedDescription: "La damagua es la tela ancestral de la nacionalidad Épera. Se extrae de la corteza interior del árbol silvestre de damagua; tras ser golpeada rítmicamente con mazos de madera y lavada en el río, se suaviza hasta convertirse en un lienzo flexible sobre el cual se pintan figuras cosmogónicas y diseños geométricos con tinte de jagua y achiote.",
      price: 32.00,
      image: "assets/images/epera-retrato-conaie.jpg",
      materials: "Corteza natural de damagua (Poulsenia armata), pigmento vegetal negro de jagua (kiparukirda) y achiote rojo.",
      elaborationProcess: "Extracción respetuosa de corteza, macerado con mazo de chonta sobre tronco liso, lavado repetido en corriente fluvial y pintura a mano.",
      productUsage: "Cuadro mural, tapiz decorativo o mantel ceremonial de arte indígena.",
      location: "Comunidad Santa Rosa de los Épera, Esmeraldas",
      contactChannel: "damagua.epera@emprendeigual.ec",
      status: "aprobado",
      ownerId: "usr_epera_02",
      createdAt: "2026-03-02T11:30:00.000Z",
      featured: true
    },
    {
      id: "prod_03",
      name: "Collar Épera de Chaquiras con Diseños Geométricos Ancestrales",
      ventureName: "Mujeres Tejedores Eperãra",
      category: "Accesorios y Tejidos",
      description: "Gargantilla tejida a mano con mostacillas y chaquiras en patrones de rombos y colores vivos de la selva.",
      extendedDescription: "El tejido de pecheras y collares de chaquiras es una tradición viva entre las mujeres de la nacionalidad Épera y los pueblos Emberá del Pacífico. Cada diseño cromático evoca la piel de la serpiente, las aguas del río Cayapas o las flores del bosque húmedo tropical.",
      price: 18.50,
      image: "assets/images/epera-mujer-chaquiras.jpg",
      materials: "Chaquiras de vidrio de alta resistencia, hilo de nylon encerado, broche artesanal ajustable.",
      elaborationProcess: "Ensartado en telar de mano, siguiendo patrones matemáticos orales transmitidos de abuelas a nietas.",
      productUsage: "Accesorio de vestir de alto valor estético, ceremonial o para ocasiones especiales.",
      location: "Comunidad Bella Aurora, Esmeraldas",
      contactChannel: "chaquiras.epera@emprendeigual.ec",
      status: "aprobado",
      ownerId: "usr_epera_03",
      createdAt: "2026-03-03T09:15:00.000Z",
      featured: true
    },
    {
      id: "prod_04",
      name: "Bandeja Tejida en Paja Tetera 'Ojo de Agua'",
      ventureName: "Taller Épera Siapidaarã - Voz de Caña Brava",
      category: "Artesanías y Cestería",
      description: "Plato hondo y bandeja de fibra apretada con diseño concéntrico bicolor natural y negro de mangle.",
      extendedDescription: "Estructura plana y rígida con acabado liso que demuestra la maestría técnica del pueblo de la caña brava. Resistente a la humedad y confeccionada con materias primas renovables recolectadas bajo principios de manejo forestal comunitario.",
      price: 21.00,
      image: "assets/images/epera-canastos-detalle.jpg",
      materials: "Fibra de paja tetera fina, tintes vegetales sin químicos sintéticos.",
      elaborationProcess: "Selección de hebras finas de 1 mm, urdido espiral y prensado natural.",
      productUsage: "Frutero de mesa, bandeja para servir panes o elemento decorativo de pared.",
      location: "San Lorenzo / Borbón, Esmeraldas",
      contactChannel: "siapidaara@emprendeigual.ec",
      status: "aprobado",
      ownerId: "usr_epera_01",
      createdAt: "2026-03-04T14:20:00.000Z",
      featured: true
    },
    {
      id: "prod_05",
      name: "Pasta de Cacao Silvestre del Río Cayapas (400g)",
      ventureName: "Chacras Agroforestales Épera",
      category: "Alimentos Tradicionales",
      description: "Cacao fino de aroma cultivado bajo sombra en chacras tradicionales Épera sin pesticidas químicos.",
      extendedDescription: "Los Épera combinan la caza, pesca y recolección con cultivos en chacras familiares en las vegas de los ríos. Este cacao nacional se cosecha a mano, se fermenta en cajones rústicos de madera y se tuesta en paila de barro tradicional para producir un chocolate 100% puro y aromático.",
      price: 7.00,
      image: "assets/images/epera-ninos-comunidad.jpg",
      materials: "100% granos de cacao fino de aroma esmeraldeño cultivado agroecológicamente.",
      elaborationProcess: "Fermentación natural de 5 días, secado al sol en esteras de paja, tostado a leña y molienda artesanal.",
      productUsage: "Bebida de chocolate caliente con canela o jengibre, repostería y consumo energético natural.",
      location: "Riberas del Río Cayapas, Esmeraldas",
      contactChannel: "cacao.epera@emprendeigual.ec",
      status: "aprobado",
      ownerId: "usr_epera_04",
      createdAt: "2026-03-05T16:00:00.000Z",
      featured: true
    },
    {
      id: "prod_06",
      name: "Talla Épera en Madera de Balsa y Chonta (Espíritus Jai)",
      ventureName: "Talladores Ancestrales Épera",
      category: "Artesanías y Cestería",
      description: "Escultura en balsa y maderas tropicales representando aves de la selva y bastones rituales Jaipana.",
      extendedDescription: "En la cosmovisión Épera de origen Emberá, el Jaipana (médico y sabio tradicional) utiliza bastones de madera tallada con figuras de espíritus auxiliares (Jai). Esta pieza artística es una recreación artesanal respetuosa tallada en maderas livianas y sostenibles del entorno fluvial.",
      price: 28.00,
      image: "assets/images/epera-panel-cultura.jpg",
      materials: "Madera de balsa reforestada, detalles en chonta oscura, tintes naturales.",
      elaborationProcess: "Talla manual con formón y cuchillo curvo, pulido con hojas ásperas de la selva y aplicación de cera vegetal.",
      productUsage: "Escultura de arte indígena, pieza de museo comunitario o adorno.",
      location: "Comunidad Épera Las Palmas, Esmeraldas",
      contactChannel: "tallas.epera@emprendeigual.ec",
      status: "aprobado",
      ownerId: "usr_epera_05",
      createdAt: "2026-03-06T08:30:00.000Z",
      featured: true
    },
    {
      id: "prod_07",
      name: "Recorrido Comunitario Fluvial e Interpretación del Bosque Épera",
      ventureName: "Rutas Vivas del Río Cayapas",
      category: "Servicios Comunitarios",
      description: "Jornada guiada en canoa tradicional con jóvenes de la nacionalidad Épera: saberes de plantas, idioma Siapadee y cestería.",
      extendedDescription: "Experiencia de turismo comunitario responsable para conocer el modo de vida fluvial de los Eperãra Siapidaarã en la costa norte de Esmeraldas. Incluye navegación en canoa, demostración del raspado de paja tetera, degustación de alimentos tradicionales y charla sobre el origen Emberá y la llegada histórica a Ecuador desde el Chocó.",
      price: 35.00,
      image: "assets/images/epera-danza-musica.jpg",
      materials: "Canoa tradicional con chalecos salvavidas, guías locales comunitarios hablantes de Siapadee y español.",
      elaborationProcess: "Coordinación previa con la asamblea comunitaria, bajo normas de respeto cultural y mínimo impacto ambiental.",
      productUsage: "Educación ambiental, intercambio cultural respetuoso y apoyo directo a la economía comunitaria.",
      location: "Muelle de Borbón / Río Cayapas, Esmeraldas",
      contactChannel: "turismo.epera@emprendeigual.ec",
      status: "aprobado",
      ownerId: "usr_epera_06",
      createdAt: "2026-03-07T13:45:00.000Z",
      featured: false
    },
    {
      id: "prod_08",
      name: "Tinte Natural de Jagua (Kiparukirda) para Arte Corporal Épera (100ml)",
      ventureName: "Saberes de la Selva Épera",
      category: "Productos de la Selva",
      description: "Extracto vegetal de fruto de jagua (Genipa americana) utilizado tradicionalmente por los Épera para pintura corporal transitoria.",
      extendedDescription: "La pintura corporal es fundamental en la identidad de los Eperãra Siapidaarã: hombres y mujeres pintan sus brazos, piernas y rostros con motivos geométricos para fiestas, trabajo y protección contra insectos y energías adversas. La tinta se oxida en la piel tornándose de un azul oscuro o negro azulado durante 10 a 15 días.",
      price: 11.00,
      image: "assets/images/epera-vestimenta-pareja.jpg",
      materials: "Jugo puro extraído de frutos verdes de jagua silvestre cosechados a orillas del río.",
      elaborationProcess: "Rallado fino de la fruta verde, prensado con paño limpio y filtrado natural sin químicos.",
      productUsage: "Tatuajes temporales naturales, tinturado de fibras textiles y artesanías en madera.",
      location: "Río Cayapas, Esmeraldas",
      contactChannel: "jagua.epera@emprendeigual.ec",
      status: "aprobado",
      ownerId: "usr_epera_07",
      createdAt: "2026-03-08T15:10:00.000Z",
      featured: false
    },
    // Publicación de prueba en estado pendiente para demostrar el panel administrativo
    {
      id: "prod_09_pending",
      name: "Abanico Tejido en Fibras de Caña Brava y Palma",
      ventureName: "Taller Épera Siapidaarã - Voz de Caña Brava",
      category: "Artesanías y Cestería",
      description: "Abanico manual tradicional trenzado con fibras resistentes de caña brava y hojas de palma fluvial.",
      extendedDescription: "Inspirado en el nombre ancestral de la nacionalidad ('pueblo de la caña brava'). Objeto utilitario indispensable para avivar el fuego en los fogones familiares y para refrescarse del calor tropical húmedo del Chocó y de Esmeraldas.",
      price: 9.50,
      image: "assets/images/epera-canastos-detalle.jpg",
      materials: "Tiras finas de caña brava silvestre y palma de la ribera.",
      elaborationProcess: "Corte manual, secado a la sombra y trenzado cruzado reforzado en el mango de madera.",
      productUsage: "Uso doméstico de cocina tradicional, ventilación personal o decoración.",
      location: "Borbón / Río Cayapas, Esmeraldas",
      contactChannel: "darwin.epera@emprendeigual.ec",
      status: "pendiente",
      ownerId: "usr_epera_01",
      createdAt: "2026-03-09T09:00:00.000Z",
      featured: false
    },
    {
      id: "prod_10_pending",
      name: "Pulsera Épera de Semillas de Tagua y Palma Chonta",
      ventureName: "Accesorios Eperãra",
      category: "Accesorios y Tejidos",
      description: "Pulsera unisex ajustable con cuentas talladas a mano de tagua natural y semillas de chonta.",
      extendedDescription: "Complemento personal ecológico confeccionado por jóvenes artesanos Épera utilizando semillas recolectadas en el bosque tropical sin talar árboles.",
      price: 6.50,
      image: "assets/images/epera-artesanas-grupo.jpg",
      materials: "Semillas de tagua (marfil vegetal), pepas de chonta y cordón corredizo encerado.",
      elaborationProcess: "Perforación manual, lijado con ceniza y pulido suave con aceites vegetales.",
      productUsage: "Accesorio casual resistente y sostenible.",
      location: "San Lorenzo, Esmeraldas",
      contactChannel: "artesanias-semillas@emprendeigual.ec",
      status: "pendiente",
      ownerId: "usr_epera_08",
      createdAt: "2026-03-09T11:20:00.000Z",
      featured: false
    }
  ],

  // 6 Recursos de capacitación digital contextualizados a la realidad de la comunidad Épera
  learningModules: [
    {
      id: "mod_01",
      title: "Cómo tomar fotografías atractivas de tus artesanías y tejidos Épera",
      category: "Fotografía y Presentación",
      icon: "camera",
      duration: "10 min",
      summary: "Aprende a capturar con tu celular la finura del tejido de paja tetera, los matices de la damagua y los vivos colores de las chaquiras usando la luz natural del río.",
      tips: [
        "Aprovecha la luz de la mañana (8:00 a 10:30 am) en el corredor de tu vivienda; la luz difusa resalta el relieve de los tejidos en paja tetera.",
        "Coloca las piezas sobre fondos limpios y contrastantes: una tela de damagua lisa, una madera rústica limpia o una superficie clara sin distractores.",
        "Limpia siempre el lente del teléfono con un paño suave antes de tomar la foto para evitar reflejos o imágenes borrosas por la humedad del clima tropical.",
        "Toma al menos 3 tomas: una del canasto completo, una de cerca mostrando la trama del tejido y otra mostrando su utilidad práctica."
      ],
      fullContent: `
        <h4>1. La importancia visual de la artesanía Épera</h4>
        <p>Las personas que compran en internet no pueden tocar la suavidad de la damagua ni sentir la firmeza de la paja tetera. La fotografía es el puente de confianza para mostrar que cada pieza es única y tejida pacientemente a mano.</p>
        
        <h4>2. Cómo captar los detalles del tejido</h4>
        <p>Los clientes valoran mucho ver la precisión de las tramas geométricas y la pureza de los tintes vegetales naturales (como el achiote o el mangle). Acércate a unos 20 centímetros y enfoca el centro de la pieza con buena luz sin usar el flash directo del celular.</p>
        
        <h4>3. Ángulos recomendados para cestería</h4>
        <ul>
          <li><strong>Vista diagonal a 45°:</strong> Muestra tanto el borde superior, la profundidad interior y la pared tejida del canasto.</li>
          <li><strong>Vista cenital (desde arriba):</strong> Ideal para platos, abanicos y bandejas 'Ojo de agua'.</li>
          <li><strong>Detalle del tejido (Macro):</strong> Evidencia que es una auténtica manufactura de la nacionalidad Épera.</li>
        </ul>
      `
    },
    {
      id: "mod_02",
      title: "Cómo escribir una descripción comercial clara de tus productos",
      category: "Comunicación Comercial",
      icon: "pen-tool",
      duration: "12 min",
      summary: "Explica con orgullo los materiales del bosque húmedo, el significado de los diseños Siapidaarã y las dimensiones exactas para que el comprador valore tu trabajo.",
      tips: [
        "Indica claramente el nombre Épera de la pieza y su uso común (ejemplo: 'Canasto de paja tetera con tintes naturales de mangle').",
        "Menciona siempre las medidas aproximadas en centímetros (alto y diámetro) y peso aproximado.",
        "Destaca el tiempo de elaboración (ejemplo: 'Tejido a mano durante 5 días por artesanas del río Cayapas').",
        "Ofrece recomendaciones de cuidado: mantener seco, limpiar con paño suave y no exponer a humedad extrema."
      ],
      fullContent: `
        <h4>1. Contar la historia cultural detrás de la pieza</h4>
        <p>El valor de la artesanía Épera radica en su raíz ancestral Emberá del Chocó y su conexión con el bosque del norte esmeraldeño. Explicar el origen de la paja tetera o la corteza de damagua emociona y genera un precio justo de venta.</p>
        <h4>2. Estructura recomendada:</h4>
        <ol>
          <li><strong>Título claro:</strong> Producto + Material + Origen Épera.</li>
          <li><strong>Historia y materiales:</strong> De dónde viene la fibra y qué tintes vegetales se usaron.</li>
          <li><strong>Dimensiones y acabados:</strong> Medidas reales y durabilidad.</li>
          <li><strong>Cuidados:</strong> Cómo conservarlo por años.</li>
        </ol>
      `
    },
    {
      id: "mod_03",
      title: "Cómo atender consultas de clientes y compradores con calidez",
      category: "Servicio al Cliente",
      icon: "message-circle",
      duration: "8 min",
      summary: "Pautas sencillas para responder mensajes por WhatsApp o correo, acordar puntos de entrega en San Lorenzo o Borbón y coordinar envíos de forma confiable.",
      tips: [
        "Saluda cordialmente con amabilidad y preséntate como integrante del taller o emprendimiento Épera.",
        "Responde con rapidez; los compradores toman decisiones de compra en los primeros minutos.",
        "Ten anotados previamente los precios de tus productos y los costos aproximados de transporte o encomienda.",
        "Confirma siempre la dirección exacta y el número telefónico de quien recibe antes de despachar cualquier pedido."
      ],
      fullContent: `
        <h4>1. Transparencia y amabilidad</h4>
        <p>La calidez humana de los pueblos indígenas es un valor muy apreciado. Informar con honestidad si un canasto requiere días adicionales de tejido refuerza la confianza del comprador.</p>
        <h4>2. Ejemplo de mensaje de respuesta:</h4>
        <p><em>'¡Hola! Qué gusto saludarte. Soy integrante del taller de cestería Épera en el río Cayapas. El canasto de paja tetera está disponible por $26 USD y mide 25 cm. Podemos coordinar la entrega en San Lorenzo o enviarlo por encomienda segura. ¿Deseas más fotos?'</em></p>
      `
    },
    {
      id: "mod_04",
      title: "Introducción al marketing digital para artesanos indígenas",
      category: "Estrategia Digital",
      icon: "trending-up",
      duration: "15 min",
      summary: "Aprende conceptos fundamentales para promocionar la riqueza cultural Épera en redes sociales y plataformas web comunitarias.",
      tips: [
        "Muestra videos o fotos del proceso de tejido y recolección de fibras; a la gente le apasiona ver las manos trabajando.",
        "Utiliza la etiqueta cultural 'Nacionalidad Épera' y 'Artesanías del Chocó / Esmeraldas' para diferenciarte de productos plásticos industriales.",
        "Solicita con respeto a los clientes que te envíen una foto de cómo quedó el producto decorando su casa.",
        "Participa en catálogos comunitarios para sumar fuerzas entre varios talleres del río Cayapas."
      ],
      fullContent: `
        <h4>1. No compitas por precio, compite por autenticidad</h4>
        <p>Un canasto artesanal Épera no es un balde plástico: es una herencia cultural milenaria. El marketing digital debe enfocar la sostenibilidad, la cultura Siapidaarã y el comercio justo.</p>
      `
    },
    {
      id: "mod_05",
      title: "Seguridad digital y protección de tus datos personales",
      category: "Seguridad Digital",
      icon: "shield-check",
      duration: "10 min",
      summary: "Aprende a proteger tu dinero, verificar pagos legítimos y evitar engaños telefónicos o digitales.",
      tips: [
        "Nunca entregues tus claves secretas, claves bancarias o códigos que te lleguen por mensaje a nadie que te llame.",
        "Comprueba que el dinero de una transferencia esté realmente acreditado en tu cuenta antes de entregar mercancía a transportistas desconocidos.",
        "No abras enlaces dudosos que te prometan premios o amenacen con bloquear tu cuenta.",
        "Mantén protegidos los datos y domicilios de tus compradores."
      ],
      fullContent: `
        <h4>1. Cuidado con los comprobantes de depósito falsos</h4>
        <p>Siempre revisa el saldo disponible de tu libreta de ahorros o cooperativa antes de embarcar paquetes hacia otras ciudades.</p>
      `
    },
    {
      id: "mod_06",
      title: "Finanzas básicas para talleres de cestería y chacras Épera",
      category: "Gestión Financiera",
      icon: "dollar-sign",
      duration: "14 min",
      summary: "Aprende a valorar las horas que dedicas a tejer, considerar el costo de los tintes y fijar precios que garanticen el bienestar de tu familia.",
      tips: [
        "Calcula siempre el valor de tu tiempo: si te toma 20 horas tejer un canasto, ese tiempo debe tener una remuneración digna.",
        "Separa el dinero de las ventas de los gastos diarios de la casa para que el taller siempre pueda comprar más fibras o herramientas.",
        "Anota en un cuaderno todas las ventas que hagas cada mes para saber qué productos son los más solicitados.",
        "Guarda un fondo de reserva para imprevistos de salud o temporadas de lluvia en el río."
      ],
      fullContent: `
        <h4>1. La fórmula del precio justo</h4>
        <p><strong>Costo de fibras y tintes + Pago por tus horas de tejido + Transporte hacia la ciudad + Fondo de ahorro del taller = Precio de venta digno.</strong></p>
      `
    }
  ],

  // Validaciones académicas iniciales demostrativas
  academicValidations: [
    {
      id: "val_01",
      participantId: "Evaluador_Academico_01",
      userProfile: "Docente / Evaluador",
      q1_purpose: "Sí, queda perfectamente claro que promueve los productos y la identidad de la Nacionalidad Épera (origen Emberá del Chocó en el norte de Esmeraldas).",
      q2_registration: "Sí, tanto el botón principal de la portada como la pestaña Mi Perfil facilitan el registro.",
      q3_catalog: "Sí, el catálogo con filtros de cestería, paja tetera, damagua y alimentos es muy intuitivo y fluido.",
      q4_usability: "Excelente diseño visual con los colores institucionales, fuentes legibles y respuestas interactivas claras.",
      q5_equality: "Sí, garantiza visibilidad equitativa sin sesgos de género ni discriminación.",
      q6_improvements: "Continuar ampliando a futuro grabaciones de audio en idioma propio Siapadee en los módulos de capacitación.",
      date: "2026-03-10"
    }
  ]
};

window.INITIAL_DEMO_DATA = INITIAL_DEMO_DATA;
