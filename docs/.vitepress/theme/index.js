import DefaultTheme from 'vitepress/theme'
import DemoPage from '../components/DemoPage.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register components globally
    app.component('DemoPage', DemoPage)
  }
}
