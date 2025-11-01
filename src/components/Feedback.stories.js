import {
  createAlert,
  createBadge,
  createSpinner,
  createProgressBar,
  createToast,
  createLoadingOverlay
} from './Feedback.js';

export default {
  title: 'Components/Feedback',
  argTypes: {
    dismissible: { control: 'boolean' },
    showLabel: { control: 'boolean' },
  },
};

const AlertTemplate = ({ type, title, description, dismissible }) => {
  return createAlert({ type, title, description, dismissible });
};

const BadgeTemplate = ({ text, variant, size }) => {
  return createBadge({ text, variant, size });
};

const SpinnerTemplate = ({ size }) => {
  return createSpinner({ size });
};

const ProgressTemplate = ({ value, max, showLabel }) => {
  return createProgressBar({ value, max, showLabel });
};

const ToastTemplate = ({ type, title, message }) => {
  return createToast({ type, title, message, duration: 0 }); // Don't auto-remove for demo
};

// Alert Stories
export const SuccessAlert = AlertTemplate.bind({});
SuccessAlert.args = {
  type: 'success',
  title: 'Success!',
  description: 'Your changes have been saved successfully.',
  dismissible: false,
};

export const ErrorAlert = AlertTemplate.bind({});
ErrorAlert.args = {
  type: 'error',
  title: 'Error!',
  description: 'There was a problem processing your request.',
  dismissible: false,
};

export const WarningAlert = AlertTemplate.bind({});
WarningAlert.args = {
  type: 'warning',
  title: 'Warning!',
  description: 'Please review your information before continuing.',
  dismissible: false,
};

export const InfoAlert = AlertTemplate.bind({});
InfoAlert.args = {
  type: 'info',
  title: 'Information',
  description: 'Here is some important information you should know.',
  dismissible: false,
};

export const DismissibleAlert = AlertTemplate.bind({});
DismissibleAlert.args = {
  type: 'info',
  title: 'Dismissible Alert',
  description: 'You can dismiss this alert by clicking the × button.',
  dismissible: true,
};

// Badge Stories
export const PrimaryBadge = BadgeTemplate.bind({});
PrimaryBadge.args = {
  text: 'Primary',
  variant: 'primary',
  size: 'sm',
};

export const SuccessBadge = BadgeTemplate.bind({});
SuccessBadge.args = {
  text: 'Success',
  variant: 'success',
  size: 'sm',
};

export const WarningBadge = BadgeTemplate.bind({});
WarningBadge.args = {
  text: 'Warning',
  variant: 'warning',
  size: 'sm',
};

export const ErrorBadge = BadgeTemplate.bind({});
ErrorBadge.args = {
  text: 'Error',
  variant: 'error',
  size: 'sm',
};

export const SecondaryBadge = BadgeTemplate.bind({});
SecondaryBadge.args = {
  text: 'Secondary',
  variant: 'secondary',
  size: 'sm',
};

export const LargeBadge = BadgeTemplate.bind({});
LargeBadge.args = {
  text: 'Large Badge',
  variant: 'primary',
  size: 'lg',
};

export const BadgeGroup = () => {
  const container = document.createElement('div');
  container.className = 'isu-flex gap-2 flex-wrap';

  const badges = [
    createBadge({ text: 'Active', variant: 'success' }),
    createBadge({ text: 'Pending', variant: 'warning' }),
    createBadge({ text: 'Inactive', variant: 'secondary' }),
    createBadge({ text: 'Error', variant: 'error' }),
    createBadge({ text: 'New', variant: 'primary' })
  ];

  badges.forEach(badge => container.appendChild(badge));
  return container;
};

// Spinner Stories
export const SmallSpinner = SpinnerTemplate.bind({});
SmallSpinner.args = {
  size: 'sm',
};

export const MediumSpinner = SpinnerTemplate.bind({});
MediumSpinner.args = {
  size: 'md',
};

export const LargeSpinner = SpinnerTemplate.bind({});
LargeSpinner.args = {
  size: 'lg',
};

export const SpinnerWithText = () => {
  const container = document.createElement('div');
  container.className = 'isu-flex items-center';

  const spinner = createSpinner({ size: 'md' });
  const text = document.createElement('span');
  text.className = 'isu-loading-text';
  text.textContent = 'Loading...';

  container.appendChild(spinner);
  container.appendChild(text);

  return container;
};

// Progress Bar Stories
export const Progress25 = ProgressTemplate.bind({});
Progress25.args = {
  value: 25,
  max: 100,
  showLabel: true,
};

export const Progress50 = ProgressTemplate.bind({});
Progress50.args = {
  value: 50,
  max: 100,
  showLabel: true,
};

export const Progress75 = ProgressTemplate.bind({});
Progress75.args = {
  value: 75,
  max: 100,
  showLabel: true,
};

export const Progress100 = ProgressTemplate.bind({});
Progress100.args = {
  value: 100,
  max: 100,
  showLabel: true,
};

export const ProgressWithoutLabel = ProgressTemplate.bind({});
ProgressWithoutLabel.args = {
  value: 60,
  max: 100,
  showLabel: false,
};

// Toast Stories
export const SuccessToast = ToastTemplate.bind({});
SuccessToast.args = {
  type: 'success',
  title: 'Success!',
  message: 'Your profile has been updated successfully.',
};

export const ErrorToast = ToastTemplate.bind({});
ErrorToast.args = {
  type: 'error',
  title: 'Error!',
  message: 'Failed to save changes. Please try again.',
};

export const WarningToast = ToastTemplate.bind({});
WarningToast.args = {
  type: 'warning',
  title: 'Warning',
  message: 'Your session will expire in 5 minutes.',
};

export const InfoToast = ToastTemplate.bind({});
InfoToast.args = {
  type: 'info',
  title: 'Information',
  message: 'New features are available. Check them out!',
};

// Loading Overlay Story
export const LoadingOverlay = () => {
  return createLoadingOverlay({ text: 'Loading data...' });
};

export const SimpleLoadingOverlay = () => {
  return createLoadingOverlay({ text: 'Please wait...' });
};
