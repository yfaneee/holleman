import emailjs from 'emailjs-com';

// EmailJS Configuration
// These will need to be set up in your EmailJS dashboard
export const EMAIL_CONFIG = {
  SERVICE_ID: 'service_byifmce', // Your EmailJS Service ID
  TEMPLATE_ID: 'template_wn8nx5o', // Your EmailJS template ID
  PUBLIC_KEY: 'xHGsEHYrhp3USGZWM', // Your EmailJS Public Key
  TEST_EMAIL: 'lucastefan.tomescu@gmail.com'
};

// Initialize EmailJS
emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

// Contact Form Data Interface
export interface ContactFormData {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  website?: string;
  subject?: string;
  message?: string;
  // Service-specific fields
  serviceType?: string;
  cargoDescription?: string;
  dimensions?: string;
  weight?: string;
  pickupLocation?: string;
  destinationLocation?: string;
  deliveryDate?: string;
  additionalServices?: string[];
  specialRequirements?: string;
  files?: FileList | null;
}

// Career Form Data Interface
export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  phonePrefix: string;
  position: string;
  message?: string;
  cvFile?: File | null;
}

// Send Contact Form Email
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Format message for the pre-built template
    let detailedMessage = `📧 CERERE DE CONTACT\n\n`;
    detailedMessage += `👤 Informații Contact:\n`;
    detailedMessage += `• Nume/Companie: ${formData.name}\n`;
    detailedMessage += `• Persoană contact: ${formData.contactPerson}\n`;
    detailedMessage += `• Email: ${formData.email}\n`;
    detailedMessage += `• Telefon: ${formData.phone}\n`;
    if (formData.website) detailedMessage += `• Website: ${formData.website}\n`;
    
    if (formData.serviceType) {
      detailedMessage += `\n🚛 Detalii Serviciu: ${formData.serviceType}\n`;
      if (formData.cargoDescription) detailedMessage += `• Descriere: ${formData.cargoDescription}\n`;
      if (formData.dimensions) detailedMessage += `• Dimensiuni: ${formData.dimensions}\n`;
      if (formData.weight) detailedMessage += `• Greutate: ${formData.weight}\n`;
      if (formData.pickupLocation) detailedMessage += `• Plecare: ${formData.pickupLocation}\n`;
      if (formData.destinationLocation) detailedMessage += `• Destinație: ${formData.destinationLocation}\n`;
      if (formData.deliveryDate) detailedMessage += `• Termen: ${formData.deliveryDate}\n`;
      if (formData.additionalServices?.length) detailedMessage += `• Servicii extra: ${formData.additionalServices.join(', ')}\n`;
    }
    
    if (formData.subject) detailedMessage += `\n📋 Subiect: ${formData.subject}\n`;
    if (formData.message) detailedMessage += `\n💬 Mesaj:\n${formData.message}\n`;
    if (formData.specialRequirements) detailedMessage += `\n⚠️ Cerințe speciale:\n${formData.specialRequirements}\n`;

    // Template parameters matching the pre-built structure
    const templateParams = {
      name: formData.name,
      message: detailedMessage,
      time: new Date().toLocaleString('ro-RO'),
      title: formData.serviceType || formData.subject || 'Cerere de contact',
      to_email: EMAIL_CONFIG.TEST_EMAIL
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
    // Format message for the pre-built template
    let careerMessage = `💼 APLICAȚIE CARIERĂ\n\n`;
    careerMessage += `👤 Informații Candidat:\n`;
    careerMessage += `• Nume: ${formData.name}\n`;
    careerMessage += `• Email: ${formData.email}\n`;
    careerMessage += `• Telefon: ${formData.phonePrefix} ${formData.phone}\n`;
    careerMessage += `• Poziția dorită: ${formData.position}\n`;
    
    if (formData.message) {
      careerMessage += `\n💬 Mesaj candidat:\n${formData.message}\n`;
    }
    
    if (formData.cvFile) {
      careerMessage += `\n📄 CV atașat: ${formData.cvFile.name}\n`;
    }

    // Template parameters matching the pre-built structure
    const templateParams = {
      name: formData.name,
      message: careerMessage,
      time: new Date().toLocaleString('ro-RO'),
      title: `Aplicație pentru poziția: ${formData.position}`,
      to_email: EMAIL_CONFIG.TEST_EMAIL
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
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
  const phoneRegex = /^[0-9\s\-\+\(\)]{7,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};
