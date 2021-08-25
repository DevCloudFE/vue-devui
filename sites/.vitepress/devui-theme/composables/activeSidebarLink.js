import { onMounted, onUnmounted, onUpdated } from 'vue';
export function useActiveSidebarLinks() {
    let rootActiveLink = null;
    let activeLink = null;
    const onScroll = throttleAndDebounce(setActiveLink, 300);
    function setActiveLink() {
        const sidebarLinks = getSidebarLinks();
        const anchors = getAnchors(sidebarLinks);
        for (let i = 0; i < anchors.length; i++) {
            const anchor = anchors[i];
            const nextAnchor = anchors[i + 1];
            const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor);
            if (isActive) {
                history.replaceState(null, document.title, hash ? hash : ' ');
                activateLink(hash);
                return;
            }
        }
    }
    function activateLink(hash) {
        deactiveLink(activeLink);
        deactiveLink(rootActiveLink);
        activeLink = document.querySelector(`.sidebar a[href="${hash}"]`);
        if (!activeLink) {
            return;
        }
        activeLink.classList.add('active');
        // also add active class to parent h2 anchors
        const rootLi = activeLink.closest('.sidebar-links > ul > li');
        if (rootLi && rootLi !== activeLink.parentElement) {
            rootActiveLink = rootLi.querySelector('a');
            rootActiveLink && rootActiveLink.classList.add('active');
        }
        else {
            rootActiveLink = null;
        }
    }
    function deactiveLink(link) {
        link && link.classList.remove('active');
    }
    onMounted(() => {
        setActiveLink();
        window.addEventListener('scroll', onScroll);
    });
    onUpdated(() => {
        // sidebar update means a route change
        activateLink(decodeURIComponent(location.hash));
    });
    onUnmounted(() => {
        window.removeEventListener('scroll', onScroll);
    });
}
function getSidebarLinks() {
    return [].slice.call(document.querySelectorAll('.sidebar a.sidebar-link-item'));
}
function getAnchors(sidebarLinks) {
    return [].slice
        .call(document.querySelectorAll('.header-anchor'))
        .filter((anchor) => sidebarLinks.some((sidebarLink) => sidebarLink.hash === anchor.hash));
}
function getPageOffset() {
    return document.querySelector('.nav-bar').offsetHeight;
}
function getAnchorTop(anchor) {
    const pageOffset = getPageOffset();
    return anchor.parentElement.offsetTop - pageOffset - 15;
}
function isAnchorActive(index, anchor, nextAnchor) {
    const scrollTop = window.scrollY;
    if (index === 0 && scrollTop === 0) {
        return [true, null];
    }
    if (scrollTop < getAnchorTop(anchor)) {
        return [false, null];
    }
    if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
        return [true, decodeURIComponent(anchor.hash)];
    }
    return [false, null];
}
function throttleAndDebounce(fn, delay) {
    let timeout;
    let called = false;
    return () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (!called) {
            fn();
            called = true;
            setTimeout(() => {
                called = false;
            }, delay);
        }
        else {
            timeout = setTimeout(fn, delay);
        }
    };
}
