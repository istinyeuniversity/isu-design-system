export default {
  title: 'Feedback/Feedback Components',
};

export const Alerts = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Alert Components</h2>

    <div class="space-y-4">
      <div class="isu-alert-success">
        <div class="isu-alert-icon">
          <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <div class="isu-alert-content">
            <h3 class="isu-alert-title">Success!</h3>
            <p class="isu-alert-description">Your changes have been saved successfully.</p>
          </div>
        </div>
      </div>

      <div class="isu-alert-error">
        <div class="isu-alert-icon">
          <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <div class="isu-alert-content">
            <h3 class="isu-alert-title">Error!</h3>
            <p class="isu-alert-description">There was a problem processing your request.</p>
          </div>
        </div>
      </div>

      <div class="isu-alert-warning">
        <div class="isu-alert-icon">
          <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <div class="isu-alert-content">
            <h3 class="isu-alert-title">Warning!</h3>
            <p class="isu-alert-description">Please review your information before proceeding.</p>
          </div>
        </div>
      </div>

      <div class="isu-alert-info">
        <div class="isu-alert-icon">
          <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <div class="isu-alert-content">
            <h3 class="isu-alert-title">Information</h3>
            <p class="isu-alert-description">Here is some important information you should know.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export const Badges = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Badge Components</h2>

    <div class="isu-card">
      <h3 class="isu-heading-4 mb-4">Badge Variants</h3>
      <div class="space-y-4">
        <div>
          <p class="isu-body-sm mb-2">Status Badges:</p>
          <div class="space-x-2">
            <span class="isu-badge-primary">Active</span>
            <span class="isu-badge-secondary">Inactive</span>
            <span class="isu-badge-success">Success</span>
            <span class="isu-badge-warning">Warning</span>
            <span class="isu-badge-error">Error</span>
          </div>
        </div>

        <div>
          <p class="isu-body-sm mb-2">Priority Badges:</p>
          <div class="space-x-2">
            <span class="isu-badge isu-badge-error">High</span>
            <span class="isu-badge isu-badge-warning">Medium</span>
            <span class="isu-badge isu-badge-info">Low</span>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export const LoadingStates = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Loading States</h2>

    <div class="space-y-6">
      <div class="isu-card">
        <h3 class="isu-heading-4 mb-4">Spinners</h3>
        <div class="flex items-center space-x-4">
          <div class="isu-spinner-sm"></div>
          <span class="isu-body-sm">Small spinner</span>
        </div>
        <div class="flex items-center space-x-4 mt-4">
          <div class="isu-spinner-md"></div>
          <span class="isu-body-sm">Medium spinner</span>
        </div>
        <div class="flex items-center space-x-4 mt-4">
          <div class="isu-spinner-lg"></div>
          <span class="isu-body-sm">Large spinner</span>
        </div>
      </div>

      <div class="isu-card">
        <h3 class="isu-heading-4 mb-4">Loading Button</h3>
        <button class="isu-btn-primary isu-button-loading" disabled>
          <span class="isu-button-text">Processing...</span>
        </button>
      </div>

      <div class="isu-card">
        <h3 class="isu-heading-4 mb-4">Loading Overlay</h3>
        <div class="relative p-8 bg-gray-50 rounded-lg">
          <p class="isu-body mb-4">Content behind loading overlay</p>
          <button class="isu-btn-primary">Some Action</button>

          <div class="isu-loading-overlay">
            <div class="flex items-center space-x-3">
              <div class="isu-spinner-md"></div>
              <span class="isu-loading-text">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export const ProgressBar = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Progress Bar</h2>

    <div class="isu-card">
      <h3 class="isu-heading-4 mb-4">Upload Progress</h3>

      <div class="space-y-4">
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="isu-body-sm">Document.pdf</span>
            <span class="isu-body-sm text-primary">75%</span>
          </div>
          <div class="isu-progress">
            <div class="isu-progress-bar" style="width: 75%"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="isu-body-sm">Image.jpg</span>
            <span class="isu-body-sm text-primary">45%</span>
          </div>
          <div class="isu-progress">
            <div class="isu-progress-bar" style="width: 45%"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="isu-body-sm">Video.mp4</span>
            <span class="isu-body-sm text-green-600">Complete</span>
          </div>
          <div class="isu-progress">
            <div class="isu-progress-bar bg-green-500" style="width: 100%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export const Toasts = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Toast Notifications</h2>

    <div class="isu-card">
      <h3 class="isu-heading-4 mb-4">Toast Examples</h3>
      <p class="isu-body mb-4">Toast notifications appear in the top-right corner of the screen.</p>

      <div class="space-y-3">
        <div class="isu-toast-item isu-toast-success">
          <div class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <h4 class="font-medium text-green-800">Success!</h4>
              <p class="text-sm text-green-700">Your profile has been updated.</p>
            </div>
          </div>
        </div>

        <div class="isu-toast-item isu-toast-error">
          <div class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 00-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <h4 class="font-medium text-red-800">Error!</h4>
              <p class="text-sm text-red-700">Failed to save changes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
