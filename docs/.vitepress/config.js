import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ISU Design System',
  description: 'Tailwind-based design system for Istinye University',
  base: process.env.NODE_ENV === 'production' ? '/isu-design-system/' : '/',

  head: [
    ['link', { rel: 'icon', href: process.env.NODE_ENV === 'production' ? '/isu-design-system/favicon.ico' : '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: process.env.NODE_ENV === 'production' ? '/isu-design-system/isu.css' : '/isu.css' }],
    ['meta', { name: 'theme-color', content: '#007fff' }]
  ],

  themeConfig: {
    logo: process.env.NODE_ENV === 'production' ? '/isu-design-system/assets/logos/en/logo-blue.svg' : '/assets/logos/en/logo-blue.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Components', link: '/components/' },
      { text: 'Demo', link: '/demo.html' },
      { text: 'Tokens', link: '/tokens' }
    ],

    sidebar: {
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/' },
            { text: 'Button', link: '/components/button' },
            { text: 'Layout', link: '/components/layout' },
            { text: 'Typography', link: '/components/typography' },
            { text: 'Forms', link: '/components/forms' },
            { text: 'Navigation', link: '/components/navigation' },
            { text: 'Feedback', link: '/components/feedback' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/istinyeuniversity/isu-design-system' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Istinye University'
    },

    search: {
      provider: 'local'
    }
  }
})
