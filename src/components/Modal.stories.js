import { createModal, openModal, closeModal, confirmModal } from './Modal.js';

export default {
  title: 'Components/Modal',
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    content: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closable: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    triggerLabel: { control: 'text' },
    onOpen: { action: 'opened' },
    onClose: { action: 'closed' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Overlay dialog with focus-trap, scroll-lock and Escape/backdrop close support. Click the trigger button in the preview to open.',
      },
    },
  },
};

const Template = ({
  triggerLabel = 'Open Modal',
  title,
  description,
  content,
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
    const cancel = document.createElement('button');
    cancel.className = 'isu-button isu-button-secondary isu-button-md';
    cancel.textContent = 'Cancel';

    const save = document.createElement('button');
    save.className = 'isu-button isu-button-primary isu-button-md';
    save.textContent = 'Save';

    const modal = createModal({
      title,
      description,
      content,
      footer: [cancel, save],
      size,
      closable,
      closeOnBackdrop,
      closeOnEscape,
      onClose,
    });

    cancel.addEventListener('click', () => closeModal(modal));
    save.addEventListener('click', () => closeModal(modal));

    if (typeof onOpen === 'function') onOpen();
    openModal(modal);
  });
  return trigger;
};

export const Default = Template.bind({});
Default.args = {
  triggerLabel: 'Open Modal',
  title: 'Edit Profile',
  description: 'Update your account information below.',
  content: `
    <div class="isu-form-group">
      <label class="isu-form-label">Full name</label>
      <input class="isu-input" placeholder="Jane Doe" />
    </div>
    <div class="isu-form-group">
      <label class="isu-form-label">Email</label>
      <input class="isu-input" type="email" placeholder="jane@istinye.edu.tr" />
    </div>
  `,
  size: 'md',
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
};

export const Small = Template.bind({});
Small.args = {
  triggerLabel: 'Open Small',
  title: 'Notification',
  description: '',
  content: 'Your session will expire in 5 minutes.',
  size: 'sm',
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
};

export const Large = Template.bind({});
Large.args = {
  triggerLabel: 'Open Large',
  title: 'Terms of Service',
  description: 'Please read carefully before continuing.',
  content:
    '<p class="isu-body">' +
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(40) +
    '</p>',
  size: 'lg',
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
};

export const NonDismissible = Template.bind({});
NonDismissible.args = {
  triggerLabel: 'Open Non-Dismissible',
  title: 'Action required',
  description: 'You must confirm to continue.',
  content: 'This modal can only be closed with the Save or Cancel buttons.',
  size: 'md',
  closable: false,
  closeOnBackdrop: false,
  closeOnEscape: false,
};

/* ------------------------------------------------------------ */
/* confirmModal helper                                          */
/* ------------------------------------------------------------ */
export const Confirm = ({
  triggerLabel,
  title,
  message,
  confirmLabel,
  cancelLabel,
  variant,
  onConfirm,
  onCancel,
}) => {
  const btn = document.createElement('button');
  btn.className = 'isu-button isu-button-error isu-button-md';
  btn.textContent = triggerLabel;
  btn.addEventListener('click', async () => {
    const ok = await confirmModal({
      title,
      message,
      confirmLabel,
      cancelLabel,
      variant,
    });
    if (ok) onConfirm();
    else onCancel();
  });
  return btn;
};

Confirm.argTypes = {
  triggerLabel: { control: 'text' },
  title: { control: 'text' },
  message: { control: 'text' },
  confirmLabel: { control: 'text' },
  cancelLabel: { control: 'text' },
  variant: {
    control: { type: 'select' },
    options: ['primary', 'secondary', 'success', 'warning', 'error'],
  },
  onConfirm: { action: 'confirmed' },
  onCancel: { action: 'cancelled' },
};

Confirm.args = {
  triggerLabel: 'Delete Item',
  title: 'Delete item?',
  message: 'This action cannot be undone. Are you sure you want to delete this item?',
  confirmLabel: 'Delete',
  cancelLabel: 'Cancel',
  variant: 'error',
};
