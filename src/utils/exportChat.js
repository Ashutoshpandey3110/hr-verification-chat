export const exportChat = messages => {
  const text = messages.map(m => `[${m.role}] ${m.text}`).join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "verification.txt";
  link.click();
};
