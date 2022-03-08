// 页面全屏
export const launchNormalFullscreen = (targetElement: HTMLElement, props) => {
  targetElement.classList.add('devui-fullscreen');
  if (props.zIndex) {
    targetElement.setAttribute('style', `z-index: ${props.zIndex}`);
  }
};

// 退出正常全屏
export const exitNormalFullscreen = (targetElement: HTMLElement) => {
  targetElement.classList.remove('devui-fullscreen');
  targetElement.style.zIndex = null;
};

export const launchImmersiveFullScreen = async (docElement: any) => {
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
  return await fullscreenLaunch.then(() => !!document.fullscreenElement);
};

export const exitImmersiveFullScreen = async (doc: any) => {
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
  return await fullscreenExit.then(() => !!document.fullscreenElement);
};

export const addFullScreenStyle = (): void => {
  document.getElementsByTagName('html')[0].classList.add('devui-fullscreen-html');
};

export const removeFullScreenStyle = (): void => {
  document.getElementsByTagName('html')[0].classList.remove('devui-fullscreen-html');
};
