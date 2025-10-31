# Feedback Components

Feedback components provide visual feedback to users about system status, actions, and information.

## Alert Components

Inform users about important information, success, errors, or warnings.

### Success Alert
```html
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
```

### Error Alert
```html
<div class="isu-alert-error">
  <div class="isu-alert-icon">
    <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 00-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
    </svg>
    <div class="isu-alert-content">
      <h3 class="isu-alert-title">Error!</h3>
      <p class="isu-alert-description">There was a problem processing your request. Please try again.</p>
    </div>
  </div>
</div>
```

### Warning Alert
```html
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
```

### Info Alert
```html
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
```

### Dismissible Alert
```html
<div class="isu-alert-warning relative">
  <div class="isu-alert-icon">
    <div class="isu-alert-content">
      <p class="isu-alert-description">This alert can be dismissed.</p>
    </div>
  </div>
  <button class="absolute top-4 right-4 text-yellow-400 hover:text-yellow-600">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
    </svg>
  </button>
</div>
```

## Badge Components

Small status indicators for displaying counts, labels, or status.

### Status Badges
```html
<div class="isu-flex space-x-2">
  <span class="isu-badge-primary">Active</span>
  <span class="isu-badge-secondary">Inactive</span>
  <span class="isu-badge-success">Success</span>
  <span class="isu-badge-warning">Warning</span>
  <span class="isu-badge-error">Error</span>
</div>
```

### Count Badges
```html
<div class="isu-flex items-center space-x-2">
  <span class="isu-body">Notifications</span>
  <span class="isu-badge-primary">3</span>
</div>

<div class="isu-flex items-center space-x-2">
  <span class="isu-body">Messages</span>
  <span class="isu-badge-error">99+</span>
</div>
```

## Loading States

Indicate that content is being loaded or processed.

### Spinner Sizes
```html
<div class="isu-flex space-x-4 items-center">
  <div class="isu-spinner-sm"></div>
  <span class="isu-body-sm">Small spinner</span>
</div>

<div class="isu-flex space-x-4 items-center">
  <div class="isu-spinner-md"></div>
  <span class="isu-body-sm">Medium spinner</span>
</div>

<div class="isu-flex space-x-4 items-center">
  <div class="isu-spinner-lg"></div>
  <span class="isu-body-sm">Large spinner</span>
</div>
```

### Loading Button
```html
<button class="isu-btn-primary isu-button-loading" disabled>
  <span class="isu-button-text">Processing...</span>
</button>
```

### Loading Overlay
```html
<div class="relative">
  <div class="isu-card">
    <h3 class="isu-heading-4">Content Title</h3>
    <p class="isu-body">This content is being loaded...</p>
  </div>

  <div class="isu-loading-overlay">
    <div class="isu-flex flex-col items-center space-y-3">
      <div class="isu-spinner-lg"></div>
      <span class="isu-loading-text">Loading...</span>
    </div>
  </div>
</div>
```

## Progress Indicators

Show completion status of tasks or processes.

### Progress Bar
```html
<div class="isu-card">
  <h3 class="isu-heading-4 mb-4">Upload Progress</h3>

  <div class="space-y-4">
    <div>
      <div class="isu-flex justify-between items-center mb-2">
        <span class="isu-body-sm">Document.pdf</span>
        <span class="isu-body-sm text-primary">75%</span>
      </div>
      <div class="isu-progress">
        <div class="isu-progress-bar" style="width: 75%"></div>
      </div>
    </div>

    <div>
      <div class="isu-flex justify-between items-center mb-2">
        <span class="isu-body-sm">Image.jpg</span>
        <span class="isu-body-sm text-primary">45%</span>
      </div>
      <div class="isu-progress">
        <div class="isu-progress-bar" style="width: 45%"></div>
      </div>
    </div>

    <div>
      <div class="isu-flex justify-between items-center mb-2">
        <span class="isu-body-sm">Video.mp4</span>
        <span class="isu-body-sm text-green-600">Complete</span>
      </div>
      <div class="isu-progress">
        <div class="isu-progress-bar bg-green-500" style="width: 100%"></div>
      </div>
    </div>
  </div>
</div>
```

### Step Progress
```html
<div class="isu-card">
  <h3 class="isu-heading-4 mb-6">Registration Progress</h3>

  <div class="isu-flex justify-between items-center mb-4">
    <span class="isu-body-sm">Step 2 of 4</span>
    <span class="isu-body-sm text-primary">50%</span>
  </div>

  <div class="isu-progress mb-4">
    <div class="isu-progress-bar" style="width: 50%"></div>
  </div>

  <div class="isu-flex justify-between text-sm">
    <span class="text-gray-400">Personal Info</span>
    <span class="text-primary font-medium">Contact Details</span>
    <span class="text-gray-400">Review</span>
    <span class="text-gray-400">Complete</span>
  </div>
</div>
```

## Toast Notifications

Temporary messages that appear briefly.

### Toast Container
```html
<div class="isu-toast">
  <!-- Toast items will be added here dynamically -->
</div>
```

### Toast Item Example
```html
<div class="isu-toast-item isu-toast-success">
  <div class="isu-flex items-start space-x-3">
    <svg class="w-5 h-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
    </svg>
    <div class="flex-1">
      <h4 class="font-medium text-green-800">Success!</h4>
      <p class="text-sm text-green-700">Your profile has been updated.</p>
    </div>
    <button class="text-green-400 hover:text-green-600">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>
  </div>
</div>
```

## Tooltip

Contextual help text that appears on hover or focus.

### Basic Tooltip
```html
<div class="relative inline-block">
  <button class="isu-btn-secondary" title="This is a tooltip">
    Hover me
  </button>
</div>
```

### Advanced Tooltip (with JavaScript)
```html
<div class="relative inline-block">
  <button class="isu-btn-secondary" data-tooltip="Custom tooltip text">
    Hover for tooltip
  </button>

  <div class="isu-tooltip" id="tooltip">
    Custom tooltip text
  </div>
</div>

<script>
  // Simple tooltip implementation
  const button = document.querySelector('[data-tooltip]');
  const tooltip = document.getElementById('tooltip');

  button.addEventListener('mouseenter', () => {
    tooltip.textContent = button.dataset.tooltip;
    tooltip.classList.add('show');
  });

  button.addEventListener('mouseleave', () => {
    tooltip.classList.remove('show');
  });
</script>
```

## CSS Classes Reference

| Class | Description |
|-------|-------------|
| `.isu-alert-success/error/warning/info` | Alert variants |
| `.isu-alert-icon` | Alert icon container |
| `.isu-alert-content` | Alert text container |
| `.isu-alert-title` | Alert title |
| `.isu-alert-description` | Alert description |
| `.isu-badge-primary/secondary/success/warning/error` | Badge variants |
| `.isu-spinner-sm/md/lg` | Spinner sizes |
| `.isu-loading-overlay` | Full-screen loading overlay |
| `.isu-loading-text` | Loading text styling |
| `.isu-progress` | Progress bar container |
| `.isu-progress-bar` | Progress bar fill |
| `.isu-toast` | Toast notification container |
| `.isu-toast-item` | Individual toast item |
| `.isu-toast-success/error/warning` | Toast variants |
| `.isu-tooltip` | Tooltip container |

## JavaScript Integration

### Alert Management
```javascript
function showAlert(type, title, message, duration = 5000) {
  const alert = document.createElement('div');
  alert.className = `isu-alert-${type}`;

  alert.innerHTML = `
    <div class="isu-alert-icon">
      <div class="isu-alert-content">
        <h3 class="isu-alert-title">${title}</h3>
        <p class="isu-alert-description">${message}</p>
      </div>
    </div>
  `;

  document.body.appendChild(alert);

  // Auto-remove after duration
  setTimeout(() => {
    alert.remove();
  }, duration);
}

// Usage
showAlert('success', 'Success!', 'Your changes have been saved.');
```

### Toast System
```javascript
class Toast {
  constructor() {
    this.container = document.querySelector('.isu-toast');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'isu-toast';
      document.body.appendChild(this.container);
    }
  }

  show(type, title, message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `isu-toast-item isu-toast-${type}`;

    toast.innerHTML = `
      <div class="isu-flex items-start space-x-3">
        <div class="flex-1">
          <h4 class="font-medium">${title}</h4>
          <p class="text-sm opacity-90">${message}</p>
        </div>
        <button class="dismiss-btn">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    `;

    this.container.appendChild(toast);

    // Dismiss functionality
    toast.querySelector('.dismiss-btn').addEventListener('click', () => {
      this.remove(toast);
    });

    // Auto-remove
    setTimeout(() => {
      this.remove(toast);
    }, duration);
  }

  remove(toast) {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }
}

// Usage
const toast = new Toast();
toast.show('success', 'Success!', 'Operation completed successfully.');
```

### Loading States
```javascript
function setLoading(element, loading) {
  if (loading) {
    element.classList.add('isu-button-loading');
    element.disabled = true;
    element.setAttribute('aria-busy', 'true');
  } else {
    element.classList.remove('isu-button-loading');
    element.disabled = false;
    element.removeAttribute('aria-busy');
  }
}

// Usage
const button = document.querySelector('.isu-btn-primary');
setLoading(button, true);

// Simulate async operation
setTimeout(() => {
  setLoading(button, false);
}, 2000);
```

## Best Practices

1. **Clear Messaging**: Use appropriate alert types for different situations
2. **Non-intrusive**: Position feedback elements to not block important content
3. **Accessible**: Ensure screen readers can announce feedback messages
4. **Progressive Enhancement**: Feedback should work without JavaScript
5. **Consistent Timing**: Use consistent durations for auto-dismiss
6. **User Control**: Allow users to dismiss feedback when appropriate
7. **Performance**: Avoid excessive feedback that could overwhelm users
