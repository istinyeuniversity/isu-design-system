import { createDrawer, openDrawer, closeDrawer } from '../components/Drawer.js';
import { createAccordion } from '../components/Accordion.js';
import { createModal, openModal, closeModal, confirmModal } from '../components/Modal.js';
import { createTabs } from '../components/Tabs.js';
import { attachTooltip, removeTooltip, createTooltipWrapper } from '../components/Tooltip.js';
import { createSwitch } from '../components/Switch.js';
import { createButton, createButtonGroup, createToggleGroup } from '../components/Button.js';
import { createImageSlider } from '../components/ImageSlider.js';
import { createDatePicker } from '../components/DatePicker.js';
import { createTree } from '../components/Tree.js';
import { createDescriptionList } from '../components/DescriptionList.js';
import { createInlineEdit } from '../components/InlineEdit.js';
import { createSplitter } from '../components/Splitter.js';
import { createCard, createGrid, createContainer, createFlex } from '../components/Card.js';
import { createAvatar, createAvatarGroup } from '../components/Avatar.js';
import { createSlider } from '../components/Slider.js';
import { createRating } from '../components/Rating.js';
import { createFileUpload } from '../components/FileUpload.js';
import { createSearchbar } from '../components/Searchbar.js';
import { createCopyLink } from '../components/CopyLink.js';
import { createSkeleton } from '../components/Skeleton.js';
import { createKbd } from '../components/Kbd.js';
import { createStat, createStatCard, createStatGroup } from '../components/Stat.js';
import { createStepIndicator } from '../components/StepIndicator.js';
import { createTimeline } from '../components/Timeline.js';
import { createTable, createDataTable } from '../components/Table.js';
import { createNumberInput, createPinInput } from '../components/Input.js';
import { createBanner } from '../components/Feedback.js';
import { createBreadcrumb, createPagination, createNavBar } from '../components/Navigation.js';
import { createFooter } from '../components/Footer.js';
import { createEmptyState } from '../components/EmptyState.js';
import { createFab } from '../components/Fab.js';
import { createRequirementCheck } from '../components/RequirementCheck.js';
import { createScoreDisplay } from '../components/ScoreDisplay.js';
import { createLogo, createLogoLink, createLogoWithText } from '../components/Logo.js';
import { createSidebar, createSidebarShell } from '../components/Sidebar.js';
import { initAuto } from './auto-init.js';

const ISU = {
  createDrawer,
  openDrawer,
  closeDrawer,
  createAccordion,
  createModal,
  openModal,
  closeModal,
  confirmModal,
  createTabs,
  attachTooltip,
  removeTooltip,
  createTooltipWrapper,
  createSwitch,
  createButton,
  createButtonGroup,
  createToggleGroup,
  createImageSlider,
  createDatePicker,
  createTree,
  createDescriptionList,
  createInlineEdit,
  createSplitter,
  createCard,
  createGrid,
  createContainer,
  createFlex,
  createAvatar,
  createAvatarGroup,
  createSlider,
  createRating,
  createFileUpload,
  createSearchbar,
  createCopyLink,
  createSkeleton,
  createKbd,
  createStat,
  createStatCard,
  createStatGroup,
  createStepIndicator,
  createTimeline,
  createTable,
  createDataTable,
  createNumberInput,
  createPinInput,
  createBanner,
  createBreadcrumb,
  createPagination,
  createNavBar,
  createFooter,
  createEmptyState,
  createFab,
  createRequirementCheck,
  createScoreDisplay,
  createLogo,
  createLogoLink,
  createLogoWithText,
  createSidebar,
  createSidebarShell,
  init: initAuto,
  version: '2.5.0',
};

if (typeof window !== 'undefined') {
  window.ISU = ISU;
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initAuto(), { once: true });
    } else {
      initAuto();
    }
  }
}

export default ISU;
export {
  createDrawer,
  openDrawer,
  closeDrawer,
  createAccordion,
  createModal,
  openModal,
  closeModal,
  confirmModal,
  createTabs,
  attachTooltip,
  removeTooltip,
  createTooltipWrapper,
  createSwitch,
  createSidebar,
  createSidebarShell,
  createToggleGroup,
  createImageSlider,
  createDatePicker,
  createTree,
  createDescriptionList,
  createInlineEdit,
  createSplitter,
  createDataTable,
  createNumberInput,
  createPinInput,
  createBanner,
  initAuto,
};
