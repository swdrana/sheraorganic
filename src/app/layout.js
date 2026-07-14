import "../assets/css/main.css";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import connectDB from "@/app/utils/database";
import Setting from "@/app/backend/model/setting.model";
import { unstable_cache } from "next/cache";
import Script from "next/script";

// Cache database customization settings for 60 seconds to improve TTFB from 2s to ~10ms
const getCachedSettings = unstable_cache(
  async () => {
    try {
      await connectDB();
      const storeCustomizationSetting = await Setting.findOne({
        name: "storeCustomizationSetting",
      });
      return storeCustomizationSetting?.setting || null;
    } catch (e) {
      console.error("Error fetching settings directly from DB:", e);
      return null;
    }
  },
  ["store-customization-settings-layout"],
  { revalidate: 60, tags: ["settings"] }
);

export async function generateMetadata() {
  let favicon = "/favicon.ico";
  try {
    const setting = await getCachedSettings();
    if (setting?.home?.favicon) {
      favicon = setting.home.favicon;
    }
  } catch (e) {
    console.error("Error loading settings for metadata:", e);
  }

  return {
    title: "SheraOrganic Online Store",
    description: "Welcome to SheraOrganic - Safe and Organic Food Store",
    icons: {
      icon: favicon,
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* DNS prefetch + preconnect for Cloudinary */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect for Facebook (async / lazyOnload anyway) */}
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Preload FontAwesome fonts to avoid render blocking critical chain */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/_next/static/media/fa-solid-900.71ed02b4.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/_next/static/media/fa-regular-400.0c4a336f.woff2"
          crossOrigin="anonymous"
        />

        {/* Preload LCP image — starts downloading before CSS blocks */}
        <link rel="preload" as="image" href="/img/shapes/hero-circle-lg.webp" fetchpriority="high" />
        {/* Google Fonts — non-render-blocking using print media trick */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=optional"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=optional"
          media="print"
          onLoad="this.media='all'"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Oleo+Script&display=optional"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Oleo+Script&display=optional"
          media="print"
          onLoad="this.media='all'"
        />

      </head>
      <body>
        <Script
          id="gtm"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MMLFB63S');
            `,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MMLFB63S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
