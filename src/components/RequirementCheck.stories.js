import { createRequirementCheck } from './RequirementCheck.js';

export default {
  title: 'Components/RequirementCheck',
  argTypes: {
    met: { control: 'boolean' },
    text: { control: 'text' },
  },
};

const Template = ({ met, text }) => {
  return createRequirementCheck({ met, text });
};

export const Met = Template.bind({});
Met.args = {
  met: true,
  text: 'Şifre en az 8 karakter içermelidir',
};

export const NotMet = Template.bind({});
NotMet.args = {
  met: false,
  text: 'Şifre en az 8 karakter içermelidir',
};

export const MultipleRequirements = () => {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '0.75rem';

  const requirements = [
    { met: true, text: 'En az 8 karakter' },
    { met: true, text: 'Büyük harf içeriyor' },
    { met: false, text: 'Rakam içeriyor' },
    { met: false, text: 'Özel karakter içeriyor' },
  ];

  requirements.forEach(req => {
    container.appendChild(createRequirementCheck(req));
  });

  return container;
};

