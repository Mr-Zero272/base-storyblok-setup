# 📘 Storyblok Project Setup – CLI Sync Workflow

> **A comprehensive guide for initializing and developing projects using Next.js, Storyblok, and Tailwind CSS.**
>
> 📖 **[Vietnamese Version](docs/README-VI.md)** | English

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Storyblok](https://img.shields.io/badge/Storyblok-CMS-0AB3AF?style=for-the-badge&logo=storyblok)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

---

## 📋 Table of Contents

- [1. Objective](#1-objective)
- [2. Tech Stack](#2-tech-stack)
- [3. Getting Started](#3-getting-started)
  - [3.1 Create Storyblok Account & Space](#31-create-storyblok-account--space)
  - [3.2 Install Source Project](#32-install-source-project)
  - [3.3 Configure Environment Variables](#33-configure-environment-variables)
  - [3.4 Configure CLI Scripts](#34-configure-cli-scripts)
- [4. Storyblok CLI & Sync](#4-storyblok-cli--sync)
  - [4.1 CLI Login](#41-cli-login)
  - [4.2 Push Components](#42-push-components)
- [5. Initialize Content](#5-initialize-content)
  - [5.1 Pages Folder Structure](#51-pages-folder-structure)
  - [5.2 Create Global Components](#52-create-global-components-header--footer)
- [6. Development Workflow](#6-development-workflow)
  - [6.1 Block Concepts](#61-block-concepts)
  - [6.2 Create New Schema](#62-create-new-schema)
  - [6.3 Field Types](#63-field-types)
  - [6.4 Coding Section](#64-coding-section)
- [7. Testing & Completion](#7-testing--completion)

---

## 1. Objective

This documentation guides you through the process of initializing a new project using:

- **Base source project**: Pre-configured Next.js + Tailwind setup.
- **Storyblok Space**: CMS for content management.
- **Storyblok CLI**: Tool to sync components (schemas) between code and CMS.

**Target Audience:** Frontend Developers.

---

## 2. Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/)
- **CMS**: [Storyblok](https://www.storyblok.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: Lucide React
- **Animation**: Motion (Framer Motion)

---

## 3. Getting Started

### 3.1 Create Storyblok Account & Space

1.  Login to **[Storyblok Dashboard](https://app.storyblok.com/)**.
2.  Create a **new Space** (Select _Create new space_).
3.  Navigate to: **Settings → General**.
4.  Get the important information:
    - 🔑 **Space ID**
    - 🔑 **Access Token** (Location: Settings -> Access Tokens -> Preview)

### 3.2 Install Source Project

Clone the project and install dependencies:

```bash
# Clone repository
git clone https://github.com/Mr-Zero272/base-storyblok-setup
cd base-storyblok-setup

# Install dependencies
npm install
```

### 3.3 Configure Environment Variables

Create `.env` file from the template:

```bash
cp .env.example .env
```

Open the `.env` file and update your Preview Token:

```properties
NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN=your_preview_token_here
```

### 3.4 Configure CLI Scripts

Update `package.json` to add your Space ID to CLI commands for faster synchronization.

Open `package.json` and find the `scripts` section, replace `<SPACE_ID>`:

```json
"scripts": {
  "sb:pull": "storyblok components pull -s 123456",
  "sb:types": "storyblok types generate -s 123456",
  "sb:push": "storyblok components push -s 123456",
  "sb:refresh": "npm run sb:pull && npm run sb:types"
}
```

> ⚠️ **Note:** `123456` is an example, use your actual Space ID.

---

## 4. Storyblok CLI & Sync

### 4.1 CLI Login

Install Storyblok CLI globally (if not already installed) and login:

```bash
# Install CLI
npm install -g @storyblok/cli

# Login
storyblok login

# Check current user
storyblok user
```

### 4.2 Push Components

First, rename the folder `290198001730778` in `.storyblok/components` to your `space_id`. For example `.storyblok/components/123456`. (This allows you to copy schemas from code to Space without needing access permissions)

Push the entire Component (Schema) structure from code to the new Space:

```bash
npm run sb:push
```

**Effects:**

- Syncs all Block Schemas from the `.storyblok` directory to CMS.
- Provides you with ready-to-use Blocks for content creation immediately.

### 4.3 Clean up

After pushing, run the following command to update components and types:

```bash
npm run sb:refresh
```

Open the .storyblok/types folder and delete folders other than `290198001730778` which is the types folder of the base space.

### 4.4 Update Type Path

In the `src/types/index.ts` file, update the path to the types folder of the new space. For example: export type \* from `../../.storyblok/types/<YOUR_SPACE_ID>/storyblok-components`

---

## 5. Initialize Content

Since the CLI cannot clone Content (Stories), you need to manually create the basic structure on the Dashboard.

### 5.1 Pages Folder Structure

1.  Go to the **Content** tab.
2.  Create a new **Folder**:
    - **Name**: `Pages`
    - **Slug**: `pages` (⚠️ **Important**: Keep this slug for proper routing).
    - **Content Type**: `Root` (default).
3.  Enter the newly created `Pages` folder, create a new **Story**:
    - **Name**: `Home`
    - **Slug**: `home`
    - **Content Type**: `Page`
4.  **Edit Home**:
    - Add a **Hero** block to the body.
    - Fill in sample content and click **Publish**.

### 5.2 Create Global Components (Header & Footer)

1.  Return to **Content** (Root).
2.  Create a new **Folder**:
    - **Name**: `Global`
    - **Slug**: `global` (⚠️ **Important**).
3.  Enter the `Global` folder, create 2 Stories:
    - **Header**:
      - Name: `header`
      - Slug: `header`
      - Content Type: `header`
      - Publish.
    - **Footer**:
      - Name: `footer`
      - Slug: `footer`
      - Content Type: `footer`
      - Publish.

---

## 6. Development Workflow

### 6.1 Block Concepts

- **Nestable Block**: Blocks that can be nested within other blocks (e.g., `Grid`, `Column`).
- **Content Type**: Standalone blocks with their own URL (e.g., `Page`, `Header`, `Footer`).
- **Universal Block**: A combination of both types above.

💡 **Best Practice**:

- Landing pages should be composed of **Section Blocks** (e.g., `Hero`, `Features`, `Testimonials`).
- Smaller components (Button, Card) should be sub-blocks or fields within Section Blocks.

### 6.2 Create New Schema

1.  Go to **Block Library** on the Dashboard.
2.  Create a **New Block** -> Name it (Technical Name: snake_case, e.g., `feature_section`).
3.  Add necessary fields (Title, Description, Image...).
4.  Save.

### 6.3 Common Field Types

| Type              | Description                             |
| :---------------- | :-------------------------------------- |
| **Text**          | Short text string.                      |
| **Rich Text**     | Formatted text, supports nested blocks. |
| **Asset**         | Images, Videos, Files.                  |
| **Boolean**       | True/False (Toggle).                    |
| **Link**          | Internal or External link.              |
| **Blocks**        | Allows nesting other blocks.            |
| **Single-Option** | Select one value (Dropdown/Radio).      |

### 6.4 Coding Section

After creating a Schema on Storyblok:

1.  **Pull Components & Generate Types**:

    ```bash
    npm run sb:refresh
    ```

    _(This command pulls the new schema and updates TypeScript definition files)_

2.  **Create React Component**:
    Create file `src/components/sections/feature_section.tsx`:

    ```tsx
    import { storyblokEditable } from '@storyblok/react';
    import { FeatureSectionStoryblok } from '@/types/component-types-sb'; // Auto-generated types

    interface FeatureSectionProps {
      blok: FeatureSectionStoryblok;
    }

    const FeatureSection = ({ blok }: FeatureSectionProps) => {
      return (
        <section {...storyblokEditable(blok)} className="py-10">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold">{blok.title}</h2>
            <p>{blok.description}</p>
            {/* Render other fields */}
          </div>
        </section>
      );
    };

    export default FeatureSection;
    ```

3.  **Map Component**:
    Register the new component in `src/lib/storyblok/api.ts` or wherever component mapping is managed.

---

## 7. Cache Architecture

This project uses a cache invalidation architecture based on Storyblok webhooks.
When a story is published or unpublished in Storyblok, a webhook is sent to the Next.js API route `src/app/api/revalidate/route.ts`.
This API route then revalidates the cache for the specific story that was published or unpublished.
In dev mode, the webhook is not triggered, so you need to manually revalidate the cache by the get request to `http://localhost:3000/api/revalidate?slug=<SLUG>` or edit the revalidate time parameter in `src/lib/storyblok-cached.ts`.

## 8. Testing & Completion

Start the local project to check the results:

```bash
npm run dev
```

Visit `http://localhost:3000`. If configured correctly:

- ✅ Homepage displays content from `Pages/Home`.
- ✅ Header/Footer display from `Global`.
- ✅ No console errors related to missing components.

---

> **Support:** If you encounter any issues, please contact through internal channels or check the [Storyblok Documentation](https://www.storyblok.com/docs/api/content-delivery).
