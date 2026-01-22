var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-xZhRA0/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// src/data/skills-data.js
var skillsData = {
  botany: {
    title: "Botany",
    icon: "\u{1F33F}",
    type: "gathering",
    description: "Mengumpulkan material dari tumbuhan dan alam",
    image: "https://i.imgur.com/WQqjVFO.png",
    materials: [
      { name: "Hay", quantity: 80, location: "Ditemukan di area padang rumput dan padang. Cari rumpun rumput tinggi." },
      { name: "Tartberry Juice", quantity: 80, location: "Diekstrak dari semak tartberry di wilayah hutan." },
      { name: "Base Soil", quantity: 80, location: "Dikumpulkan dari area pertanian subur dan kebun." },
      { name: "Resin", quantity: 80, location: "Dipanen dari pine dan oak trees menggunakan tapping tool." }
    ],
    guide: {
      overview: "Botany berfokus pada pengumpulan material berbasis tumbuhan dari alam. Keterampilan ini membutuhkan kesabaran dan pengetahuan tentang tempat tumbuhan berbeda tumbuh.",
      steps: [
        "1. Lengkapi Sickle atau Gathering Tool - Penting untuk panen tumbuhan yang efisien",
        "2. Kunjungi Padang Rumput dan Padang - Cari area dengan rumput tinggi dan bunga liar",
        "3. Panen Hay - Gunakan sickle pada rumpun rumput, menghasilkan 1-3 hay per rumpun",
        "4. Temukan Semak Tartberry - Terletak di hutan terbuka dan tepi hutan",
        "5. Ekstrak Tartberry Juice - Gunakan collection bottle pada semak tartberry matang",
        "6. Temukan Tanah Subur - Ditemukan dekat pertanian, kebun, dan area berair",
        "7. Kumpulkan Base Soil - Gunakan shovel untuk mengumpulkan tanah dari lokasi subur",
        "8. Sadap Pohon untuk Resin - Gunakan tapping tool pada pohon pinus dan oak, tunggu resin terkumpul"
      ],
      tips: [
        "\u{1F6D2} Beli dari NPC Pedagang Material di kota-kota besar",
        "\u{1F6D2} Beli dari pedagang Perlengkapan Pertanian dekat area pertanian",
        "\u{1F6D2} Tukar dengan pemain lain yang mengkhususkan diri dalam pengumpulan botany",
        "\u{1F6D2} Periksa rumah lelang dan pasar pemain untuk pembelian massal",
        "\u{1F6D2} Beberapa material tersedia dari vendor guild dengan harga diskon"
      ]
    }
  },
  mineralogy: {
    title: "Mineralogy",
    icon: "\u{1FAA8}",
    type: "gathering",
    description: "Menambang dan mengekstrak sumber daya mineral",
    image: "https://i.imgur.com/lyELVua.png",
    materials: [
      { name: "Clay", quantity: 80, location: "Ditemukan di area berlumpur dekat sungai dan lahan basah." },
      { name: "Fine Sand", quantity: 80, location: "Dikumpulkan dari pantai dan wilayah gurun." },
      { name: "Limp Azure Water", quantity: 80, location: "Air biru khusus dari mata air ajaib dan sumber." },
      { name: "Fine Metal Sand", quantity: 80, location: "Ditambang dari area dengan deposit logam dan urat bijih." }
    ],
    guide: {
      overview: "Mineralogy melibatkan ekstraksi mineral dan material berharga dari bumi. Keterampilan ini membutuhkan peralatan tambang yang tepat dan pengetahuan formasi geologi.",
      steps: [
        "1. Lengkapi Mining Pick - Alat penting untuk memecah batu dan mengekstrak mineral",
        "2. Kunjungi Tepi Sungai dan Lahan Basah - Cari area berlumpur dengan deposit clay",
        "3. Tambang Deposit Clay - Gunakan mining pick pada tanah kaya clay, menghasilkan 2-4 clay per deposit",
        "4. Pergi ke Pantai/Gurun - Fine Sand melimpah di lokasi ini",
        "5. Kumpulkan Fine Sand - Gunakan sifter atau gathering tool pada bukit pasir",
        "6. Temukan Mata Air Ajaib - Sumber Limp Azure Water bercahaya biru",
        "7. Kumpulkan Limp Azure Water - Gunakan special container untuk mengumpulkan air ajaib",
        "8. Temukan Urat Bijih Logam - Cari kilau metalik di formasi batu",
        "9. Ekstrak Fine Metal Sand - Tambang urat bijih dan proses menjadi fine metal sand"
      ],
      tips: [
        "\u{1F6D2} Beli dari pedagang Perlengkapan Tambang di kota pegunungan",
        "\u{1F6D2} Beli dari NPC Survei Geologi dekat area tambang",
        "\u{1F6D2} Tukar dengan penambang dan pencari emas di kamp tambang",
        "\u{1F6D2} Periksa dealer mineral khusus di pusat perdagangan besar",
        "\u{1F6D2} Beberapa material langka tersedia dari vendor ekspedisi"
      ]
    }
  },
  gemology: {
    title: "Gemology",
    icon: "\u{1F48E}",
    type: "gathering",
    description: "Menemukan dan memproses permata berharga",
    image: "https://i.imgur.com/mfqX9aX.png",
    materials: [
      { name: "Clay", quantity: 80, location: "Deposit clay khusus yang digunakan untuk proses kerajinan permata." },
      { name: "Fine Sand", quantity: 80, location: "Pasir ultra halus yang diperlukan untuk memoles permata berharga." },
      { name: "Limp Azure Water", quantity: 80, location: "Air murni yang penting untuk membersihkan dan memproses permata." },
      { name: "Rock Salt", quantity: 80, location: "Ditambang dari deposit garam dan tambang garam bawah tanah." }
    ],
    guide: {
      overview: "Gemology menggabungkan keterampilan tambang dengan pengetahuan pemrosesan permata. Keterampilan ini berfokus pada menemukan, mengekstrak, dan menyiapkan batu mulia.",
      steps: [
        "1. Lengkapi Gem Mining Tools - Mining pick khusus dan peralatan ekstraksi",
        "2. Pelajari Geological Map - Pelajari di mana permata berbeda kemungkinan ditemukan",
        "3. Temukan Clay Kualitas Permata - Ditemukan dekat area vulkanik dan tanah kaya mineral",
        "4. Tambang Clay dengan Hati-hati - Gunakan teknik lembut untuk menjaga clay pembawa permata",
        "5. Kumpulkan Fine Sand Ultra Halus - Penting untuk pemolesan, ditemukan di wilayah gurun tertentu",
        "6. Sumber Limp Azure Water Murni - Diperlukan untuk membersihkan permata tanpa kerusakan",
        "7. Temukan Salt Mine - Rock Salt digunakan dalam proses pengawetan permata",
        "8. Ekstrak Rock Salt - Tambang deposit garam menggunakan alat yang sesuai",
        "9. Proses Material - Siapkan semua material untuk alur kerja kerajinan permata"
      ],
      tips: [
        "\u{1F6D2} Beli dari pedagang Perlengkapan Perhiasan di distrik kerajinan",
        "\u{1F6D2} Beli dari Dealer Permata di area belanja mewah",
        "\u{1F6D2} Tukar dengan pengrajin permata dan tukang emas untuk material olahan",
        "\u{1F6D2} Periksa rumah lelang kelas atas untuk material permata langka",
        "\u{1F6D2} Beberapa material tersedia dari vendor guild gemcrafting"
      ]
    }
  },
  alchemy: {
    title: "Alchemy",
    icon: "\u2697\uFE0F",
    type: "crafting",
    description: "Membuat ramuan ajaib dan eliksir",
    image: "https://i.imgur.com/bp9E9Qh.png",
    materials: [
      { name: "Enigmatic Powder", quantity: 40, location: "Zat ajaib langka yang ditemukan di lokasi misterius, diperoleh dari mengalahkan makhluk ajaib atau ditemukan di reruntuhan kuno." }
    ],
    guide: {
      overview: "Alchemy adalah seni membuat zat ajaib dan ramuan. Enigmatic Powder adalah bahan langka dan kuat yang membutuhkan metode khusus untuk mendapatkannya.",
      steps: [
        "1. Bersiap untuk Pertemuan Ajaib - Lengkapi protective gear dan combat equipment",
        "2. Teliti Lokasi Kuno - Pelajari map dan pengetahuan untuk menemukan situs ajaib",
        "3. Jelajahi Mystical Ruins - Kuil kuno dan situs ajaib yang ditinggalkan",
        "4. Kalahkan Magical Creatures - Elemental, roh, dan binatang terkutuk",
        "5. Kumpulkan Essence Drops - Makhluk ajaib menjatuhkan essence saat dikalahkan",
        "6. Cari Hidden Chambers - Cari ruang rahasia di reruntuhan dan dungeon",
        "7. Aktifkan Magical Altars - Beberapa altar menghasilkan Enigmatic Powder saat diaktifkan",
        "8. Proses Raw Essence - Gunakan alchemy equipment untuk menyuling essence menjadi powder",
        "9. Simpan dengan Benar - Enigmatic Powder rusak jika tidak disimpan dalam magical container"
      ],
      tips: [
        "\u{1F6D2} Beli dari vendor Reagen Ajaib di menara penyihir",
        "\u{1F6D2} Beli dari pedagang Perlengkapan Alchemy di distrik ajaib",
        "\u{1F6D2} Tukar dengan alchemist lain dan praktisi ajaib",
        "\u{1F6D2} Periksa rumah lelang ajaib khusus untuk powder langka",
        "\u{1F6D2} Beberapa material tersedia dari vendor guild arcane"
      ]
    }
  },
  gemcrafting: {
    title: "Gemcrafting",
    icon: "\u{1F48D}",
    type: "crafting",
    description: "Membuat perhiasan dan aksesori",
    image: "https://i.imgur.com/XZZ0iXO.png",
    materials: [
      { name: "Sandstone Polisher", quantity: 40, location: "Dibuat dari sandstone blocks. Dapat dibuat di crafting station menggunakan sandstone materials." }
    ],
    guide: {
      overview: "Gemcrafting membutuhkan alat khusus seperti Sandstone Polisher. Alat ini harus dibuat dari sandstone berkualitas menggunakan teknik yang tepat.",
      steps: [
        "1. Temukan Sandstone Mine - Temukan area dengan deposit sandstone berkualitas tinggi",
        "2. Tambang Sandstone Blocks - Gunakan mining tools yang sesuai untuk mengekstrak blok",
        "3. Nilai Kualitas Batu - Periksa retakan, kotoran, dan struktur butir",
        "4. Angkut ke Workshop - Pindahkan sandstone blocks ke crafting station",
        "5. Siapkan Crafting Station - Pastikan alat dan ruang kerja yang tepat siap",
        "6. Bentuk Polisher - Gunakan chisel dan shaping tools untuk membentuk polisher",
        "7. Buat Permukaan Abrasif - Hati-hati tekstur permukaan pemolesan",
        "8. Tes Kualitas Polisher - Verifikasi alat memenuhi standar kerajinan permata",
        "9. Rawat Alat - Perawatan rutin menjaga polisher tetap efektif"
      ],
      tips: [
        "\u{1F6D2} Beli dari pedagang Alat Kerajinan di kawasan pengrajin",
        "\u{1F6D2} Beli dari pemasok Pekerjaan Batu dekat tambang",
        "\u{1F6D2} Tukar dengan pengrajin permata lain untuk polisher berkualitas",
        "\u{1F6D2} Periksa vendor alat khusus di distrik kerajinan",
        "\u{1F6D2} Beberapa alat tersedia dari vendor guild pengrajin"
      ]
    }
  },
  artisan: {
    title: "Artisan",
    icon: "\u{1FAB5}",
    type: "crafting",
    description: "Pengerjaan kayu dan kerajinan furnitur",
    image: "https://i.imgur.com/RJ4XlnM.png",
    materials: [
      { name: "Pine Lumber", quantity: 40, location: "Diproses dari pine logs di lumber mill. Pine trees ditemukan di wilayah northern forest." }
    ],
    guide: {
      overview: "Pekerjaan Artisan membutuhkan kayu berkualitas yang diproses dari pohon pinus. Ini melibatkan keterampilan kehutanan dan operasi pabrik kayu.",
      steps: [
        "1. Jelajahi Northern Forest - Pohon pinus tumbuh terbaik di iklim utara yang lebih dingin",
        "2. Identifikasi Mature Pine Trees - Cari pohon dengan batang lurus dan tinggi yang baik",
        "3. Dapatkan Logging Permit - Pastikan hak panen legal di area tersebut",
        "4. Lengkapi Logging Tools - Axe, saw, dan safety equipment penting",
        "5. Tebang Pohon dengan Aman - Gunakan teknik yang tepat untuk menghindari kerusakan dan cedera",
        "6. Angkut Log - Pindahkan pine logs ke lumber mill facility",
        "7. Proses di Mill - Potong logs menjadi ukuran Pine Lumber standar",
        "8. Keringkan dan Season - Biarkan kayu mengering dengan benar untuk kualitas",
        "9. Grade dan Sort - Klasifikasikan lumber berdasarkan kualitas dan penggunaan yang dimaksudkan"
      ],
      tips: [
        "\u{1F6D2} Beli dari vendor Pabrik Kayu di kota kehutanan",
        "\u{1F6D2} Beli dari pedagang Perlengkapan Pengerjaan Kayu di distrik kerajinan",
        "\u{1F6D2} Tukar dengan pengrajin dan tukang kayu lain untuk lumber berkualitas",
        "\u{1F6D2} Periksa vendor material bangunan di area konstruksi",
        "\u{1F6D2} Beberapa lumber tersedia dari vendor guild kehutanan"
      ]
    }
  },
  smelting: {
    title: "Smelting",
    icon: "\u{1F525}",
    type: "crafting",
    description: "Memproses logam dan paduan",
    image: "https://i.imgur.com/GWI93WX.png",
    materials: [
      { name: "Pig Iron Ingot", quantity: 40, location: "Dilebur dari iron ore di furnace. Iron ore ditemukan di area mountain mining." }
    ],
    guide: {
      overview: "Smelting melibatkan ekstraksi iron ore dari pegunungan dan memprosesnya menjadi Pig Iron Ingot menggunakan furnace suhu tinggi.",
      steps: [
        "1. Temukan Iron Ore Deposits - Wilayah pegunungan biasanya memiliki urat besi yang kaya",
        "2. Siapkan Mining Operation - Buat base camp dekat ore deposits",
        "3. Ekstrak Iron Ore - Gunakan heavy mining equipment untuk mengekstrak raw ore",
        "4. Angkut ke Smelter - Pindahkan ore ke furnace facility",
        "5. Siapkan Furnace - Panaskan furnace ke suhu smelting yang sesuai",
        "6. Tambahkan Flux Materials - Sertakan limestone atau flux lain untuk memurnikan logam",
        "7. Smelt Ore - Pertahankan suhu dan waktu yang tepat",
        "8. Pour ke Molds - Buat Pig Iron Ingot dalam bentuk standar",
        "9. Cool dan Finish - Biarkan ingot dingin dan hilangkan kotoran"
      ],
      tips: [
        "\u{1F6D2} Beli dari pedagang Perlengkapan Logam di distrik industri",
        "\u{1F6D2} Beli dari vendor Smelting dekat fasilitas tungku",
        "\u{1F6D2} Tukar dengan blacksmith dan pekerja logam lain untuk ingot",
        "\u{1F6D2} Periksa vendor industri berat di area manufaktur",
        "\u{1F6D2} Beberapa ingot tersedia dari vendor guild blacksmith"
      ]
    }
  },
  culinary: {
    title: "Culinary",
    icon: "\u{1F35C}",
    type: "crafting",
    description: "Memasak dan persiapan makanan",
    image: "https://i.imgur.com/3Dma4K0.png",
    materials: [
      { name: "Flour", quantity: 45, location: "Digunakan untuk membuat berbagai makanan dan kue. Dapat dibeli dari merchant atau dibuat dari wheat." }
    ],
    guide: {
      overview: "Seni Culinary berfokus pada pembuatan makanan dan minuman berkualitas. Flour adalah bahan dasar penting untuk berbagai resep masakan.",
      steps: [
        "1. Dapatkan Flour - Beli dari pedagang atau giling wheat di mill",
        "2. Siapkan Cooking Station - Pastikan akses ke stove, oven, dan cooking equipment",
        "3. Pelajari Recipes - Pelajari berbagai recipe makanan dan minuman",
        "4. Kumpulkan Additional Ingredients - Dapatkan spices, vegetables, dan protein",
        "5. Mulai Cooking - Ikuti recipe dengan hati-hati untuk hasil terbaik",
        "6. Kontrol Temperature - Jaga suhu memasak yang tepat untuk setiap hidangan",
        "7. Timing yang Tepat - Perhatikan cooking time untuk tekstur yang sempurna",
        "8. Plating dan Presentation - Sajikan makanan dengan presentasi yang menarik",
        "9. Evaluate Results - Cicipi dan perbaiki recipe untuk kualitas yang konsisten"
      ],
      tips: [
        "\u{1F6D2} Beli dari pedagang Perlengkapan Masak di distrik kuliner",
        "\u{1F6D2} Beli dari vendor Peralatan Dapur dekat restoran",
        "\u{1F6D2} Tukar dengan chef dan pengrajin kuliner lain untuk bahan berkualitas",
        "\u{1F6D2} Periksa vendor makanan khusus di area gourmet",
        "\u{1F6D2} Beberapa bahan tersedia dari vendor guild culinary"
      ]
    }
  }
};

// src/templates/weekly-page.js
function getWeeklyPageTemplate() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Material Quest Mingguan</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <style>
    /* Dark Mode Atlassian/Jira Colors */
    :root {
      --jira-dark-bg: #0D1117;
      --jira-dark-surface: #161B22;
      --jira-dark-surface-hover: #21262D;
      --jira-dark-border: #30363D;
      --jira-dark-text-primary: #F0F6FC;
      --jira-dark-text-secondary: #8B949E;
      --jira-dark-text-muted: #6E7681;
      --jira-blue-500: #1F6FEB;
      --jira-blue-600: #1158C7;
      --jira-blue-400: #388BFD;
      --jira-blue-100: #0D419D;
      --jira-green-500: #238636;
      --jira-green-400: #2EA043;
      --jira-orange-500: #FB8500;
      --jira-orange-400: #FFA657;
      --jira-red-500: #DA3633;
      --jira-purple-500: #8957E5;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background-color: var(--jira-dark-bg);
      color: var(--jira-dark-text-primary);
      line-height: 1.5;
      overflow-x: hidden;
    }

    .app-container {
      display: flex;
      height: 100vh;
      padding: 24px;
      gap: 24px;
      transition: all 0.3s ease;
    }

    .app-container.guide-open {
      gap: 24px;
    }

    /* Left Sidebar Card */
    .sidebar {
      width: 320px;
      background: var(--jira-dark-surface);
      border: 1px solid var(--jira-dark-border);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      max-height: calc(100vh - 48px);
      flex-shrink: 0;
    }

    .sidebar-header {
      padding: 24px 20px;
      border-bottom: 1px solid var(--jira-dark-border);
      background: var(--jira-dark-surface);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .sidebar-header h1 {
      font-size: 20px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 8px;
    }

    .sidebar-header p {
      font-size: 14px;
      color: var(--jira-dark-text-secondary);
      line-height: 1.4;
    }

    .skills-list {
      flex: 1;
      padding: 16px 0;
    }

    .skill-item {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
      margin: 2px 0;
    }

    .skill-item:hover {
      background: var(--jira-dark-surface-hover);
    }

    .skill-item.active {
      background: var(--jira-blue-100);
      border-left-color: var(--jira-blue-500);
    }

    .skill-item.active:hover {
      background: var(--jira-blue-100);
    }

    .skill-icon {
      font-size: 20px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: var(--jira-dark-surface-hover);
      margin-right: 12px;
    }

    .skill-item.active .skill-icon {
      background: var(--jira-blue-500);
    }

    .skill-info h3 {
      font-size: 14px;
      font-weight: 500;
      color: var(--jira-dark-text-primary);
      margin-bottom: 2px;
    }

    .skill-info p {
      font-size: 12px;
      color: var(--jira-dark-text-secondary);
    }

    .skill-badge {
      margin-left: auto;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .skill-badge.gathering {
      background: var(--jira-green-500);
      color: white;
    }

    .skill-badge.crafting {
      background: var(--jira-orange-500);
      color: white;
    }

    /* Right Panel */
    .detail-panel {
      flex: 1;
      background: transparent;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      transition: all 0.3s ease;
    }

    .app-container.guide-open .detail-panel {
      flex: 0 0 600px;
      justify-content: flex-start;
    }

    .detail-content {
      width: 100%;
      max-width: 600px;
      background: var(--jira-dark-surface);
      border-radius: 12px;
      border: 1px solid var(--jira-dark-border);
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow-y: auto;
      height: calc(100vh - 48px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .detail-content.visible {
      transform: translateX(0);
    }

    /* Guide Panel - Beside Detail Panel */
    .guide-panel {
      flex: 0;
      width: 0;
      background: transparent;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      transition: all 0.3s ease;
    }

    .app-container.guide-open .guide-panel {
      flex: 0 0 500px;
      width: auto;
    }

    .guide-content-card {
      width: 100%;
      background: var(--jira-dark-surface);
      border-radius: 12px;
      border: 1px solid var(--jira-dark-border);
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow-y: auto;
      height: calc(100vh - 48px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      opacity: 0;
    }

    .guide-content-card.visible {
      transform: translateX(0);
      opacity: 1;
    }

    .detail-header {
      padding: 24px 32px;
      border-bottom: 1px solid var(--jira-dark-border);
      background: var(--jira-dark-surface);
      border-radius: 12px 12px 0 0;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .detail-header-top {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .detail-icon {
      font-size: 32px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: var(--jira-blue-500);
      margin-right: 16px;
    }

    .detail-title h2 {
      font-size: 24px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 4px;
    }

    .detail-title p {
      font-size: 14px;
      color: var(--jira-dark-text-secondary);
    }

    .close-button {
      margin-left: auto;
      width: 32px;
      height: 32px;
      border: none;
      background: var(--jira-dark-surface-hover);
      color: var(--jira-dark-text-secondary);
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .close-button:hover {
      background: var(--jira-dark-border);
      color: var(--jira-dark-text-primary);
    }

    .detail-body {
      padding: 32px;
    }

    .materials-section {
      margin-bottom: 32px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .guide-button {
      background: var(--jira-blue-500);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .guide-button:hover {
      background: var(--jira-blue-600);
      transform: translateY(-1px);
    }

    /* Guide Sidebar */
    .guide-sidebar {
      display: none;
    }

    .guide-header {
      padding: 24px 32px;
      border-bottom: 1px solid var(--jira-dark-border);
      background: var(--jira-dark-surface);
      border-radius: 12px 12px 0 0;
    }

    .guide-header-top {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .guide-icon {
      font-size: 32px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: var(--jira-green-500);
      margin-right: 16px;
    }

    .guide-title h3 {
      font-size: 20px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 4px;
    }

    .guide-title p {
      font-size: 14px;
      color: var(--jira-dark-text-secondary);
    }

    .guide-close {
      margin-left: auto;
      width: 32px;
      height: 32px;
      border: none;
      background: var(--jira-dark-surface-hover);
      color: var(--jira-dark-text-secondary);
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .guide-close:hover {
      background: var(--jira-dark-border);
      color: var(--jira-dark-text-primary);
    }

    .guide-body {
      padding: 32px;
    }

    .guide-overview {
      background: var(--jira-dark-bg);
      border: 1px solid var(--jira-dark-border);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }

    .guide-overview h4 {
      font-size: 14px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 8px;
    }

    .guide-overview p {
      font-size: 13px;
      color: var(--jira-dark-text-secondary);
      line-height: 1.5;
    }

    .guide-section {
      margin-bottom: 24px;
    }

    .guide-section h4 {
      font-size: 14px;
      font-weight: 600;
      color: var(--jira-dark-text-primary);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .guide-steps {
      list-style: none;
      padding: 0;
    }

    .guide-step {
      background: var(--jira-dark-bg);
      border: 1px solid var(--jira-dark-border);
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 8px;
      font-size: 13px;
      color: var(--jira-dark-text-primary);
      line-height: 1.4;
    }

    .guide-tips {
      list-style: none;
      padding: 0;
    }

    .guide-tip {
      background: var(--jira-blue-100);
      border: 1px solid var(--jira-blue-500);
      border-radius: 6px;
      padding: 10px;
      margin-bottom: 6px;
      font-size: 12px;
      color: var(--jira-dark-text-primary);
      line-height: 1.4;
    }

    .materials-grid {
      display: grid;
      gap: 12px;
    }

    .material-card {
      background: var(--jira-dark-bg);
      border: 1px solid var(--jira-dark-border);
      border-radius: 8px;
      padding: 16px;
      transition: all 0.2s ease;
    }

    .material-card:hover {
      border-color: var(--jira-blue-500);
      background: var(--jira-dark-surface-hover);
    }

    .material-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .material-name {
      font-weight: 500;
      color: var(--jira-dark-text-primary);
      font-size: 14px;
    }

    .material-quantity {
      background: var(--jira-blue-500);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }

    .material-location {
      font-size: 12px;
      color: var(--jira-dark-text-secondary);
      line-height: 1.4;
    }

    .skill-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
      border: 1px solid var(--jira-dark-border);
      background: var(--jira-dark-bg);
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: calc(100vh - 48px);
      color: var(--jira-dark-text-muted);
      text-align: center;
      padding: 32px;
      width: 100%;
      max-width: 600px;
      background: var(--jira-dark-surface);
      border-radius: 12px;
      border: 1px solid var(--jira-dark-border);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    .empty-state-icon {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .empty-state h3 {
      font-size: 18px;
      margin-bottom: 8px;
      color: var(--jira-dark-text-secondary);
    }

    .empty-state p {
      font-size: 14px;
      max-width: 300px;
    }

    @media (max-width: 768px) {
      .app-container {
        flex-direction: column;
        padding: 16px;
        gap: 16px;
      }
      
      .sidebar {
        width: 100%;
        max-height: 300px;
      }
      
      .detail-panel {
        padding: 0;
      }
      
      .detail-content {
        max-width: none;
        width: 100%;
      }
      
      .detail-body {
        padding: 24px;
      }
      
      .detail-header {
        padding: 20px 24px;
      }
      
      .empty-state {
        height: 400px;
      }
    }

    @media (max-width: 1024px) {
      .detail-content {
        max-width: 700px;
      }
      
      .app-container {
        padding: 20px;
        gap: 20px;
      }
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    // Skills data will be injected here
    const skillsData = SKILLS_DATA_PLACEHOLDER;

    const { useState } = React;

    function WeeklyMaterials() {
      const [selectedSkill, setSelectedSkill] = useState(null);
      const [showGuide, setShowGuide] = useState(false);
      const [guideSkill, setGuideSkill] = useState(null);

      const selectSkill = (skillKey) => {
        setSelectedSkill(skillKey);
        // Close guide when switching skills
        setShowGuide(false);
        setGuideSkill(null);
      };

      const closeDetail = () => {
        setSelectedSkill(null);
      };

      const openGuide = (skillKey) => {
        setGuideSkill(skillKey);
        setShowGuide(true);
      };

      const closeGuide = () => {
        setShowGuide(false);
        setGuideSkill(null);
      };

      return (
        <div className={\`app-container \${showGuide ? 'guide-open' : ''}\`}>
          {/* Left Sidebar */}
          <div className="sidebar">
            <div className="sidebar-header">
              <h1>\u{1F4CB} Material Quest Mingguan</h1>
              <p>Pilih life skill untuk melihat material yang dibutuhkan dan lokasinya. Quest memberikan 7200 XP per skill.</p>
            </div>
            
            <div className="skills-list">
              {Object.entries(skillsData).map(([key, skill]) => (
                <div 
                  key={key}
                  className={\`skill-item \${selectedSkill === key ? 'active' : ''}\`}
                  onClick={() => selectSkill(key)}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <div className="skill-info">
                    <h3>{skill.title}</h3>
                    <p>{skill.description}</p>
                  </div>
                  <div className={\`skill-badge \${skill.type}\`}>
                    {skill.type}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Detail Panel */}
          <div className="detail-panel">
            {selectedSkill ? (
              <div className={\`detail-content \${selectedSkill ? 'visible' : ''}\`}>
                <div className="detail-header">
                  <div className="detail-header-top">
                    <div className="detail-icon">
                      {skillsData[selectedSkill].icon}
                    </div>
                    <div className="detail-title">
                      <h2>{skillsData[selectedSkill].title}</h2>
                      <p>{skillsData[selectedSkill].description}</p>
                    </div>
                    <button className="close-button" onClick={closeDetail}>
                      \u2715
                    </button>
                  </div>
                </div>

                <div className="detail-body">
                  <div className="materials-section">
                    <h3 className="section-title">
                      \u{1F4E6} Material yang Dibutuhkan
                      <button 
                        className="guide-button"
                        onClick={() => openGuide(selectedSkill)}
                      >
                        \u{1F4D6} Cara Mendapatkan
                      </button>
                    </h3>
                    <div className="materials-grid">
                      {skillsData[selectedSkill].materials.map((material, index) => (
                        <div key={index} className="material-card">
                          <div className="material-header">
                            <div className="material-name">{material.name}</div>
                            <div className="material-quantity">x{material.quantity}</div>
                          </div>
                          <div className="material-location">{material.location}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="materials-section">
                    <h3 className="section-title">
                      \u{1F5BC}\uFE0F Gambar Referensi
                    </h3>
                    <img 
                      src={skillsData[selectedSkill].image} 
                      alt={\`\${skillsData[selectedSkill].title} materials\`}
                      className="skill-image"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">\u{1F4CB}</div>
                <h3>Pilih Life Skill</h3>
                <p>Pilih life skill dari sidebar kiri untuk melihat detail material yang dibutuhkan dan lokasinya.</p>
              </div>
            )}
          </div>

          {/* Guide Panel - Beside Detail Panel */}
          <div className="guide-panel">
            {guideSkill && (
              <div className={\`guide-content-card \${showGuide ? 'visible' : ''}\`}>
                <div className="guide-header">
                  <div className="guide-header-top">
                    <div className="guide-icon">
                      \u{1F4D6}
                    </div>
                    <div className="guide-title">
                      <h3>Cara Mendapatkan</h3>
                      <p>Panduan mendapatkan {skillsData[guideSkill].title}</p>
                    </div>
                    <button className="guide-close" onClick={closeGuide}>
                      \u2715
                    </button>
                  </div>
                </div>

                <div className="guide-body">
                  <div className="guide-overview">
                    <h4>\u{1F4DD} Ringkasan</h4>
                    <p>{skillsData[guideSkill].guide.overview}</p>
                  </div>

                  <div className="guide-section">
                    <h4>\u{1F527} Langkah-langkah Proses</h4>
                    <ul className="guide-steps">
                      {skillsData[guideSkill].guide.steps.map((step, index) => (
                        <li key={index} className="guide-step">{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="guide-section">
                    <h4>\u{1F6D2} Cara Lain</h4>
                    <ul className="guide-tips">
                      {skillsData[guideSkill].guide.tips.map((tip, index) => (
                        <li key={index} className="guide-tip">{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    ReactDOM.render(<WeeklyMaterials />, document.getElementById('root'));
  <\/script>
</body>
</html>`;
}
__name(getWeeklyPageTemplate, "getWeeklyPageTemplate");

// src/utils/discord-helpers.js
function hexToUint8Array(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}
__name(hexToUint8Array, "hexToUint8Array");
async function verifyDiscordSignature(publicKeyHex, signatureHex, timestamp, body) {
  try {
    const publicKeyBytes = hexToUint8Array(publicKeyHex);
    const signatureBytes = hexToUint8Array(signatureHex);
    const encoder = new TextEncoder();
    const timestampBytes = encoder.encode(timestamp);
    const bodyBytes = encoder.encode(body);
    const message = new Uint8Array(timestampBytes.length + bodyBytes.length);
    message.set(timestampBytes);
    message.set(bodyBytes, timestampBytes.length);
    const publicKey = await crypto.subtle.importKey(
      "raw",
      publicKeyBytes,
      {
        name: "Ed25519",
        namedCurve: "Ed25519"
      },
      false,
      ["verify"]
    );
    return await crypto.subtle.verify("Ed25519", publicKey, signatureBytes, message);
  } catch (error) {
    console.error("Signature verification failed:", error);
    return false;
  }
}
__name(verifyDiscordSignature, "verifyDiscordSignature");
function createMaterialView(skillType = "botany") {
  const skills = {
    botany: {
      title: "\u{1F33F} Botany",
      materials: "Hay x80, Tartberry Juice x80, Base Soil x80, Resin x80",
      image: "https://i.imgur.com/WQqjVFO.png",
      description: "Mengumpulkan material dari tanaman dan alam"
    },
    mineralogy: {
      title: "\u{1FAA8} Mineralogy",
      materials: "Clay x80, Fine Sand x80, Limp Azure Water x80, Fine Metal Sand x80",
      image: "https://i.imgur.com/lyELVua.png",
      description: "Menambang dan mengekstrak sumber daya mineral"
    },
    gemology: {
      title: "\u{1F48E} Gemology",
      materials: "Clay x80, Fine Sand x80, Limp Azure Water x80, Rock Salt x80",
      image: "https://i.imgur.com/mfqX9aX.png",
      description: "Mencari dan memproses permata berharga"
    },
    alchemy: {
      title: "\u2697\uFE0F Alchemy",
      materials: "Enigmatic Powder x40",
      image: "https://i.imgur.com/bp9E9Qh.png",
      description: "Membuat ramuan ajaib dan eliksir"
    },
    gemcrafting: {
      title: "\u{1F48D} Gemcrafting",
      materials: "Sandstone Polisher x40",
      image: "https://i.imgur.com/XZZ0iXO.png",
      description: "Membuat perhiasan dan aksesoris"
    },
    artisan: {
      title: "\u{1FAB5} Artisan",
      materials: "Pine Lumber x40",
      image: "https://i.imgur.com/RJ4XlnM.png",
      description: "Pengerjaan kayu dan pembuatan furnitur"
    },
    smelting: {
      title: "\u{1F525} Smelting",
      materials: "Pig Iron Ingot x40",
      image: "https://i.imgur.com/GWI93WX.png",
      description: "Memproses logam dan paduan"
    },
    culinary: {
      title: "\u{1F35C} Culinary",
      materials: "Flour x45",
      image: "https://i.imgur.com/3Dma4K0.png",
      description: "Memasak dan persiapan makanan"
    }
  };
  const skill = skills[skillType];
  const skillKeys = Object.keys(skills);
  return {
    flags: 32768 | 64,
    // Components V2 + Ephemeral
    components: [
      {
        type: 17,
        accent_color: 5704741,
        components: [
          {
            type: 10,
            content: `## Material-material yang dibutuhkan:
### ${skill.title}

**Material:** ${skill.materials}

*${skill.description}*`
          },
          {
            type: 12,
            items: [
              {
                media: {
                  url: skill.image
                }
              }
            ]
          }
        ]
      },
      {
        type: 1,
        // Action Row for navigation
        components: skillKeys.slice(0, 4).map((key) => ({
          style: key === skillType ? 1 : 2,
          // Primary if active, Secondary if not
          type: 2,
          label: skills[key].title.split(" ")[1],
          // Just the name without emoji
          emoji: {
            name: skills[key].title.split(" ")[0]
            // Just the emoji
          },
          custom_id: `material_${key}`,
          disabled: key === skillType
          // Disable current selection
        }))
      },
      {
        type: 1,
        // Second Action Row for remaining skills
        components: skillKeys.slice(4).map((key) => ({
          style: key === skillType ? 1 : 2,
          type: 2,
          label: skills[key].title.split(" ")[1],
          emoji: {
            name: skills[key].title.split(" ")[0]
          },
          custom_id: `material_${key}`,
          disabled: key === skillType
        }))
      }
    ]
  };
}
__name(createMaterialView, "createMaterialView");
function createCustomMessage() {
  return {
    flags: 32768,
    components: [
      {
        type: 17,
        // Container
        accent_color: 5704741,
        // Custom color from discohook
        components: [
          {
            type: 9,
            // Section
            components: [
              {
                type: 10,
                // Text Display
                content: "# [Test] Selamat siang! Sudahkah Anda macul minggu ini?\n### Quest life skill mingguan sudah tersedia!\nQuest ini memberi xp sebesar **7200** ke setiap life skill kamu, sangat membantu percepatan leveling pada early game.\n\nKamu bisa menemukan Gaido disini:"
              }
            ],
            accessory: {
              type: 11,
              // Media
              media: {
                url: "https://i.imgur.com/Mkr1InL.png"
              },
              spoiler: false
            }
          },
          {
            type: 12,
            // Media Gallery
            items: [
              {
                media: {
                  url: "https://i.imgur.com/nx4idzB.png"
                }
              }
            ]
          }
        ]
      },
      {
        type: 1,
        // Action Row
        components: [
          {
            style: 1,
            // Primary button
            type: 2,
            // Button
            label: "Lihat Kebutuhan Material",
            emoji: {
              name: "\u{1F5D2}\uFE0F"
            },
            custom_id: "p_225151635284824132"
          },
          {
            style: 5,
            // Link button (opens in new tab)
            type: 2,
            // Button
            label: "Buka di Web \u2197\uFE0F",
            emoji: {
              name: "\u{1F310}"
            },
            url: "https://shrill-snowflake-32e1.aqbars1998.workers.dev/weekly"
          }
        ]
      }
    ]
  };
}
__name(createCustomMessage, "createCustomMessage");
async function sendMessageToDiscord(channelId, message, botToken) {
  const discordApiUrl = `https://discord.com/api/v10/channels/${channelId}/messages`;
  const response = await fetch(discordApiUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bot ${botToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  });
  if (!response.ok) {
    const error = await response.text();
    console.error("Failed to send Discord message:", error);
    throw new Error(`Discord API error: ${response.status}`);
  }
  return await response.json();
}
__name(sendMessageToDiscord, "sendMessageToDiscord");

// worker.js
function getWeeklyPage() {
  const template = getWeeklyPageTemplate();
  return template.replace("SKILLS_DATA_PLACEHOLDER", JSON.stringify(skillsData));
}
__name(getWeeklyPage, "getWeeklyPage");
var worker_default = {
  // Handle HTTP requests (slash commands and web pages)
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET") {
      if (url.pathname === "/weekly") {
        return new Response(getWeeklyPage(), {
          headers: { "Content-Type": "text/html" }
        });
      }
      if (url.pathname === "/") {
        return new Response(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Discord Quest Bot</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h1>\u{1F3AE} Discord Quest Bot</h1>
            <p>Ini adalah Discord bot untuk material quest mingguan.</p>
            <ul>
              <li><strong>/test</strong> - Dapatkan informasi quest mingguan</li>
              <li><strong><a href="/weekly">Material Mingguan</a></strong> - Lihat material di antarmuka web</li>
            </ul>
            <p>Status Bot: \u2705 Online</p>
          </body>
          </html>
        `, {
          headers: { "Content-Type": "text/html" }
        });
      }
    }
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }
    try {
      const signature = request.headers.get("x-signature-ed25519");
      const timestamp = request.headers.get("x-signature-timestamp");
      const body = await request.text();
      if (env.DISCORD_PUBLIC_KEY && signature && timestamp) {
        const isValid = await verifyDiscordSignature(
          env.DISCORD_PUBLIC_KEY,
          signature,
          timestamp,
          body
        );
        if (!isValid) {
          console.error("Invalid Discord signature");
          return new Response("Unauthorized", { status: 401 });
        }
      }
      const interaction = JSON.parse(body);
      if (interaction.type === 1) {
        return new Response(JSON.stringify({ type: 1 }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      if (interaction.type === 2) {
        const commandName = interaction.data?.name;
        if (commandName === "test") {
          const response = createCustomMessage();
          return new Response(JSON.stringify({
            type: 4,
            data: response
          }), {
            headers: { "Content-Type": "application/json" }
          });
        }
        return new Response(JSON.stringify({
          type: 4,
          data: {
            content: `\u{1F916} Perintah "${commandName}" diterima di Cloudflare Workers!`
          }
        }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      if (interaction.type === 3) {
        const customId = interaction.data?.custom_id;
        let responseMessage = "";
        switch (customId) {
          case "p_225151635284824132":
            return new Response(JSON.stringify({
              type: 4,
              data: createMaterialView("botany")
            }), {
              headers: { "Content-Type": "application/json" }
            });
          // Navigation buttons for different life skills
          case "material_botany":
            return new Response(JSON.stringify({
              type: 7,
              // Update message
              data: createMaterialView("botany")
            }), {
              headers: { "Content-Type": "application/json" }
            });
          case "material_mineralogy":
            return new Response(JSON.stringify({
              type: 7,
              // Update message
              data: createMaterialView("mineralogy")
            }), {
              headers: { "Content-Type": "application/json" }
            });
          case "material_gemology":
            return new Response(JSON.stringify({
              type: 7,
              // Update message
              data: createMaterialView("gemology")
            }), {
              headers: { "Content-Type": "application/json" }
            });
          case "material_alchemy":
            return new Response(JSON.stringify({
              type: 7,
              // Update message
              data: createMaterialView("alchemy")
            }), {
              headers: { "Content-Type": "application/json" }
            });
          case "material_gemcrafting":
            return new Response(JSON.stringify({
              type: 7,
              // Update message
              data: createMaterialView("gemcrafting")
            }), {
              headers: { "Content-Type": "application/json" }
            });
          case "material_artisan":
            return new Response(JSON.stringify({
              type: 7,
              // Update message
              data: createMaterialView("artisan")
            }), {
              headers: { "Content-Type": "application/json" }
            });
          case "material_smelting":
            return new Response(JSON.stringify({
              type: 7,
              // Update message
              data: createMaterialView("smelting")
            }), {
              headers: { "Content-Type": "application/json" }
            });
          case "material_culinary":
            return new Response(JSON.stringify({
              type: 7,
              // Update message
              data: createMaterialView("culinary")
            }), {
              headers: { "Content-Type": "application/json" }
            });
          case "p_225145722704498690":
            responseMessage = "\u{1F33F} **Botany Detail:**\n\nHay x80 - Dapat ditemukan di area grassland\nTartberry Juice x80 - Dari tartberry bush\nBase Soil x80 - Tanah dasar untuk farming\nResin x80 - Dari pohon-pohon tertentu";
            break;
          case "p_225148799771742302":
            responseMessage = "\u{1FAA8} **Mineralogy Detail:**\n\nClay x80 - Tanah liat dari area berlumpur\nFine Sand x80 - Pasir halus dari pantai\nLimp Azure Water x80 - Air biru dari sumber khusus\nFine Metal Sand x80 - Pasir logam dari area tambang";
            break;
          default:
            responseMessage = "\u2753 Interaksi tombol tidak dikenal.";
        }
        return new Response(JSON.stringify({
          type: 4,
          data: {
            content: responseMessage,
            flags: 64
            // Ephemeral flag
          }
        }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify({
        type: 4,
        data: {
          content: `Tipe interaksi tidak dikenal: ${interaction.type}`
        }
      }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Worker error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
  // Handle scheduled events (cron jobs)
  async scheduled(event, env) {
    console.log("Scheduled event triggered:", event.cron);
    try {
      const questMessage = createCustomMessage();
      const channelId = env.DISCORD_CHANNEL_ID;
      const botToken = env.DISCORD_TOKEN;
      if (!channelId) {
        console.error("DISCORD_CHANNEL_ID environment variable not set");
        return;
      }
      if (!botToken) {
        console.error("DISCORD_TOKEN environment variable not set");
        return;
      }
      const result = await sendMessageToDiscord(channelId, questMessage, botToken);
      console.log("Pesan quest berhasil dikirim:", result.id);
    } catch (error) {
      console.error("Error in scheduled handler:", error);
    }
  }
};

// ../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-xZhRA0/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// ../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-xZhRA0/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
