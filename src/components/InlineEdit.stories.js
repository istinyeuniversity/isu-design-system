import { createInlineEdit } from './InlineEdit.js';
import { createDescriptionList } from './DescriptionList.js';

export default {
  title: 'Components/InlineEdit',
  parameters: {
    docs: {
      description: {
        component:
          'Click-to-edit text field. Click or press Enter/Space on the display to switch to input. ' +
          'Enter commits, Esc cancels. Useful for editable profile/settings fields where dedicated form ' +
          'feels heavyweight.',
      },
    },
  },
};

const wrap = (el) => {
  const box = document.createElement('div');
  box.style.padding = '0.5rem 0';
  box.style.fontSize = '0.875rem';
  box.appendChild(el);
  return box;
};

export const Default = () =>
  wrap(
    createInlineEdit({
      value: 'Prof. Dr. Ahmet Yılmaz',
      ariaLabel: 'Ad soyad',
      onCommit: (next, prev) => console.log('committed:', prev, '→', next),
    })
  );

export const EmptyPlaceholder = () =>
  wrap(
    createInlineEdit({
      value: '',
      placeholder: 'Ofis numarası girin',
      ariaLabel: 'Ofis',
    })
  );
EmptyPlaceholder.storyName = 'With placeholder (empty value)';

export const Textarea = () =>
  wrap(
    createInlineEdit({
      value: 'Veri yapıları, algoritma analizi ve makine öğrenmesi alanlarında çalışmaktadır.',
      type: 'textarea',
      ariaLabel: 'Biyografi',
    })
  );
Textarea.storyName = 'Multi-line (textarea, Ctrl+Enter to commit)';

export const WithValidation = () => {
  const el = createInlineEdit({
    value: 'ahmet.yilmaz@istinye.edu.tr',
    ariaLabel: 'E-posta',
    validate: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || 'Geçerli e-posta girin',
  });
  return wrap(el);
};
WithValidation.storyName = 'With validation (email format)';

export const Disabled = () =>
  wrap(
    createInlineEdit({
      value: '202312345',
      ariaLabel: 'Öğrenci no',
      disabled: true,
    })
  );

export const InsideDescriptionList = () => {
  const titleEdit = createInlineEdit({ value: 'Prof. Dr.', ariaLabel: 'Unvan' });
  const nameEdit = createInlineEdit({ value: 'Ahmet Yılmaz', ariaLabel: 'Ad Soyad' });
  const officeEdit = createInlineEdit({
    value: 'B-Blok 305',
    placeholder: 'Ofis bilgisi yok',
    ariaLabel: 'Ofis',
  });
  const extEdit = createInlineEdit({
    value: '5832',
    ariaLabel: 'Dahili',
    validate: (v) => /^\d{3,5}$/.test(v) || 'Sadece rakam, 3-5 hane',
  });
  const bioEdit = createInlineEdit({
    value: 'Veri yapıları, algoritma analizi ve makine öğrenmesi alanlarında çalışmaktadır.',
    type: 'textarea',
    ariaLabel: 'Biyografi',
  });

  return createDescriptionList({
    ariaLabel: 'Düzenlenebilir profil',
    items: [
      { label: 'Unvan', value: titleEdit },
      { label: 'Ad Soyad', value: nameEdit },
      { label: 'Fakülte', value: 'Mühendislik ve Doğa Bilimleri' },
      { label: 'Bölüm', value: 'Bilgisayar Mühendisliği' },
      { label: 'Ofis', value: officeEdit },
      { label: 'Dahili', value: extEdit },
      { label: 'Biyografi', value: bioEdit },
    ],
  });
};
InsideDescriptionList.storyName = 'Composed in a DescriptionList (editable profile)';
