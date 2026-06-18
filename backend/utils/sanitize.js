// Helper to escape HTML tags to prevent scripting injections
function escapeHtml(str) {
  if (typeof str !== "string") {
    return str;
  }
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

module.exports = {
  escapeHtml
};
