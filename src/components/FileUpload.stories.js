import { createFileUpload } from './FileUpload.js';

export default {
  title: 'Components/FileUpload',
  argTypes: {
    icon: { control: 'text' },
    text: { control: 'text' },
    hint: { control: 'text' },
  },
};

const Template = ({ icon, text, hint }) => {
  const upload = createFileUpload({ 
    icon, 
    text, 
    hint,
    onFileSelect: (file) => {
      console.log('Selected file:', file.name);
    }
  });
  return upload;
};

export const Default = Template.bind({});
Default.args = {
  icon: '📄',
  text: 'Dosyanızı seçin',
  hint: 'PDF veya DOC, max 20MB',
};

export const ImageUpload = Template.bind({});
ImageUpload.args = {
  icon: '🖼️',
  text: 'Resim yükleyin',
  hint: 'JPG, PNG veya GIF, max 10MB',
};

export const DocumentUpload = Template.bind({});
DocumentUpload.args = {
  icon: '📎',
  text: 'Belge yükleyin',
  hint: 'PDF, DOC, DOCX, max 50MB',
};

export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  icon: '📁',
  text: 'Dosyalarınızı seçin',
  hint: 'Birden fazla dosya seçebilirsiniz',
};

