import { createTree } from './Tree.js';

export default {
  title: 'Components/Tree',
  parameters: {
    docs: {
      description: {
        component:
          'Hierarchical tree view with expand/collapse, selection, and keyboard navigation. ' +
          'ARIA tree pattern: ArrowUp/Down navigate, ArrowRight expands or moves to first child, ' +
          'ArrowLeft collapses or moves to parent, Home/End jump, Enter/Space select.',
      },
    },
  },
};

const orgTree = [
  {
    id: 'isu',
    label: 'İstinye Üniversitesi',
    icon: '🏛',
    children: [
      {
        id: 'eng',
        label: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        icon: '⚙',
        children: [
          {
            id: 'cse',
            label: 'Bilgisayar Mühendisliği',
            badge: 12,
            children: [
              { id: 'p1', label: 'Prof. Dr. Ahmet Yılmaz', icon: '👤' },
              { id: 'p2', label: 'Doç. Dr. Mehmet Demir', icon: '👤' },
              { id: 'p3', label: 'Dr. Öğr. Üyesi Ayşe Kaya', icon: '👤' },
              { id: 'p4', label: 'Arş. Gör. Zeynep Aydın', icon: '👤' },
            ],
          },
          { id: 'ee', label: 'Elektrik-Elektronik Mühendisliği', badge: 8 },
          { id: 'ind', label: 'Endüstri Mühendisliği', badge: 6 },
          { id: 'civ', label: 'İnşaat Mühendisliği', badge: 9 },
        ],
      },
      {
        id: 'med',
        label: 'Tıp Fakültesi',
        icon: '🩺',
        children: [
          { id: 'med1', label: 'Dahili Tıp Bilimleri', badge: 14 },
          { id: 'med2', label: 'Cerrahi Tıp Bilimleri', badge: 11 },
          { id: 'med3', label: 'Temel Tıp Bilimleri', badge: 9 },
        ],
      },
      {
        id: 'bus',
        label: 'İşletme Fakültesi',
        icon: '💼',
        children: [
          { id: 'bus1', label: 'İşletme', badge: 7 },
          { id: 'bus2', label: 'Uluslararası Ticaret', badge: 5 },
          { id: 'bus3', label: 'Ekonomi', badge: 6 },
        ],
      },
      {
        id: 'art',
        label: 'Sanat ve Tasarım Fakültesi',
        icon: '🎨',
        children: [
          { id: 'art1', label: 'Görsel İletişim Tasarımı', badge: 4 },
          { id: 'art2', label: 'Endüstriyel Tasarım', badge: 3 },
        ],
      },
    ],
  },
];

export const Organization = () =>
  createTree({
    items: orgTree,
    defaultExpanded: ['isu', 'eng', 'cse'],
    selected: 'p1',
    onSelect: (id, item) => console.log('selected:', id, item.label),
    onToggle: (id, expanded) => console.log('toggle:', id, expanded),
  });
Organization.storyName = 'Organization chart';

export const Collapsed = () =>
  createTree({
    items: orgTree,
    defaultExpanded: ['isu'],
  });

export const NotSelectable = () =>
  createTree({
    items: orgTree,
    defaultExpanded: ['isu', 'eng'],
    selectable: false,
  });
NotSelectable.storyName = 'Display-only (no selection)';

export const SingleLevel = () =>
  createTree({
    items: [
      { id: 'a', label: 'Ders Programı', icon: '📅' },
      { id: 'b', label: 'Sınav Takvimi', icon: '📝' },
      { id: 'c', label: 'Akademik Takvim', icon: '🗓' },
      { id: 'd', label: 'Notlar', icon: '📊' },
      { id: 'e', label: 'Devamsızlık', icon: '✓' },
    ],
  });
SingleLevel.storyName = 'Flat list (no nesting)';
