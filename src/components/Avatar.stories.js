import { createAvatar, createAvatarGroup } from './Avatar.js';

export default {
  title: 'Components/Avatar',
  argTypes: {
    src: { control: 'text' },
    name: { control: 'text' },
    initials: { control: 'text' },
    size: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    shape: {
      control: { type: 'inline-radio' },
      options: ['circle', 'rounded', 'square'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    status: {
      control: { type: 'select' },
      options: [undefined, 'online', 'offline', 'busy', 'away'],
    },
  },
};

const Template = (args) => createAvatar(args);

export const Initials = Template.bind({});
Initials.args = {
  name: 'Ada Lovelace',
  size: 'md',
  shape: 'circle',
  variant: 'primary',
};

export const Image = Template.bind({});
Image.args = {
  src: 'https://i.pravatar.cc/120?img=5',
  name: 'Jane Doe',
  size: 'lg',
};

export const IconFallback = Template.bind({});
IconFallback.args = {
  size: 'lg',
  shape: 'circle',
};

export const WithStatus = Template.bind({});
WithStatus.args = {
  name: 'Kerem Demir',
  size: 'lg',
  variant: 'success',
  status: 'online',
};

export const Sizes = () => {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.alignItems = 'center';
  wrap.style.gap = '0.75rem';
  wrap.style.padding = '1rem';
  ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].forEach((size) => {
    wrap.appendChild(createAvatar({ name: 'İÜ', size, variant: 'primary' }));
  });
  return wrap;
};
Sizes.parameters = { controls: { disable: true }, actions: { disable: true } };

export const Group = () => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.appendChild(
    createAvatarGroup({
      size: 'md',
      max: 4,
      avatars: [
        { name: 'Ada Lovelace', variant: 'primary' },
        { name: 'Alan Turing', variant: 'success' },
        { name: 'Grace Hopper', variant: 'warning' },
        { name: 'Linus Torvalds', variant: 'info' },
        { name: 'Margaret Hamilton', variant: 'error' },
        { name: 'Donald Knuth', variant: 'secondary' },
      ],
    })
  );
  return wrap;
};
Group.parameters = { controls: { disable: true }, actions: { disable: true } };
