# MailMint

MailMint is a modern, AI-powered email template builder and management platform. It empowers users to rapidly create, customize, and send beautiful emails—leveraging a drag-and-drop editor, AI-generated content, and seamless integration with Google OAuth and Gmail. With persistent storage, collaborative features, and a focus on usability, MailMint is the ultimate toolkit for marketers, developers, and teams who want to supercharge their email workflows.

---

## 🚀 Features

- **AI Email Generation**: Instantly generate email templates using natural language prompts powered by Gemini AI.
- **Drag-and-Drop Editor**: Visually compose emails with a flexible, component-based editor—no coding required.
- **Template Management**: Save, update, and organize your email templates in a personalized dashboard.
- **Send Emails**: Deliver your crafted emails directly via Gmail SMTP, with support for multiple recipients.
- **Rich Component Library**: Buttons, images, logos, dividers, headings, social icons, and more—customizable via intuitive settings panels.
- **Responsive Design**: Preview and edit templates for both desktop and mobile views.
- **Google OAuth**: Secure authentication and personalized experience for every user.
- **Persistent State**: User data and templates are stored in the cloud and cached locally for fast access.
- **Convex Backend**: Real-time data storage, queries, and mutations for users and templates.
- **Modern UI/UX**: Built with Next.js, Tailwind CSS, and a suite of custom React components.
- **Accessible \& Performant**: Designed for speed, accessibility, and ease of use.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Lucide React Icons
- **Backend**: Next.js API Routes, [Convex](https://convex.dev/) (serverless database \& functions)
- **AI Integration**: Gemini 2.0 Pro (Google Generative AI)
- **Authentication**: Google OAuth 2.0
- **Email Delivery**: Nodemailer + Gmail SMTP
- **State Management**: React Context API
- **Image Optimization**: Next.js `<Image />`
- **Notifications**: shadcn/ui Toaster
- **Persistence**: localStorage + Convex

---

## 📁 Project Structure

```plaintext
MailMint/
├── app/
│   ├── (main)/
│   │   ├── dashboard/
│   │   │   ├── create/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── editor/[templateId]/page.tsx
│   ├── api/
│   │   ├── aiemailgenerator/route.ts
│   │   └── sendemail/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── provider.tsx
├── components/
│   ├── settings/
│   │   ├── ColourPickerField.tsx
│   │   ├── DropdownField.tsx
│   │   ├── ImagePreview.tsx
│   │   ├── InputField.tsx
│   │   ├── InputStyleField.tsx
│   │   ├── SliderField.tsx
│   │   ├── TextAreaField.tsx
│   │   └── ToggleGroupField.tsx
│   ├── ai/
│   │   └── AIinputBox.tsx
│   ├── editor/
│   │   ├── Canvas.tsx
│   │   ├── EditorHeader.tsx
│   │   ├── ElementsSideBar.tsx
│   │   ├── Settings.tsx
│   │   └── ViewHtmlDialog.tsx
│   ├── elements/
│   │   ├── ButtonComponent.tsx
│   │   ├── DividerComponent.tsx
│   │   ├── ImageComponent.tsx
│   │   ├── LogoComponent.tsx
│   │   ├── LogoHeaderComponent.tsx
│   │   ├── SocialIconsComponent.tsx
│   │   └── TextComponent.tsx
│   ├── layouts/
│   │   └── ColumnLayout.tsx
│   ├── EmailTemplateList.tsx
│   ├── ElementLayoutCard.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── SendEmail.tsx
│   └── SignInButton.tsx
├── convex/
│   ├── generated/
│   │   ├── api.ts
│   │   └── server.ts
│   ├── schema.ts
│   ├── users.ts
│   └── emailtemplate.ts
├── contexts/
│   ├── DragDropLayoutContext.tsx
│   ├── EmailTemplateContext.tsx
│   ├── HtmlCodeContext.tsx
│   └── ScreenSizeContext.tsx
├── lib/
│   └── GenerateEmailTemplateAIModel.ts
└── ... (config, public, etc.)
```


---

## 🧩 Key Components \& Contexts

### **Settings Components**

- **ColourPickerField**: Color input for style customization.
- **DropdownField**: Select dropdown for property choices.
- **ImagePreview**: Live preview and URL input for images.
- **InputField**: Standard text input.
- **InputStyleField**: Numeric input with units (e.g., px).
- **SliderField**: Range slider for numeric values.
- **TextAreaField**: Multiline text input.
- **ToggleGroupField**: Icon-based toggle group for style options.


### **Editor \& Element Components**

- **AIinputBox**: Prompt-based AI template generation.
- **Canvas**: Drag-and-drop workspace for building emails.
- **EditorHeader**: Editor top bar with navigation, preview, and actions.
- **ElementsSideBar**: List of draggable elements/layouts.
- **Settings**: Dynamic panel for editing selected element’s properties.
- **ViewHtmlDialog**: Modal to view and copy generated HTML.
- **EmailTemplateList**: Dashboard list of user templates.
- **SendEmail**: Dialog to send the current template as an email.
- **ElementLayoutCard**: Visual card for layouts/elements.
- **Header \& Hero**: App branding and landing page hero section.
- **SignInButton**: Google OAuth login.


### **Element Library**

- **ButtonComponent**: Styled button with link.
- **DividerComponent**: Customizable horizontal rule.
- **ImageComponent**: Optimized image display.
- **LogoComponent**: Logo image.
- **LogoHeaderComponent**: Header logo.
- **SocialIconsComponent**: (Stub) for social icons.
- **TextComponent**: Styled heading/text.


### **Layout**

- **ColumnLayout**: Flexible columnar layout for arranging elements. Handles drag-and-drop, selection, reordering, and deletion.


### **Context Providers**

- **DragDropLayoutContext**: Manages drag-and-drop state and logic.
- **EmailTemplateContext**: Manages the current template’s state.
- **HtmlCodeContext**: Stores and updates generated HTML.
- **ScreenSizeContext**: Tracks and updates screen size for responsive editing.

---

## 🗄️ Backend \& Data Model

### **Convex Schema**

- **users**
    - `name`: string
    - `email`: string (unique)
    - `picture`: string (profile image)
    - `credits`: number (AI usage credits)
- **emailTemplates**
    - `tid`: string (template ID)
    - `design`: object (template design)
    - `description`: string/object
    - `email`: string (user email)


### **Convex Functions**

- **users.ts**
    - `CreateUser`: Adds a new user if not already present.
- **emailtemplate.ts**
    - `SaveTemplate`: Stores a new email template.
    - `GetTemplateDesign`: Fetches a template by ID and user.
    - `UpdateTemplateDesign`: Updates a template’s design.
    - `GetAllUserTemplate`: Lists all templates for a user.
    - `DeleteTemplate`: Removes a template.

---

## 🔌 API Endpoints

### **/api/aiemailgenerator**

- **POST**: `{ prompt: string }`
- Uses Gemini AI to generate a template from a prompt.
- Returns: `{ template: object }` or error.


### **/api/sendemail**

- **POST**: `{ emails: string, subject: string, message: string }`
- Sends the provided HTML message to one or more recipients via Gmail SMTP.
- Returns: `{ success: boolean, message: string }` or error.

---

## 🚦 Getting Started

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/MailMint.git
cd MailMint
```


### **2. Install Dependencies**

```bash
npm install
# or
yarn install
```


### **3. Configure Environment Variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_KEY=your_google_client_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
NEXT_PUBLIC_CONVEX_URL=your_convex_url
GEMINI_API_KEY=your_gemini_api_key
```


### **4. Run the Development Server**

```bash
npm run dev
npm convex dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📝 Usage Guide

### **Sign In**

- Click "Sign in with Google" on the landing page.


### **Create a Template**

- Go to Dashboard → "Create New Template".
- Use the AI input box to describe your desired email, or (soon) start from scratch.


### **Edit a Template**

- Drag elements from the sidebar into the canvas.
- Select elements to customize their style/content in the settings panel.
- Preview your email in desktop/mobile mode.


### **Save \& Manage Templates**

- Click "Save" in the editor header.
- View, edit, or delete templates from your dashboard.


### **Send an Email**

- In the editor, click "Send Email".
- Enter recipient emails and subject, then send.


### **Export HTML**

- Use the "View HTML" option in the editor to copy the generated HTML code.

---

## ✨ Customization \& Extensibility

- **Add New Elements**: Extend the `/components/elements` directory.
- **Update AI Model**: Modify `/lib/GenerateEmailTemplateAIModel.ts` for prompt engineering or model upgrades.
- **Integrate More Providers**: Add new OAuth or SMTP providers as needed.
- **Theme \& Styles**: Customize Tailwind config or add your own CSS.

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request



---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Convex](https://convex.dev/)
- [Google Generative AI](https://ai.google.dev/)
- [Nodemailer](https://nodemailer.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 💡 Screenshots

> _Add screenshots or GIFs of your dashboard, editor, and AI generation here for extra polish!_

---

## 📬 Contact

For questions, feature requests, or support, please open an issue or contact [yashverma297555@gmail.com](mailto:yashverma297555@gmail.com).

---

**Happy Email Building with MailMint!** 🚀



