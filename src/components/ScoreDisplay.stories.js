import { createScoreDisplay } from './ScoreDisplay.js';

export default {
  title: 'Components/ScoreDisplay',
  argTypes: {
    value: { control: 'number' },
    label: { control: 'text' },
    max: { control: 'number' },
  },
};

const Template = ({ value, label, max }) => {
  return createScoreDisplay({ value, label, max });
};

export const Default = Template.bind({});
Default.args = {
  value: 85,
  label: 'Puan',
  max: 100,
};

export const HighScore = Template.bind({});
HighScore.args = {
  value: 95,
  label: 'Başarı Puanı',
  max: 100,
};

export const LowScore = Template.bind({});
LowScore.args = {
  value: 45,
  label: 'Değerlendirme',
  max: 100,
};

export const CustomMax = Template.bind({});
CustomMax.args = {
  value: 8,
  label: 'Sıralama',
  max: 10,
};

export const MultipleScores = () => {
  const container = document.createElement('div');
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
  container.style.gap = '1rem';

  const scores = [
    { value: 92, label: 'Genel Puan', max: 100 },
    { value: 88, label: 'Araştırma', max: 100 },
    { value: 95, label: 'Öğretim', max: 100 },
  ];

  scores.forEach(score => {
    container.appendChild(createScoreDisplay(score));
  });

  return container;
};

