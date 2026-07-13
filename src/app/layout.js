import "../assets/css/main.css";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { getStoreCustomizationSetting } from "./backend/controllers/storecustomize.controller";

export async function generateMetadata() {
  let favicon = "/favicon.ico";
  try {
    const res = await getStoreCustomizationSetting();
    const setting = res?.storeCustomizationSetting?.setting;
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        {/* Preload LCP image — starts downloading before CSS blocks */}
        <link rel="preload" as="image" href="/img/shapes/hero-circle-lg.webp" />
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

        {/* Google Tag Manager */}
        <script
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
      </head>
      <body>
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
