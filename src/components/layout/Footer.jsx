// src/components/layout/Footer.jsx

import SectionContainer from "@/components/ui/SectionContainer";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-950">
      <SectionContainer className="flex flex-col gap-4 text-center sm:text-right">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            Velvet Café
          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            تجربة بسيطة وأنيقة لاستعراض المشروبات والحلويات داخل واجهة عربية
            حديثة.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <span>أوقات العمل: يوميًا من 8:00 ص إلى 11:00 م</span>
          <span>© 2026 Velvet Café</span>
        </div>
      </SectionContainer>
    </footer>
  );
}
