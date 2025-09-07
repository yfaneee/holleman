# EmailJS Setup Guide

## 🚀 Quick Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Set Up Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps
5. **Copy the Service ID** (e.g., `service_abc123`)

### 3. Create Email Templates

#### Contact Form Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Template Name:** `template_contact`

**Subject:** `Cerere Contact - {{service_type}} - {{from_name}}`

**Content:**
```
Salut,

Ai primit o nouă cerere de contact prin site-ul Holleman:

===== INFORMAȚII CONTACT =====
Nume/Companie: {{from_name}}
Persoană contact: {{contact_person}}
Email: {{from_email}}
Telefon: {{phone}}
Website: {{website}}
Subiect: {{subject}}

===== DETALII SERVICIU =====
Tip serviciu: {{service_type}}
Descriere încărcătură: {{cargo_description}}
Dimensiuni: {{dimensions}}
Greutate: {{weight}}
Punct plecare: {{pickup_location}}
Destinație: {{destination_location}}
Termen livrare: {{delivery_date}}
Servicii adiționale: {{additional_services}}

===== MESAJ =====
{{message}}

===== CERINȚE SPECIALE =====
{{special_requirements}}

Trimis la: {{submission_date}}
```

#### Career Form Template
1. Create another template with name: `template_career`

**Subject:** `Aplicație Carieră - {{position}} - {{from_name}}`

**Content:**
```
Salut,

Ai primit o nouă aplicație pentru carieră:

===== INFORMAȚII CANDIDAT =====
Nume: {{from_name}}
Email: {{from_email}}
Telefon: {{phone}}
Poziția dorită: {{position}}

===== MESAJ =====
{{message}}

Trimis la: {{submission_date}}
```

### 4. Update Configuration
1. Go to **Account** in EmailJS dashboard
2. Copy your **Public Key**
3. Update the file `src/services/emailService.ts`:

```typescript
export const EMAIL_CONFIG = {
  SERVICE_ID: 'service_your_service_id', // Replace with your Service ID
  TEMPLATE_ID_CONTACT: 'template_contact',
  TEMPLATE_ID_CAREER: 'template_career', 
  PUBLIC_KEY: 'your_public_key', // Replace with your Public Key
  TEST_EMAIL: 'lucastefan.tomescu@gmail.com'
};
```

### 5. Test the Forms
1. Start your development server: `npm start`
2. Navigate to Contact page: `http://localhost:3000/contact`
3. Fill out and submit the form
4. Check your email inbox for the test email

### 6. Production Setup
When ready for production:
1. Change `TEST_EMAIL` to the actual business email
2. Consider upgrading EmailJS plan for higher limits
3. Add your production domain to EmailJS allowed origins

## 📧 Email Limits
- **Free Plan:** 200 emails/month
- **Personal Plan:** 1,000 emails/month ($15/month)
- **Team Plan:** 10,000 emails/month ($50/month)

## 🔧 Troubleshooting

### Common Issues:
1. **403 Forbidden:** Check your Public Key and Service ID
2. **Template not found:** Ensure template names match exactly
3. **CORS errors:** Add your domain to EmailJS allowed origins
4. **No emails received:** Check spam folder, verify email service connection

### Debug Mode:
Add this to test EmailJS connection:
```javascript
// Test in browser console
emailjs.send('your_service_id', 'template_contact', {
  to_email: 'test@example.com',
  from_name: 'Test User'
}).then(console.log).catch(console.error);
```

## 🎯 Next Steps
1. Set up the EmailJS account and get your credentials
2. Update the configuration in `emailService.ts`
3. Test both forms (Contact and Cariere)
4. Deploy and test in production environment

Your forms are now ready to send emails! 🚀
