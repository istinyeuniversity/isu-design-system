export default {
  title: 'Components/Button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export const Primary = () => '<button class="isu-button-primary">Primary Button</button>';

export const Secondary = () => '<button class="isu-button bg-neutral text-gray-800 border border-gray-300 hover:bg-gray-50">Secondary Button</button>';

export const Small = () => '<button class="isu-button-primary px-3 py-1 text-sm">Small Button</button>';

export const Large = () => '<button class="isu-button-primary px-6 py-3 text-lg">Large Button</button>';

export const Disabled = () => '<button class="isu-button-primary opacity-50 cursor-not-allowed" disabled>Disabled Button</button>';
