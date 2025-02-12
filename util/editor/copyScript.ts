export const copyScript = `document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".copy-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const codeBlock = this.closest(".relative.hljs").querySelector("pre code");
        if (!codeBlock) return;
        const codeLines = Array.from(codeBlock.querySelectorAll("div > div:not(:first-child)")); 
        const codeText = codeLines.map(div => div.innerText).join("\\n"); 
        navigator.clipboard.writeText(codeText).catch(err => console.error("Copy failed", err));
      });
    });
  });`;