# Contact Form Setup with Formspree

## 🎯 What is Formspree?

Formspree is a free form backend service that handles form submissions for static sites. It will:

- Send form submissions directly to your email
- No server-side code required
- SPAM protection included
- Free tier: 50 submissions/month
- GDPR compliant

## 🚀 Setup Instructions (5 minutes)

### Step 1: Create Formspree Account

1. Go to https://formspree.io/
2. Click "Get Started" or "Sign Up"
3. Sign up with your email (or use GitHub/Google)
4. Verify your email address

### Step 2: Create a New Form

1. After logging in, click "+ New Form"
2. Give your form a name: `Portfolio Contact Form`
3. Set the email address where you want to receive submissions: `akhavanjavid@gmail.com`
4. Click "Create Form"

### Step 3: Get Your Form Endpoint

After creating the form, you'll see your form endpoint URL:

```
https://formspree.io/f/YOUR_FORM_ID
```

Example: `https://formspree.io/f/xwpkvngl`

### Step 4: Update Your Code

1. Open the file: `src/modules/contact/components/ContactSection.tsx`
2. Find line 31: `const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';`
3. Replace `YOUR_FORM_ID` with your actual form ID
4. Save the file

Example:

```typescript
const formspreeEndpoint = 'https://formspree.io/f/xwpkvngl';
```

### Step 5: Test Your Form

1. Run `npm run dev` to start your development server
2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your email inbox - you should receive the message!

## 📧 What Happens When Someone Submits?

1. User fills out the contact form on your website
2. Form data is sent to Formspree
3. Formspree forwards the message to your email: `akhavanjavid@gmail.com`
4. You receive an email with:
   - Sender's name
   - Sender's email address
   - Their message
   - Date/time of submission
5. You can reply directly from your email

## 🎨 Customization Options

### Email Templates

In Formspree dashboard, you can customize:

- Email subject line
- Reply-to address
- Email template
- Auto-responder (send confirmation to the user)

### SPAM Protection

Formspree includes:

- reCAPTCHA integration (optional)
- Honeypot fields
- Rate limiting
- Email verification

### Notifications

Configure:

- Email notifications on/off
- Slack notifications
- Webhook integrations

## 🆓 Free vs Paid Plans

### Free Plan (Unlimited)

- ✅ 50 submissions per month
- ✅ Email notifications
- ✅ SPAM filtering
- ✅ HTTPS encryption
- ✅ File uploads (10MB)

### Gold Plan ($10/month)

- Everything in Free
- 1,000 submissions/month
- Custom email templates
- Auto-responders
- Zapier integration
- Remove Formspree branding

## 🔧 Alternative Solutions

If you prefer other services:

### 1. **Web3Forms** (Free)

- https://web3forms.com/
- 250 submissions/month free
- No account required
- Similar setup process

### 2. **Netlify Forms** (If using Netlify)

- Built into Netlify hosting
- 100 submissions/month free
- Just add `netlify` attribute to form

### 3. **EmailJS** (Free tier available)

- https://www.emailjs.com/
- Send emails directly from JavaScript
- 200 emails/month free

## ✅ Verification Checklist

Before deploying to production:

- [ ] Formspree account created
- [ ] Form endpoint obtained
- [ ] `YOUR_FORM_ID` replaced in code
- [ ] Test submission sent
- [ ] Confirmation email received
- [ ] Reply-to address works
- [ ] SPAM protection enabled (optional)
- [ ] Auto-responder configured (optional)

## 📝 Current Form Configuration

**Form Location:** `src/modules/contact/components/ContactSection.tsx`

**Form Fields:**

- Name (text, required)
- Email (email, required)
- Message (textarea, required)

**Form Features:**

- Loading state with spinner
- Success message (green)
- Error message (red)
- Auto-clear after success
- 5-second timeout for messages
- Disabled inputs during submission

## 🛠️ Troubleshooting

### Form not submitting?

1. Check browser console for errors
2. Verify form endpoint URL is correct
3. Ensure fetch API is available (modern browsers)
4. Check network tab in DevTools

### Not receiving emails?

1. Check Formspree dashboard for submissions
2. Verify email address in Formspree settings
3. Check spam/junk folder
4. Confirm email is verified in Formspree

### Getting 429 errors?

- You've exceeded the rate limit (50/month on free plan)
- Upgrade to Gold plan or wait for monthly reset
- Check for bots/spam causing excess submissions

## 📞 Support

- Formspree Docs: https://help.formspree.io/
- Formspree Support: support@formspree.io
- GitHub Issues: https://github.com/formspree/formspree

---

**Note:** After setting up Formspree, commit your changes and deploy to production. The form will work on both localhost and your live site.
