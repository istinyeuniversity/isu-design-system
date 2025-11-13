import { createLogo } from './Logo.js';

export function createFooter({ 
  logoVariant = 'blue-tr',
  universityName = 'İstinye Üniversitesi',
  contact = {
    email: 'ik@istinye.edu.tr',
    phone: '+90 (216) 577 55 55'
  },
  links = [
    { href: '#', text: 'Gizlilik Politikası' },
    { href: '#', text: 'Kullanım Koşulları' },
    { href: '#', text: 'Yardım' }
  ],
  copyright = '© 2025 İstinye Üniversitesi. Tüm hakları saklıdır.'
}) {
  const footer = document.createElement('footer');
  footer.className = 'isu-footer';

  const container = document.createElement('div');
  container.className = 'isu-container';

  // Footer Content
  const footerContent = document.createElement('div');
  footerContent.className = 'isu-footer-content';

  // Brand Section
  const footerBrand = document.createElement('div');
  footerBrand.className = 'isu-footer-brand';

  const logo = createLogo({ variant: logoVariant, size: 'md' });
  logo.className = 'isu-footer-logo';
  logo.id = 'footer-logo-img';
  footerBrand.appendChild(logo);

  const university = document.createElement('p');
  university.className = 'isu-footer-university';
  university.textContent = universityName;
  footerBrand.appendChild(university);

  footerContent.appendChild(footerBrand);

  // Contact Section
  const footerContact = document.createElement('div');
  footerContact.className = 'isu-footer-contact';

  const contactTitle = document.createElement('h4');
  contactTitle.textContent = 'İletişim';
  footerContact.appendChild(contactTitle);

  if (contact.email) {
    const email = document.createElement('p');
    email.textContent = contact.email;
    footerContact.appendChild(email);
  }

  if (contact.phone) {
    const phone = document.createElement('p');
    phone.textContent = contact.phone;
    footerContact.appendChild(phone);
  }

  footerContent.appendChild(footerContact);

  // Links Section
  const footerLinks = document.createElement('div');
  footerLinks.className = 'isu-footer-links';

  const linksTitle = document.createElement('h4');
  linksTitle.textContent = 'Hızlı Linkler';
  footerLinks.appendChild(linksTitle);

  links.forEach(link => {
    const linkEl = document.createElement('a');
    linkEl.href = link.href;
    linkEl.textContent = link.text;
    footerLinks.appendChild(linkEl);
  });

  footerContent.appendChild(footerLinks);

  container.appendChild(footerContent);

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.className = 'isu-footer-bottom';

  const copyrightText = document.createElement('p');
  copyrightText.textContent = copyright;
  footerBottom.appendChild(copyrightText);

  container.appendChild(footerBottom);
  footer.appendChild(container);

  return footer;
}

