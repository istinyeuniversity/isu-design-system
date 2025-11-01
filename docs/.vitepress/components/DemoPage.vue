<template>
  <div class="demo-container">
    <!-- Header -->
    <header class="demo-header">
      <div class="logo-container">
        <img src="/assets/logos/en/logo-blue.svg" alt="ISU Logo" class="demo-logo">
      </div>
      <h1 class="demo-title">ISU Design System</h1>
      <p class="demo-subtitle">60+ Component Demo - Tüm component'ler burada görünür ve etkileşimli</p>
      <div class="badge-container">
        <span class="badge badge-primary">Layout</span>
        <span class="badge badge-primary">Typography</span>
        <span class="badge badge-primary">Forms</span>
        <span class="badge badge-primary">Navigation</span>
        <span class="badge badge-primary">Feedback</span>
      </div>
    </header>

    <!-- Layout Components Section -->
    <section id="layout" class="demo-section">
      <h2 class="section-title">🎨 Layout Components</h2>

      <div class="demo-card">
        <h3 class="card-title">Container & Grid System</h3>
        <p class="card-description">Responsive container ve grid sistemi örnekleri</p>

        <div class="grid-demo">
          <div class="isu-card">
            <h4 class="isu-heading-4">Basic Card</h4>
            <p class="isu-body-sm">Responsive grid sistemi ile hizalanmış card componenti.</p>
            <button class="isu-btn-primary mt-3" @click="showAlert('Basic Card tıklandı!')">Action</button>
          </div>

          <div class="isu-card-hover">
            <h4 class="isu-heading-4">Hover Card</h4>
            <p class="isu-body-sm">Hover efekti ile etkileşimli card. Mouse ile üzerine gelin.</p>
            <button class="isu-btn-secondary mt-3" @click="showAlert('Hover Card tıklandı!')">Action</button>
          </div>

          <div class="isu-card">
            <h4 class="isu-heading-4">Simple Card</h4>
            <p class="isu-body-sm">3 kolonlu responsive grid sistemi örneği.</p>
            <button class="isu-btn-outline mt-3" @click="showAlert('Simple Card tıklandı!')">Action</button>
          </div>
        </div>

        <div class="flex-demo">
          <h4 class="isu-heading-4 mb-3">Flex Utilities</h4>
          <div class="isu-flex-between mb-4 p-4 bg-gray-50 rounded">
            <span class="isu-body">Left content</span>
            <span class="isu-body">Right content (space between)</span>
          </div>

          <div class="isu-flex-center p-4 bg-blue-50 rounded">
            <span class="isu-body">Centered content (flex center)</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Typography Section -->
    <section id="typography" class="demo-section">
      <h2 class="section-title">📝 Typography</h2>

      <div class="demo-card">
        <h3 class="card-title">Heading Scale</h3>
        <h1 class="isu-heading-1">Heading 1 - Ana Sayfa Başlığı</h1>
        <h2 class="isu-heading-2">Heading 2 - Bölüm Başlığı</h2>
        <h3 class="isu-heading-3">Heading 3 - Alt Bölüm Başlığı</h3>
        <h4 class="isu-heading-4">Heading 4 - Component Başlığı</h4>
        <h5 class="isu-heading-5">Heading 5 - Küçük Component Başlığı</h5>
        <h6 class="isu-heading-6">Heading 6 - En Küçük Başlık</h6>

        <h3 class="card-title mt-8">Body Text Variants</h3>
        <div class="typography-examples">
          <p class="isu-body"><strong>Regular body:</strong> Bu normal body text. Makaleler ve genel içerik için kullanılır. Rahat okunabilirlik sağlar.</p>
          <p class="isu-body-sm"><strong>Small body:</strong> Bu küçük body text. Alt bilgiler, açıklamalar için kullanılır.</p>
          <p class="isu-body-lg"><strong>Large body:</strong> Bu büyük body text. Önemli içerikler için vurgu sağlar.</p>
          <p class="isu-lead"><strong>Lead text:</strong> Bu lead text. Giriş paragrafları ve öne çıkan içerikler için kullanılır.</p>
        </div>

        <h3 class="card-title mt-8">Links & Quotes</h3>
        <p class="isu-body mb-4">
          Bu bir <a href="#" class="isu-link" @click.prevent="showAlert('Primary link tıklandı!')">primary link</a> örneği.
          Ayrıca <a href="#" class="isu-link-subtle" @click.prevent="showAlert('Subtle link tıklandı!')">subtle link</a> örneği de var.
        </p>

        <blockquote class="isu-quote">
          "Eğitim, bir kovanın doldurulması değil, bir ateşin yakılmasıdır."
          <cite class="isu-quote-author">William Butler Yeats</cite>
        </blockquote>

        <h3 class="card-title mt-8">Captions</h3>
        <p class="isu-body mb-2">Ana içerik burada yer alır.</p>
        <p class="isu-caption mb-4">Bu bir regular caption. Ek açıklamalar için kullanılır.</p>
        <p class="isu-body mb-2">Daha fazla ana içerik.</p>
        <p class="isu-caption-sm">Bu küçük bir caption. İnce yazılar için kullanılır.</p>
      </div>
    </section>

    <!-- Buttons Section -->
    <section id="buttons" class="demo-section">
      <h2 class="section-title">🔘 Buttons</h2>

      <div class="demo-card">
        <h3 class="card-title">Button Variants</h3>
        <div class="button-grid">
          <button class="isu-btn-primary" @click="showAlert('Primary button tıklandı!')">Primary Button</button>
          <button class="isu-btn-secondary" @click="showAlert('Secondary button tıklandı!')">Secondary Button</button>
          <button class="isu-btn-outline" @click="showAlert('Outline button tıklandı!')">Outline Button</button>
          <button class="isu-btn-ghost" @click="showAlert('Ghost button tıklandı!')">Ghost Button</button>
          <button class="isu-btn-success" @click="showAlert('Success button tıklandı!')">Success Button</button>
          <button class="isu-btn-warning" @click="showAlert('Warning button tıklandı!')">Warning Button</button>
          <button class="isu-btn-error" @click="showAlert('Error button tıklandı!')">Error Button</button>
        </div>

        <h3 class="card-title mt-8">Button Sizes</h3>
        <div class="button-sizes">
          <button class="isu-btn-primary isu-button-sm" @click="showAlert('Small button tıklandı!')">Small</button>
          <button class="isu-btn-primary isu-button-md" @click="showAlert('Medium button tıklandı!')">Medium</button>
          <button class="isu-btn-primary isu-button-lg" @click="showAlert('Large button tıklandı!')">Large</button>
          <button class="isu-btn-primary isu-button-xl" @click="showAlert('Extra Large button tıklandı!')">Extra Large</button>
        </div>

        <h3 class="card-title mt-8">Button States</h3>
        <div class="button-states">
          <button class="isu-btn-primary" @click="showAlert('Normal button tıklandı!')">Normal</button>
          <button class="isu-btn-primary" disabled>Disabled</button>
          <button class="isu-btn-primary isu-button-loading" disabled>
            <span class="isu-button-text">Loading</span>
          </button>
        </div>

        <h3 class="card-title mt-8">Button Groups</h3>
        <div class="isu-button-group">
          <button class="isu-btn-secondary" @click="showAlert('Left button tıklandı!')">Left</button>
          <button class="isu-btn-secondary" @click="showAlert('Middle button tıklandı!')">Middle</button>
          <button class="isu-btn-primary" @click="showAlert('Right button tıklandı!')">Right</button>
        </div>
      </div>
    </section>

    <!-- Forms Section -->
    <section id="forms" class="demo-section">
      <h2 class="section-title">📝 Forms</h2>

      <div class="demo-card">
        <h3 class="card-title">Form Elements</h3>
        <form class="form-demo" @submit.prevent="handleSubmit">
          <div class="form-grid">
            <div class="isu-form-group">
              <label class="isu-form-label">Full Name</label>
              <input type="text" class="isu-input" v-model="form.name" placeholder="Ad Soyad" required>
              <p class="isu-form-help">Lütfen adınızı ve soyadınızı girin</p>
            </div>

            <div class="isu-form-group">
              <label class="isu-form-label">Email Address</label>
              <input type="email" class="isu-input" v-model="form.email" placeholder="email@ornek.com" required>
            </div>

            <div class="isu-form-group">
              <label class="isu-form-label">Password</label>
              <input type="password" class="isu-input" v-model="form.password" placeholder="Şifre" required>
            </div>

            <div class="isu-form-group">
              <label class="isu-form-label">Phone</label>
              <input type="tel" class="isu-input" v-model="form.phone" placeholder="(555) 123-4567">
            </div>

            <div class="isu-form-group">
              <label class="isu-form-label">Department</label>
              <select class="isu-select" v-model="form.department" required>
                <option value="">Bölüm Seçin</option>
                <option value="cs">Bilgisayar Mühendisliği</option>
                <option value="ee">Elektrik Elektronik Müh.</option>
                <option value="me">Makine Mühendisliği</option>
                <option value="ce">İnşaat Mühendisliği</option>
              </select>
            </div>

            <div class="isu-form-group">
              <label class="isu-form-label">Message</label>
              <textarea class="isu-textarea" v-model="form.message" rows="3" placeholder="Mesajınız..." required></textarea>
              <p class="isu-form-help">Maksimum 500 karakter</p>
            </div>

            <div class="isu-form-group">
              <label class="isu-form-label">Interests</label>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" class="isu-checkbox" v-model="form.interests" value="ai">
                  <span class="isu-body-sm">Yapay Zeka</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" class="isu-checkbox" v-model="form.interests" value="ds">
                  <span class="isu-body-sm">Veri Bilimi</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" class="isu-checkbox" v-model="form.interests" value="security">
                  <span class="isu-body-sm">Siber Güvenlik</span>
                </label>
              </div>
            </div>

            <div class="isu-form-group">
              <label class="isu-form-label">Academic Level</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" name="level" class="isu-radio" value="undergrad" v-model="form.level">
                  <span class="isu-body-sm">Lisans</span>
                </label>
                <label class="radio-label">
                  <input type="radio" name="level" class="isu-radio" value="master" v-model="form.level">
                  <span class="isu-body-sm">Yüksek Lisans</span>
                </label>
                <label class="radio-label">
                  <input type="radio" name="level" class="isu-radio" value="phd" v-model="form.level">
                  <span class="isu-body-sm">Doktora</span>
                </label>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="isu-btn-secondary" @click="resetForm">Temizle</button>
            <button type="submit" class="isu-btn-primary">Gönder</button>
          </div>
        </form>
      </div>
    </section>

    <!-- Floating Action Button -->
    <button class="isu-fab" @click="showAlert('FAB tıklandı! 🎉')">
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'DemoPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        phone: '',
        department: '',
        message: '',
        interests: [],
        level: ''
      }
    }
  },
  methods: {
    showAlert(message) {
      alert(message);
    },
    handleSubmit() {
      this.showAlert(`Form gönderildi!\n\nAd: ${this.form.name}\nEmail: ${this.form.email}\nİlgi Alanları: ${this.form.interests.join(', ')}`);
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        password: '',
        phone: '',
        department: '',
        message: '',
        interests: [],
        level: ''
      };
      this.showAlert('Form temizlendi!');
    }
  }
}
</script>

<style scoped>
.demo-container {
  background: #f8fafc;
  padding: 2rem 0;
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
}

.demo-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
  margin-bottom: 3rem;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.demo-logo {
  height: 4rem;
  width: auto;
}

.demo-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
}

.demo-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.badge-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-primary {
  background: #007fff;
  color: white;
}

.demo-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.demo-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
}

.card-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

/* Layout Demo */
.grid-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.flex-demo h4 {
  margin-bottom: 0.75rem;
}

.flex-demo > div {
  margin-bottom: 1rem;
}

/* Typography Demo */
.typography-examples p {
  margin-bottom: 0.75rem;
}

/* Buttons Demo */
.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.button-sizes {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.button-states {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

/* Forms Demo */
.form-demo {
  max-width: none;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-label,
.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* FAB */
.isu-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #007fff;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 127, 255, 0.3);
  cursor: pointer;
  transition: all 0.2s;
}

.isu-fab:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 127, 255, 0.4);
}
</style>
