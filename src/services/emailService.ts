import emailjs from '@emailjs/browser';

// EmailJS Configuration
// These will need to be set up in your EmailJS dashboard
export const EMAIL_CONFIG = {
  SERVICE_ID: 'service_byifmce',
  TEMPLATE_ID: 'template_wn8nx5o',
  CAREER_TEMPLATE_ID: 'template_wn8nx5o', // Replace with a separate career template ID if needed
  PUBLIC_KEY: 'xHGsEHYrhp3USGZWM',
  CONTACT_EMAIL: 'sales@holleman.ro', // Email for contact form submissions
  CAREER_EMAIL: 'hr@holleman.ro',
};

// Initialize EmailJS
emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

// Contact Form Data Interface
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  description: string;
  pickupLocation?: string;
  destinationLocation?: string;
  additionalServices?: string[];
  files?: FileList | null;
}

// Career Form Data Interface
export interface CareerFormData {
  name: string;
  phone: string;
  message?: string;
  cvFile?: File | null;
}

// Send Contact Form Email
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    let msg = `📧 CERERE DE CONTACT\n\n`;
    msg += `👤 Date de contact:\n`;
    msg += `• Nume/Companie: ${formData.name}\n`;
    msg += `• Telefon: ${formData.phone}\n`;
    msg += `• Email: ${formData.email}\n`;
    msg += `\n📋 Descriere cerere:\n${formData.description}\n`;

    if (formData.pickupLocation || formData.destinationLocation) {
      msg += `\n📍 Traseu:\n`;
      if (formData.pickupLocation) msg += `• Punct de încărcare: ${formData.pickupLocation}\n`;
      if (formData.destinationLocation) msg += `• Punct de livrare: ${formData.destinationLocation}\n`;
    }

    if (formData.additionalServices?.length) {
      msg += `\n🔧 Servicii solicitate:\n`;
      formData.additionalServices.forEach(s => { msg += `• ${s}\n`; });
    }

    const templateParams = {
      name: formData.name,
      message: msg,
      time: new Date().toLocaleString('ro-RO'),
      title: 'Cerere de contact',
      to_email: EMAIL_CONFIG.CONTACT_EMAIL
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
};

// Send Career Form Email
export const sendCareerEmail = async (formData: CareerFormData): Promise<boolean> => {
  try {
    let careerMessage = `💼 APLICAȚIE CARIERĂ\n\n`;
    careerMessage += `👤 Informații Candidat:\n`;
    careerMessage += `• Nume: ${formData.name}\n`;
    careerMessage += `• Telefon: ${formData.phone}\n`;
    if (formData.message) careerMessage += `\n💬 Mesaj:\n${formData.message}\n`;
    if (formData.cvFile) careerMessage += `\n📄 CV atașat: ${formData.cvFile.name}\n`;

    const templateParams = {
      name: formData.name,
      message: careerMessage,
      time: new Date().toLocaleString('ro-RO'),
      title: 'Aplicație carieră',
      to_email: EMAIL_CONFIG.CAREER_EMAIL
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.CAREER_TEMPLATE_ID,
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error sending career email:', error);
    return false;
  }
};

// Handle file attachments (convert to base64 for EmailJS)
export const handleFileAttachment = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64.split(',')[1]); // Remove data:mime;base64, prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone format
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9\s\-+()]{7,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};
