export default {
  title: 'Navigation/Navigation',
  parameters: {
    layout: 'fullscreen',
  },
};

export const NavigationBar = () => `
  <nav class="isu-nav">
    <div class="isu-nav-container">
      <div class="isu-nav-brand">
        <span class="font-bold text-primary">İstinye Üniversitesi</span>
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

  <div class="isu-section">
    <div class="isu-container">
      <h1 class="isu-heading-2">Navigation Bar Example</h1>
      <p class="isu-body">The navigation bar adapts to different screen sizes with a mobile menu.</p>
    </div>
  </div>

  <script>
    function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
    }
  </script>
`;

export const Breadcrumb = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Breadcrumb Navigation</h2>

    <nav class="isu-breadcrumb">
      <a href="#" class="isu-breadcrumb-link">Ana Sayfa</a>
      <span class="isu-breadcrumb-separator">/</span>
      <a href="#" class="isu-breadcrumb-link">Akademik</a>
      <span class="isu-breadcrumb-separator">/</span>
      <a href="#" class="isu-breadcrumb-link">Fakülteler</a>
      <span class="isu-breadcrumb-separator">/</span>
      <span class="text-gray-900">Mühendislik Fakültesi</span>
    </nav>

    <div class="isu-card mt-6">
      <h3 class="isu-heading-4">Mühendislik Fakültesi</h3>
      <p class="isu-body">Bilim ve teknolojinin öncüleriyle geleceği şekillendiriyoruz.</p>
    </div>
  </div>
`;

export const Pagination = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Pagination</h2>

    <div class="isu-card">
      <h3 class="isu-heading-4 mb-4">News Articles</h3>
      <div class="space-y-3 mb-6">
        <div class="border-b border-neutral/20 pb-3">
          <h4 class="isu-heading-5">Yeni Araştırma Projesi Başlatıldı</h4>
          <p class="isu-body-sm text-gray-600">Üniversitemiz yeni bir araştırma projesi başlatmıştır...</p>
        </div>
        <div class="border-b border-neutral/20 pb-3">
          <h4 class="isu-heading-5">Uluslararası Konferans Başarısı</h4>
          <p class="isu-body-sm text-gray-600">Akademisyenlerimiz uluslararası konferansta ödüller kazandı...</p>
        </div>
        <div class="border-b border-neutral/20 pb-3">
          <h4 class="isu-heading-5">Öğrenci Başarıları</h4>
          <p class="isu-body-sm text-gray-600">Öğrencilerimiz çeşitli yarışmalarda dereceler elde etti...</p>
        </div>
      </div>

      <nav class="isu-pagination">
        <button class="isu-pagination-prev">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <a href="#" class="isu-pagination-link active">1</a>
        <a href="#" class="isu-pagination-link">2</a>
        <a href="#" class="isu-pagination-link">3</a>
        <span class="isu-pagination-item text-gray-400">...</span>
        <a href="#" class="isu-pagination-link">10</a>

        <button class="isu-pagination-next">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </nav>
    </div>
  </div>
`;
