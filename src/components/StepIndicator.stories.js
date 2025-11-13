import { createStepIndicator } from './StepIndicator.js';

export default {
  title: 'Components/StepIndicator',
  argTypes: {
    steps: { control: 'object' },
  },
};

const Template = ({ steps }) => {
  return createStepIndicator({ steps });
};

export const Default = Template.bind({});
Default.args = {
  steps: [
    { number: 1, label: 'Kişisel Bilgiler', status: 'completed' },
    { number: 2, label: 'Belgeler', status: 'completed' },
    { number: 3, label: 'Değerlendirme', status: 'active' },
    { number: 4, label: 'Onay', status: 'pending' },
  ],
};

export const AllCompleted = Template.bind({});
AllCompleted.args = {
  steps: [
    { number: 1, label: 'Adım 1', status: 'completed' },
    { number: 2, label: 'Adım 2', status: 'completed' },
    { number: 3, label: 'Adım 3', status: 'completed' },
    { number: 4, label: 'Adım 4', status: 'completed' },
  ],
};

export const FirstStep = Template.bind({});
FirstStep.args = {
  steps: [
    { number: 1, label: 'Başlangıç', status: 'active' },
    { number: 2, label: 'Orta', status: 'pending' },
    { number: 3, label: 'Son', status: 'pending' },
  ],
};

export const LongLabels = Template.bind({});
LongLabels.args = {
  steps: [
    { number: 1, label: 'Kişisel Bilgiler ve İletişim', status: 'completed' },
    { number: 2, label: 'Belgeler ve Dosyalar', status: 'completed' },
    { number: 3, label: 'Değerlendirme Süreci', status: 'active' },
    { number: 4, label: 'Final Onayı', status: 'pending' },
  ],
};

