/**
 * MAGIC GLOW - Luxury Skincare Brand
 * Complete Product Catalog & Category Taxonomy
 */

const CATEGORIES_DATA = [
  { id: 'face-wash', name: 'Face Wash', icon: 'fa-wand-magic-sparkles', count: 1, desc: 'Golden nectars that purify & brighten' },
  { id: 'cleansers', name: 'Cleansers', icon: 'fa-soap', count: 1, desc: 'Velvet foaming & balmy purifiers' },
  { id: 'toners', name: 'Toners', icon: 'fa-droplet', count: 1, desc: 'Hydro-distilled botanical elixirs' },
  { id: 'serums', name: 'Serums', icon: 'fa-flask-vial', count: 2, desc: 'Ultra-concentrated bio-active elixirs' },
  { id: 'day-cream', name: 'Day Cream', icon: 'fa-sun', count: 1, desc: 'Shielding velvet moisture with SPF' },
  { id: 'night-cream', name: 'Night Cream', icon: 'fa-moon', count: 1, desc: 'Midnight restorative cellular alchemy' },
  { id: 'eye-cream', name: 'Eye Cream', icon: 'fa-eye', count: 1, desc: 'Lifting micro-peptides for delicate gaze' },
  { id: 'sunscreen', name: 'Sunscreen', icon: 'fa-shield-halved', count: 1, desc: 'Invisible gold sheen UV protection' },
  { id: 'face-masks', name: 'Face Masks', icon: 'fa-spa', count: 2, desc: '24K Peel-off & Detox Clay rituals' },
  { id: 'scrubs', name: 'Scrubs', icon: 'fa-hand-sparkles', count: 1, desc: 'Micro-crystal refining polish' },
  { id: 'lip-care', name: 'Lip Care', icon: 'fa-heart', count: 1, desc: 'Gold flecked hydrating lip nectar' },
  { id: 'combos', name: 'Combos & Gift Sets', icon: 'fa-gift', count: 1, desc: 'The ultimate royal skincare rituals' }
];

const PRODUCTS_DATA = [
  {
    id: 'mg-01',
    name: 'Magic Glow Gold Radiance Face Wash',
    subtitle: '24K Colloidal Gold & Saffron Cleansing Nectar',
    category: 'Face Wash',
    categorySlug: 'face-wash',
    filterTag: 'cleansers-toners',
    price: 799,
    originalPrice: 999,
    discount: '20% OFF',
    rating: 4.9,
    reviewsCount: 428,
    badge: 'Best Seller',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Purifies deeply, restores natural pH 5.5, and unveils a radiant 24K golden sheen.',
    description: 'An opulent daily nectar enriched with suspended 24K gold flakes, pure Kashmiri saffron, and wild rose water. Cleanses away pollution, makeup, and excess sebum while cocooning skin in protective moisture.',
    volume: '150 ml / 5.1 fl. oz.',
    sizes: [
      { size: '100 ml', price: 599, original: 749 },
      { size: '150 ml', price: 799, original: 999, default: true },
      { size: '250 ml', price: 1199, original: 1499 }
    ],
    activeIngredients: ['24K Colloidal Gold', 'Kashmiri Mongra Saffron', 'Damask Rose Water', 'Pro-Vitamin B5'],
    benefits: [
      'Melt away environmental pollutants without barrier disruption',
      '24K gold stimulates micro-circulation for an instant rosy radiance',
      'Saffron extract diminishes dullness and balances pigmentation',
      'Infused with amino acids to retain cellular moisture all day'
    ],
    howToUse: [
      'Dispense one pump into moist palms and work into a rich, golden lather.',
      'Massage gently across face and neck using circular upward motions for 60 seconds.',
      'Rinse with tepid water and pat skin dry with a silk or cotton towel.'
    ],
    suitableFor: ['All Skin Types', 'Dull Skin', 'Uneven Texture'],
    routineStep: 'Step 1: Purify',
    routineTime: ['am', 'pm'],
    pairedWith: 'mg-03',
    faq: [
      { q: 'Can I use this daily?', a: 'Yes! It is formulated without sulfates (SLS/SLES) at a balanced pH 5.5, making it gentle enough for morning and evening use.' },
      { q: 'Will the gold flakes clog my pores?', a: 'Not at all. Our 24K gold is micronized and colloidal, absorbing effortlessly without residue.' }
    ]
  },
  {
    id: 'mg-02',
    name: 'Magic Glow Gentle Foaming Cleanser',
    subtitle: 'Amino-Acid Cloud Foam with Chamomile & Centella',
    category: 'Cleansers',
    categorySlug: 'cleansers',
    filterTag: 'cleansers-toners',
    price: 849,
    originalPrice: 1049,
    discount: '19% OFF',
    rating: 4.8,
    reviewsCount: 312,
    badge: 'Gentle Luxury',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Cloud-soft micro-foam that calms reactivity, relieves redness, and cleanses gently.',
    description: 'A cloud-like whisper of botanical comfort. Formulated with fermented apple amino acids, blue chamomile, and Centella Asiatica to melt pore buildup while soothing hypersensitive, reactive skin.',
    volume: '120 ml / 4.0 fl. oz.',
    sizes: [
      { size: '120 ml', price: 849, original: 1049, default: true },
      { size: '200 ml', price: 1299, original: 1599 }
    ],
    activeIngredients: ['Apple Amino Acids', 'German Blue Chamomile', 'Centella Asiatica', 'Colloidal Oatmeal'],
    benefits: [
      'Generates self-foaming micro-bubbles for zero friction cleansing',
      'Calms redness, flushing, and barrier discomfort in minutes',
      'Preserves the delicate acid mantle with 0% soap or sulfates'
    ],
    howToUse: [
      'Pump 1-2 clouds of foam directly onto damp skin.',
      'Gently sweep across eyelids, face, and jawline in feather-light circles.',
      'Splash clean with cool water.'
    ],
    suitableFor: ['Sensitive', 'Dry', 'Redness-Prone', 'Post-Treatment'],
    routineStep: 'Step 1: Purify',
    routineTime: ['am', 'pm'],
    pairedWith: 'mg-03',
    faq: [
      { q: 'Does it remove eye makeup?', a: 'Yes, it effortlessly dissolves non-waterproof mascara and eye makeup without stinging the eyes.' }
    ]
  },
  {
    id: 'mg-03',
    name: 'Magic Glow Rose Hydrating Toner',
    subtitle: 'Steam-Distilled Damask Rose & Multi-Molecular HA Mist',
    category: 'Toners',
    categorySlug: 'toners',
    filterTag: 'cleansers-toners',
    price: 699,
    originalPrice: 899,
    discount: '22% OFF',
    rating: 4.9,
    reviewsCount: 518,
    badge: 'Customer Favorite',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Drenches thirsting skin in dewy rose hydration and primes for serum absorption.',
    description: 'Captured from fresh Kannauj Damask rose petals at dawn, combined with triple-weight hyaluronic acid and golden witch hazel. Tightens appearance of pores, calms irritation, and locks in dewy hydration.',
    volume: '100 ml / 3.4 fl. oz.',
    sizes: [
      { size: '100 ml', price: 699, original: 899, default: true },
      { size: '200 ml', price: 1149, original: 1449 }
    ],
    activeIngredients: ['Kannauj Damask Rose Water', 'Multi-Weight Hyaluronic Acid', 'Niacinamide (2%)', 'Witch Hazel'],
    benefits: [
      'Delivers an immediate +120% surge in skin hydration',
      'Refines the look of enlarged pores and balances sebum',
      'Provides an exquisite aromatherapeutic lift of royal roses'
    ],
    howToUse: [
      'Close eyes and spritz 3-4 generous mists directly over clean face and neck.',
      'Gently press into skin with clean palms until completely absorbed.',
      'Can also be spritzed over makeup throughout the day for an instant golden refresh.'
    ],
    suitableFor: ['All Skin Types', 'Dehydrated', 'Dullness'],
    routineStep: 'Step 2: Balance & Tone',
    routineTime: ['am', 'pm'],
    pairedWith: 'mg-04',
    faq: [
      { q: 'Is there any alcohol in this toner?', a: 'Zero percent alcohol. It is 100% steam distillate and skin-replenishing actives.' }
    ]
  },
  {
    id: 'mg-04',
    name: 'Magic Glow Vitamin C Glow Serum',
    subtitle: '15% Ethyl Ascorbic Acid + 24K Gold & Ferulic Acid',
    category: 'Serums',
    categorySlug: 'serums',
    filterTag: 'serums-creams',
    price: 1299,
    originalPrice: 1699,
    discount: '24% OFF',
    rating: 5.0,
    reviewsCount: 892,
    badge: 'Award Winner',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Fades dark spots, amplifies collagen, and unleashes high-voltage golden radiance.',
    description: 'Our crown-jewel daily brightening elixir. A stabilized 15% Vitamin C complex powered by Australian Kakadu Plum, ferulic acid, and pure 24K gold nano-particles. Visibly brightens pigmentation, boosts elasticity, and delivers glass skin in 14 days.',
    volume: '30 ml / 1.0 fl. oz.',
    sizes: [
      { size: '30 ml', price: 1299, original: 1699, default: true },
      { size: '50 ml', price: 1899, original: 2499 }
    ],
    activeIngredients: ['15% 3-O-Ethyl Ascorbic Acid', '24K Colloidal Gold', 'Ferulic Acid (0.5%)', 'Kakadu Plum Extract'],
    benefits: [
      'Visibly reduces stubborn acne marks and hyperpigmentation in 2 weeks',
      'Stimulates fibroblast collagen synthesis by +68%',
      'Defends against oxidative stress and urban blue-light damage',
      'Silky golden finish with zero stickiness or oxidation'
    ],
    howToUse: [
      'Apply 3-4 drops to cleansed and toned face every morning.',
      'Gently pat with fingertips until the golden elixir dissolves into the skin.',
      'Follow with Magic Glow Day Cream SPF 30 for maximum UV photoprotection.'
    ],
    suitableFor: ['Pigmentation', 'Dull Skin', 'Sun Damage', 'Uneven Tone'],
    routineStep: 'Step 3: Treat & Illuminate',
    routineTime: ['am'],
    pairedWith: 'mg-06',
    faq: [
      { q: 'Will this serum turn yellow/orange over time?', a: 'No! We use advanced 3-O-Ethyl Ascorbic Acid which remains photostable and clear until the last drop.' }
    ]
  },
  {
    id: 'mg-05',
    name: 'Magic Glow Hyaluronic Hydra Serum',
    subtitle: '7-Layer Multi-Molecular Hyaluronic & Panthenol Complex',
    category: 'Serums',
    categorySlug: 'serums',
    filterTag: 'serums-creams',
    price: 1199,
    originalPrice: 1499,
    discount: '20% OFF',
    rating: 4.9,
    reviewsCount: 386,
    badge: 'Hydration Gold',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Plumps fine dehydration lines, floods 7 skin depths with water, and creates bouncy skin.',
    description: 'An architectural moisture infusion. Blends 7 distinct molecular weights of hyaluronic acid from micro-penetrating to macro-shielding, enriched with provitamin B5 and marine minerals for 72-hour moisture reservoir storage.',
    volume: '30 ml / 1.0 fl. oz.',
    sizes: [
      { size: '30 ml', price: 1199, original: 1499, default: true },
      { size: '50 ml', price: 1749, original: 2199 }
    ],
    activeIngredients: ['7-Molecular Hyaluronic Acid', 'Panthenol (5%)', 'Polyglutamic Acid', 'Snow Mushroom Extract'],
    benefits: [
      'Immediate plumping effect diminishes the appearance of dehydration lines',
      'Provides a cushiony, supple bounce to fatigued skin',
      'Locks in deep moisture for up to 72 continuous hours'
    ],
    howToUse: [
      'Apply 3 drops onto slightly damp skin after toning.',
      'Gently press across cheeks, forehead, and neck.',
      'Seal with your favorite Magic Glow day or night cream.'
    ],
    suitableFor: ['Dry Skin', 'Dehydrated Skin', 'Fine Lines', 'All Types'],
    routineStep: 'Step 3: Treat & Plump',
    routineTime: ['am', 'pm'],
    pairedWith: 'mg-07',
    faq: [
      { q: 'Should I apply on dry or damp skin?', a: 'Always apply onto slightly damp skin to let the hyaluronic acid bind external moisture directly into your cells.' }
    ]
  },
  {
    id: 'mg-06',
    name: 'Magic Glow Day Cream SPF 30',
    subtitle: 'Radiance Shield with Niacinamide & Squalane',
    category: 'Day Cream',
    categorySlug: 'day-cream',
    filterTag: 'serums-creams',
    price: 1099,
    originalPrice: 1399,
    discount: '21% OFF',
    rating: 4.8,
    reviewsCount: 462,
    badge: 'Daily Essential',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Velvety daily shield that hydrates, protects against UV rays, and primes with a golden finish.',
    description: 'A multi-defense whipped emulsion that combines pure sugarcane squalane, 4% niacinamide, and broad-spectrum SPF 30. Melts instantly into the skin without white cast, creating a luminous canvas that wears beautifully under makeup.',
    volume: '50 ml / 1.7 fl. oz.',
    sizes: [
      { size: '50 ml', price: 1099, original: 1399, default: true },
      { size: '100 ml', price: 1699, original: 2199 }
    ],
    activeIngredients: ['Pure Olive Squalane', 'Niacinamide (4%)', 'Broad Spectrum SPF 30 Filters', '24K Micro-Mica'],
    benefits: [
      'Dual-action day moisturizer and UV barrier defense',
      'Niacinamide refines skin texture and minimizes the look of pores',
      'Leaves skin soft, velvety, and subtly glowing without feeling greasy'
    ],
    howToUse: [
      'Scoop a pearl-sized amount onto fingertips.',
      'Dot across forehead, cheeks, nose, and chin, smoothing outward in even strokes.',
      'Allow 2 minutes to absorb before applying sunscreen or cosmetics.'
    ],
    suitableFor: ['Normal', 'Dry', 'Combination', 'Dull Skin'],
    routineStep: 'Step 4: Moisturize & Shield',
    routineTime: ['am'],
    pairedWith: 'mg-09',
    faq: [
      { q: 'Does it leave a white cast on dusky skin tones?', a: 'Zero white cast! It absorbs transparently on all Fitzpatrick skin tones.' }
    ]
  },
  {
    id: 'mg-07',
    name: 'Magic Glow Midnight Repair Night Cream',
    subtitle: '24K Gold & Bio-Retinol Cellular Regeneration Soufflé',
    category: 'Night Cream',
    categorySlug: 'night-cream',
    filterTag: 'serums-creams',
    price: 1499,
    originalPrice: 1999,
    discount: '25% OFF',
    rating: 5.0,
    reviewsCount: 1240,
    badge: 'Hero Product',
    isHero: true,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Rebuilds skin barrier overnight, stimulates collagen, and delivers woke-up-like-this radiance.',
    description: 'The epitome of nighttime luxury. Infused with 24K colloidal gold, plant-derived Bakuchiol (gentle bio-retinol), copper tripeptide-1, and ceremonial shea butter. Accelerates natural cellular renewal during the peak regenerative circadian hours (11 PM - 4 AM) so you awaken to firm, baby-soft, luminous skin.',
    volume: '50 ml / 1.7 fl. oz.',
    sizes: [
      { size: '50 ml', price: 1499, original: 1999, default: true },
      { size: '100 ml', price: 2399, original: 3199 }
    ],
    activeIngredients: ['24K Pure Colloidal Gold', 'Bakuchiol (1.5%)', 'Copper Tripeptide-1', 'Ceramide NP Complex'],
    benefits: [
      '8-Hour continuous deep cellular restorative repair',
      'Increases collagen synthesis and visibly firms facial contours',
      '96% of users reported restored lipid barrier within 7 nights',
      'Non-irritating alternative to synthetic retinoids — zero peeling or redness'
    ],
    howToUse: [
      'Warm a hazelnut amount between clean palms to activate the botanical gold oils.',
      'Press gently into face, jawline, and décolletage as the final PM ritual step.',
      'Perform light upward lifting lymphatic strokes along cheekbones and brow.'
    ],
    suitableFor: ['All Skin Types', 'Aging', 'Dullness', 'Loss of Firmness'],
    routineStep: 'Step 4: Midnight Rejuvenation',
    routineTime: ['pm'],
    pairedWith: 'mg-04',
    faq: [
      { q: 'Is Bakuchiol as effective as retinol?', a: 'Clinical studies show Bakuchiol matches retinol in wrinkle reduction and elasticity improvement, without the dryness or irritation.' },
      { q: 'Will it soil my pillowcase?', a: 'No, it sinks into the skin within 90 seconds leaving a silky, non-greasy protective veil.' }
    ]
  },
  {
    id: 'mg-08',
    name: 'Magic Glow Under-Eye Revival Cream',
    subtitle: 'Caffeine, Peptides & 24K Gold Luminescence',
    category: 'Eye Cream',
    categorySlug: 'eye-cream',
    filterTag: 'serums-creams',
    price: 949,
    originalPrice: 1199,
    discount: '21% OFF',
    rating: 4.8,
    reviewsCount: 374,
    badge: 'Eye Awakener',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Depuffs stubborn under-eye bags, brightens shadows, and smooths crow’s feet.',
    description: 'A transformative cooling eye balm designed with micro-encapsulated green coffee bean extract, haloxyl peptide complex, and light-refracting 24K gold pearls. Eliminates puffiness within 10 minutes and fades dark hollow circles with consistent use.',
    volume: '15 ml / 0.5 fl. oz.',
    sizes: [
      { size: '15 ml', price: 949, original: 1199, default: true },
      { size: '30 ml', price: 1499, original: 1899 }
    ],
    activeIngredients: ['Green Coffee Caffeine', 'Haloxyl Peptides', '24K Gold Pearls', 'Cucumber Extract'],
    benefits: [
      'Instantly drains fluid retention and reduces morning puffiness',
      'Breaks down pigmented iron deposits to lighten dark circles',
      'Strengthens ultra-thin orbital skin to prevent early fine lines'
    ],
    howToUse: [
      'Use the cooling tip or ring finger to dot a sesame-seed amount along the orbital bone.',
      'Gently tap from inner corner outward toward the temple.',
      'Never tug or rub the delicate under-eye zone.'
    ],
    suitableFor: ['Dark Circles', 'Puffy Eyes', 'Crow’s Feet', 'Tired Eyes'],
    routineStep: 'Step 3: Eye Illumination',
    routineTime: ['am', 'pm'],
    pairedWith: 'mg-07',
    faq: [
      { q: 'Is this safe for contact lens wearers?', a: 'Yes, ophthalmologically and dermatologically tested for contact lens wearers and sensitive eyes.' }
    ]
  },
  {
    id: 'mg-09',
    name: 'Magic Glow Sunscreen SPF 50 PA++++',
    subtitle: 'Ultra-Light Invisible Shield with Gold Glow Serum Veil',
    category: 'Sunscreen',
    categorySlug: 'sunscreen',
    filterTag: 'serums-creams',
    price: 899,
    originalPrice: 1149,
    discount: '22% OFF',
    rating: 4.9,
    reviewsCount: 650,
    badge: 'No White Cast',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Zero white cast, non-sticky water gel with PA++++ maximum UVA/UVB/Blue-light defense.',
    description: 'The golden standard of sun protection. Formulated with new-generation Japanese photo-stable UV filters suspended in a weightless watery gel. Delivers comprehensive PA++++ and HEV blue-light shielding with an ethereal glass-skin glow.',
    volume: '80 ml / 2.7 fl. oz.',
    sizes: [
      { size: '50 ml', price: 649, original: 799 },
      { size: '80 ml', price: 899, original: 1149, default: true }
    ],
    activeIngredients: ['Tinosorb S & M Filters', '24K Mineral Mica', 'Ectoin Blue-Light Shield', 'Hyaluronic Acid'],
    benefits: [
      'Broad spectrum SPF 50+ protection against UVA, UVB, and digital screen blue light',
      'Melts like water — zero white cast, zero eye stinging, zero greasy sheen',
      'Water and sweat resistant for up to 80 minutes'
    ],
    howToUse: [
      'Dispense two generous finger-lengths onto hands.',
      'Smooth evenly over face, ears, neck, and chest 15 minutes before sun exposure.',
      'Reapply every 2-3 hours during prolonged sun exposure.'
    ],
    suitableFor: ['All Skin Types', 'Outdoor Daily', 'Under Makeup'],
    routineStep: 'Step 5: Sun Defense',
    routineTime: ['am'],
    pairedWith: 'mg-04',
    faq: [
      { q: 'Will this cause breakouts or clog pores?', a: 'It is strictly non-comedogenic, oil-free, and formulated to breathe naturally on the skin.' }
    ]
  },
  {
    id: 'mg-10',
    name: 'Magic Glow Gold Peel-Off Face Mask',
    subtitle: '24K Liquid Gold Luxury Firming & Pore Detox Ritual',
    category: 'Face Masks',
    categorySlug: 'face-masks',
    filterTag: 'masks-scrubs',
    price: 999,
    originalPrice: 1299,
    discount: '23% OFF',
    rating: 4.9,
    reviewsCount: 520,
    badge: 'Signature Ritual',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Lifts away dead skin cells & impurities in one peel to unveil mirror-like golden radiance.',
    description: 'Transform your vanity into an imperial royal spa. Spreads like warm molten gold, wrapping your face in firming collagen, peptides, and 24K colloidal gold. Peels away seamlessly in one satisfying motion, taking dullness and clogged pores with it.',
    volume: '100 g / 3.5 oz.',
    sizes: [
      { size: '100 g', price: 999, original: 1299, default: true }
    ],
    activeIngredients: ['24K Colloidal Gold', 'Marine Collagen Peptides', 'Papaya Enzyme', 'Witch Hazel'],
    benefits: [
      'Pulls out trapped dirt, blackheads, and micro-pollutants effortlessly',
      'Tightens pores and leaves skin dramatically firmer to the touch',
      'Gives an instant Instagram-worthy golden glow for special events'
    ],
    howToUse: [
      'Apply an opaque, even layer to clean, dry skin using a silicone brush.',
      'Relax for 20-25 minutes while the golden mask sets and tightens.',
      'Gently peel off starting from outer edges upward. Rinse any remnants with warm water.'
    ],
    suitableFor: ['All Skin Types', 'Pre-Party Glow', 'Dullness'],
    routineStep: 'Weekly Ritual (1-2x/week)',
    routineTime: ['pm'],
    pairedWith: 'mg-03',
    faq: [
      { q: 'Does peeling hurt?', a: 'No, our flexible golden polymer is formulated to peel comfortably without pulling facial hair or pinching sensitive skin.' }
    ]
  },
  {
    id: 'mg-11',
    name: 'Magic Glow Clay Detox Mask',
    subtitle: 'French Green Clay, Activated Charcoal & Colloidal Gold',
    category: 'Face Masks',
    categorySlug: 'face-masks',
    filterTag: 'masks-scrubs',
    price: 849,
    originalPrice: 1099,
    discount: '23% OFF',
    rating: 4.8,
    reviewsCount: 290,
    badge: 'Pore Clarifier',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Draws out deep toxins and minimizes enlarged pores without cracking or drying out skin.',
    description: 'A velvet whipped detox paste balancing montmorillonite clay, activated bamboo charcoal, and soothing aloe vera. Magnetic mineral action vacuums congestion out of pores while maintaining healthy skin hydration.',
    volume: '100 g / 3.5 oz.',
    sizes: [
      { size: '100 g', price: 849, original: 1099, default: true }
    ],
    activeIngredients: ['French Montmorillonite Clay', 'Bamboo Charcoal', 'Organic Aloe Leaf Juice', 'Tea Tree Oil'],
    benefits: [
      'Purges excess oil and reduces blackheads and whiteheads',
      'Enriched with botanical oils so it never cracks, flakes, or dries out skin',
      'Visible pore reduction after the first application'
    ],
    howToUse: [
      'Smooth a medium layer over T-zone or entire face.',
      'Allow to dry for 10-15 minutes until clay turns slightly lighter.',
      'Wipe clean using a damp warm muslin cloth, then splash with cool water.'
    ],
    suitableFor: ['Oily', 'Combination', 'Congested', 'Acne-Prone'],
    routineStep: 'Weekly Ritual (1-2x/week)',
    routineTime: ['pm'],
    pairedWith: 'mg-03',
    faq: [
      { q: 'Will it dry out my skin like normal clay masks?', a: 'No, we added organic aloe vera and cold-pressed squalane to prevent any tight, dry discomfort.' }
    ]
  },
  {
    id: 'mg-12',
    name: 'Magic Glow Soft Scrub Exfoliator',
    subtitle: 'Biodegradable Jojoba Pearls, Walnut Flour & Gold Dust',
    category: 'Scrubs',
    categorySlug: 'scrubs',
    filterTag: 'masks-scrubs',
    price: 749,
    originalPrice: 949,
    discount: '21% OFF',
    rating: 4.9,
    reviewsCount: 310,
    badge: 'Gentle Polish',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Buffs away flaky dead skin cells with spherical jojoba beads for glass-smooth skin.',
    description: 'A luxurious polishing cream loaded with perfectly round, melting jojoba wax spheres and fine almond oil. Sloughs away roughness and keratin buildup with zero micro-tears, leaving skin silky, receptive, and illuminated.',
    volume: '100 g / 3.5 oz.',
    sizes: [
      { size: '100 g', price: 749, original: 949, default: true }
    ],
    activeIngredients: ['Spherical Jojoba Wax Beads', 'Sweet Almond Oil', 'Lactic Acid (2%)', '24K Micro Shimmer'],
    benefits: [
      'Gentle spherical beads respect the skin barrier with zero micro-abrasions',
      'Blended with mild lactic acid for synergistic dual enzymatic polishing',
      'Leaves skin silky smooth, baby-soft, and glowing'
    ],
    howToUse: [
      'Gently massage a small dollop onto damp face in small circles for 60 seconds.',
      'Pay special attention to nose, forehead, and chin.',
      'Rinse thoroughly with lukewarm water.'
    ],
    suitableFor: ['All Skin Types', 'Rough Texture', 'Flaky Skin'],
    routineStep: 'Weekly Ritual (2x/week)',
    routineTime: ['pm'],
    pairedWith: 'mg-03',
    faq: [
      { q: 'Are there microplastics in this scrub?', a: 'Zero plastic! Our beads are 100% biodegradable natural jojoba esters.' }
    ]
  },
  {
    id: 'mg-13',
    name: 'Magic Glow Lip Glow Balm',
    subtitle: '24K Flake Infused Peptide Hydrating Lip Treatment',
    category: 'Lip Care',
    categorySlug: 'lip-care',
    filterTag: 'cleansers-toners',
    price: 449,
    originalPrice: 599,
    discount: '25% OFF',
    rating: 4.9,
    reviewsCount: 780,
    badge: 'Pocket Luxury',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'Cocooning lip butter with 24K gold specks that adjusts to your natural rosy pink flush.',
    description: 'A decadent pocket treasure. Pure organic shea butter, peptides, and suspended 24K gold specks melt over chapped lips to cushion, nourish, and impart a flattering PH-activated rosy pink glaze with high shine.',
    volume: '15 g / 0.5 oz.',
    sizes: [
      { size: '15 g', price: 449, original: 599, default: true }
    ],
    activeIngredients: ['Maxi-Lip Peptides', 'Organic Shea & Mango Butter', '24K Gold Flakes', 'Vitamin E'],
    benefits: [
      'Hydrates and repairs dry, cracked lips instantly',
      'Peptides boost lip volume and define lip contour over time',
      'Adapts to your lips’ unique pH to create a personalized rose-gold glow'
    ],
    howToUse: [
      'Glide over bare lips anytime for an instant plumping and glowing tint.',
      'Can be layered as a glossy topper over your favorite matte lipstick or as an overnight lip mask.'
    ],
    suitableFor: ['All Lips', 'Dry Lips', 'Daily Glow'],
    routineStep: 'Finishing Touch',
    routineTime: ['am', 'pm'],
    pairedWith: 'mg-07',
    faq: [
      { q: 'Is it sticky?', a: 'Not at all. It feels like a buttery silk cushion on the lips.' }
    ]
  },
  {
    id: 'mg-14',
    name: 'Magic Glow Complete Glow Kit',
    subtitle: '5-Piece Royal Gold Skincare Ceremony Gift Set',
    category: 'Combos & Gift Sets',
    categorySlug: 'combos',
    filterTag: 'combos',
    price: 3999,
    originalPrice: 5395,
    discount: '26% OFF',
    rating: 5.0,
    reviewsCount: 684,
    badge: 'Ultimate Value',
    isHero: false,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80'
    ],
    shortBenefit: 'The full 5-step royal ritual in a collector gold foil keepsake box. Save ₹1,396.',
    description: 'The master collection of Magic Glow’s most celebrated icons. Includes Gold Radiance Face Wash (150ml), Rose Hydrating Toner (100ml), Vitamin C Glow Serum (30ml), Midnight Repair Night Cream (50ml), and Gold Peel-Off Mask (100g) housed in an heirloom satin-lined black and gold box with a brass applicator spatula.',
    volume: '5-Piece Deluxe Set',
    sizes: [
      { size: '5-Piece Deluxe Set', price: 3999, original: 5395, default: true }
    ],
    activeIngredients: ['24K Colloidal Gold', 'Vitamin C (15%)', 'Damask Rose Water', 'Bakuchiol (1.5%)'],
    benefits: [
      'Complete comprehensive ritual for transformative radiant skin',
      'Packaged in an embossed gold foil collector gift box',
      'Includes complimentary 24K gold plated skincare spatula',
      'Unbeatable 26% bundled savings compared to individual purchases'
    ],
    howToUse: [
      'Morning: Cleanse with Gold Face Wash, Mist Rose Toner, Apply 3 drops Vitamin C Serum, and finish with sunscreen.',
      'Evening: Cleanse, Mist Rose Toner, and seal with Midnight Repair Night Cream.',
      'Twice Weekly: Treat skin to the Gold Peel-Off Mask.'
    ],
    suitableFor: ['All Skin Types', 'Bridal Prep', 'Gifting', 'Complete Skincare Reset'],
    routineStep: 'Full AM & PM Ceremony',
    routineTime: ['am', 'pm'],
    pairedWith: 'mg-08',
    faq: [
      { q: 'Is it suitable for gifting?', a: 'Absolutely. It arrives in an ultra-luxurious magnetic rigid box tied with an ivory ribbon and personalized gold gift card.' }
    ]
  }
];

// Fallback high quality SVG generators for product visuals if any network issues occur
function getFallbackProductSVG(category, name) {
  const encodedName = encodeURIComponent(name);
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><defs><radialGradient id="bgGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%233a2e12" stop-opacity="0.8"/><stop offset="100%" stop-color="%23050505" stop-opacity="1"/></radialGradient><linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%238a6a1f"/><stop offset="35%" stop-color="%23d4af37"/><stop offset="50%" stop-color="%23fff1b8"/><stop offset="70%" stop-color="%23d4af37"/><stop offset="100%" stop-color="%238a6a1f"/></linearGradient></defs><rect width="400" height="400" fill="url(%23bgGlow)"/><circle cx="200" cy="200" r="160" stroke="url(%23gold)" stroke-width="1.5" fill="none" opacity="0.3"/><circle cx="200" cy="200" r="140" stroke="url(%23gold)" stroke-width="0.8" stroke-dasharray="4,6" fill="none" opacity="0.4"/><g transform="translate(140, 110)"><rect x="25" y="20" width="70" height="130" rx="16" fill="%23111" stroke="url(%23gold)" stroke-width="2"/><rect x="42" y="2" width="36" height="22" rx="4" fill="url(%23gold)"/><path d="M52 24 L68 24 L64 70 L56 70 Z" fill="url(%23gold)" opacity="0.4"/><text x="60" y="90" font-family="serif" font-size="10" fill="url(%23gold)" text-anchor="middle" letter-spacing="1">MAGIC GLOW</text><text x="60" y="105" font-family="sans-serif" font-size="7" fill="%23f5ebd7" text-anchor="middle" letter-spacing="0.5">24K GOLD</text></g><text x="200" y="320" font-family="serif" font-size="15" fill="url(%23gold)" text-anchor="middle" letter-spacing="1.5">${encodedName.substring(0, 24)}</text></svg>`;
}

if (typeof window !== 'undefined') {
  window.CATEGORIES_DATA = CATEGORIES_DATA;
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.getFallbackProductSVG = getFallbackProductSVG;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CATEGORIES_DATA, PRODUCTS_DATA, getFallbackProductSVG };
}

