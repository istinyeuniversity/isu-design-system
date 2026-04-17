import { createEmptyState } from './EmptyState.js';
import { createButton } from './Button.js';

export default {
  title: 'Components/EmptyState',
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md'] },
  },
};

const Template = (args) => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.appendChild(createEmptyState(args));
  return wrap;
};

export const Default = Template.bind({});
Default.args = {
  title: 'No results',
  description: "We couldn't find anything matching your search. Try a different keyword or filter.",
  size: 'md',
};

export const WithAction = () => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.appendChild(
    createEmptyState({
      title: 'Your inbox is empty',
      description: 'Compose a new message to start a conversation.',
      actions: [
        createButton({ label: 'New message', variant: 'primary' }),
        createButton({ label: 'Learn more', variant: 'outline' }),
      ],
    })
  );
  return wrap;
};
WithAction.parameters = { controls: { disable: true }, actions: { disable: true } };

export const Small = Template.bind({});
Small.args = {
  title: 'No files uploaded',
  description: 'Drag and drop a file here to upload.',
  size: 'sm',
};

export const CustomIcon = () => {
  const ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.appendChild(
    createEmptyState({
      icon: ICON,
      title: 'No messages yet',
      description: 'Conversations you start will show up here.',
    })
  );
  return wrap;
};
CustomIcon.parameters = { controls: { disable: true }, actions: { disable: true } };
