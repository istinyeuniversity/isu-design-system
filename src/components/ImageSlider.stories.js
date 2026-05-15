import { createImageSlider } from './ImageSlider.js';

export default {
  title: 'Components/ImageSlider',
  parameters: {
    docs: {
      description: {
        component:
          'Image slider (carousel) for rotating through a series of images or HTML slides. ' +
          'Distinct from the form-input `Slider` component — this lives under the `.isu-image-slider-*` namespace.',
      },
    },
  },
};

const sampleSlides = [
  {
    src: 'https://picsum.photos/seed/isu1/960/420',
    alt: 'Campus view',
    caption: 'Campus view',
  },
  {
    src: 'https://picsum.photos/seed/isu2/960/420',
    alt: 'Library interior',
    caption: 'Library interior',
  },
  {
    src: 'https://picsum.photos/seed/isu3/960/420',
    alt: 'Student lounge',
    caption: 'Student lounge',
  },
];

const wrap = (el) => {
  const box = document.createElement('div');
  box.style.maxWidth = '720px';
  box.appendChild(el);
  return box;
};

export const Default = () =>
  wrap(createImageSlider({ slides: sampleSlides }));

export const Autoplay = () =>
  wrap(createImageSlider({ slides: sampleSlides, autoplay: true, interval: 2500 }));
Autoplay.parameters = {
  docs: { description: { story: 'Pauses on hover, focus, and when the tab is hidden.' } },
};

export const NoLoop = () =>
  wrap(createImageSlider({ slides: sampleSlides, loop: false }));
NoLoop.storyName = 'Without loop (arrows disable at ends)';

export const ArrowsOnly = () =>
  wrap(createImageSlider({ slides: sampleSlides, showIndicators: false }));

export const IndicatorsOnly = () =>
  wrap(createImageSlider({ slides: sampleSlides, showArrows: false }));

export const HTMLSlides = () => {
  const slide = (bg, title) => {
    const div = document.createElement('div');
    div.style.cssText = `
      background:${bg};
      color:white;
      padding:3rem 1.5rem;
      text-align:center;
      font-family:var(--font-heading, sans-serif);
      font-size:1.75rem;
    `;
    div.textContent = title;
    return div;
  };
  return wrap(
    createImageSlider({
      slides: [
        slide('linear-gradient(135deg, #007fff, #003eff)', 'Welcome to İSÜ'),
        slide('linear-gradient(135deg, #10b981, #047857)', 'Apply Now'),
        slide('linear-gradient(135deg, #f59e0b, #b45309)', 'Open Days 2026'),
      ],
      autoplay: true,
    })
  );
};
HTMLSlides.storyName = 'Custom HTML slides';
