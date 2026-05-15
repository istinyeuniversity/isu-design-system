import { createDescriptionList } from './DescriptionList.js';

export default {
  title: 'Components/DescriptionList',
  parameters: {
    docs: {
      description: {
        component:
          'Semantic `<dl>` for label-value pairs. Use for profile/detail pages, order summaries, ' +
          'product specs. Distinct from `Table` (rows of records) and `FormGroup` (interactive inputs).',
      },
    },
  },
};

const facultyMember = [
  { label: 'Unvan', value: 'Prof. Dr.' },
  { label: 'Ad Soyad', value: 'Ahmet Yılmaz' },
  { label: 'Fakülte', value: 'Mühendislik ve Doğa Bilimleri' },
  { label: 'Bölüm', value: 'Bilgisayar Mühendisliği' },
  { label: 'E-posta', value: 'ahmet.yilmaz@istinye.edu.tr' },
  { label: 'Ofis', value: 'B-Blok 305' },
  { label: 'Dahili', value: '5832' },
  {
    label: 'ORCID',
    value: '0000-0001-2345-6789',
    hint: 'Open Researcher and Contributor ID',
  },
];

const student = [
  { label: 'Öğrenci No', value: '202312345' },
  { label: 'Ad Soyad', value: 'Zeynep Demir' },
  { label: 'Fakülte', value: 'İşletme Fakültesi' },
  { label: 'Bölüm', value: 'İşletme' },
  { label: 'Sınıf', value: '3. Sınıf' },
  { label: 'GANO', value: '3.42 / 4.00' },
  { label: 'Danışman', value: 'Doç. Dr. Mehmet Demir' },
];

export const FacultyProfile = () =>
  createDescriptionList({
    items: facultyMember,
    ariaLabel: 'Öğretim üyesi bilgileri',
  });
FacultyProfile.storyName = 'Faculty profile (horizontal)';

export const StackedLayout = () =>
  createDescriptionList({
    items: facultyMember,
    layout: 'stacked',
  });
StackedLayout.storyName = 'Stacked layout (mobile-friendly)';

export const StudentRecord = () =>
  createDescriptionList({
    items: student,
    size: 'lg',
  });
StudentRecord.storyName = 'Student record (large)';

export const Compact = () =>
  createDescriptionList({
    items: facultyMember.slice(0, 5),
    size: 'sm',
  });

export const WithRichValues = () => {
  const badge = (text, color) => {
    const span = document.createElement('span');
    span.textContent = text;
    span.style.cssText = `
      display: inline-block;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      background: ${color};
      color: white;
      font-size: 0.75rem;
      font-weight: 500;
    `;
    return span;
  };
  return createDescriptionList({
    items: [
      { label: 'Unvan', value: 'Prof. Dr.' },
      { label: 'Ad Soyad', value: 'Ahmet Yılmaz' },
      { label: 'Durum', value: badge('Aktif', '#10b981') },
      { label: 'Görev', value: badge('Tam Zamanlı', '#007fff') },
      { label: 'Bölüm', value: 'Bilgisayar Mühendisliği' },
    ],
  });
};
WithRichValues.storyName = 'With Element values (badges)';
