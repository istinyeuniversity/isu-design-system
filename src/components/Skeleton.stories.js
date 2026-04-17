import { createSkeleton } from './Skeleton.js';

export default {
  title: 'Components/Skeleton',
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
      options: ['text', 'heading', 'circle', 'rect', 'button'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: [undefined, 'sm', 'lg'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
    lines: { control: { type: 'number', min: 1, max: 10 } },
  },
};

const Template = (args) => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.style.maxWidth = '24rem';
  wrap.appendChild(createSkeleton(args));
  return wrap;
};

export const Text = Template.bind({});
Text.args = { type: 'text', width: '100%' };

export const Paragraph = Template.bind({});
Paragraph.args = { type: 'text', lines: 4 };

export const Circle = Template.bind({});
Circle.args = { type: 'circle', width: 48, height: 48 };

export const Rectangle = Template.bind({});
Rectangle.args = { type: 'rect', height: 160 };

export const CardComposition = () => {
  const card = document.createElement('div');
  card.style.padding = '1.25rem';
  card.style.border = '1px solid var(--border-primary)';
  card.style.borderRadius = '0.75rem';
  card.style.maxWidth = '24rem';
  card.style.background = 'var(--bg-primary)';

  card.appendChild(createSkeleton({ type: 'rect', height: 160 }));

  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.gap = '0.75rem';
  header.style.marginTop = '1rem';
  header.appendChild(createSkeleton({ type: 'circle', width: 40, height: 40 }));
  const meta = document.createElement('div');
  meta.style.flex = '1';
  meta.style.display = 'flex';
  meta.style.flexDirection = 'column';
  meta.style.gap = '0.5rem';
  meta.appendChild(createSkeleton({ type: 'text', size: 'lg', width: '60%' }));
  meta.appendChild(createSkeleton({ type: 'text', size: 'sm', width: '40%' }));
  header.appendChild(meta);
  card.appendChild(header);

  const body = document.createElement('div');
  body.style.marginTop = '1rem';
  body.appendChild(createSkeleton({ type: 'text', lines: 3 }));
  card.appendChild(body);

  return card;
};
CardComposition.parameters = { controls: { disable: true }, actions: { disable: true } };
