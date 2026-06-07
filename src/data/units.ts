/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UnitGroup, StateZakat, GoldStandard } from '../types';

export const UNIT_GROUPS: UnitGroup[] = [
  {
    category: 'length',
    name: 'Panjang & Jarak',
    localName: 'Ukuran Panjang Tradisional',
    baseUnitSymbol: 'm',
    description: 'Unit ukuran panjang Melayu tradisional diambil dari anggota badan manusia (antropometrik) sebelum penyeragaman metrik.',
    units: [
      {
        id: 'jengkal',
        name: 'Jengkal',
        localName: 'Jengkal',
        symbol: 'jkl',
        ratioToBase: 0.2286,
        description: 'Jarak dari hujung ibu jari ke hujung jari kelingking yang diregangkan.',
        origin: 'Paling kerap digunakan dalam kehidupan seharian orang Melayu lama untuk mengukur perabot, kain, atau papan.',
        type: 'traditional'
      },
      {
        id: 'hasta',
        name: 'Hasta',
        localName: 'Hasta',
        symbol: 'hst',
        ratioToBase: 0.4572,
        description: 'Jarak dari siku ke hujung jari hantu yang diluruskan. Bersamaan dengan 2 jengkal.',
        origin: 'Digunakan secara tradisional dalam pembinaan rumah kayu Melayu, ukuran tiang, dan pembuatan senjata seperti keris.',
        type: 'traditional'
      },
      {
        id: 'depa',
        name: 'Depa',
        localName: 'Depa',
        symbol: 'dpa',
        ratioToBase: 1.8288,
        description: 'Jarak antara kedua-dua hujung jari hantu apabila kedua-dua tangan didepakan dada. Bersamaan dengan 4 hasta.',
        origin: 'Sangat sinonim dengan ukuran kedalaman laut (fathom), panjang tali hiasan, serta tapak pembinaan rumah tradisional.',
        type: 'traditional'
      },
      {
        id: 'jela',
        name: 'Jela',
        localName: 'Jela',
        symbol: 'jel',
        ratioToBase: 3.6576,
        description: 'Bersamaan dengan 2 depa (kira-kira 12 kaki). Digunakan untuk rentangan sederhana panjang.',
        origin: 'Sering digunakan untuk mengukur jala ikan, tali penarik bot, dan rentangan kain.',
        type: 'traditional'
      },
      {
        id: 'rantai',
        name: 'Rantai',
        localName: 'Rantai',
        symbol: 'rt',
        ratioToBase: 40.2336,
        description: 'Bersamaan dengan 11 jela atau 22 depa (kira-kira 132 kaki). Digunakan dalam ukuran tanah lama.',
        origin: 'Asalnya diserap dari kaedah pemetaan penjajah (Gunter chain) dan diadaptasi ke dalam geran tanah tradisional negeri-negeri Melayu.',
        type: 'traditional'
      },
      {
        id: 'batu',
        name: 'Batu / Mile',
        localName: 'Batu Melayu',
        symbol: 'bt',
        ratioToBase: 1609.344,
        description: 'Kiraan jarak jauh tradisional yang bersamaan dengan satu batu British (1.609 km).',
        origin: 'Dalam logat kampung, "batu" merujuk kepada penanda batu jalan raya atau tiang kilometer masa kini.',
        type: 'traditional'
      },
      {
        id: 'mm',
        name: 'Milimeter',
        localName: 'Milimeter',
        symbol: 'mm',
        ratioToBase: 0.001,
        description: 'Sistem metrik sub-sentimeter standar.',
        origin: 'Sistem Antarabangsa (SI).',
        type: 'modern'
      },
      {
        id: 'cm',
        name: 'Sentimeter',
        localName: 'Sentimeter',
        symbol: 'cm',
        ratioToBase: 0.01,
        description: 'Sistem metrik sentimeter standar.',
        origin: 'Sistem Antarabangsa (SI).',
        type: 'modern'
      },
      {
        id: 'm',
        name: 'Meter',
        localName: 'Meter',
        symbol: 'm',
        ratioToBase: 1.0,
        description: 'Sistem metrik asas untuk panjang.',
        origin: 'Sistem Antarabangsa (SI).',
        type: 'modern'
      },
      {
        id: 'km',
        name: 'Kilometer',
        localName: 'Kilometer',
        symbol: 'km',
        ratioToBase: 1000.0,
        description: 'Sistem metrik jarak jauh.',
        origin: 'Sistem Antarabangsa (SI).',
        type: 'modern'
      },
      {
        id: 'inci',
        name: 'Inci',
        localName: 'Inci',
        symbol: 'in',
        ratioToBase: 0.0254,
        description: 'Sistem Imperial standard.',
        origin: 'Sistem Ukuran British / Imperial.',
        type: 'modern'
      },
      {
        id: 'kaki',
        name: 'Kaki',
        localName: 'Kaki',
        symbol: 'ft',
        ratioToBase: 0.3048,
        description: 'Sistem Imperial standard (12 inci).',
        origin: 'Sistem Ukuran British / Imperial.',
        type: 'modern'
      }
    ]
  },
  {
    category: 'mass',
    name: 'Jisim & Berat',
    localName: 'Sukatan Berat Tradisional',
    baseUnitSymbol: 'g',
    description: 'Unit timbangan tradisional yang digunakan secara meluas di pelabuhan Melayu, perdagangan rempah, dan pertukangan emas lama.',
    units: [
      {
        id: 'saga',
        name: 'Saga',
        localName: 'Biji Saga',
        symbol: 'saga',
        ratioToBase: 0.2,
        description: 'Asalnya disandarkan pada berat purata sebiji benih pokok saga merah (Abrus precatorius) yang sangat konsisten, disetarakan sebagai 0.2 gram.',
        origin: 'Digunakan oleh tukang emas Melayu tradisional sebagai unit timbangan terkecil untuk emas dan barangan berharga.',
        type: 'traditional'
      },
      {
        id: 'mayam',
        name: 'Mayam',
        localName: 'Mayam',
        symbol: 'mym',
        ratioToBase: 3.375,
        description: 'Unit khusus timbangan emas di semenanjung Malaysia. Bersamaan 12 Saga (3.375 gram).',
        origin: 'Masih digunapakai sehingga hari ini dalam industri kedai emas tradisional Malaysia (terutamanya di Pantai Timur seperti Kelantan dan Terengganu).',
        type: 'traditional'
      },
      {
        id: 'tahil',
        name: 'Tahil',
        localName: 'Tahil Trade',
        symbol: 'thl',
        ratioToBase: 37.79936,
        description: 'Unit timbangan yang disetarakan dalam Akta Timbangan dan Sukatan Malaysia sebagai 37.79936 gram (1 1/3 oz).',
        origin: 'Digunakan untuk herba perubatan cina, rempah ratus di pasar basah, serta barangan dagangan berharga di pelabuhan.',
        type: 'traditional'
      },
      {
        id: 'kati',
        name: 'Kati',
        localName: 'Kati',
        symbol: 'kt',
        ratioToBase: 604.78982,
        description: 'Bersamaan dengan 16 tahil (kira-kira 604.79 gram atau 1 1/3 lb).',
        origin: 'Masih biasa didengari dalam kalangan generasi lama semasa membeli ayam, ikan, atau ubi di pasar tradisi Malaysia.',
        type: 'traditional'
      },
      {
        id: 'pikul',
        name: 'Pikul',
        localName: 'Pikul',
        symbol: 'pkl',
        ratioToBase: 60478.982,
        description: 'Bersamaan dengan 100 kati atau 60.479 kg (133 1/3 lb). Kelayakan bebanan yang mampu dipikul oleh seorang lelaki.',
        origin: 'Digunakan meluas untuk kuantiti barangan pukal sejarah Malaysia seperti bijih timah, hasil getah, dan guni padi.',
        type: 'traditional'
      },
      {
        id: 'koyan_mass',
        name: 'Koyan (Jisim)',
        localName: 'Koyan',
        symbol: 'kyn_m',
        ratioToBase: 2419159.28,
        description: 'Bersamaan dengan 40 pikul (kira-kira 2.419 metric ton atau 5,333 1/3 lb).',
        origin: 'Sukatan perdagangan besar kargo perkapalan di pelabuhan Selat Melaka zaman dahulu.',
        type: 'traditional'
      },
      {
        id: 'mg',
        name: 'Miligram',
        localName: 'Miligram',
        symbol: 'mg',
        ratioToBase: 0.001,
        description: 'Unit metrik terkecil umum.',
        origin: 'Sistem Antarabangsa (SI).',
        type: 'modern'
      },
      {
        id: 'g',
        name: 'Gram',
        localName: 'Gram',
        symbol: 'g',
        ratioToBase: 1.0,
        description: 'Sistem metrik asas jisim.',
        origin: 'Sistem Antarabangsa (SI).',
        type: 'modern'
      },
      {
        id: 'kg',
        name: 'Kilogram',
        localName: 'Kilogram',
        symbol: 'kg',
        ratioToBase: 1000.0,
        description: 'Sistem metrik berat isi dagangan harian.',
        origin: 'Sistem Antarabangsa (SI).',
        type: 'modern'
      },
      {
        id: 'auns',
        name: 'Auns (Ounce)',
        localName: 'Ounce',
        symbol: 'oz',
        ratioToBase: 28.349523,
        description: 'Unit Imperial berat.',
        origin: 'Sistem Ukuran British / Imperial.',
        type: 'modern'
      },
      {
        id: 'paun',
        name: 'Paun (Pound)',
        localName: 'Pound',
        symbol: 'lb',
        ratioToBase: 453.59237,
        description: 'Unit Imperial berat (16 auns).',
        origin: 'Sistem Ukuran British / Imperial.',
        type: 'modern'
      }
    ]
  },
  {
    category: 'volume',
    name: 'Isipadu & Cecair',
    localName: 'Sukatan Isipadu Kering & Cecair',
    baseUnitSymbol: 'L',
    description: 'Sukatan isipadu tradisional beras, bijirin, dan cecair berdasarkan bekas kayu atau perkakas dapur Melayu.',
    units: [
      {
        id: 'kepul',
        name: 'Kepul',
        localName: 'Kepul',
        symbol: 'kpl',
        ratioToBase: 0.142065,
        description: 'Sukatan segenggam tangan penuh bijirin kering (kira-kira 142 ml).',
        origin: 'Digunakan oleh orang Melayu dahulu kala semasa mengambil beras dari tempayan untuk memasak hidangan harian.',
        type: 'traditional'
      },
      {
        id: 'kal',
        name: 'Kal / Canting',
        localName: 'Kal',
        symbol: 'kal',
        ratioToBase: 0.28413,
        description: 'Bersamaan dengan 2 kepul. Diambil dari tin susu pekat manis kosong (kira-kira 284 ml).',
        origin: 'Popular di kalangan petani padi dan penjual beras kampung untuk menakar sukatan masakan harian.',
        type: 'traditional'
      },
      {
        id: 'leng',
        name: 'Leng / Pint',
        localName: 'Leng',
        symbol: 'lng',
        ratioToBase: 0.56826,
        description: 'Setara dengan 1 Pint Imperial (568 ml). Bersamaan dengan 2 Kal atau 1/2 Cupak.',
        origin: 'Sukatan isi basah atau minyak serta bijirin sederhana besar.',
        type: 'traditional'
      },
      {
        id: 'cupak',
        name: 'Cupak',
        localName: 'Cupak',
        symbol: 'cpk',
        ratioToBase: 1.13652,
        description: 'Setara dengan 1 Quart Imperial (1.136 Liter). Dahulunya disukat menggunakan tempurung kelapa bulat yang bersih.',
        origin: 'Digunakan secara undang-undang dalam perkiraan Zakat Fitrah separuh atau çupak zakat padi zaman dahulu.',
        type: 'traditional'
      },
      {
        id: 'gantang',
        name: 'Gantang',
        localName: 'Gantang Baghdad',
        symbol: 'gtg',
        ratioToBase: 4.54609,
        description: 'Asas sukatan isi kering tradisional utama, setara dengan 1 Gallon Imperial (4.546 Liter). Bersamaan dengan 4 cupak.',
        origin: 'Merupakan penanda standard untuk Zakat Fitrah orang Melayu di seluruh Malaysia sejak berabad-abad lamanya.',
        type: 'traditional'
      },
      {
        id: 'koyan_vol',
        name: 'Koyan (Isipadu)',
        localName: 'Koyan Isipadu',
        symbol: 'kyn_v',
        ratioToBase: 3636.872,
        description: 'Satu Koyan Isipadu bersamaan dengan 800 Gantang (kira-kira 3,636.9 Liter).',
        origin: 'Pemuatan lumbung padi istana, gudang simpanan makanan, dan pembayaran ufti/cukai beras kepada pihak berkuasa.',
        type: 'traditional'
      },
      {
        id: 'ml',
        name: 'Mililiter',
        localName: 'Mililiter',
        symbol: 'ml',
        ratioToBase: 0.001,
        description: 'Sistem metrik cecair kecil.',
        origin: 'Sistem Antarabangsa (SI).',
        type: 'modern'
      },
      {
        id: 'l',
        name: 'Liter',
        localName: 'Liter',
        symbol: 'L',
        ratioToBase: 1.0,
        description: 'Sistem metrik asas isipadu harian.',
        origin: 'Sistem Antarabangsa (SI).',
        type: 'modern'
      },
      {
        id: 'cawan',
        name: 'Cawan (Cup)',
        localName: 'Cawan Masakan',
        symbol: 'cup',
        ratioToBase: 0.25,
        description: 'Cawan metrik standard masakan (250 ml).',
        origin: 'Sukatan dapur moden.',
        type: 'modern'
      },
      {
        id: 'sudu',
        name: 'Sudu Teh (tsp)',
        localName: 'Sudu Teh',
        symbol: 'tsp',
        ratioToBase: 0.005,
        description: 'Sudu teh standard (5 ml).',
        origin: 'Sukatan dapur moden.',
        type: 'modern'
      }
    ]
  },
  {
    category: 'area',
    name: 'Keluasan Tanah',
    localName: 'Ukuran Luas Tanah Tradisional',
    baseUnitSymbol: 'sq_ft',
    description: 'Unit ukuran keluasan tanah yang meluas didengar dalam urusan pemilikan sawah padi, kebun getah dan geran tanah tradisi di utara Semenanjung.',
    units: [
      {
        id: 'jemba',
        name: 'Jemba',
        localName: 'Jemba',
        symbol: 'jmb',
        ratioToBase: 64.0,
        description: 'Satu petak bersaiz 8 kaki x 8 kaki (bersamaan dengan 1 depa persegi panjang x lebar = 64 kaki persegi).',
        origin: 'Masih digunakan secara rasmi dalam geran-geran tanah lama dan perkiraan ganti rugi pokok kebun di Malaysia.',
        type: 'traditional'
      },
      {
        id: 'penjuru',
        name: 'Penjuru',
        localName: 'Penjuru',
        symbol: 'pj',
        ratioToBase: 7744.0,
        description: 'Satu unit keluasan tanah bersamaan dengan 121 Jemba (7,744 kaki persegi).',
        origin: 'Merupakan bahagian suku bagi satu Relung Kedah tradisional.',
        type: 'traditional'
      },
      {
        id: 'relung_kedah',
        name: 'Relung Kedah (Relung Besar)',
        localName: 'Relung Kedah',
        symbol: 'rlg_k',
        ratioToBase: 30976.0,
        description: 'Keluasan tanah tradisi di Kedah, Perlis, dan Pulau Pinang, bersamaan dengan 4 Penjuru atau 484 Jemba (30,976 kaki persegi).',
        origin: 'Kunci utama petani Kedah (jelapang padi) untuk menentukan "kadar tabur benih" dan anggaran hasil tuaian semusim.',
        type: 'traditional'
      },
      {
        id: 'relung_penang',
        name: 'Relung Penang (Relung Kecil)',
        localName: 'Relung Pulau Pinang',
        symbol: 'rlg_p',
        ratioToBase: 57600.0,
        description: 'Satu standard Relung alternatif yang digunakan di kawasan penempatan Selat, bersamaan dengan 57,600 kaki persegi (~1.32 Ekar).',
        origin: 'Banyak dijumpai dalam geran tanah sejarah Seberang Perai dan pemetaan estet getah awal pihak British.',
        type: 'traditional'
      },
      {
        id: 'kaki_persegi',
        name: 'Kaki Persegi',
        localName: 'Kaki Persegi',
        symbol: 'sq ft',
        ratioToBase: 1.0,
        description: 'Sistem Imperial standard luas.',
        origin: 'Digunakan dalam geran Jabatan Ukur dan Pemetaan Malaysia (JUPEM) lama.',
        type: 'modern'
      },
      {
        id: 'meter_persegi',
        name: 'Meter Persegi',
        localName: 'Meter Persegi',
        symbol: 'm²',
        ratioToBase: 10.76391, // 1 m2 = 10.76391 sq ft
        description: 'Sistem metrik asas untuk luas.',
        origin: 'Piawaian Jabatan Ukur moden Malaysia.',
        type: 'modern'
      },
      {
        id: 'ekar',
        name: 'Ekar',
        localName: 'Ekar (Acre)',
        symbol: 'acre',
        ratioToBase: 43560.0, // 1 ekar = 43560 sq ft
        description: 'Unit keluasan tanah Imperial standard (setara dengan 43,560 kaki persegi).',
        origin: 'Sangat luas diguna pakai hari ini dalam pajakan tanah pertanian komersial di Malaysia.',
        type: 'modern'
      },
      {
        id: 'hektar',
        name: 'Hektar',
        localName: 'Hektar (Hectare)',
        symbol: 'ha',
        ratioToBase: 107639.1, // 1 hektar = 107639.1 sq ft
        description: 'Sistem metrik tanah besar (10,000 meter persegi).',
        origin: 'Unit perkapalan agrikultur rasmi negara agensi seperti FELDA, FELCRA, dan RISDA.',
        type: 'modern'
      }
    ]
  }
];

export const STATE_ZAKAT_DATA: StateZakat[] = [
  { state: 'Selangor', rateNormal: 7.00, rateMedium: 14.00, ratePremium: 21.00, weightEquivalent: 2.70 },
  { state: 'Kedah', rateNormal: 7.00, rateMedium: 14.50, ratePremium: 22.00, weightEquivalent: 2.70 },
  { state: 'Johor', rateNormal: 7.00, rateMedium: 13.00, ratePremium: 20.00, weightEquivalent: 2.70 },
  { state: 'Kelantan', rateNormal: 7.00, rateMedium: 14.00, ratePremium: 21.00, weightEquivalent: 2.70 },
  { state: 'W.P. Kuala Lumpur / Putrajaya', rateNormal: 7.00, rateMedium: 15.00, ratePremium: 22.00, weightEquivalent: 2.70 },
  { state: 'Pulau Pinang', rateNormal: 7.00, rateMedium: 13.00, ratePremium: 20.00, weightEquivalent: 2.70 },
  { state: 'Perak', rateNormal: 7.00, rateMedium: 14.00, ratePremium: 21.00, weightEquivalent: 2.70 },
  { state: 'Terengganu', rateNormal: 8.00, rateMedium: 16.00, ratePremium: 24.00, weightEquivalent: 2.70 },
  { state: 'Pahang', rateNormal: 7.00, rateMedium: 14.00, ratePremium: 21.00, weightEquivalent: 2.70 }
];

export const GOLD_STANDARDS: GoldStandard[] = [
  { type: 'Emas 999 (24K - Emas Padu / Bar)', purity: 0.999, marketPricePerGram: 395.00 },
  { type: 'Emas 916 (22K - Perhiasan Standard MY)', purity: 0.916, marketPricePerGram: 365.00 },
  { type: 'Emas 835 (20K - Perhiasan Pantai Timur)', purity: 0.835, marketPricePerGram: 330.00 },
  { type: 'Emas 750 (18K - Emas Putih / Paun)', purity: 0.750, marketPricePerGram: 295.00 }
];
