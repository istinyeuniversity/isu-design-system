# Navigation Components

Navigation components help users move through your application and understand their current location.

## Navigation Bar

Main site navigation with responsive behavior.

### Basic Navbar
```html
<nav class="isu-nav">
  <div class="isu-nav-container">
    <div class="isu-nav-brand">
      <a href="/" class="font-bold text-primary">İstinye Üniversitesi</a>
    </div>

    <div class="isu-nav-menu">
      <a href="#" class="isu-nav-link active">Ana Sayfa</a>
      <a href="#" class="isu-nav-link">Akademik</a>
      <a href="#" class="isu-nav-link">Araştırma</a>
      <a href="#" class="isu-nav-link">Hakkımızda</a>
      <a href="#" class="isu-nav-link">İletişim</a>
    </div>

    <button class="isu-nav-mobile-btn" onclick="toggleMobileMenu()">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>

  <div id="mobile-menu" class="isu-nav-mobile hidden">
    <div class="isu-nav-mobile-menu">
      <a href="#" class="isu-nav-mobile-link active">Ana Sayfa</a>
      <a href="#" class="isu-nav-mobile-link">Akademik</a>
      <a href="#" class="isu-nav-mobile-link">Araştırma</a>
      <a href="#" class="isu-nav-mobile-link">Hakkımızda</a>
      <a href="#" class="isu-nav-mobile-link">İletişim</a>
    </div>
  </div>
</nav>

<script>
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}
</script>
```

### Navbar with Actions
```html
<nav class="isu-nav">
  <div class="isu-nav-container">
    <div class="isu-nav-brand">
      <span class="font-bold text-primary">Dashboard</span>
    </div>

    <div class="isu-nav-menu">
      <a href="#" class="isu-nav-link active">Overview</a>
      <a href="#" class="isu-nav-link">Projects</a>
      <a href="#" class="isu-nav-link">Team</a>
      <a href="#" class="isu-nav-link">Settings</a>
    </div>

    <div class="isu-flex items-center space-x-4">
      <button class="isu-btn-ghost">Sign Out</button>
      <div class="w-8 h-8 bg-primary rounded-full"></div>
    </div>
  </div>
</nav>
```

## Breadcrumb Navigation

Shows the user's current location in the site hierarchy.

### Basic Breadcrumb
```html
<nav class="isu-breadcrumb">
  <a href="/" class="isu-breadcrumb-link">Ana Sayfa</a>
  <span class="isu-breadcrumb-separator">/</span>
  <a href="/academic" class="isu-breadcrumb-link">Akademik</a>
  <span class="isu-breadcrumb-separator">/</span>
  <a href="/academic/faculty" class="isu-breadcrumb-link">Fakülteler</a>
  <span class="isu-breadcrumb-separator">/</span>
  <span class="text-gray-900">Mühendislik Fakültesi</span>
</nav>
```

### With Icons
```html
<nav class="isu-breadcrumb">
  <a href="/" class="isu-breadcrumb-link">
    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V5a1 1 0 011-1h3.586l.293.293a1 1 0 001.414-1.414L10.707 2.293zM10 18v-6a1 1 0 00-1-1H5a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1z"/>
    </svg>
    Home
  </a>
  <span class="isu-breadcrumb-separator">/</span>
  <span class="text-gray-900">Current Page</span>
</nav>
```

## Pagination

Navigate through multiple pages of content.

### Basic Pagination
```html
<nav class="isu-pagination">
  <button class="isu-pagination-prev" disabled>
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
    Previous
  </button>

  <a href="#" class="isu-pagination-link active">1</a>
  <a href="#" class="isu-pagination-link">2</a>
  <a href="#" class="isu-pagination-link">3</a>
  <span class="isu-pagination-item text-gray-400">...</span>
  <a href="#" class="isu-pagination-link">10</a>

  <button class="isu-pagination-next">
    Next
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
  </button>
</nav>
```

### Compact Pagination
```html
<nav class="isu-pagination">
  <button class="isu-pagination-prev">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
  </button>

  <a href="#" class="isu-pagination-link active">1</a>
  <a href="#" class="isu-pagination-link">2</a>
  <a href="#" class="isu-pagination-link">3</a>

  <button class="isu-pagination-next">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
  </button>
</nav>
```

## Tab Navigation

Horizontal navigation for switching between content sections.

```html
<div class="border-b border-neutral/20 mb-6">
  <nav class="isu-flex">
    <button class="isu-nav-link active px-4 py-2 border-b-2 border-primary">
      Overview
    </button>
    <button class="isu-nav-link px-4 py-2">
      Details
    </button>
    <button class="isu-nav-link px-4 py-2">
      Settings
    </button>
  </nav>
</div>

<div class="isu-card">
  <h3 class="isu-heading-4">Overview Content</h3>
  <p class="isu-body">Content for the overview tab.</p>
</div>
```

## Sidebar Navigation

Vertical navigation for complex applications.

```html
<div class="isu-flex">
  <!-- Sidebar -->
  <aside class="w-64 bg-white border-r border-neutral/20 p-6">
    <nav class="space-y-2">
      <a href="#" class="isu-nav-link active block px-4 py-2 rounded">
        Dashboard
      </a>
      <a href="#" class="isu-nav-link block px-4 py-2 rounded">
        Projects
      </a>
      <a href="#" class="isu-nav-link block px-4 py-2 rounded">
        Team
      </a>
      <a href="#" class="isu-nav-link block px-4 py-2 rounded">
        Reports
      </a>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 p-6">
    <h1 class="isu-heading-2">Dashboard</h1>
    <p class="isu-body">Main content area</p>
  </main>
</div>
```

## Step Indicator

Shows progress through a multi-step process.

```html
<nav class="isu-flex justify-center mb-8">
  <div class="isu-flex items-center space-x-4">
    <div class="isu-flex items-center">
      <div class="w-8 h-8 bg-primary text-white rounded-full isu-flex-center text-sm font-medium">1</div>
      <span class="ml-2 text-sm font-medium">Personal Info</span>
    </div>
    <div class="w-8 h-0.5 bg-primary"></div>

    <div class="isu-flex items-center">
      <div class="w-8 h-8 bg-primary text-white rounded-full isu-flex-center text-sm font-medium">2</div>
      <span class="ml-2 text-sm font-medium text-primary">Contact Details</span>
    </div>
    <div class="w-8 h-0.5 bg-neutral/30"></div>

    <div class="isu-flex items-center">
      <div class="w-8 h-8 bg-neutral/30 text-gray-400 rounded-full isu-flex-center text-sm font-medium">3</div>
      <span class="ml-2 text-sm text-gray-400">Review</span>
    </div>
  </div>
</nav>
```

## CSS Classes Reference

| Class | Description |
|-------|-------------|
| `.isu-nav` | Main navigation container |
| `.isu-nav-container` | Navigation content wrapper |
| `.isu-nav-brand` | Brand/logo area |
| `.isu-nav-menu` | Desktop navigation menu |
| `.isu-nav-link` | Individual navigation link |
| `.isu-nav-mobile-btn` | Mobile menu toggle button |
| `.isu-nav-mobile` | Mobile menu container |
| `.isu-nav-mobile-menu` | Mobile menu items |
| `.isu-nav-mobile-link` | Mobile navigation link |
| `.isu-breadcrumb` | Breadcrumb navigation |
| `.isu-breadcrumb-link` | Breadcrumb link |
| `.isu-breadcrumb-separator` | Breadcrumb separator |
| `.isu-pagination` | Pagination container |
| `.isu-pagination-link` | Pagination page link |
| `.isu-pagination-prev/next` | Previous/next buttons |

## Accessibility

### Keyboard Navigation
- Tab order follows logical sequence
- Enter/Space activates navigation items
- Arrow keys navigate through menus
- Escape closes mobile menus

### Screen Reader Support
- Semantic navigation landmarks
- Descriptive link text
- Current page indication
- Skip links for keyboard users

### Focus Management
```css
.isu-nav-link:focus,
.isu-pagination-link:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## JavaScript Integration

### Mobile Menu Toggle
```javascript
function initMobileMenu() {
  const toggleBtn = document.querySelector('.isu-nav-mobile-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  toggleBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggleBtn?.contains(e.target) && !mobileMenu?.contains(e.target)) {
      mobileMenu?.classList.add('hidden');
    }
  });
}
```

### Active Link Management
```javascript
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.isu-nav-link');

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}
```

### Pagination Logic
```javascript
function createPagination(currentPage, totalPages) {
  const pagination = document.querySelector('.isu-pagination');
  pagination.innerHTML = '';

  // Previous button
  const prevBtn = document.createElement('button');
  prevBtn.className = 'isu-pagination-prev';
  prevBtn.disabled = currentPage === 1;
  prevBtn.innerHTML = 'Previous';
  pagination.appendChild(prevBtn);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      const pageLink = document.createElement('a');
      pageLink.className = 'isu-pagination-link active';
      pageLink.textContent = i;
      pagination.appendChild(pageLink);
    } else {
      const pageLink = document.createElement('a');
      pageLink.className = 'isu-pagination-link';
      pageLink.href = `?page=${i}`;
      pageLink.textContent = i;
      pagination.appendChild(pageLink);
    }
  }

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'isu-pagination-next';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.innerHTML = 'Next';
  pagination.appendChild(nextBtn);
}
```

## Best Practices

1. **Clear Hierarchy**: Use consistent navigation patterns
2. **Mobile First**: Design for mobile, enhance for desktop
3. **Logical Order**: Navigation follows user mental models
4. **Current State**: Always indicate current location
5. **Consistent Styling**: Use design system colors and spacing
6. **Accessibility**: Keyboard and screen reader support
7. **Performance**: Lazy load navigation content when needed
