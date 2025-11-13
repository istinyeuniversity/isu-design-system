import { createCard, createGrid, createContainer, createFlex } from './Card.js';
import { createButton } from './Button.js';

export default {
  title: 'Components/Layout',
  argTypes: {
    hover: { control: 'boolean' },
  },
};

const CardTemplate = ({ title, content, footer, hover, variant }) => {
  return createCard({ title, content, footer, hover, variant });
};

const GridTemplate = ({ columns, cards }) => {
  const cardElements = cards.map(cardData =>
    createCard({
      title: cardData.title,
      content: cardData.content,
      footer: cardData.footer
    })
  );

  return createGrid({ columns, children: cardElements });
};

// Card Stories
export const BasicCard = CardTemplate.bind({});
BasicCard.args = {
  title: 'Basic Card',
  content: 'This is a basic card component with simple content and styling.',
  footer: '',
  hover: false,
};

export const CardWithFooter = CardTemplate.bind({});
CardWithFooter.args = {
  title: 'Card with Footer',
  content: 'This card includes a footer section with additional actions.',
  footer: '<button class="isu-btn-primary isu-button-sm">Action</button>',
  hover: false,
};

export const HoverCard = CardTemplate.bind({});
HoverCard.args = {
  title: 'Hover Card',
  content: 'This card has hover effects - try hovering over it!',
  footer: '<button class="isu-btn-outline isu-button-sm">Learn More</button>',
  hover: true,
};

export const EmptyCard = CardTemplate.bind({});
EmptyCard.args = {
  title: '',
  content: 'This card has no title, just content.',
  footer: '',
  hover: false,
};

export const HoverLiftCard = CardTemplate.bind({});
HoverLiftCard.args = {
  title: 'Hover Lift Card',
  content: 'This card lifts up on hover - try hovering over it!',
  footer: '<button class="isu-btn-primary isu-button-sm">Learn More</button>',
  hover: false,
  variant: 'hover-lift',
};

export const StatCard = CardTemplate.bind({});
StatCard.args = {
  title: '125',
  content: 'Toplam Başvuru',
  footer: '',
  hover: false,
  variant: 'stat-card',
};

export const StatCardsGrid = () => {
  const stats = [
    { title: '125', content: 'Toplam Başvuru' },
    { title: '89', content: 'Onay Bekleyen' },
    { title: '36', content: 'Tamamlanan' },
  ];

  const cards = stats.map(stat => 
    createCard({
      title: stat.title,
      content: stat.content,
      variant: 'stat-card'
    })
  );

  return createGrid({ columns: 3, children: cards });
};

// Grid Stories
export const Grid2Columns = GridTemplate.bind({});
Grid2Columns.args = {
  columns: 2,
  cards: [
    {
      title: 'Card 1',
      content: 'Content for the first card in a 2-column grid layout.',
      footer: '<button class="isu-btn-primary isu-button-sm">View</button>'
    },
    {
      title: 'Card 2',
      content: 'Content for the second card in a 2-column grid layout.',
      footer: '<button class="isu-btn-secondary isu-button-sm">Edit</button>'
    }
  ],
};

export const Grid3Columns = GridTemplate.bind({});
Grid3Columns.args = {
  columns: 3,
  cards: [
    {
      title: 'Feature 1',
      content: 'Description of the first feature in our platform.',
      footer: '<button class="isu-btn-primary isu-button-sm">Learn More</button>'
    },
    {
      title: 'Feature 2',
      content: 'Description of the second feature in our platform.',
      footer: '<button class="isu-btn-success isu-button-sm">Try Now</button>'
    },
    {
      title: 'Feature 3',
      content: 'Description of the third feature in our platform.',
      footer: '<button class="isu-btn-outline isu-button-sm">Contact Us</button>'
    }
  ],
};

export const Grid4Columns = () => {
  const cards = [];
  for (let i = 1; i <= 4; i++) {
    cards.push(createCard({
      title: `Item ${i}`,
      content: `This is item number ${i} in a 4-column grid layout.`,
      footer: `<button class="isu-btn-ghost isu-button-sm">Action ${i}</button>`
    }));
  }

  return createGrid({ columns: 4, children: cards });
};

// Container Story
export const ContainerExample = () => {
  const card1 = createCard({
    title: 'Container Example',
    content: 'This card is inside a container with responsive padding and max-width.',
    footer: '<button class="isu-btn-primary">Contained Button</button>'
  });

  const card2 = createCard({
    title: 'Another Card',
    content: 'Multiple cards can be placed inside the same container.',
    footer: '<button class="isu-btn-secondary">Another Action</button>'
  });

  return createContainer({
    children: [createGrid({ columns: 2, children: [card1, card2] })]
  });
};

// Flex Stories
export const FlexBetween = () => {
  const button1 = createButton({ label: 'Left Button', variant: 'primary', size: 'sm' });
  const button2 = createButton({ label: 'Right Button', variant: 'outline', size: 'sm' });

  return createFlex({
    justify: 'between',
    align: 'center',
    children: [button1, button2]
  });
};

export const FlexCenter = () => {
  const button = createButton({ label: 'Centered Button', variant: 'success', size: 'md' });

  return createFlex({
    justify: 'center',
    align: 'center',
    children: [button]
  });
};

export const FlexStart = () => {
  const buttons = [
    createButton({ label: 'Button 1', variant: 'primary', size: 'sm' }),
    createButton({ label: 'Button 2', variant: 'secondary', size: 'sm' }),
    createButton({ label: 'Button 3', variant: 'outline', size: 'sm' })
  ];

  return createFlex({
    justify: 'start',
    align: 'center',
    children: buttons
  });
};
