import {
  createHeading,
  createParagraph,
  createLink,
  createQuote,
  createCaption,
  createTextBlock
} from './Typography.js';

export default {
  title: 'Components/Typography',
};

const HeadingTemplate = ({ level, text }) => {
  return createHeading({ level, text });
};

const ParagraphTemplate = ({ text, variant }) => {
  return createParagraph({ text, variant });
};

const LinkTemplate = ({ text, href, variant }) => {
  return createLink({ text, href, variant });
};

const QuoteTemplate = ({ text, author }) => {
  return createQuote({ text, author });
};

const CaptionTemplate = ({ text, size }) => {
  return createCaption({ text, size });
};

// Heading Stories
export const Heading1 = HeadingTemplate.bind({});
Heading1.args = {
  level: 1,
  text: 'Main Page Title - Heading 1',
};

export const Heading2 = HeadingTemplate.bind({});
Heading2.args = {
  level: 2,
  text: 'Section Title - Heading 2',
};

export const Heading3 = HeadingTemplate.bind({});
Heading3.args = {
  level: 3,
  text: 'Subsection Title - Heading 3',
};

export const Heading4 = HeadingTemplate.bind({});
Heading4.args = {
  level: 4,
  text: 'Component Title - Heading 4',
};

export const Heading5 = HeadingTemplate.bind({});
Heading5.args = {
  level: 5,
  text: 'Small Component Title - Heading 5',
};

export const Heading6 = HeadingTemplate.bind({});
Heading6.args = {
  level: 6,
  text: 'Tiny Component Title - Heading 6',
};

export const HeadingScale = () => {
  const container = document.createElement('div');
  container.className = 'space-y-4';

  const headings = [
    createHeading({ level: 1, text: 'Heading 1 - Main Title' }),
    createHeading({ level: 2, text: 'Heading 2 - Section Title' }),
    createHeading({ level: 3, text: 'Heading 3 - Subsection Title' }),
    createHeading({ level: 4, text: 'Heading 4 - Component Title' }),
    createHeading({ level: 5, text: 'Heading 5 - Small Component Title' }),
    createHeading({ level: 6, text: 'Heading 6 - Tiny Component Title' })
  ];

  headings.forEach(heading => container.appendChild(heading));
  return container;
};

// Paragraph Stories
export const BodyText = ParagraphTemplate.bind({});
BodyText.args = {
  text: 'This is regular body text. It provides the main content for your website or application. Body text should be easy to read and understand, using appropriate line spacing and contrast.',
  variant: 'body',
};

export const SmallBodyText = ParagraphTemplate.bind({});
SmallBodyText.args = {
  text: 'This is small body text. It is used for secondary information, captions, or supporting details that don\'t need as much emphasis as regular body text.',
  variant: 'body-sm',
};

export const LargeBodyText = ParagraphTemplate.bind({});
LargeBodyText.args = {
  text: 'This is large body text. It can be used for important information that needs more visual weight, or for improving readability in certain contexts.',
  variant: 'body-lg',
};

export const LeadText = ParagraphTemplate.bind({});
LeadText.args = {
  text: 'This is lead text. It is typically used for introductory paragraphs or important information that needs to stand out from regular body text.',
  variant: 'lead',
};

// Link Stories
export const PrimaryLink = LinkTemplate.bind({});
PrimaryLink.args = {
  text: 'Primary Link',
  href: '#',
  variant: 'link',
};

export const SubtleLink = LinkTemplate.bind({});
SubtleLink.args = {
  text: 'Subtle Link',
  href: '#',
  variant: 'link-subtle',
};

export const LinkExamples = () => {
  const container = document.createElement('div');
  container.className = 'space-y-4';

  const examples = [
    createParagraph({
      text: `This paragraph contains a ${createLink({ text: 'primary link', href: '#', variant: 'link' }).outerHTML} and a ${createLink({ text: 'subtle link', href: '#', variant: 'link-subtle' }).outerHTML}.`,
      variant: 'body'
    })
  ];

  examples.forEach(example => container.appendChild(example));
  return container;
};

// Quote Stories
export const BasicQuote = QuoteTemplate.bind({});
BasicQuote.args = {
  text: '"Education is not the filling of a pail, but the lighting of a fire."',
  author: 'William Butler Yeats',
};

export const QuoteWithoutAuthor = QuoteTemplate.bind({});
QuoteWithoutAuthor.args = {
  text: '"The beautiful thing about learning is that no one can take it away from you."',
  author: '',
};

// Caption Stories
export const NormalCaption = CaptionTemplate.bind({});
NormalCaption.args = {
  text: 'This is a normal caption used for additional information.',
  size: 'normal',
};

export const SmallCaption = CaptionTemplate.bind({});
SmallCaption.args = {
  text: 'This is a small caption for fine details.',
  size: 'small',
};

// Combined Typography Examples
export const TypographyShowcase = () => {
  const container = document.createElement('div');
  container.className = 'space-y-6';

  // Title
  container.appendChild(createHeading({ level: 2, text: 'Typography Showcase' }));

  // Lead paragraph
  container.appendChild(createParagraph({
    text: 'This showcase demonstrates all typography components working together in a cohesive design system.',
    variant: 'lead'
  }));

  // Section with heading and content
  container.appendChild(createHeading({ level: 3, text: 'Section Example' }));

  container.appendChild(createParagraph({
    text: 'This is regular body text that forms the main content of your application. It uses appropriate line spacing and font sizing for optimal readability.',
    variant: 'body'
  }));

  // Links example
  const linksPara = createParagraph({
    text: 'Learn more about our ',
    variant: 'body'
  });
  linksPara.appendChild(createLink({ text: 'design principles', href: '#', variant: 'link' }));
  linksPara.appendChild(document.createTextNode(' or explore our '));
  linksPara.appendChild(createLink({ text: 'component library', href: '#', variant: 'link-subtle' }));
  linksPara.appendChild(document.createTextNode('.'));
  container.appendChild(linksPara);

  // Quote
  container.appendChild(createQuote({
    text: '"Good design is obvious. Great design is transparent."',
    author: 'Joe Sparano'
  }));

  // Caption
  container.appendChild(createCaption({
    text: 'Typography components provide consistent styling across all platforms.',
    size: 'normal'
  }));

  return container;
};

export const ArticleExample = () => {
  const article = document.createElement('article');
  article.className = 'space-y-6';

  // Article title
  article.appendChild(createHeading({ level: 1, text: 'Design System Best Practices' }));

  // Article lead
  article.appendChild(createParagraph({
    text: 'Learn how to create and maintain effective design systems that scale with your organization.',
    variant: 'lead'
  }));

  // Section 1
  article.appendChild(createHeading({ level: 2, text: 'Consistency is Key' }));
  article.appendChild(createParagraph({
    text: 'A design system ensures consistency across all products and platforms. This means using the same colors, typography, spacing, and components everywhere.',
    variant: 'body'
  }));

  // Section 2
  article.appendChild(createHeading({ level: 2, text: 'Component-Based Architecture' }));
  article.appendChild(createParagraph({
    text: 'Building with reusable components reduces development time and ensures consistent user experiences.',
    variant: 'body'
  }));

  // Quote
  article.appendChild(createQuote({
    text: '"A user interface is like a joke. If you have to explain it, it\'s not that good."',
    author: 'Martin LeBlanc'
  }));

  // Section 3
  article.appendChild(createHeading({ level: 2, text: 'Documentation Matters' }));
  article.appendChild(createParagraph({
    text: 'Clear documentation ensures that everyone on your team can use the design system effectively.',
    variant: 'body'
  }));

  // Caption
  article.appendChild(createCaption({
    text: 'This article demonstrates proper use of typography hierarchy.',
    size: 'normal'
  }));

  return article;
};
