function formatTitleName(title: string, name: string) {
  return title && name ? `${title} - ${name}` : title || name || "";
}
export { formatTitleName };
