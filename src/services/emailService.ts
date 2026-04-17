import emailjs from '@emailjs/browser';

// EmailJS Configuration
export const EMAIL_CONFIG = {
  SERVICE_ID: 'service_byifmce',
  TEMPLATE_ID: 'template_wn8nx5o',
  CAREER_TEMPLATE_ID: 'template_wn8nx5o',
  PUBLIC_KEY: 'xHGsEHYrhp3USGZWM',
  CONTACT_EMAIL: 'sales@holleman.ro',
  CAREER_EMAIL: 'hr@holleman.ro',
};

// Strapi Configuration
const STRAPI_URL =
  process.env.REACT_APP_STRAPI_URL ||
  'https://holleman-cms-production.up.railway.app';
const STRAPI_UPLOAD_TOKEN = process.env.REACT_APP_STRAPI_UPLOAD_TOKEN || '';

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

// Upload a CV file to Strapi's media library and return its public URL.
// Returns null if the upload fails (the email is still sent without the link).
export const uploadCvToStrapi = async (file: File): Promise<string | null> => {
  try {
    const body = new FormData();
    body.append('files', file);

    const headers: HeadersInit = {};
    if (STRAPI_UPLOAD_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_UPLOAD_TOKEN}`;
    }

    const res = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers,
      body,
    });

    if (!res.ok) {
      console.error('Strapi CV upload failed:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const uploaded = data[0];
    if (!uploaded?.url) return null;

    const rawUrl = uploaded.url.startsWith('http')
      ? uploaded.url
      : `${STRAPI_URL}${uploaded.url}`;

    // Cloudinary stores non-image files (PDF, DOC, DOCX) under /image/upload/
    // but they must be served from /raw/upload/ to be directly downloadable.
    return rawUrl.replace(
      /res\.cloudinary\.com\/([^/]+)\/image\/upload\//,
      'res.cloudinary.com/$1/raw/upload/'
    );
  } catch (err) {
    console.error('Error uploading CV to Strapi:', err);
    return null;
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

    if (formData.cvFile) {
      const cvUrl = await uploadCvToStrapi(formData.cvFile);
      if (cvUrl) {
        careerMessage += `\n📄 CV: ${cvUrl}\n`;
      } else {
        careerMessage += `\n📄 CV (upload eșuat): ${formData.cvFile.name}\n`;
      }
    }

    const templateParams = {
      name: formData.name,
      message: careerMessage,
      time: new Date().toLocaleString('ro-RO'),
      title: 'Aplicație carieră',
      to_email: EMAIL_CONFIG.CAREER_EMAIL,
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
