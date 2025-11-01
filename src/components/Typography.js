export function createHeading({ level = 1, text = '', className = '' }) {
  const heading = document.createElement(`h${level}`);
  heading.className = `isu-heading-${level} ${className}`.trim();
  heading.textContent = text;
  return heading;
}

export function createParagraph({ text = '', variant = 'body', className = '' }) {
  const p = document.createElement('p');

  const variantClasses = {
    body: 'isu-body',
    'body-sm': 'isu-body-sm',
    'body-lg': 'isu-body-lg',
    lead: 'isu-lead'
  };

  p.className = `${variantClasses[variant] || 'isu-body'} ${className}`.trim();
  p.textContent = text;
  return p;
}

export function createLink({ text = '', href = '#', variant = 'link', className = '' }) {
  const link = document.createElement('a');
  link.href = href;

  const variantClasses = {
    link: 'isu-link',
    'link-subtle': 'isu-link-subtle'
  };

  link.className = `${variantClasses[variant] || 'isu-link'} ${className}`.trim();
  link.textContent = text;
  return link;
}

export function createQuote({ text = '', author = '', className = '' }) {
  const container = document.createElement('div');

  const quote = document.createElement('blockquote');
  quote.className = `isu-quote ${className}`.trim();
  quote.textContent = text;

  container.appendChild(quote);

  if (author) {
    const authorEl = document.createElement('cite');
    authorEl.className = 'isu-quote-author';
    authorEl.textContent = author;
    container.appendChild(authorEl);
  }

  return container;
}

export function createCaption({ text = '', size = 'normal', className = '' }) {
  const caption = document.createElement('p');

  const sizeClasses = {
    normal: 'isu-caption',
    small: 'isu-caption-sm'
  };

  caption.className = `${sizeClasses[size] || 'isu-caption'} ${className}`.trim();
  caption.textContent = text;
  return caption;
}

export function createTextBlock({ content = '', className = '' }) {
  const div = document.createElement('div');
  div.className = className;
  div.innerHTML = content;
  return div;
}
