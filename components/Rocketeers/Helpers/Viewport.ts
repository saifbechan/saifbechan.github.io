export enum Viewport {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
}

export const getViewport = (width: number): string => {
  if (width >= 0 && width <= 767) {
    return Viewport.XS;
  }
  if (width >= 768 && width <= 991) {
    return Viewport.SM;
  }
  if (width >= 992 && width <= 1199) {
    return Viewport.MD;
  }
  return Viewport.LG;
};
