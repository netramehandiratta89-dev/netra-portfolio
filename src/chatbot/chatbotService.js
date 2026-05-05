export const getBotReply = (message) => {
  const text = message.toLowerCase();
  if (text.includes('project')) return 'The showcase includes SaaS, fintech, AI studio, and commerce work with links ready for CMS data.';
  if (text.includes('contact')) return 'Use the contact form near the footer or connect with Netra on LinkedIn.';
  if (text.includes('resume')) return 'The resume download button is wired to /resume.pdf for production replacement.';
  return 'I can help you explore projects, skills, resume, certificates, and the hidden CMS structure.';
};
