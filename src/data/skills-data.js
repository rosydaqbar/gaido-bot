/**
 * Data keterampilan untuk material quest mingguan
 */

export const skillsData = {
  botany: {
    title: 'Botany',
    icon: '🌿',
    type: 'gathering',
    description: 'Mengumpulkan material dari tumbuhan dan alam',
    image: 'https://i.imgur.com/WQqjVFO.png',
    materials: [
      { name: 'Hay', quantity: 80, location: 'Ditemukan di area padang rumput dan padang. Cari rumpun rumput tinggi.' },
      { name: 'Tartberry Juice', quantity: 80, location: 'Diekstrak dari semak tartberry di wilayah hutan.' },
      { name: 'Base Soil', quantity: 80, location: 'Dikumpulkan dari area pertanian subur dan kebun.' },
      { name: 'Resin', quantity: 80, location: 'Dipanen dari pine dan oak trees menggunakan tapping tool.' }
    ],
    guide: {
      overview: 'Botany berfokus pada pengumpulan material berbasis tumbuhan dari alam. Skill ini membutuhkan kesabaran dan pengetahuan tentang lokasi tumbuhan yang berbeda.',
      steps: [
        '1. Pergi ke Asterleeds → masuk Artisan Guild, ambil Weekly Quest Botany dari Supply Collector Gaido (reset tiap Senin).',
        '2. Selesaikan dengan Normal gathering (tanpa Focus) atau beli item jadi via Botany exchange NPC/vendor di kota/homestead kalau mau cepat.',
        '3. Untuk Hay x80: panen node Wheat Field untuk dapat Wheat, lalu tukar Wheat → Hay di Botany exchange.',
        '4. Untuk Tartberry Juice x80: kumpulkan buah (mis. Sweet Berry/fruit nodes), lalu tukar buah → Tartberry Juice di Botany exchange.',
        '5. Untuk Base Soil x80: kumpulkan jamur (mis. Meadow Mushroom), lalu tukar jamur → Base Soil di Botany exchange.',
        '6. Untuk Resin x80: kumpulkan Thin Twig/branch nodes; node twig biasanya juga drop Resin sebagai secondary (umumnya cepat).',
        '7. Cek jumlah akhir (Hay/Tartberry Juice/Base Soil/Resin masing-masing x80). Kalau ada yang kurang, lanjut gather atau tutup kekurangan lewat vendor/exchange.',
        '8. Kembali ke Gaido dan turn-in quest untuk reward EXP life skill + Luno (Bound) + Silver Star Badge.'
      ],
      tips: [
        '🛒 Beli langsung Hay, Tartberry Juice, dan Base Soil dari Botany Exchange NPC di kota atau homestead',
        '🛒 Resin juga sering tersedia langsung di Exchange tanpa perlu gathering',
        '🛒 Jika Exchange kehabisan, cek Trading Post player market',
        '🛒 Buying full stack dari NPC adalah cara tercepat menyelesaikan weekly',
        '🛒 Tidak perlu farming manual jika fokus hanya weekly quest'
      ]
    }
  },

  mineralogy: {
    title: 'Mineralogy',
    icon: '🪨',
    type: 'gathering',
    description: 'Menambang dan mengekstrak sumber daya mineral',
    image: 'https://i.imgur.com/lyELVua.png',
    materials: [
      { name: 'Clay', quantity: 80, location: 'Ditemukan di area berlumpur dekat sungai dan lahan basah.' },
      { name: 'Fine Sand', quantity: 80, location: 'Dikumpulkan dari pantai dan wilayah gurun.' },
      { name: 'Limp Azure Water', quantity: 80, location: 'Air biru khusus dari mata air ajaib dan sumber.' },
      { name: 'Fine Metal Sand', quantity: 80, location: 'Ditambang dari area dengan deposit logam dan urat bijih.' }
    ],
    guide: {
      overview: 'Mineralogy melibatkan ekstraksi mineral dan material berharga dari bumi. Skill ini membutuhkan mining equipment yang tepat dan pengetahuan geological formation.',
      steps: [
        '1. Pergi ke Asterleeds → Artisan Guild, ambil Weekly Quest Mineralogy dari Supply Collector Gaido (reset tiap Senin).',
        '2. Opsi cepat: beli Clay/Fine Sand/Limpid Azure Water/Fine Metal Sand langsung dari Mineralogy exchange NPC/vendor di kota/homestead.',
        '3. Opsi gather: fokus menambang node Mineralogy “Baru Ore” (ini biasanya memberi beberapa material turn-in sebagai drop sampingan).',
        '4. Tambang Baru Ore dengan mode Normal (tanpa Focus) untuk mengumpulkan Fine Metal Sand.',
        '5. Simpan juga drop sampingan dari mining yang sama: Clay dan Limpid Azure Water (sering ikut terkumpul).',
        '6. Untuk Fine Sand: lanjutkan mining sampai cukup, atau beli kekurangan di vendor/exchange (tergantung RNG drop).',
        '7. Ulangi sampai masing-masing item mencapai x80: Clay, Fine Sand, Limpid Azure Water, Fine Metal Sand.',
        '8. Kalau satu item jauh tertinggal, biasanya lebih hemat waktu menutup kekurangan lewat vendor/exchange daripada terus farm.',
        '9. Kembali ke Gaido dan turn-in quest untuk reward EXP life skill + Luno (Bound) + Silver Star Badge.'
      ],
      tips: [
        '🛒 Semua material Mineralogy weekly bisa dibeli langsung dari Mineralogy Exchange NPC',
        '🛒 Buying Fine Metal Sand dari NPC adalah cara tercepat',
        '🛒 Gunakan Trading Post hanya jika Exchange kehabisan stok',
        '🛒 Tidak perlu mining jika hanya ingin clear weekly',
        '🛒 Exchange NPC selalu lebih konsisten dari RNG farming'
      ]
    }
  },

  gemology: {
    title: 'Gemology',
    icon: '💎',
    type: 'gathering',
    description: 'Menemukan dan memproses permata berharga',
    image: 'https://i.imgur.com/mfqX9aX.png',
    materials: [
      { name: 'Clay', quantity: 80, location: 'Deposit clay khusus yang digunakan untuk proses kerajinan permata.' },
      { name: 'Fine Sand', quantity: 80, location: 'Pasir ultra halus yang diperlukan untuk memoles permata berharga.' },
      { name: 'Limp Azure Water', quantity: 80, location: 'Air murni yang penting untuk membersihkan dan memproses permata.' },
      { name: 'Rock Salt', quantity: 80, location: 'Ditambang dari deposit garam dan tambang garam bawah tanah.' }
    ],
    guide: {
      overview: 'Gemology menggabungkan mining skill dengan gem processing knowledge. Skill ini focus pada finding, extracting, dan preparing precious stones.',
      steps: [
        '1. Pergi ke Asterleeds → Artisan Guild, ambil Weekly Quest Gemology dari Supply Collector Gaido (reset tiap Senin).',
        '2. Opsi cepat: beli Clay/Fine Sand/Limpid Azure Water/Rock Salt langsung dari Gemology exchange NPC/vendor di kota/homestead.',
        '3. Opsi gather: cari node Gemology “(Raw Ore of) Limestone” lalu mining dengan mode Normal (tanpa Focus).',
        '4. Mining Limestone biasanya memberi Limpid Azure Water sebagai secondary drop, jadi Water sering cepat penuh.',
        '5. Dari mining Limestone yang sama, simpan juga secondary drop lain yang umum: Rock Salt, Clay, dan Fine Sand.',
        '6. Lanjutkan sampai masing-masing item mencapai x80: Clay, Fine Sand, Limpid Azure Water, Rock Salt.',
        '7. Kalau Limpid Azure Water berlebih (ini normal), simpan untuk craft lain (mis. Gemcrafting) — tidak perlu dibuang.',
        '8. Jika tinggal kurang sedikit di 1–2 item, tutup kekurangan lewat vendor/exchange agar lebih cepat.',
        '9. Kembali ke Gaido dan turn-in quest untuk reward EXP life skill + Luno (Bound) + Silver Star Badge.'
      ],
      tips: [
        '🛒 Semua material Gemology weekly tersedia di Gemology Exchange NPC',
        '🛒 Buying Rock Salt dan Fine Sand dari NPC paling cepat',
        '🛒 Limp Azure Water biasanya murah di Exchange',
        '🛒 Trading Post hanya backup',
        '🛒 Tidak wajib mining sama sekali'
      ]
    }
  },

  alchemy: {
    title: 'Alchemy',
    icon: '⚗️',
    type: 'crafting',
    description: 'Membuat ramuan ajaib dan eliksir',
    image: 'https://i.imgur.com/bp9E9Qh.png',
    materials: [
      { name: 'Enigmatic Powder', quantity: 40, location: 'Zat ajaib langka yang ditemukan di lokasi misterius, diperoleh dari mengalahkan makhluk ajaib atau ditemukan di reruntuhan kuno.' }
    ],
    guide: {
      overview: 'Alchemy adalah art of creating magical substances dan potions. Enigmatic Powder adalah rare dan powerful ingredient yang membutuhkan special methods untuk obtain.',
      steps: [
        '1. Pergi ke Asterleeds → Artisan Guild, ambil Weekly Quest Alchemy dari Supply Collector Gaido (reset tiap Senin).',
        '2. Opsi cepat: beli Enigmite Powder (item weekly) langsung dari Alchemy exchange NPC/vendor di kota/homestead.',
        '3. Opsi craft: siapkan bahan yang biasa dipakai untuk jalur craft/exchange: Raw Ore of Enigmite x160 (Gemology) + Twig x200 (Botany).',
        '4. Patokan umum: Enigmite Powder dibuat dari Raw Ore of Enigmite (1 powder ≈ 4 ore), jadi 40 powder = 160 ore.',
        '5. Pergi ke Alchemy station (Life Skill) dan gunakan recipe/konversi yang menghasilkan Enigmite Powder sampai jumlahnya x40.',
        '6. Kalau recipe belum kebuka (tergantung level/unlock), gunakan jalur exchange NPC/vendor (paling stabil untuk weekly).',
        '7. Cek inventory: pastikan Enigmite Powder sudah x40 sebelum kembali.',
        '8. Kembali ke Gaido dan turn-in quest.',
        '9. Ambil reward EXP life skill + Luno (Bound) + Silver Star Badge.'
      ],
      tips: [
        '🛒 Enigmite Powder bisa dibeli langsung dari Alchemy Exchange NPC',
        '🛒 Ini adalah cara tercepat tanpa crafting',
        '🛒 Trading Post jarang dibutuhkan untuk item ini',
        '🛒 Crafting hanya opsional',
        '🛒 Weekly bisa selesai < 1 menit dengan buying'
      ]
    }
  },

  gemcrafting: {
    title: 'Gemcrafting',
    icon: '💍',
    type: 'crafting',
    description: 'Membuat perhiasan dan aksesori',
    image: 'https://i.imgur.com/XZZ0iXO.png',
    materials: [
      { name: 'Sandstone Polisher', quantity: 40, location: 'Dibuat dari sandstone blocks. Dapat dibuat di crafting station menggunakan sandstone materials.' }
    ],
    guide: {
      overview: 'Gemcrafting membutuhkan specialized tools seperti Sandstone Polisher. Tool ini harus crafted dari quality sandstone menggunakan proper techniques.',
      steps: [
        '1. Pergi ke Asterleeds → Artisan Guild, ambil Weekly Quest Gemcrafting dari Supply Collector Gaido (reset tiap Senin).',
        '2. Opsi cepat: beli Sandstone Polishers x40 langsung dari Gemcrafting exchange NPC/vendor di kota/homestead.',
        '3. Opsi craft: siapkan bahan untuk 40 Sandstone Polishers: Raw Ore of Limestone x80 (Gemology) + Limpid Azure Water x40 (Mineralogy).',
        '4. Basic recipe Sandstone Polisher umumnya 2 Limestone + 1 Limpid Azure Water → 1 Polisher (jadi 40 butuh 80 Limestone & 40 Water).',
        '5. Mining Limestone sering sekalian memberi Limpid Azure Water sebagai secondary; kalau Water kurang, lengkapi dari mining lain atau vendor/exchange.',
        '6. Buka Gemcrafting station → pilih recipe Sandstone Polisher → craft sampai hasilnya x40.',
        '7. Cek inventory: pastikan Sandstone Polishers x40 sudah terkumpul.',
        '8. Kembali ke Gaido dan turn-in quest.',
        '9. Ambil reward EXP life skill + Luno (Bound) + Silver Star Badge.'
      ],
      tips: [
        '🛒 Sandstone Polisher bisa langsung dibeli dari Gemcrafting Exchange NPC',
        '🛒 Buying lebih cepat daripada crafting',
        '🛒 Trading Post hanya jika NPC kehabisan',
        '🛒 Crafting hanya alternatif',
        '🛒 Weekly clear instan via NPC'
      ]
    }
  },

  artisan: {
    title: 'Artisan',
    icon: '🪵',
    type: 'crafting',
    description: 'Pengerjaan kayu dan kerajinan furnitur',
    image: 'https://i.imgur.com/RJ4XlnM.png',
    materials: [
      { name: 'Pine Lumber', quantity: 40, location: 'Diproses dari pine logs di lumber mill. Pine trees ditemukan di Brightwood Forest.' }
    ],
    guide: {
      overview: 'Artisan work membutuhkan quality wood yang processed dari pine trees. Ini melibatkan forestry skills dan lumber mill operations.',
      steps: [
        '1. Pergi ke Asterleeds → Artisan Guild, ambil Weekly Quest Artisanry dari Supply Collector Gaido (reset tiap Senin).',
        '2. Untuk weekly Artisanry, Pine Lumber saat ini umumnya diselesaikan lewat jalur pembelian/pertukaran (bukan farming langsung).',
        '3. Pergi ke Artisanry exchange NPC/vendor di kota/homestead.',
        '4. Siapkan Pine Timber x120 sebagai bahan exchange untuk Pine Lumber.',
        '5. Lakukan exchange sampai kamu mendapatkan Pine Lumber x40.',
        '6. Kalau Pine Timber belum cukup, lengkapi dulu lewat sumber yang tersedia di server kamu (vendor/exchange/market) lalu lanjut exchange.',
        '7. Cek inventory: pastikan Pine Lumber sudah x40.',
        '8. Kembali ke Gaido dan turn-in quest.',
        '9. Ambil reward EXP life skill + Luno (Bound) + Silver Star Badge.'
      ],
      tips: [
        '🛒 Pine Lumber hanya tersedia via Artisan Exchange NPC',
        '🛒 Tidak bisa diselesaikan lewat logging langsung',
        '🛒 Siapkan Pine Timber lalu exchange',
        '🛒 Trading Post hanya untuk Pine Timber',
        '🛒 Weekly artisan = buy & exchange'
      ]
    }
  },

  smelting: {
    title: 'Smelting',
    icon: '🔥',
    type: 'crafting',
    description: 'Memproses logam dan paduan',
    image: 'https://i.imgur.com/GWI93WX.png',
    materials: [
      { name: 'Pig Iron Ingot', quantity: 40, location: 'Dilebur dari iron ore di furnace. Iron ore ditemukan di Monarchs Bluffs mining area.' }
    ],
    guide: {
      overview: 'Smelting melibatkan extracting iron ore dari mountains dan processing menjadi Pig Iron Ingots menggunakan high-temperature furnaces.',
      steps: [
        '1. Pergi ke Asterleeds → Artisan Guild, ambil Weekly Quest Smelting dari Supply Collector Gaido (reset tiap Senin).',
        '2. Siapkan bahan craft: Iron Ore x40 dan Coal x80 (keduanya dari jalur Mineralogy atau exchange/vendor).',
        '3. Opsi cepat: beli Iron Ore/Coal dari Mineralogy exchange NPC/vendor di kota/homestead untuk menutup kebutuhan weekly.',
        '4. Opsi gather: mining node Mineralogy yang sesuai sampai terkumpul Iron Ore x40 + Coal x80.',
        '5. Pergi ke Smelting station/furnace dan pilih recipe Pig Iron Ingot.',
        '6. Craft Pig Iron Ingot sampai jumlahnya x40 (kebutuhan weekly biasanya pas dengan 40 Iron Ore + 80 Coal).',
        '7. Cek inventory: pastikan Pig Iron Ingot sudah x40.',
        '8. Kembali ke Gaido dan turn-in quest.',
        '9. Ambil reward EXP life skill + Luno (Bound) + Silver Star Badge.'
      ],
      tips: [
        '🛒 Iron Ore dan Coal bisa dibeli langsung dari Mineralogy Exchange',
        '🛒 Buying bahan lebih cepat daripada mining',
        '🛒 Trading Post hanya alternatif',
        '🛒 Smelting langsung setelah beli',
        '🛒 Weekly clear cepat'
      ]
    }
  },

  culinary: {
    title: 'Culinary',
    icon: '🍜',
    type: 'crafting',
    description: 'Memasak dan persiapan makanan',
    image: 'https://i.imgur.com/3Dma4K0.png',
    materials: [
      { name: 'Flour', quantity: 45, location: 'Digunakan untuk membuat berbagai makanan dan kue. Dapat dibeli dari merchant atau dibuat dari wheat.' }
    ],
    guide: {
      overview: 'Culinary arts focus pada creating quality food dan beverages. Flour adalah essential base ingredient untuk various cooking recipes.',
      steps: [
        '1. Pergi ke Asterleeds → Artisan Guild, ambil Weekly Quest Culinary dari Supply Collector Gaido (reset tiap Senin).',
        '2. Siapkan bahan: Wheat x135 (Botany) untuk membuat Flour x45.',
        '3. Opsi gather: panen node Wheat Field dengan mode Normal (tanpa Focus) sampai Wheat terkumpul x135.',
        '4. Opsi cepat: beli Wheat atau Flour dari vendor/exchange/market jika tersedia dan lebih hemat waktu.',
        '5. Pergi ke Culinary station dan pilih recipe Flour.',
        '6. Craft Flour sampai jumlahnya x45 (umumnya 3 Wheat → 1 Flour, jadi total 135 Wheat).',
        '7. Cek inventory: pastikan Flour sudah x45.',
        '8. Kembali ke Gaido dan turn-in quest.',
        '9. Ambil reward EXP life skill + Luno (Bound) + Silver Star Badge.'
      ],
      tips: [
        '🛒 Flour bisa langsung dibeli dari Culinary Exchange NPC',
        '🛒 Buying Flour adalah cara tercepat',
        '🛒 Trading Post sebagai backup',
        '🛒 Tidak perlu memasak manual',
        '🛒 Weekly clear instan'
      ]
    }
  }
};
