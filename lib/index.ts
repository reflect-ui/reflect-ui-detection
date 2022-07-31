import { detectIfAppBarAction } from "./appbar-action.detection";
import { detectIfAppbarBackroute } from "./appbar-backroute.detection";
import { detectIfAppbarTitle } from "./appbar-title.detection";
import { detectIfAppbar } from "./appbar.detection";
import { detectIfAvatar } from "./avatar.detection";
import { detectIfBreadCrumb } from "./bread-crumb.detection";
import { detectIfButtonBase } from "./button-base.detection";
import {
  detectIfButtonIcon,
  DetectedButtonIconData,
} from "./button-icon.detection";
import { detectIfValidButtonText } from "./button-text.detection";
import { detectIfButton } from "./button.detection";
import { detectIfCard } from "./card.detection";
import { detectIfCheckBox } from "./check-box.detection.ts";
import { detectIfChip } from "./chip.detection";
import { detectIfColumn } from "./column.detection";
import { detectIfDivider } from "./divider.detection";
import { detectIfIcon, DetectedIconData } from "./icon.detection";
import { detectIfIllust } from "./illust.detection";
import { detectIfScreen } from "./screen.detection";
import { detectIfImage } from "./image.detection";
import { detectIfTextField } from "./text-field.detection";
import { detectIfPlaceholderText } from "./text-field-placeholder.detection";

export * from "./detect";
export * as rulse from "./rules";
export * as processors from "./processors";
export * as manifests from "./manifests";

export const detectIf = {
  appbarAction: detectIfAppBarAction,
  appbarBackroute: detectIfAppbarBackroute,
  appbarTitle: detectIfAppbarTitle,
  appbar: detectIfAppbar,
  avatar: detectIfAvatar,
  breadCrumb: detectIfBreadCrumb,
  buttonBase: detectIfButtonBase,
  buttonIcon: detectIfButtonIcon,
  buttonText: detectIfValidButtonText,
  button: detectIfButton,
  card: detectIfCard,
  checkBox: detectIfCheckBox,
  chip: detectIfChip,
  column: detectIfColumn,
  divider: detectIfDivider,
  screen: detectIfScreen,
  icon: detectIfIcon,
  illust: detectIfIllust,
  image: detectIfImage,
  textfield: detectIfTextField,
  textfieldPlaceholder: detectIfPlaceholderText,
};

export type { DetectedButtonIconData, DetectedIconData };
