# Form Components

Form components provide consistent styling and behavior for user input and data collection.

## Input Fields

Basic text input components with validation states.

### Text Input
```html
<div class="isu-form-group">
  <label class="isu-form-label">Full Name</label>
  <input type="text" class="isu-input" placeholder="Enter your full name" />
  <p class="isu-form-help">Enter your first and last name</p>
</div>
```

### Email Input
```html
<div class="isu-form-group">
  <label class="isu-form-label">Email Address</label>
  <input type="email" class="isu-input" placeholder="your@email.com" />
</div>
```

### Password Input
```html
<div class="isu-form-group">
  <label class="isu-form-label">Password</label>
  <input type="password" class="isu-input" placeholder="Enter password" />
</div>
```

### Error State
```html
<div class="isu-form-group">
  <label class="isu-form-label">Username</label>
  <input type="text" class="isu-input error" placeholder="Choose username" />
  <p class="isu-form-error">This username is already taken</p>
</div>
```

### Disabled State
```html
<div class="isu-form-group">
  <label class="isu-form-label">Read-only Field</label>
  <input type="text" class="isu-input" placeholder="Disabled input" disabled />
</div>
```

## Textarea

Multi-line text input for longer content.

```html
<div class="isu-form-group">
  <label class="isu-form-label">Message</label>
  <textarea class="isu-textarea" rows="4" placeholder="Enter your message..."></textarea>
  <p class="isu-form-help">Maximum 500 characters</p>
</div>
```

## Select Dropdown

Styled dropdown selection component.

```html
<div class="isu-form-group">
  <label class="isu-form-label">Department</label>
  <select class="isu-select">
    <option value="">Select a department</option>
    <option value="cs">Computer Science</option>
    <option value="ee">Electrical Engineering</option>
    <option value="me">Mechanical Engineering</option>
    <option value="ce">Civil Engineering</option>
  </select>
</div>
```

## Checkboxes

Single or multiple selection controls.

### Single Checkbox
```html
<label class="flex items-center space-x-3">
  <input type="checkbox" class="isu-checkbox" />
  <span class="isu-body-sm">I agree to the terms and conditions</span>
</label>
```

### Checkbox Group
```html
<fieldset>
  <legend class="isu-form-label mb-3">Interests</legend>
  <div class="space-y-3">
    <label class="flex items-center space-x-3">
      <input type="checkbox" class="isu-checkbox" name="interests" value="ai" />
      <span class="isu-body-sm">Artificial Intelligence</span>
    </label>
    <label class="flex items-center space-x-3">
      <input type="checkbox" class="isu-checkbox" name="interests" value="data" checked />
      <span class="isu-body-sm">Data Science</span>
    </label>
    <label class="flex items-center space-x-3">
      <input type="checkbox" class="isu-checkbox" name="interests" value="cyber" />
      <span class="isu-body-sm">Cybersecurity</span>
    </label>
  </div>
</fieldset>
```

## Radio Buttons

Single selection from multiple options.

```html
<fieldset>
  <legend class="isu-form-label mb-3">Academic Level</legend>
  <div class="space-y-3">
    <label class="flex items-center space-x-3">
      <input type="radio" name="level" value="undergraduate" class="isu-radio" />
      <span class="isu-body-sm">Undergraduate</span>
    </label>
    <label class="flex items-center space-x-3">
      <input type="radio" name="level" value="graduate" class="isu-radio" checked />
      <span class="isu-body-sm">Graduate</span>
    </label>
    <label class="flex items-center space-x-3">
      <input type="radio" name="level" value="phd" class="isu-radio" />
      <span class="isu-body-sm">PhD</span>
    </label>
  </div>
</fieldset>
```

## Button Variants

Form-specific button styles and states.

### Primary Actions
```html
<button class="isu-btn-primary">Submit Form</button>
<button class="isu-btn-primary isu-button-loading" disabled>
  <span class="isu-button-text">Processing...</span>
</button>
```

### Secondary Actions
```html
<button class="isu-btn-secondary">Cancel</button>
<button class="isu-btn-secondary">Reset Form</button>
```

### Button Group
```html
<div class="isu-button-group">
  <button class="isu-btn-secondary">Previous</button>
  <button class="isu-btn-primary">Next</button>
</div>
```

## Form Layout

Complete form examples with proper structure.

### Login Form
```html
<form class="isu-card max-w-md mx-auto">
  <h2 class="isu-heading-3 mb-6">Sign In</h2>

  <div class="isu-form-group">
    <label class="isu-form-label">Email</label>
    <input type="email" class="isu-input" placeholder="your@email.com" required />
  </div>

  <div class="isu-form-group">
    <label class="isu-form-label">Password</label>
    <input type="password" class="isu-input" placeholder="Enter password" required />
  </div>

  <label class="flex items-center space-x-3 mb-6">
    <input type="checkbox" class="isu-checkbox" />
    <span class="isu-body-sm">Remember me</span>
  </label>

  <button class="isu-btn-primary w-full">Sign In</button>
</form>
```

### Contact Form
```html
<form class="isu-card max-w-lg mx-auto">
  <h2 class="isu-heading-3 mb-6">Contact Us</h2>

  <div class="isu-grid-2">
    <div class="isu-form-group">
      <label class="isu-form-label">First Name</label>
      <input type="text" class="isu-input" placeholder="John" required />
    </div>
    <div class="isu-form-group">
      <label class="isu-form-label">Last Name</label>
      <input type="text" class="isu-input" placeholder="Doe" required />
    </div>
  </div>

  <div class="isu-form-group">
    <label class="isu-form-label">Email</label>
    <input type="email" class="isu-input" placeholder="john@example.com" required />
  </div>

  <div class="isu-form-group">
    <label class="isu-form-label">Subject</label>
    <select class="isu-select" required>
      <option value="">Select a subject</option>
      <option value="general">General Inquiry</option>
      <option value="support">Technical Support</option>
      <option value="academic">Academic Questions</option>
    </select>
  </div>

  <div class="isu-form-group">
    <label class="isu-form-label">Message</label>
    <textarea class="isu-textarea" rows="5" placeholder="Your message..." required></textarea>
  </div>

  <div class="isu-flex-between">
    <button type="reset" class="isu-btn-secondary">Clear</button>
    <button type="submit" class="isu-btn-primary">Send Message</button>
  </div>
</form>
```

## Validation States

Form validation with visual feedback.

```html
<form class="isu-card max-w-md mx-auto">
  <div class="isu-form-group">
    <label class="isu-form-label">Username</label>
    <input type="text" class="isu-input error" value="user123" />
    <p class="isu-form-error">Username must be at least 5 characters</p>
  </div>

  <div class="isu-form-group">
    <label class="isu-form-label">Email</label>
    <input type="email" class="isu-input" value="user@example.com" />
    <p class="isu-form-help text-green-600">✓ Valid email address</p>
  </div>

  <button class="isu-btn-primary w-full">Update Profile</button>
</form>
```

## CSS Classes Reference

| Class | Description |
|-------|-------------|
| `.isu-form-group` | Form field container with spacing |
| `.isu-form-label` | Form field label |
| `.isu-form-help` | Helper text below form fields |
| `.isu-form-error` | Error message styling |
| `.isu-input` | Text input styling with focus states |
| `.isu-input.error` | Error state for inputs |
| `.isu-textarea` | Multi-line text input |
| `.isu-select` | Styled dropdown select |
| `.isu-checkbox` | Checkbox input styling |
| `.isu-radio` | Radio button input styling |
| `.isu-btn-primary` | Primary form button |
| `.isu-btn-secondary` | Secondary form button |
| `.isu-button-loading` | Loading state for buttons |

## Accessibility

### Form Structure
- Use semantic `<form>`, `<fieldset>`, `<legend>` elements
- Associate labels with inputs using `for` attribute or nesting
- Group related fields with `<fieldset>`

### Keyboard Navigation
- Tab order follows logical sequence
- Enter key submits forms
- Escape key cancels/resets where appropriate

### Screen Reader Support
- Descriptive labels for all form controls
- Error messages associated with inputs
- Fieldset legends for grouped controls

### Focus Management
```css
.isu-input:focus,
.isu-select:focus,
.isu-checkbox:focus,
.isu-radio:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## JavaScript Integration

### Form Validation
```javascript
function validateForm(form) {
  const inputs = form.querySelectorAll('.isu-input');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.checkValidity()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });

  return isValid;
}
```

### Dynamic States
```javascript
// Loading state
function setLoading(button, loading) {
  button.disabled = loading;
  button.classList.toggle('isu-button-loading', loading);
}

// Form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');

  setLoading(submitBtn, true);

  try {
    await submitForm(form);
    // Success handling
  } catch (error) {
    // Error handling
  } finally {
    setLoading(submitBtn, false);
  }
});
```

## Best Practices

1. **Progressive Enhancement**: Forms work without JavaScript
2. **Clear Labels**: Every input has a descriptive label
3. **Logical Order**: Tab order follows visual flow
4. **Error Handling**: Clear, actionable error messages
5. **Success Feedback**: Confirmation for successful submissions
6. **Mobile Friendly**: Touch targets meet minimum size requirements
7. **Security**: Proper input sanitization and validation
