export default {
  title: 'Forms/Form Elements',
};

export const InputFields = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Input Fields</h2>

    <div class="isu-card max-w-md">
      <form class="space-y-6">
        <div class="isu-form-group">
          <label class="isu-form-label">Email Address</label>
          <input type="email" class="isu-input" placeholder="Enter your email" />
          <p class="isu-form-help">We'll never share your email with anyone else.</p>
        </div>

        <div class="isu-form-group">
          <label class="isu-form-label">Password</label>
          <input type="password" class="isu-input" placeholder="Enter your password" />
        </div>

        <div class="isu-form-group">
          <label class="isu-form-label">Error State</label>
          <input type="text" class="isu-input error" placeholder="Invalid input" />
          <p class="isu-form-error">This field is required.</p>
        </div>

        <div class="isu-form-group">
          <label class="isu-form-label">Disabled Field</label>
          <input type="text" class="isu-input" placeholder="Disabled input" disabled />
        </div>
      </form>
    </div>
  </div>
`;

export const Textarea = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Textarea</h2>

    <div class="isu-card max-w-md">
      <div class="isu-form-group">
        <label class="isu-form-label">Message</label>
        <textarea class="isu-textarea" rows="4" placeholder="Enter your message here..."></textarea>
        <p class="isu-form-help">Please provide detailed information.</p>
      </div>
    </div>
  </div>
`;

export const SelectDropdown = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Select Dropdown</h2>

    <div class="isu-card max-w-md">
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
    </div>
  </div>
`;

export const Checkboxes = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Checkboxes</h2>

    <div class="isu-card max-w-md">
      <fieldset>
        <legend class="isu-form-label mb-3">Interests</legend>
        <div class="space-y-3">
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="isu-checkbox" />
            <span class="isu-body-sm">Artificial Intelligence</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="isu-checkbox" checked />
            <span class="isu-body-sm">Data Science</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="isu-checkbox" />
            <span class="isu-body-sm">Cybersecurity</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="isu-checkbox" />
            <span class="isu-body-sm">Software Engineering</span>
          </label>
        </div>
      </fieldset>
    </div>
  </div>
`;

export const RadioButtons = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Radio Buttons</h2>

    <div class="isu-card max-w-md">
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
    </div>
  </div>
`;

export const Buttons = () => `
  <div class="isu-container py-8">
    <h2 class="isu-heading-3 mb-6">Form Buttons</h2>

    <div class="isu-card max-w-md">
      <div class="space-y-4">
        <div>
          <h3 class="isu-heading-5 mb-3">Primary Actions</h3>
          <div class="space-x-3">
            <button class="isu-btn-primary">Submit</button>
            <button class="isu-btn-secondary">Cancel</button>
          </div>
        </div>

        <div>
          <h3 class="isu-heading-5 mb-3">Secondary Actions</h3>
          <div class="space-x-3">
            <button class="isu-btn-ghost">Edit</button>
            <button class="isu-btn-outline">Preview</button>
          </div>
        </div>

        <div>
          <h3 class="isu-heading-5 mb-3">Button Sizes</h3>
          <div class="space-x-3">
            <button class="isu-btn-primary isu-button-sm">Small</button>
            <button class="isu-btn-primary isu-button-md">Medium</button>
            <button class="isu-btn-primary isu-button-lg">Large</button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
