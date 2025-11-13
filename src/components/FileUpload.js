export function createFileUpload({ 
  icon = '📄', 
  text = 'Dosyanızı seçin', 
  hint = 'PDF veya DOC, max 20MB',
  onFileSelect = null 
}) {
  const container = document.createElement('div');
  container.className = 'isu-file-upload';

  const area = document.createElement('div');
  area.className = 'isu-file-upload-area';
  area.setAttribute('tabindex', '0');
  area.setAttribute('role', 'button');
  area.setAttribute('aria-label', 'Dosya yükleme alanı');

  const iconEl = document.createElement('div');
  iconEl.className = 'isu-file-upload-icon';
  iconEl.textContent = icon;
  area.appendChild(iconEl);

  const textEl = document.createElement('div');
  textEl.className = 'isu-file-upload-text';
  textEl.textContent = text;
  area.appendChild(textEl);

  const hintEl = document.createElement('div');
  hintEl.className = 'isu-file-upload-hint';
  hintEl.textContent = hint;
  area.appendChild(hintEl);

  // Hidden file input
  const input = document.createElement('input');
  input.type = 'file';
  input.style.display = 'none';
  input.multiple = false;

  // Click handler
  area.addEventListener('click', () => {
    input.click();
  });

  // File selection handler
  input.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0 && onFileSelect) {
      onFileSelect(e.target.files[0]);
    }
  });

  // Drag and drop handlers
  area.addEventListener('dragover', (e) => {
    e.preventDefault();
    container.classList.add('dragover');
  });

  area.addEventListener('dragleave', () => {
    container.classList.remove('dragover');
  });

  area.addEventListener('drop', (e) => {
    e.preventDefault();
    container.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && onFileSelect) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  });

  // Keyboard support
  area.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      input.click();
    }
  });

  container.appendChild(area);
  container.appendChild(input);

  return container;
}

