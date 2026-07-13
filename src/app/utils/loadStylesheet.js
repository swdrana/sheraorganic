export const loadStylesheet = (href) => {
  if (typeof window === "undefined") return;
  const id = `dynamic-css-${href.replace(/[^a-zA-Z0-9]/g, "-")}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};
