# 🎯 Setup Guide - "Secure My Spot" Feature

## What Was Added

✅ **"Secure My Spot" button** on each course card  
✅ **Modal** to collect user details (Name, Email, Phone, Message)  
✅ **Email notification** to admin with user info  
✅ **Success message** confirmation to user  

---

## 🔧 Setup Instructions

### Step 1: Update Admin Email

Edit `src/components/SecureSpotModal.js` line 18:

```javascript
// CHANGE THIS to your admin email
const ADMIN_EMAIL = 'your-admin-email@gmail.com';
```

Replace with your actual admin email!

---

### Step 2: Setup EmailJS

EmailJS is already installed (`@emailjs/browser`). Now configure it:

#### **2a. Get Your EmailJS Credentials**

1. Go to: https://www.emailjs.com
2. Click **"Sign Up Free"**
3. Create account (or login if you have one)
4. Go to **"Email Services"** → **"Add Service"**
5. Choose **"Gmail"** (or your email provider)
6. Follow setup steps to connect your email
7. Go to **"Templates"** → **"Create New Template"**

#### **2b. Create Email Template**

Create a template with these variables:

```
Subject: New Course Enrollment Request

Hello Admin,

New enrollment request received!

User Details:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Course: {{course_name}}
Price: {{course_price}}

Message: {{message}}

Admin Note: {{admin_note}}

Best regards,
KP Consultancy System
```

#### **2c. Get Your IDs**

1. In EmailJS Dashboard, go to **"Settings"** (top right)
2. Copy your **Service ID**
3. Click on your **Template**, copy **Template ID**
4. Go to **"Account"** tab, copy **Public Key**

---

### Step 3: Add EmailJS IDs to Your Code

Edit `src/components/SecureSpotModal.js` around line 46:

```javascript
await emailjs.send(
  'service_YOUR_SERVICE_ID',      // ← Replace with your Service ID
  'template_YOUR_TEMPLATE_ID',     // ← Replace with your Template ID
  templateParams
);
```

#### **Also Initialize EmailJS** (add at top of Courses.js):

```javascript
import emailjs from '@emailjs/browser';

// Initialize EmailJS (add this once at app start)
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your Public Key
```

---

## 📧 How It Works

### **User Flow:**

1. User clicks **"SECURE MY SPOT"** on course card
2. Modal appears with form
3. User enters:
   - Full Name
   - Email
   - Phone
   - Optional Message
4. User clicks **"Secure My Spot"**
5. Details sent to admin email
6. Success message shows: **"Admin will contact you soon"**
7. Modal closes automatically

### **Admin Gets:**

- User name
- User email
- User phone
- Course name
- Course price
- Any message from user

---

## ✅ What You Need to Do

### Quick Checklist:

- [ ] Create EmailJS account (https://emailjs.com)
- [ ] Setup Gmail or email service in EmailJS
- [ ] Create email template with variables
- [ ] Copy Service ID, Template ID, Public Key
- [ ] Update `ADMIN_EMAIL` in SecureSpotModal.js
- [ ] Add EmailJS IDs to code
- [ ] Test "Secure My Spot" button
- [ ] You should receive test email

---

## 🧪 Test It

1. Go to your app: `http://localhost:3000`
2. Click "Secure My Spot" on any course
3. Fill in form with test data
4. Click "Secure My Spot"
5. Check your email inbox! 📧

---

## 📱 Optional: Add SMS Notifications

If you want to also send **SMS to admin**:

1. Install Twilio: `npm install twilio`
2. Get Twilio API keys
3. Update SecureSpotModal.js to send SMS too

(Currently, just email is set up)

---

## 🐛 Troubleshooting

### "EmailJS not configured"
- Make sure `emailjs.init()` is called
- Check Public Key is correct

### "Email not sending"
- Verify Service ID and Template ID
- Check Gmail is connected in EmailJS
- Verify template variables match code

### "Modal not showing"
- Check SecureSpotModal.js is imported
- Verify button onClick is working

---

## 📞 Admin Contact Setup

The system will automatically show user's contact info in success message:

```
Admin will contact you on:
📧 user@email.com
📱 +1-555-0000
```

---

## 🎯 Files Modified/Created

| File | Status |
|------|--------|
| `src/components/SecureSpotModal.js` | ✨ Created |
| `src/styles/SecureSpotModal.css` | ✨ Created |
| `src/components/Courses.js` | ✏️ Updated |
| `src/App.css` | ✏️ Updated |

---

## 🚀 Next Steps

1. Setup EmailJS account
2. Get your IDs
3. Update code with IDs
4. Test the feature
5. You're done! 🎉

---

## 📚 Resources

- EmailJS Docs: https://www.emailjs.com/docs
- EmailJS Console: https://console.emailjs.com
- Gmail Setup Guide: https://www.emailjs.com/docs/server/gmail

---

**Questions? Check EmailJS documentation or reach out!** 💬
