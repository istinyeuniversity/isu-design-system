import { createMenu } from './Menu.js';
import { createButton } from './Button.js';

const ICON_EDIT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
const ICON_COPY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const ICON_SHARE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;
const ICON_TRASH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;

export default {
  title: 'Components/Menu',
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    },
    onOpenChange: { action: 'openChange' },
  },
};

const Template = ({ placement, onOpenChange }) => {
  const wrap = document.createElement('div');
  wrap.style.padding = '6rem 1rem';
  wrap.style.display = 'flex';
  wrap.style.justifyContent = placement?.endsWith('end') ? 'flex-end' : 'flex-start';

  wrap.appendChild(
    createMenu({
      trigger: createButton({ label: 'Open menu', variant: 'outline' }),
      placement,
      onOpenChange,
      items: [
        { type: 'label', label: 'Actions' },
        { label: 'Edit', icon: ICON_EDIT, shortcut: '⌘E', onClick: () => console.log('edit') },
        { label: 'Duplicate', icon: ICON_COPY, shortcut: '⌘D', onClick: () => console.log('duplicate') },
        { label: 'Share', icon: ICON_SHARE, onClick: () => console.log('share') },
        { divider: true },
        { label: 'Delete', icon: ICON_TRASH, danger: true, shortcut: '⌫', onClick: () => console.log('delete') },
      ],
    })
  );
  return wrap;
};

export const Default = Template.bind({});
Default.args = { placement: 'bottom-start' };

export const AlignEnd = Template.bind({});
AlignEnd.args = { placement: 'bottom-end' };

export const OpenUpwards = Template.bind({});
OpenUpwards.args = { placement: 'top-start' };

export const WithDisabled = () => {
  const wrap = document.createElement('div');
  wrap.style.padding = '1rem';
  wrap.appendChild(
    createMenu({
      trigger: createButton({ label: 'User menu', variant: 'primary' }),
      items: [
        { label: 'Profile', icon: ICON_EDIT },
        { label: 'Settings (disabled)', disabled: true },
        { divider: true },
        { label: 'Sign out', danger: true },
      ],
    })
  );
  return wrap;
};
WithDisabled.parameters = { controls: { disable: true }, actions: { disable: true } };
