import { createDrawer, openDrawer, closeDrawer } from './Drawer.js';

export default {
  title: 'Components/Drawer',
  argTypes: {
    triggerLabel: { control: 'text' },
    title: { control: 'text' },
    content: { control: 'text' },
    side: {
      control: { type: 'inline-radio' },
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    closable: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    onOpen: { action: 'opened' },
    onClose: { action: 'closed' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Slide-in side panel with focus-trap, scroll-lock and Escape/backdrop close support. Click the trigger button in the preview to open.',
      },
    },
  },
};

const Template = ({
  triggerLabel = 'Open Drawer',
  title,
  content,
  side,
  size,
  closable,
  closeOnBackdrop,
  closeOnEscape,
  onOpen,
  onClose,
}) => {
  const trigger = document.createElement('button');
  trigger.className = 'isu-button isu-button-primary isu-button-md';
  trigger.textContent = triggerLabel;

  trigger.addEventListener('click', () => {
    const close = document.createElement('button');
    close.className = 'isu-button isu-button-secondary isu-button-md';
    close.textContent = 'Close';

    const drawer = createDrawer({
      title,
      content,
      footer: [close],
      side,
      size,
      closable,
      closeOnBackdrop,
      closeOnEscape,
      onClose,
    });

    close.addEventListener('click', () => closeDrawer(drawer));
    if (typeof onOpen === 'function') onOpen();
    openDrawer(drawer);
  });

  return trigger;
};

const defaultContent = `
  <p class="isu-body mb-4">
    Adjust the controls in the panel below to see different drawer configurations.
  </p>
  <div class="isu-form-group">
    <label class="isu-form-label">Search</label>
    <input class="isu-input" placeholder="Type to search…" />
  </div>
  <div class="isu-form-group">
    <label class="isu-form-label">Notes</label>
    <textarea class="isu-textarea" placeholder="Your notes…"></textarea>
  </div>
`;

export const Right = Template.bind({});
Right.args = {
  triggerLabel: 'Open Right Drawer',
  title: 'Right Drawer',
  content: defaultContent,
  side: 'right',
  size: 'md',
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
};

export const Left = Template.bind({});
Left.args = {
  triggerLabel: 'Open Left Drawer',
  title: 'Left Drawer',
  content: defaultContent,
  side: 'left',
  size: 'md',
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
};

export const Large = Template.bind({});
Large.args = {
  triggerLabel: 'Open Large Drawer',
  title: 'Large Drawer',
  content: defaultContent,
  side: 'right',
  size: 'lg',
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
};

export const Bottom = Template.bind({});
Bottom.args = {
  triggerLabel: 'Open Bottom Drawer',
  title: 'Bottom Drawer',
  content: defaultContent,
  side: 'bottom',
  size: 'md',
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
};
