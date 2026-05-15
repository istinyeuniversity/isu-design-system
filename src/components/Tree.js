let uidCounter = 0;
const uid = () => `isu-tree-node-${++uidCounter}`;

export function createTree({
  items = [],
  defaultExpanded = [],
  selectable = true,
  selected = null,
  ariaLabel = 'Tree',
  onSelect,
  onToggle,
} = {}) {
  const root = document.createElement('ul');
  root.className = 'isu-tree';
  root.setAttribute('role', 'tree');
  root.setAttribute('aria-label', ariaLabel);

  const expanded = new Set(defaultExpanded.map(String));
  let selectedId = selected != null ? String(selected) : null;
  let focusedId = null;

  const nodes = new Map();
  const order = [];

  function isLeaf(item) {
    return !Array.isArray(item.children) || item.children.length === 0;
  }

  function ensureId(item) {
    const raw = item.id != null ? String(item.id) : uid();
    item.__treeId = raw;
    return raw;
  }

  function buildItem(item, depth, parent) {
    const id = ensureId(item);
    const li = document.createElement('li');
    li.className = 'isu-tree-item';
    li.setAttribute('role', 'treeitem');
    li.dataset.treeId = id;

    const leaf = isLeaf(item);
    if (!leaf) li.setAttribute('aria-expanded', String(expanded.has(id)));
    if (selectable && selectedId === id) li.setAttribute('aria-selected', 'true');

    const row = document.createElement('div');
    row.className = 'isu-tree-row';
    if (selectable && selectedId === id) row.classList.add('isu-tree-row-selected');

    if (leaf) {
      const spacer = document.createElement('span');
      spacer.className = 'isu-tree-toggle-empty';
      spacer.setAttribute('aria-hidden', 'true');
      row.appendChild(spacer);
    } else {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'isu-tree-toggle';
      if (expanded.has(id)) toggle.classList.add('isu-tree-toggle-expanded');
      toggle.setAttribute('aria-label', expanded.has(id) ? 'Daralt' : 'Genişlet');
      toggle.tabIndex = -1;
      toggle.innerHTML = '<span aria-hidden="true">›</span>';
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleExpand(id);
      });
      row.appendChild(toggle);
    }

    if (item.icon != null) {
      const icon = document.createElement('span');
      icon.className = 'isu-tree-icon';
      icon.setAttribute('aria-hidden', 'true');
      if (item.icon instanceof Element) icon.appendChild(item.icon.cloneNode(true));
      else icon.innerHTML = String(item.icon);
      row.appendChild(icon);
    }

    const label = document.createElement('span');
    label.className = 'isu-tree-label';
    label.textContent = item.label || '';
    row.appendChild(label);

    if (item.badge != null) {
      const badge = document.createElement('span');
      badge.className = 'isu-tree-badge';
      badge.textContent = String(item.badge);
      row.appendChild(badge);
    }

    row.addEventListener('click', () => {
      if (selectable) select(id);
      li.focus();
      if (typeof item.onClick === 'function') item.onClick(item);
    });

    li.appendChild(row);
    nodes.set(id, { item, parent, depth, element: li, leaf });
    order.push(id);

    if (!leaf) {
      const childList = document.createElement('ul');
      childList.className = 'isu-tree-children';
      childList.setAttribute('role', 'group');
      if (expanded.has(id)) childList.classList.add('isu-tree-children-show');
      item.children.forEach((child) => {
        childList.appendChild(buildItem(child, depth + 1, item));
      });
      li.appendChild(childList);
    }

    return li;
  }

  items.forEach((item) => root.appendChild(buildItem(item, 0, null)));

  function isAncestorCollapsed(id) {
    let node = nodes.get(id);
    while (node && node.parent) {
      const parentId = node.parent.__treeId;
      if (!expanded.has(parentId)) return true;
      node = nodes.get(parentId);
    }
    return false;
  }

  function getVisibleItems() {
    return order.filter((id) => !isAncestorCollapsed(id));
  }

  function setRovingFocus(id) {
    if (!id) return;
    getVisibleItems().forEach((vid) => {
      const node = nodes.get(vid);
      if (node && node.element) node.element.tabIndex = vid === id ? 0 : -1;
    });
    focusedId = id;
  }

  function focusItem(id) {
    setRovingFocus(id);
    const node = nodes.get(id);
    if (node && node.element) node.element.focus();
  }

  function toggleExpand(id) {
    const node = nodes.get(id);
    if (!node || node.leaf) return;
    const willOpen = !expanded.has(id);
    if (willOpen) expanded.add(id);
    else expanded.delete(id);

    const li = node.element;
    li.setAttribute('aria-expanded', String(willOpen));
    const toggle = li.querySelector(':scope > .isu-tree-row > .isu-tree-toggle');
    if (toggle) {
      toggle.classList.toggle('isu-tree-toggle-expanded', willOpen);
      toggle.setAttribute('aria-label', willOpen ? 'Daralt' : 'Genişlet');
    }
    const childList = li.querySelector(':scope > .isu-tree-children');
    if (childList) childList.classList.toggle('isu-tree-children-show', willOpen);

    setRovingFocus(focusedId || id);
    if (typeof onToggle === 'function') onToggle(id, willOpen, node.item);
  }

  function select(id) {
    if (!selectable) return;
    const prev = selectedId;
    if (prev === id) return;
    selectedId = id;
    if (prev) {
      const prevNode = nodes.get(prev);
      if (prevNode && prevNode.element) {
        prevNode.element.removeAttribute('aria-selected');
        const row = prevNode.element.querySelector(':scope > .isu-tree-row');
        if (row) row.classList.remove('isu-tree-row-selected');
      }
    }
    const node = nodes.get(id);
    if (node && node.element) {
      node.element.setAttribute('aria-selected', 'true');
      const row = node.element.querySelector(':scope > .isu-tree-row');
      if (row) row.classList.add('isu-tree-row-selected');
    }
    if (typeof onSelect === 'function') onSelect(id, node ? node.item : null);
  }

  root.addEventListener('keydown', (e) => {
    const visible = getVisibleItems();
    if (!visible.length) return;
    let idx = visible.indexOf(focusedId);
    if (idx === -1) idx = 0;
    const currentId = visible[idx];
    const node = nodes.get(currentId);
    if (!node) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(visible[Math.min(idx + 1, visible.length - 1)]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(visible[Math.max(idx - 1, 0)]);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (!node.leaf) {
        if (!expanded.has(currentId)) toggleExpand(currentId);
        else if (node.item.children.length > 0) {
          focusItem(node.item.children[0].__treeId);
        }
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (!node.leaf && expanded.has(currentId)) {
        toggleExpand(currentId);
      } else if (node.parent) {
        focusItem(node.parent.__treeId);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusItem(visible[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusItem(visible[visible.length - 1]);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (selectable) select(currentId);
      if (!node.leaf) toggleExpand(currentId);
      if (typeof node.item.onClick === 'function') node.item.onClick(node.item);
    }
  });

  setRovingFocus(selectedId || getVisibleItems()[0]);

  root.expand = (id) => { const s = String(id); if (!expanded.has(s)) toggleExpand(s); };
  root.collapse = (id) => { const s = String(id); if (expanded.has(s)) toggleExpand(s); };
  root.toggle = (id) => toggleExpand(String(id));
  root.select = (id) => select(String(id));
  root.getSelected = () => selectedId;
  root.getExpanded = () => Array.from(expanded);

  return root;
}
