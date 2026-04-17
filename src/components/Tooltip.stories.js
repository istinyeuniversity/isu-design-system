import { attachTooltip } from './Tooltip.js';

export default {
  title: 'Components/Tooltip',
  argTypes: {
    label: { control: 'text' },
    text: { control: 'text' },
    placement: {
      control: { type: 'inline-radio' },
      options: ['top', 'right', 'bottom', 'left'],
    },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
    onMouseEnter: { action: 'hovered' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'CSS-only tooltip via `data-tooltip` and `data-tooltip-placement` attributes. Shows on hover and keyboard focus. Use the `attachTooltip` helper or set the attributes directly in HTML.',
      },
    },
    layout: 'centered',
  },
};

const Template = ({ label, text, placement, onFocus, onBlur, onMouseEnter }) => {
  const wrap = document.createElement('div');
  wrap.style.padding = '3rem';

  const btn = document.createElement('button');
  btn.className = 'isu-button isu-button-secondary isu-button-md';
  btn.textContent = label;
  attachTooltip(btn, text, placement);

  if (typeof onFocus === 'function') btn.addEventListener('focus', onFocus);
  if (typeof onBlur === 'function') btn.addEventListener('blur', onBlur);
  if (typeof onMouseEnter === 'function') btn.addEventListener('mouseenter', onMouseEnter);

  wrap.appendChild(btn);
  return wrap;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Hover me',
  text: 'This is a tooltip',
  placement: 'top',
};

export const Placements = () => {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.flexWrap = 'wrap';
  wrap.style.gap = '2rem';
  wrap.style.padding = '3rem';
  wrap.style.alignItems = 'center';
  wrap.style.justifyContent = 'center';

  const make = (label, placement) => {
    const b = document.createElement('button');
    b.className = 'isu-button isu-button-secondary isu-button-md';
    b.textContent = label;
    attachTooltip(b, `Tooltip on ${placement}`, placement);
    return b;
  };

  wrap.appendChild(make('Top', 'top'));
  wrap.appendChild(make('Right', 'right'));
  wrap.appendChild(make('Bottom', 'bottom'));
  wrap.appendChild(make('Left', 'left'));
  return wrap;
};
Placements.parameters = { controls: { disable: true }, actions: { disable: true } };

export const OnIcons = () => {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.gap = '0.75rem';
  wrap.style.padding = '3rem';

  ['Edit', 'Delete', 'Archive', 'Share'].forEach((label) => {
    const btn = document.createElement('button');
    btn.className = 'isu-icon-button isu-icon-button-md';
    btn.setAttribute('aria-label', label);
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/></svg>`;
    attachTooltip(btn, label, 'top');
    wrap.appendChild(btn);
  });
  return wrap;
};
OnIcons.parameters = { controls: { disable: true }, actions: { disable: true } };

export const RawHtmlUsage = () => {
  const wrap = document.createElement('div');
  wrap.style.padding = '3rem';
  wrap.innerHTML = `
    <span class="isu-body">
      Hover the
      <button class="isu-button isu-button-ghost isu-button-sm"
              data-tooltip="Pure CSS tooltip, no JS required"
              data-tooltip-placement="top">
        underlined word
      </button>
      to see a tooltip.
    </span>
  `;
  return wrap;
};
RawHtmlUsage.parameters = { controls: { disable: true }, actions: { disable: true } };
