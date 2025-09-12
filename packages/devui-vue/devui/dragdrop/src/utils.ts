function matches(element: HTMLElement, selector: string): boolean {
  const proto: any = Element.prototype;

  const func =
    proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    proto.webkitMatchesSelector ||
    function (s: any) {
      const ctx: any = this;
      const matchesElements = (ctx.document || ctx.ownerDocument).querySelectorAll(s);
      let i = matchesElements.length;
      while (--i >= 0 && matchesElements.item(i) !== ctx) {}
      return i > -1;
    };

  return func.call(element, selector);
}

export {
  matches,
};
