# 
واجهة كافيه حديثة لعرض المنتجات بطريقة بسيطة وسريعة، مع البحث، تصفية الأقسام، تفاصيل كل منتج، ودعم الوضع الفاتح والداكن.

## المعاينة



## صور المشروع

### الصفحة الرئيسية

![الصفحة الرئيسية](/Osama-main/public/Screenshot%202026-07-29%20022804.png)

### الوضع الداكن

![الوضع الداكن](/Osama-main/public/Screenshot%202026-07-29%20020715.png)

### تفاصيل المنتج

![نافذة تفاصيل المنتج](/Osama-main/public/Screenshot%202026-07-29%20021644.png)

### البحث والتصنيفات

![البحث والتصنيفات](/Osama-main/public/Screenshot%202026-07-29%20021744.png)

### قسم مخارات الكافيه

![البحث والتصنيفات](/Osama-main/public/Screenshot%202026-07-29%20020832.png)



## المميزات

- عرض منتجات الكافيه بشكل منظم وجذاب
- البحث عن المنتجات بالاسم
- تصفية المنتجات حسب التصنيف
- أقسام مثل القهوة الساخنة، القهوة الباردة، الماتشا، والحلويات
- نافذة لعرض تفاصيل المنتج
- قسم للمنتجات المختارة
- دعم الوضع الفاتح والداكن
- حفظ اختيار الثيم داخل المتصفح
- تصميم متجاوب مع الجوال والكمبيوتر
- واجهة باللغة العربية وبدعم اتجاه RTL

## التقنيات المستخدمة

- Next.js
- React
- Tailwind CSS
- JavaScript
- Lucide React

## هيكل المشروع

```txt
src/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
│
├── components/
│   ├── catalog/
│   │   ├── CategoryFilter.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductModal.jsx
│   │   ├── SearchBar.jsx
│   │   └── SpecialsSection.jsx
│   │
│   └── ui/
│       └── ThemeToggle.jsx
│
├── constants/
│   └── categories.js
│
├── data/
│   └── products.js
│
├── hooks/
│   └── useCatalog.js
│
└── lib/
    └── filterProducts.js
```

## تشغيل المشروع محليًا

### 1. تنزيل المشروع

```bash
git clone https://github.com/Eng-osamaa/Aodaty_osama.git
```

### 2. الدخول إلى مجلد المشروع

```bash
cd Aodaty_osama
```

### 3. تثبيت الحزم

```bash
npm install
```

### 4. تشغيل المشروع

```bash
npm run dev
```

ثم افتح الرابط التالي في المتصفح:

```txt
http://localhost:3000
```

## طريقة عمل التصنيفات

كل منتج يحتوي على `category` يمثل نوعه الحقيقي:

```js
{
  name: "سبانش لاتيه",
  category: "hot-coffee",
  isFeatured: true,
  isPopular: true,
}
```

مثال آخر:

```js
{
  name: "فانيلا كولد برو",
  category: "cold-coffee",
  isFeatured: true,
  isPopular: false,
}
```

- `category`: نوع المنتج، مثل قهوة ساخنة أو قهوة باردة
- `isFeatured`: منتج يتم عرضه ضمن قسم اختياراتنا
- `isPopular`: منتج شائع يظهر معه Badge خاص

## الوضع الداكن

يتم تطبيق الثيم باستخدام attribute على عنصر `html`:

```html
<html data-theme="dark">
```

ويتم حفظ آخر اختيار للمستخدم داخل `localStorage`، لذلك يبقى الوضع الداكن أو الفاتح بعد تحديث الصفحة.

## إضافة الصور

ضع صور المشروع داخل هذا المسار:

```txt
public/screenshots/
```

واجعل أسماء الصور كالتالي:

```txt
public/
└── screenshots/
    ├── home-light.png
    ├── home-dark.png
    ├── product-modal.png
    └── search-filter.png
```

إذا كانت صورك بأسماء مختلفة، غيّر المسارات داخل قسم **صور المشروع** في هذا الملف.

## المطور

تم تطوير المشروع بواسطة:

**Osama Al-Baadani**

GitHub: [Osama-Al-Baadani](https://github.com/Eng-osamaa/Aodaty_osama.git)