"use client";

import { useEffect } from "react";

export default function AnalyticsLoader() {
  useEffect(() => {
    let loaded = false;
    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      try {
        // Load Google Tag Manager
        (function(w,d,s,l,i){
          w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MMLFB63S');

        // Load Facebook Pixel
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        window.fbq('init', '1813350285799787');
        window.fbq('track', 'PageView');
      } catch (e) {
        console.error("Error loading analytics:", e);
      }

      // Remove listeners
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", loadAnalytics);
      window.removeEventListener("mousemove", loadAnalytics);
      window.removeEventListener("touchstart", loadAnalytics);
      window.removeEventListener("keydown", loadAnalytics);
    };

    window.addEventListener("scroll", loadAnalytics, { passive: true });
    window.addEventListener("mousemove", loadAnalytics, { passive: true });
    window.addEventListener("touchstart", loadAnalytics, { passive: true });
    window.addEventListener("keydown", loadAnalytics, { passive: true });

    return cleanup;
  }, []);

  return null;
}
