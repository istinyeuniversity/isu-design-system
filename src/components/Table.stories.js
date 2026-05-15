import { createTable, createDataTable } from './Table.js';

export default {
  title: 'Components/Table',
  argTypes: {
    headers: { control: 'object' },
    rows: { control: 'object' },
  },
};

const Template = ({ headers, rows }) => {
  return createTable({ headers, rows });
};

export const Default = Template.bind({});
Default.args = {
  headers: ['Ad', 'Soyad', 'Email', 'Durum'],
  rows: [
    ['Ahmet', 'Yılmaz', 'ahmet@example.com', 'Aktif'],
    ['Ayşe', 'Demir', 'ayse@example.com', 'Aktif'],
    ['Mehmet', 'Kaya', 'mehmet@example.com', 'Pasif'],
  ],
};

export const AcademicData = Template.bind({});
AcademicData.args = {
  headers: ['Öğretim Üyesi', 'Bölüm', 'Unvan', 'Puan'],
  rows: [
    ['Prof. Dr. Ahmet Yılmaz', 'Bilgisayar Mühendisliği', 'Profesör', '95'],
    ['Doç. Dr. Ayşe Demir', 'Elektrik Mühendisliği', 'Doçent', '88'],
    ['Dr. Öğr. Üyesi Mehmet Kaya', 'Makine Mühendisliği', 'Doktor Öğretim Üyesi', '82'],
  ],
};

export const EmptyTable = Template.bind({});
EmptyTable.args = {
  headers: ['Sütun 1', 'Sütun 2', 'Sütun 3'],
  rows: [],
};

export const SingleRow = Template.bind({});
SingleRow.args = {
  headers: ['Başlık', 'Değer'],
  rows: [
    ['Toplam Başvuru', '125'],
  ],
};

export const ManyRows = Template.bind({});
ManyRows.args = {
  headers: ['#', 'Ad Soyad', 'Email', 'Telefon', 'Durum'],
  rows: [
    ['1', 'Ahmet Yılmaz', 'ahmet@example.com', '555-0001', 'Aktif'],
    ['2', 'Ayşe Demir', 'ayse@example.com', '555-0002', 'Aktif'],
    ['3', 'Mehmet Kaya', 'mehmet@example.com', '555-0003', 'Pasif'],
    ['4', 'Zeynep Öz', 'zeynep@example.com', '555-0004', 'Aktif'],
    ['5', 'Can Yücel', 'can@example.com', '555-0005', 'Aktif'],
  ],
};

// ============================================
// createDataTable — gelişmiş varyant (sıralama, arama, sayfalama, seçim)
// Mevcut createTable'ı kullanan projeler etkilenmez; bu ayrı bir factory.
// ============================================

const facultyData = [
  { id: 1, title: 'Prof. Dr.', name: 'Ahmet Yılmaz', faculty: 'Mühendislik ve Doğa Bilimleri', department: 'Bilgisayar Mühendisliği', office: 'B-305', ext: 5832, year: 2015 },
  { id: 2, title: 'Doç. Dr.', name: 'Mehmet Demir', faculty: 'Mühendislik ve Doğa Bilimleri', department: 'Bilgisayar Mühendisliği', office: 'B-312', ext: 5841, year: 2018 },
  { id: 3, title: 'Dr. Öğr. Üyesi', name: 'Ayşe Kaya', faculty: 'Mühendislik ve Doğa Bilimleri', department: 'Bilgisayar Mühendisliği', office: 'B-208', ext: 5829, year: 2020 },
  { id: 4, title: 'Prof. Dr.', name: 'Hasan Şahin', faculty: 'Mühendislik ve Doğa Bilimleri', department: 'Elektrik-Elektronik Mühendisliği', office: 'C-410', ext: 5901, year: 2014 },
  { id: 5, title: 'Dr. Öğr. Üyesi', name: 'Ali Çelik', faculty: 'Mühendislik ve Doğa Bilimleri', department: 'Elektrik-Elektronik Mühendisliği', office: 'C-405', ext: 5912, year: 2021 },
  { id: 6, title: 'Doç. Dr.', name: 'Fatma Arslan', faculty: 'Mühendislik ve Doğa Bilimleri', department: 'Endüstri Mühendisliği', office: 'D-201', ext: 5950, year: 2017 },
  { id: 7, title: 'Prof. Dr.', name: 'Mustafa Kara', faculty: 'Tıp Fakültesi', department: 'Dahili Tıp Bilimleri', office: 'TF-102', ext: 6101, year: 2010 },
  { id: 8, title: 'Doç. Dr.', name: 'Elif Öztürk', faculty: 'Tıp Fakültesi', department: 'Dahili Tıp Bilimleri', office: 'TF-115', ext: 6112, year: 2016 },
  { id: 9, title: 'Prof. Dr.', name: 'Kerem Yıldız', faculty: 'Tıp Fakültesi', department: 'Cerrahi Tıp Bilimleri', office: 'TF-201', ext: 6201, year: 2012 },
  { id: 10, title: 'Dr. Öğr. Üyesi', name: 'Selin Aydın', faculty: 'Tıp Fakültesi', department: 'Cerrahi Tıp Bilimleri', office: 'TF-208', ext: 6215, year: 2022 },
  { id: 11, title: 'Prof. Dr.', name: 'Burak Polat', faculty: 'İşletme Fakültesi', department: 'İşletme', office: 'İF-301', ext: 6301, year: 2013 },
  { id: 12, title: 'Doç. Dr.', name: 'Deniz Akar', faculty: 'İşletme Fakültesi', department: 'İşletme', office: 'İF-310', ext: 6322, year: 2019 },
  { id: 13, title: 'Dr. Öğr. Üyesi', name: 'Gamze Çetin', faculty: 'İşletme Fakültesi', department: 'Uluslararası Ticaret', office: 'İF-405', ext: 6340, year: 2021 },
  { id: 14, title: 'Prof. Dr.', name: 'Onur Erdoğan', faculty: 'İşletme Fakültesi', department: 'Ekonomi', office: 'İF-220', ext: 6312, year: 2011 },
  { id: 15, title: 'Doç. Dr.', name: 'Pınar Güneş', faculty: 'Sanat ve Tasarım Fakültesi', department: 'Görsel İletişim Tasarımı', office: 'ST-101', ext: 6401, year: 2017 },
  { id: 16, title: 'Dr. Öğr. Üyesi', name: 'Cem Tunç', faculty: 'Sanat ve Tasarım Fakültesi', department: 'Endüstriyel Tasarım', office: 'ST-115', ext: 6420, year: 2022 },
  { id: 17, title: 'Prof. Dr.', name: 'Tuğba Kılıç', faculty: 'Tıp Fakültesi', department: 'Temel Tıp Bilimleri', office: 'TF-301', ext: 6230, year: 2010 },
  { id: 18, title: 'Doç. Dr.', name: 'Serkan Aksoy', faculty: 'Mühendislik ve Doğa Bilimleri', department: 'İnşaat Mühendisliği', office: 'E-110', ext: 5970, year: 2018 },
  { id: 19, title: 'Dr. Öğr. Üyesi', name: 'Esra Doğan', faculty: 'Mühendislik ve Doğa Bilimleri', department: 'İnşaat Mühendisliği', office: 'E-118', ext: 5982, year: 2020 },
  { id: 20, title: 'Prof. Dr.', name: 'Murat Şen', faculty: 'İşletme Fakültesi', department: 'Ekonomi', office: 'İF-225', ext: 6318, year: 2009 },
  { id: 21, title: 'Doç. Dr.', name: 'Nazlı Bulut', faculty: 'İşletme Fakültesi', department: 'Uluslararası Ticaret', office: 'İF-410', ext: 6348, year: 2019 },
  { id: 22, title: 'Arş. Gör.', name: 'Zeynep Aydın', faculty: 'Mühendislik ve Doğa Bilimleri', department: 'Bilgisayar Mühendisliği', office: 'B-401', ext: 5860, year: 2023 },
  { id: 23, title: 'Arş. Gör.', name: 'Emre Bilir', faculty: 'Mühendislik ve Doğa Bilimleri', department: 'Endüstri Mühendisliği', office: 'D-205', ext: 5955, year: 2023 },
  { id: 24, title: 'Dr. Öğr. Üyesi', name: 'Berk Aksu', faculty: 'Sanat ve Tasarım Fakültesi', department: 'Görsel İletişim Tasarımı', office: 'ST-108', ext: 6410, year: 2021 },
];

const facultyColumns = [
  { key: 'title', label: 'Unvan', sortable: true, width: '110px' },
  { key: 'name', label: 'Ad Soyad', sortable: true },
  { key: 'department', label: 'Bölüm', sortable: true },
  { key: 'faculty', label: 'Fakülte', sortable: true },
  { key: 'office', label: 'Ofis', align: 'center', width: '80px' },
  { key: 'ext', label: 'Dahili', align: 'right', width: '80px', sortable: true },
  { key: 'year', label: 'Başlama', align: 'right', width: '90px', sortable: true },
];

export const DataTable_AllFeatures = () => {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'height: 480px; display: flex; flex-direction: column;';
  wrap.appendChild(
    createDataTable({
      columns: [
        { key: 'title', label: 'Unvan', sortable: true, width: '110px', minWidth: 90 },
        { key: 'name', label: 'Ad Soyad', sortable: true, width: '170px' },
        { key: 'department', label: 'Bölüm', sortable: true, width: '230px' },
        { key: 'faculty', label: 'Fakülte', sortable: true, width: '280px' },
        { key: 'office', label: 'Ofis', align: 'center', width: '90px', resizable: false },
        { key: 'ext', label: 'Dahili', align: 'right', width: '90px', sortable: true, resizable: false },
        { key: 'year', label: 'Başlama', align: 'right', width: '100px', sortable: true },
      ],
      rows: facultyData,
      rowKey: 'id',
      sortable: true,
      searchable: true,
      pageSize: 50,
      pageSizeOptions: [10, 25, 50],
      selectable: 'multiple',
      stickyHeader: true,
      resizable: true,
      density: 'comfortable',
      defaultSort: { key: 'faculty', dir: 'asc' },
      onSelectionChange: (rows) =>
        console.log('seçili kayıt:', rows.length, rows.map((r) => r.name)),
      onSort: (s) => console.log('sıralama:', s),
      onColumnResize: (key, w) => console.log(`${key} → ${w}px`),
    })
  );
  return wrap;
};
DataTable_AllFeatures.storyName = 'DataTable — full featured';
DataTable_AllFeatures.parameters = {
  docs: {
    description: {
      story:
        'Tüm özellikler bir arada: sıralama, arama, sayfalama (10/25/50), çoklu seçim, sticky thead, kolon ' +
        'yeniden boyutlandırma. Sticky\'nin görünmesi için dış container 480px yükseklik ile sınırlanmış. ' +
        '"Ofis" ve "Dahili" kolonları `resizable: false` ile sabit; diğerleri sürüklenebilir (Excel mantığı: ' +
        'bir kolonu büyütünce diğerleri aynı kalır, tablo eni artar, yatay scroll açılır). ' +
        'Mevcut `createTable`\'a hiç dokunmaz, `.isu-data-table-*` ayrı namespace.',
    },
  },
};

export const DataTable_SortOnly = () =>
  createDataTable({
    columns: facultyColumns,
    rows: facultyData.slice(0, 10),
    sortable: true,
  });
DataTable_SortOnly.storyName = 'DataTable — sortable only';

export const DataTable_Searchable = () =>
  createDataTable({
    columns: facultyColumns,
    rows: facultyData,
    sortable: true,
    searchable: true,
  });
DataTable_Searchable.storyName = 'DataTable — searchable';

export const DataTable_Paginated = () =>
  createDataTable({
    columns: facultyColumns,
    rows: facultyData,
    sortable: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
  });
DataTable_Paginated.storyName = 'DataTable — paginated';

export const DataTable_SelectableSingle = () =>
  createDataTable({
    columns: facultyColumns,
    rows: facultyData.slice(0, 8),
    selectable: 'single',
    defaultSelected: [3],
    onSelectionChange: (rows) => console.log('selected:', rows),
  });
DataTable_SelectableSingle.storyName = 'DataTable — single selection (radio)';

export const DataTable_SelectableMultiple = () =>
  createDataTable({
    columns: facultyColumns,
    rows: facultyData.slice(0, 8),
    selectable: 'multiple',
    defaultSelected: [1, 3],
  });
DataTable_SelectableMultiple.storyName = 'DataTable — multi selection (checkbox)';

export const DataTable_StickyHeader = () => {
  const box = document.createElement('div');
  box.style.maxHeight = '320px';
  box.style.display = 'flex';
  box.appendChild(
    createDataTable({
      columns: facultyColumns,
      rows: facultyData,
      sortable: true,
      stickyHeader: true,
    })
  );
  return box;
};
DataTable_StickyHeader.storyName = 'DataTable — sticky header (scroll body)';

export const DataTable_Compact = () =>
  createDataTable({
    columns: facultyColumns,
    rows: facultyData.slice(0, 10),
    density: 'compact',
    sortable: true,
  });
DataTable_Compact.storyName = 'DataTable — compact density';

export const DataTable_WithRenderCell = () => {
  const statusBadge = (year) => {
    const span = document.createElement('span');
    const isNew = year >= 2022;
    span.textContent = isNew ? 'Yeni' : 'Mevcut';
    span.style.cssText = `
      display: inline-block;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      background: ${isNew ? '#10b981' : '#e5e5e5'};
      color: ${isNew ? 'white' : '#525252'};
      font-size: 0.75rem;
      font-weight: 500;
    `;
    return span;
  };
  return createDataTable({
    columns: [
      { key: 'title', label: 'Unvan', sortable: true, width: '110px' },
      { key: 'name', label: 'Ad Soyad', sortable: true },
      { key: 'department', label: 'Bölüm', sortable: true },
      {
        key: 'year',
        label: 'Durum',
        align: 'center',
        width: '100px',
        render: (row) => statusBadge(row.year),
      },
    ],
    rows: facultyData.slice(0, 10),
    sortable: true,
  });
};
DataTable_WithRenderCell.storyName = 'DataTable — custom cell render (badge)';

export const DataTable_EmptyState = () =>
  createDataTable({
    columns: facultyColumns,
    rows: [],
    searchable: true,
    emptyState: {
      icon: '👥',
      title: 'Henüz öğretim üyesi eklenmedi',
      description: 'Yeni üye ekleyerek bu listeyi doldurabilirsiniz.',
    },
  });
DataTable_EmptyState.storyName = 'DataTable — empty state (no rows)';

export const DataTable_Resizable = () =>
  createDataTable({
    columns: [
      { key: 'title', label: 'Unvan', sortable: true, width: '110px', minWidth: 80 },
      { key: 'name', label: 'Ad Soyad', sortable: true, width: '160px' },
      { key: 'department', label: 'Bölüm', sortable: true, width: '220px' },
      { key: 'faculty', label: 'Fakülte', sortable: true, width: '280px' },
      { key: 'office', label: 'Ofis', align: 'center', width: '80px', resizable: false },
      { key: 'ext', label: 'Dahili', align: 'right', width: '80px', sortable: true, resizable: false },
      { key: 'year', label: 'Başlama', align: 'right', width: '90px', sortable: true },
    ],
    rows: facultyData,
    sortable: true,
    searchable: true,
    pageSize: 10,
    resizable: true,
    onColumnResize: (key, width) =>
      console.log(`column ${key} resized to ${width}px`),
  });
DataTable_Resizable.storyName = 'DataTable — resizable columns';
DataTable_Resizable.parameters = {
  docs: {
    description: {
      story:
        'Header sağ kenarındaki ince çubuğu sürükleyerek (veya dokunarak) kolon genişliklerini değiştirin. ' +
        'Ofis ve Dahili kolonları `resizable: false` ile sabit. `column.minWidth` ile alt sınır (default 60px), ' +
        '`onColumnResize(key, width)` callback\'i ile değişimi yakalayabilirsiniz. ' +
        'Resizable mod `table-layout: fixed` kullandığı için hücrelerde otomatik ellipsis aktif.',
    },
  },
};

