import { createTimeline } from './Timeline.js';

export default {
  title: 'Components/Timeline',
  argTypes: {
    items: { control: 'object' },
  },
};

const Template = ({ items }) => {
  return createTimeline({ items });
};

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      status: 'completed',
      title: 'Başvuru Alındı',
      date: '25.10.2025',
      person: 'Dr. Ahmet Yılmaz',
      note: 'Başvuru başarıyla alındı ve incelenmeye gönderildi.'
    },
    {
      status: 'active',
      title: 'Değerlendirme Aşamasında',
      date: '26.10.2025',
      person: 'Prof. Dr. Ayşe Demir',
      note: 'Belgeler inceleniyor.'
    },
    {
      status: 'pending',
      title: 'Onay Bekleniyor',
      date: '',
      person: '',
      note: ''
    }
  ],
};

export const Completed = Template.bind({});
Completed.args = {
  items: [
    {
      status: 'completed',
      title: 'Adım 1 Tamamlandı',
      date: '01.10.2025',
    },
    {
      status: 'completed',
      title: 'Adım 2 Tamamlandı',
      date: '05.10.2025',
    },
    {
      status: 'completed',
      title: 'Adım 3 Tamamlandı',
      date: '10.10.2025',
    }
  ],
};

export const WithPerson = Template.bind({});
WithPerson.args = {
  items: [
    {
      status: 'completed',
      title: 'İnceleme Tamamlandı',
      date: '20.10.2025',
      person: 'Prof. Dr. Mehmet Kaya',
    },
    {
      status: 'active',
      title: 'Onay Bekleniyor',
      date: '25.10.2025',
      person: 'Doç. Dr. Zeynep Öz',
    }
  ],
};

