import { createTable } from './Table.js';

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

