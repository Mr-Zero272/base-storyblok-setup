# 📘 Storyblok Project Setup – CLI Sync Workflow

> **Tài liệu hướng dẫn quy trình khởi tạo và phát triển dự án sử dụng Next.js, Storyblok và Tailwind CSS.**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Storyblok](https://img.shields.io/badge/Storyblok-CMS-0AB3AF?style=for-the-badge&logo=storyblok)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

---

## 📋 Mục lục

- [1. Mục tiêu](#1-mục-tiêu)
- [2. Công nghệ sử dụng](#2-công-nghệ-sử-dụng)
- [3. Chuẩn bị trước khi bắt đầu](#3-chuẩn-bị-trước-khi-bắt-đầu)
  - [3.1 Tạo tài khoản & Space Storyblok](#31-tạo-tài-khoản--space-storyblok)
  - [3.2 Cài đặt Source Project](#32-cài-đặt-source-project)
  - [3.3 Cấu hình biến môi trường](#33-cấu-hình-biến-môi-trường)
  - [3.4 Cấu hình CLI Scripts](#34-cấu-hình-cli-scripts)
- [4. Storyblok CLI & Sync](#4-storyblok-cli--sync)
  - [4.1 Đăng nhập CLI](#41-đăng-nhập-cli)
  - [4.2 Push Components](#42-push-components)
  - [4.3 Clean Up](#43-clean-up)
  - [4.4 Cập nhật đường dẫn Type](#44-cập-nhật-lại-đường-dẫn-type)
- [5. Khởi tạo Content](#5-khởi-tạo-content)
  - [5.1 Cấu trúc thư mục Pages](#51-cấu-trúc-thư-mục-pages)
  - [5.2 Tạo Global Components (Header & Footer)](#52-tạo-global-components-header--footer)
- [6. Quy trình phát triển (Workflow)](#6-quy-trình-phát-triển-workflow)
  - [6.1 Concept Block](#61-concept-block)
  - [6.2 Tạo Schema Mới](#62-tạo-schema-mới)
  - [6.3 Field Types phổ biến](#63-field-types-phổ-biến)
  - [6.4 Coding Section](#64-coding-section)
- [7. Kiến trúc Cache](#7-kiến-trúc-cache)
- [8. Setup Webhook trong Storyblok Dashboard](#8-setup-webhook)
- [9. Kiểm tra & Hoàn tất](#9-kiểm-tra--hoàn-tất)

---

## 1. Mục tiêu

Tài liệu này hướng dẫn quy trình khởi tạo một project mới sử dụng:

- **Base source project**: Next.js + Tailwind setup sẵn.
- **Storyblok Space**: CMS quản lý nội dung.
- **Storyblok CLI**: Công cụ đồng bộ components (schema) giữa code và CMS.

**Đối tượng:** Frontend Developer.

---

## 2. Công nghệ sử dụng

- **Framework**: [Next.js 15+](https://nextjs.org/)
- **CMS**: [Storyblok](https://www.storyblok.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: Lucide React
- **Animation**: Motion (Framer Motion)

---

## 3. Chuẩn bị trước khi bắt đầu

### 3.1 Tạo tài khoản & Space Storyblok

1.  Đăng nhập vào **[Storyblok Dashboard](https://app.storyblok.com/)**.
2.  Tạo một **Space mới** (Chọn _Create new space_).
3.  Truy cập: **Settings → General**.
4.  Lấy các thông tin quan trọng:
    - 🔑 **Space ID**
    - 🔑 **Access Token** (Location: Settings -> Access Tokens -> Preview)

### 3.2 Cài đặt Source Project

Clone project và cài đặt dependencies:

```bash
# Clone repository
git clone https://github.com/Mr-Zero272/base-storyblok-setup
cd base-storyblok-setup

# Install dependencies
npm install
```

### 3.3 Cấu hình biến môi trường

Tạo file `.env` từ file mẫu:

```bash
cp .env.example .env
```

Mở file `.env` và cập nhật Preview Token của bạn:

```properties
NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN=your_preview_token_here
```

### 3.4 Cấu hình CLI Scripts

Cập nhật `package.json` để thêm Space ID vào các lệnh CLI, giúp việc đồng bộ nhanh chóng hơn.

Mở `package.json` và tìm phần `scripts`, thay thế `<SPACE_ID>`:

```json
"scripts": {
  "sb:pull": "storyblok components pull -s 123456",
  "sb:types": "storyblok types generate -s 123456",
  "sb:push": "storyblok components push -s 123456",
  "sb:refresh": "npm run sb:pull && npm run sb:types"
}
```

> ⚠️ **Lưu ý:** `123456` là ví dụ, hãy điền Space ID thực tế của bạn.

---

## 4. Storyblok CLI & Sync

### 4.1 Đăng nhập CLI

Cài đặt Storyblok CLI global (nếu chưa có) và đăng nhập:

```bash
# Cài đặt CLI
npm install -g @storyblok/cli

# Đăng nhập
storyblok login

# Kiểm tra user hiện tại
storyblok user
```

### 4.2 Push Components

Trước tiên bạn cần đổi tên folder `290198001730778` trong `.storyblok/components` thành `space_id` của bạn. Ví dụ `.storyblok/components/123456`. (Cách này giúp ta không cần quyền truy cập vẫn có thể copy các schema từ code lên Space)

Đẩy toàn bộ cấu trúc Components (Schema) từ code lên Space mới:

```bash
npm run sb:push
```

**Tác dụng:**

- Đồng bộ tất cả Block Schema từ thư mục `.storyblok` lên CMS.
- Giúp bạn có sẵn các Blocks để tạo nội dung ngay lập tức.

### 4.3 Clean up

Sau khi push xong, chạy lệnh sau, để cập nhật lại component và types:

```bash
npm run sb:refresh
```

Mở folder .storyblok/types và xóa folder không phải là `290198001730778` đây là folder types của space base.

### 4.4 Cập nhật lại đường dẫn type

Trong file `src/types/index.ts` cập nhật lại đường dẫn đến folder types của space mới. Ví dụ export type \* from `../../.storyblok/types/<YOUR_SPACE_ID>/storyblok-components`

---

## 5. Khởi tạo Content

Do CLI không clone được Content (Stories), bạn cần tạo cấu trúc cơ bản thủ công trên Dashboard.

### 5.1 Cấu trúc thư mục Pages

1.  Vào tab **Content**.
2.  Tạo **Folder** mới:
    - **Name**: `Pages`
    - **Slug**: `pages` (⚠️ **Quan trọng**: Giữ nguyên slug này để routing hoạt động đúng).
    - **Content Type**: `Root` (default).
3.  Vào folder `Pages` vừa tạo, tạo **Story** mới:
    - **Name**: `Home`
    - **Slug**: `home`
    - **Content Type**: `Page`
4.  **Edit Home**:
    - Thêm block **Hero** vào body.
    - Điền nội dung mẫu và nhấn **Publish**.

### 5.2 Tạo Global Components (Header & Footer)

1.  Quay lại **Content** (Root).
2.  Tạo **Folder** mới:
    - **Name**: `Global`
    - **Slug**: `global` (⚠️ **Quan trọng**).
3.  Vào folder `Global`, tạo 2 Stories:
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

## 6. Quy trình phát triển (Workflow)

### 6.1 Concept Block

- **Nestable Block**: Block có thể lồng vào block khác (VD: `Grid`, `Column`).
- **Content Type**: Block đứng độc lập, có URL riêng (VD: `Page`, `Header`, `Footer`).
- **Universal Block**: Kết hợp cả 2 loại trên.

💡 **Best Practice**:

- Landing page nên được cấu thành từ các **Section Blocks** (VD: `Hero`, `Features`, `Testimonials`).
- Các thành phần nhỏ hơn (Button, Card) nên là sub-blocks hoặc fields trong Section Block.

### 6.2 Tạo Schema Mới

1.  Vào **Block Library** trên Dashboard.
2.  Tạo **New Block** -> Đặt tên (Technical Name: snake_case, VD: `feature_section`).
3.  Thêm các fields cần thiết (Title, Description, Image...).
4.  Lưu lại.

### 6.3 Field Types phổ biến

| Type              | Mô tả                                     |
| :---------------- | :---------------------------------------- |
| **Text**          | Chuỗi ký tự ngắn.                         |
| **Rich Text**     | Văn bản có định dạng, hỗ trợ lồng blocks. |
| **Asset**         | Hình ảnh, Video, File.                    |
| **Boolean**       | Đúng/Sai (Toggle).                        |
| **Link**          | Internal hoặc External link.              |
| **Blocks**        | Cho phép lồng các blocks khác vào (Nest). |
| **Single-Option** | Chọn 1 giá trị (Dropdown/Radio).          |

### 6.4 Coding Section

Sau khi tạo Schema trên Storyblok:

1.  **Pull Components & Generate Types**:

    ```bash
    npm run sb:refresh
    ```

    _(Lệnh này sẽ pull schema mới về và cập nhật file TypeScript definition)_

2.  **Tạo Component React**:
    Tạo file `src/components/sections/feature_section.tsx`:

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
    Đăng ký component mới trong `src/lib/storyblok/api.ts` hoặc nơi quản lý mapping.

---

## 7. Kiến trúc Cache

Project này sử dụng kiến trúc invalidation cache dựa trên Storyblok webhooks.
Khi một story được publish hoặc unpublish trong Storyblok, một webhook sẽ được gửi đến API route `src/app/api/revalidate/route.ts`.
API route này sau đó sẽ revalidate cache cho story cụ thể đã được publish hoặc unpublish.
Trong dev mode, webhook không được trigger, vì vậy bạn cần revalidate cache thủ công bằng cách GET request đến `http://localhost:3000/api/revalidate?slug=<SLUG>` hoặc chỉnh sửa tham số revalidate time trong `src/lib/storyblok-cached.ts`.

## 8. Setup Webhook trong Storyblok Dashboard

1. Vào tab **Settings** trong Storyblok.
2. Click vào **Webhooks** ở thanh bên trái.
3. Click vào **New Webhook**.
4. Nhập URL webhook: `http://yourdomain.com/api/revalidate`. (Lưu ý: webhook không hoạt động trong localhost)
5. Chọn các sự kiện bạn muốn trigger webhook: **Story Published**, **Story Unpublished**, **Story Created**, **Story Updated**.
6. Click vào **Create Webhook**.

> Bạn có thể setup phần này sau khi hoàn thành và deploy lên domain.

## 9. Kiểm tra & Hoàn tất

Khởi chạy project local để kiểm tra kết quả:

```bash
npm run dev
```

Truy cập `http://localhost:3000`. Nếu cài đặt đúng:

- ✅ Trang chủ hiển thị nội dung từ `Pages/Home`.
- ✅ Header/Footer hiển thị từ `Global`.
- ✅ Không có lỗi console liên quan đến thiếu component.

---

> **Hỗ trợ:** Nếu gặp vấn đề, vui lòng liên hệ thông qua kênh nội bộ hoặc kiểm tra lại [Documentation Storyblok](https://www.storyblok.com/docs/api/content-delivery).
