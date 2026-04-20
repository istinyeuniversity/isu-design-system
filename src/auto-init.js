import { createDrawer, openDrawer } from './components/Drawer.js';
import { createAccordion } from './components/Accordion.js';
import { createModal, openModal } from './components/Modal.js';
import { createTabs } from './components/Tabs.js';
import { attachTooltip } from './components/Tooltip.js';
import { createSwitch } from './components/Switch.js';

const INIT_FLAG = 'isuInitialized';

function truthy(val) {
  if (val == null) return false;
  const v = String(val).trim().toLowerCase();
  return v === '' || v === 'true' || v === '1' || v === 'yes';
}

function falsy(val) {
  if (val == null) return false;
  const v = String(val).trim().toLowerCase();
  return v === 'false' || v === '0' || v === 'no';
}

function boolAttr(el, name, fallback) {
  if (!el.hasAttribute(name)) return fallback;
  const raw = el.getAttribute(name);
  if (raw == null || raw === '') return true;
  if (falsy(raw)) return false;
  return truthy(raw) ? true : fallback;
}

function markInit(el) {
  el.dataset[INIT_FLAG] = '1';
}

function isInit(el) {
  return el.dataset[INIT_FLAG] === '1';
}

function resolveTarget(trigger, attr) {
  const sel = trigger.getAttribute(attr);
  if (!sel) return null;
  try {
    return document.querySelector(sel);
  } catch (_) {
    return null;
  }
}

function readTemplateContent(tpl) {
  if (!tpl) return '';
  if (tpl.tagName === 'TEMPLATE') {
    const holder = document.createElement('div');
    holder.appendChild(tpl.content.cloneNode(true));
    return holder.innerHTML;
  }
  return tpl.innerHTML;
}

function initDrawers(root) {
  const triggers = root.querySelectorAll('[data-isu-drawer-target]');
  triggers.forEach((trigger) => {
    if (isInit(trigger)) return;
    markInit(trigger);

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const tpl = resolveTarget(trigger, 'data-isu-drawer-target');
      if (!tpl) return;

      const drawer = createDrawer({
        title: tpl.getAttribute('data-title') || trigger.getAttribute('data-title') || '',
        content: readTemplateContent(tpl),
        side: tpl.getAttribute('data-side') || trigger.getAttribute('data-side') || 'right',
        size: tpl.getAttribute('data-size') || trigger.getAttribute('data-size') || 'md',
        closable: boolAttr(tpl, 'data-closable', true),
        closeOnBackdrop: boolAttr(tpl, 'data-close-on-backdrop', true),
        closeOnEscape: boolAttr(tpl, 'data-close-on-escape', true),
      });
      openDrawer(drawer);
    });
  });
}

function initModals(root) {
  const triggers = root.querySelectorAll('[data-isu-modal-target]');
  triggers.forEach((trigger) => {
    if (isInit(trigger)) return;
    markInit(trigger);

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const tpl = resolveTarget(trigger, 'data-isu-modal-target');
      if (!tpl) return;

      const modal = createModal({
        title: tpl.getAttribute('data-title') || trigger.getAttribute('data-title') || '',
        description: tpl.getAttribute('data-description') || '',
        content: readTemplateContent(tpl),
        size: tpl.getAttribute('data-size') || trigger.getAttribute('data-size') || 'md',
        closable: boolAttr(tpl, 'data-closable', true),
        closeOnBackdrop: boolAttr(tpl, 'data-close-on-backdrop', true),
        closeOnEscape: boolAttr(tpl, 'data-close-on-escape', true),
      });
      openModal(modal);
    });
  });
}

function initAccordions(root) {
  const roots = root.querySelectorAll('[data-isu-accordion]');
  roots.forEach((el) => {
    if (isInit(el)) return;
    markInit(el);

    const type = el.getAttribute('data-type') === 'multiple' ? 'multiple' : 'single';
    const collapsible = boolAttr(el, 'data-collapsible', true);
    const ghost = boolAttr(el, 'data-ghost', false);
    const headingLevel = Number(el.getAttribute('data-heading-level')) || 3;
    const ariaLabel = el.getAttribute('aria-label') || 'Accordion';

    const itemEls = Array.from(el.querySelectorAll(':scope > [data-isu-accordion-item]'));
    const defaults = [];
    const items = itemEls.map((itemEl, idx) => {
      const value = itemEl.getAttribute('data-value') || String(idx);
      const titleEl = itemEl.querySelector(':scope > [data-isu-accordion-title]');
      const bodyEl = itemEl.querySelector(':scope > [data-isu-accordion-body]');
      const title = titleEl ? titleEl.innerHTML.trim() : '';
      const content = bodyEl ? bodyEl.innerHTML : '';
      const disabled = boolAttr(itemEl, 'data-disabled', false);
      if (itemEl.hasAttribute('data-default-open')) defaults.push(value);
      return { value, title, content, disabled };
    });

    const defaultValue = type === 'multiple' ? defaults : defaults[0];

    const built = createAccordion({
      items,
      type,
      defaultValue,
      collapsible,
      ghost,
      headingLevel,
      ariaLabel,
    });

    if (el.className) built.className = `${built.className} ${el.className}`.trim();
    if (el.id) built.id = el.id;
    markInit(built);
    el.replaceWith(built);
  });
}

function initTabs(root) {
  const roots = root.querySelectorAll('[data-isu-tabs]');
  roots.forEach((el) => {
    if (isInit(el)) return;
    markInit(el);

    const orientation = el.getAttribute('data-orientation') === 'vertical' ? 'vertical' : 'horizontal';
    const variant = el.getAttribute('data-variant') === 'pills' ? 'pills' : 'line';
    const size = el.getAttribute('data-size') || 'md';
    const ariaLabel = el.getAttribute('aria-label') || 'Tabs';
    const defaultValue = el.getAttribute('data-default-value') || undefined;

    const tabEls = Array.from(el.querySelectorAll(':scope > [data-isu-tab]'));
    const tabs = tabEls.map((tabEl, idx) => {
      const value = tabEl.getAttribute('data-value') || String(idx);
      const label = tabEl.getAttribute('data-label') || `Tab ${idx + 1}`;
      const disabled = boolAttr(tabEl, 'data-disabled', false);
      const icon = tabEl.getAttribute('data-icon') || null;
      return { value, label, disabled, icon, content: tabEl.innerHTML };
    });

    const built = createTabs({
      tabs,
      defaultValue,
      orientation,
      variant,
      size,
      ariaLabel,
    });

    if (el.className) built.className = `${built.className} ${el.className}`.trim();
    if (el.id) built.id = el.id;
    markInit(built);
    el.replaceWith(built);
  });
}

function initTooltips(root) {
  const els = root.querySelectorAll('[data-isu-tooltip]');
  els.forEach((el) => {
    if (isInit(el)) return;
    markInit(el);

    const text = el.getAttribute('data-isu-tooltip') || '';
    const placement = el.getAttribute('data-placement') || 'top';
    if (text) attachTooltip(el, text, placement);
  });
}

function initSwitches(root) {
  const els = root.querySelectorAll('[data-isu-switch]');
  els.forEach((el) => {
    if (isInit(el)) return;
    markInit(el);

    const label = el.getAttribute('data-label') || el.textContent.trim();
    const description = el.getAttribute('data-description') || '';
    const checked = boolAttr(el, 'data-checked', false);
    const disabled = boolAttr(el, 'data-disabled', false);
    const size = el.getAttribute('data-size') || 'md';
    const name = el.getAttribute('data-name') || '';
    const value = el.getAttribute('data-value') || '';
    const id = el.getAttribute('data-id') || el.id || undefined;

    const built = createSwitch({ label, description, checked, disabled, size, name, value, id });
    if (el.className) built.className = `${built.className} ${el.className}`.trim();
    markInit(built);
    el.replaceWith(built);
  });
}

export function initAuto(root) {
  const scope = root || (typeof document !== 'undefined' ? document : null);
  if (!scope) return;
  initAccordions(scope);
  initTabs(scope);
  initSwitches(scope);
  initTooltips(scope);
  initDrawers(scope);
  initModals(scope);
}

export default initAuto;
