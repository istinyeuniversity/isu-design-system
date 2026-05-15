import { createSplitter } from './Splitter.js';
import { createTree } from './Tree.js';
import { createDescriptionList } from './DescriptionList.js';

export default {
  title: 'Components/Splitter',
  parameters: {
    docs: {
      description: {
        component:
          'Drag-resizable two-panel layout. Drag the divider, or focus it and press Arrow keys ' +
          '(Shift+Arrow = 5%, Home/End jump to extremes). Useful for master-detail views.',
      },
    },
  },
};

const wrap = (el, h = '420px') => {
  const box = document.createElement('div');
  box.style.height = h;
  box.style.width = '100%';
  box.appendChild(el);
  return box;
};

export const Default = () =>
  wrap(
    createSplitter({
      panels: [
        { content: '<h4>Sol Panel</h4><p>İçeriği sürükleyerek yeniden boyutlandırın.</p>', defaultSize: 40, minSize: 120 },
        { content: '<h4>Sağ Panel</h4><p>Veya ayırıcıya odaklanıp ok tuşlarıyla.</p>', minSize: 120 },
      ],
    })
  );

export const Vertical = () =>
  wrap(
    createSplitter({
      orientation: 'vertical',
      panels: [
        { content: '<h4>Üst Panel</h4><p>Yatay ayırıcı.</p>', defaultSize: 35, minSize: 80 },
        { content: '<h4>Alt Panel</h4><p>Aşağıya doğru sürükleyin.</p>', minSize: 80 },
      ],
    })
  );
Vertical.storyName = 'Vertical (stacked)';

export const MasterDetail = () => {
  const facultyTree = createTree({
    items: [
      {
        id: 'eng',
        label: 'Mühendislik ve Doğa Bilimleri',
        icon: '⚙',
        children: [
          {
            id: 'cse',
            label: 'Bilgisayar Mühendisliği',
            children: [
              { id: 'p1', label: 'Prof. Dr. Ahmet Yılmaz', icon: '👤' },
              { id: 'p2', label: 'Doç. Dr. Mehmet Demir', icon: '👤' },
              { id: 'p3', label: 'Dr. Öğr. Üyesi Ayşe Kaya', icon: '👤' },
            ],
          },
          {
            id: 'ee',
            label: 'Elektrik-Elektronik Mühendisliği',
            children: [
              { id: 'p4', label: 'Prof. Dr. Hasan Şahin', icon: '👤' },
              { id: 'p5', label: 'Dr. Öğr. Üyesi Ali Çelik', icon: '👤' },
            ],
          },
        ],
      },
    ],
    defaultExpanded: ['eng', 'cse'],
    selected: 'p1',
    onSelect: (id, item) => {
      renderDetail(id, item);
    },
  });

  const detailHost = document.createElement('div');
  detailHost.style.padding = '0.5rem';

  const profiles = {
    p1: [
      { label: 'Unvan', value: 'Prof. Dr.' },
      { label: 'Ad Soyad', value: 'Ahmet Yılmaz' },
      { label: 'Bölüm', value: 'Bilgisayar Mühendisliği' },
      { label: 'E-posta', value: 'ahmet.yilmaz@istinye.edu.tr' },
      { label: 'Ofis', value: 'B-Blok 305' },
      { label: 'Dahili', value: '5832' },
    ],
    p2: [
      { label: 'Unvan', value: 'Doç. Dr.' },
      { label: 'Ad Soyad', value: 'Mehmet Demir' },
      { label: 'Bölüm', value: 'Bilgisayar Mühendisliği' },
      { label: 'E-posta', value: 'mehmet.demir@istinye.edu.tr' },
      { label: 'Ofis', value: 'B-Blok 312' },
      { label: 'Dahili', value: '5841' },
    ],
    p3: [
      { label: 'Unvan', value: 'Dr. Öğr. Üyesi' },
      { label: 'Ad Soyad', value: 'Ayşe Kaya' },
      { label: 'Bölüm', value: 'Bilgisayar Mühendisliği' },
      { label: 'E-posta', value: 'ayse.kaya@istinye.edu.tr' },
      { label: 'Ofis', value: 'B-Blok 208' },
      { label: 'Dahili', value: '5829' },
    ],
    p4: [
      { label: 'Unvan', value: 'Prof. Dr.' },
      { label: 'Ad Soyad', value: 'Hasan Şahin' },
      { label: 'Bölüm', value: 'Elektrik-Elektronik Mühendisliği' },
      { label: 'E-posta', value: 'hasan.sahin@istinye.edu.tr' },
      { label: 'Ofis', value: 'C-Blok 410' },
      { label: 'Dahili', value: '5901' },
    ],
    p5: [
      { label: 'Unvan', value: 'Dr. Öğr. Üyesi' },
      { label: 'Ad Soyad', value: 'Ali Çelik' },
      { label: 'Bölüm', value: 'Elektrik-Elektronik Mühendisliği' },
      { label: 'E-posta', value: 'ali.celik@istinye.edu.tr' },
      { label: 'Ofis', value: 'C-Blok 405' },
      { label: 'Dahili', value: '5912' },
    ],
  };

  function renderDetail(id, item) {
    detailHost.innerHTML = '';
    if (profiles[id]) {
      const heading = document.createElement('h4');
      heading.textContent = `${profiles[id][0].value} ${profiles[id][1].value}`;
      heading.style.margin = '0 0 0.75rem 0';
      detailHost.appendChild(heading);
      detailHost.appendChild(createDescriptionList({ items: profiles[id] }));
    } else {
      const msg = document.createElement('p');
      msg.style.color = 'var(--text-secondary, #525252)';
      msg.textContent = `${item.label} — bir öğretim üyesi seçin`;
      detailHost.appendChild(msg);
    }
  }
  renderDetail('p1', null);

  return wrap(
    createSplitter({
      panels: [
        { content: facultyTree, defaultSize: 38, minSize: 220 },
        { content: detailHost, minSize: 280 },
      ],
    }),
    '480px'
  );
};
MasterDetail.storyName = 'Master-detail (Tree + DescriptionList)';
