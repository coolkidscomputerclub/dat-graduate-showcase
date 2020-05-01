// required for the `afterNavigation` Vue Meta fix
export default (to, from, savedPosition) => {
  return { x: 0, y: 0 };
};
