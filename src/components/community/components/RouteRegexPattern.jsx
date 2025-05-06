export const ProfileRouteRegex = /^\/feed\/profile(?:\/([^/]+))?$/;
export const PostRouteRegex = /^\/feed\/post\/?(?:([^/]+))?$/;
export const SavedRouteRegex = /^\/feed\/saved\/?$/;
export const SinglePageRouteRegex = /^\/feed\/view\/?(?:([^/]+))?\/?$/;

export const ProfilePostRedirctRegex =
  /^\/feed\/post(?:\/([^/]+))?(?:\?post=([a-f\d-]+))?$/i;
