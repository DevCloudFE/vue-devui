import { FullscreenProps } from './fullscreen-types';
import { useNamespace } from '../../shared/hooks/use-namespace';

interface CompatibleHTMLElement extends HTMLElement {
  mozRequestFullScreen?: () => void;
  webkitRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
}

interface CompatibleDocument extends Document {
  exitFullscreen: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  webkitCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

const ns = useNamespace('fullscreen');

// 页面全屏
export const launchNormalFullscreen = (targetElement: HTMLElement, props: FullscreenProps): void => {
  targetElement.classList.add(ns.b());
  if (props.zIndex) {
    targetElement.setAttribute('style', `z-index: ${props.zIndex}`);
  }
};

// 退出正常全屏
export const exitNormalFullscreen = (targetElement: HTMLElement): void => {
  targetElement.classList.remove(ns.b());
  targetElement.style.zIndex = '';
};

export const launchImmersiveFullScreen = async (docElement: CompatibleHTMLElement): Promise<boolean | undefined> => {
  let fullscreenLaunch = null;
  if (docElement.requestFullscreen) {
    fullscreenLaunch = docElement.requestFullscreen();
  } else if (docElement.mozRequestFullScreen) {
    fullscreenLaunch = docElement.mozRequestFullScreen();
  } else if (docElement.webkitRequestFullScreen) {
    fullscreenLaunch = Promise.resolve(docElement.webkitRequestFullScreen());
  } else if (docElement.msRequestFullscreen) {
    fullscreenLaunch = Promise.resolve(docElement.msRequestFullscreen());
  }
  return await fullscreenLaunch?.then(() => !!document.fullscreenElement);
};

export const exitImmersiveFullScreen = async (doc: CompatibleDocument): Promise<boolean | undefined> => {
  let fullscreenExit = null;
  if (doc.exitFullscreen) {
    fullscreenExit = doc.exitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    fullscreenExit = doc.mozCancelFullScreen();
  } else if (doc.webkitCancelFullScreen) {
    fullscreenExit = Promise.resolve(doc.webkitCancelFullScreen());
  } else if (doc.msExitFullscreen) {
    fullscreenExit = Promise.resolve(doc.msExitFullscreen());
  }
  return await fullscreenExit?.then(() => !!document.fullscreenElement);
};

export const addFullScreenStyle = (): void => {
  document.getElementsByTagName('html')[0].classList.add(ns.e('html'));
};

export const removeFullScreenStyle = (): void => {
  document.getElementsByTagName('html')[0].classList.remove(ns.e('html'));
};
