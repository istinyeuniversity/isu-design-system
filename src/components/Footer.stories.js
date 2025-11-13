import { createFooter } from './Footer.js';

export default {
  title: 'Components/Footer',
  argTypes: {
    logoVariant: {
      control: { type: 'select' },
      options: ['blue', 'white', 'blue-tr', 'white-tr'],
    },
    universityName: { control: 'text' },
    copyright: { control: 'text' },
  },
};

const Template = ({ logoVariant, universityName, contact, links, copyright }) => {
  return createFooter({ logoVariant, universityName, contact, links, copyright });
};

export const Default = Template.bind({});
Default.args = {
  logoVariant: 'blue-tr',
  universityName: 'İstinye Üniversitesi',
  contact: {
    email: 'ik@istinye.edu.tr',
    phone: '+90 (216) 577 55 55'
  },
  links: [
    { href: '#', text: 'Gizlilik Politikası' },
    { href: '#', text: 'Kullanım Koşulları' },
    { href: '#', text: 'Yardım' }
  ],
  copyright: '© 2025 İstinye Üniversitesi. Tüm hakları saklıdır.'
};

export const English = Template.bind({});
English.args = {
  logoVariant: 'blue',
  universityName: 'Istinye University',
  contact: {
    email: 'hr@istinye.edu.tr',
    phone: '+90 (216) 577 55 55'
  },
  links: [
    { href: '#', text: 'Privacy Policy' },
    { href: '#', text: 'Terms of Use' },
    { href: '#', text: 'Help' }
  ],
  copyright: '© 2025 Istinye University. All rights reserved.'
};

export const Minimal = Template.bind({});
Minimal.args = {
  logoVariant: 'blue-tr',
  universityName: 'İstinye Üniversitesi',
  contact: {
    email: '',
    phone: ''
  },
  links: [],
  copyright: '© 2025 İstinye Üniversitesi.'
};

export const WithManyLinks = Template.bind({});
WithManyLinks.args = {
  logoVariant: 'blue-tr',
  universityName: 'İstinye Üniversitesi',
  contact: {
    email: 'ik@istinye.edu.tr',
    phone: '+90 (216) 577 55 55'
  },
  links: [
    { href: '#', text: 'Gizlilik Politikası' },
    { href: '#', text: 'Kullanım Koşulları' },
    { href: '#', text: 'Yardım' },
    { href: '#', text: 'Hakkımızda' },
    { href: '#', text: 'İletişim' },
    { href: '#', text: 'SSS' }
  ],
  copyright: '© 2025 İstinye Üniversitesi. Tüm hakları saklıdır.'
};

