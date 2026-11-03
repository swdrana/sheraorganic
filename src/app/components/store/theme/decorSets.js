import { normalizeTheme } from "@/app/utils/theme";

// Niche-neutral backgrounds/circles stay in the original components.
// Slots retain grocery dimensions; tech mappings follow bdXmart placement where available.
export const DECOR_SETS = {
  "hero.leaf-shadow": {
    "grocery": "/img/shapes/leaf-shadow.webp",
    "tech": "/themes/tech/shapes/cloud.svg",
    "none": null,
    "width": 200,
    "height": 197
  },
  "hero.mango": {
    "grocery": "/img/shapes/mango.png",
    "tech": "/themes/tech/shapes/lightning.svg",
    "none": null,
    "width": 114,
    "height": 114
  },
  "hero-slide.tree": {
    "grocery": "/img/shapes/tree.png",
    "tech": null,
    "none": null,
    "width": 80,
    "height": 411
  },
  "hero-slide.orange-1": {
    "grocery": "/img/shapes/orange-1.png",
    "tech": null,
    "none": null,
    "width": 117,
    "height": 116
  },
  "hero-slide.orange-2": {
    "grocery": "/img/shapes/orange-2.png",
    "tech": null,
    "none": null,
    "width": 133,
    "height": 81
  },
  "hero-slide.hero-circle-lg": {
    "grocery": "/img/shapes/hero-circle-lg.webp",
    "tech": "/themes/tech/shapes/hero-circle-lg.png",
    "none": "/img/shapes/hero-circle-lg.webp",
    "width": 390,
    "height": 400
  },
  "trending.garlic": {
    "grocery": "/img/shapes/garlic.png",
    "tech": "/themes/tech/shapes/battery.svg",
    "none": null,
    "width": 81,
    "height": 86
  },
  "trending.carrot": {
    "grocery": "/img/shapes/carrot.png",
    "tech": "/themes/tech/shapes/cloud.svg",
    "none": null,
    "width": 136,
    "height": 105
  },
  "trending.mashrom": {
    "grocery": "/img/shapes/mashrom.png",
    "tech": "/themes/tech/shapes/mouse.svg",
    "none": null,
    "width": 175,
    "height": 148
  },
  "blog.dal": {
    "grocery": "/img/shapes/dal.png",
    "tech": null,
    "none": null,
    "width": 123,
    "height": 125
  },
  "feature.roll-1": {
    "grocery": "/img/shapes/roll-1.png",
    "tech": null,
    "none": null,
    "width": 128,
    "height": 137
  },
  "feature.roll-2": {
    "grocery": "/img/shapes/roll-2.webp",
    "tech": null,
    "none": null,
    "width": 100,
    "height": 85
  },
  "feedback.fd-1": {
    "grocery": "/img/shapes/fd-1.webp",
    "tech": "/themes/tech/shapes/microchip.svg",
    "none": null,
    "width": 101,
    "height": 120
  },
  "feedback.fd-2": {
    "grocery": "/img/shapes/fd-2.webp",
    "tech": "/themes/tech/shapes/wifi.svg",
    "none": null,
    "width": 120,
    "height": 103
  },
  "feedback.fd-3": {
    "grocery": "/img/shapes/fd-3.png",
    "tech": "/themes/tech/shapes/battery.svg",
    "none": null,
    "width": 44,
    "height": 43
  },
  "feedback.fd-4": {
    "grocery": "/img/shapes/fd-4.png",
    "tech": "/themes/tech/shapes/gamepad.svg",
    "none": null,
    "width": 118,
    "height": 105
  },
  "feedback.fd-5": {
    "grocery": "/img/shapes/fd-5.webp",
    "tech": "/themes/tech/shapes/cloud.svg",
    "none": null,
    "width": 120,
    "height": 80
  },
  "footer.tomato": {
    "grocery": "/img/shapes/tomato.svg",
    "tech": "/themes/tech/shapes/mouse.svg",
    "none": null,
    "width": 53.0,
    "height": 53.0
  },
  "footer.pata-lg": {
    "grocery": "/img/shapes/pata-lg.svg",
    "tech": "/themes/tech/shapes/gamepad.svg",
    "none": null,
    "width": 74.0,
    "height": 74.0
  },
  "footer.pata-xs": {
    "grocery": "/img/shapes/pata-xs.svg",
    "tech": "/themes/tech/shapes/battery.svg",
    "none": null,
    "width": 24.0,
    "height": 23.0
  },
  "footer.leaf": {
    "grocery": "/img/shapes/leaf.svg",
    "tech": "/themes/tech/shapes/microchip.svg",
    "none": null,
    "width": 76.0,
    "height": 57.0
  },
  "footer.tomato-slice": {
    "grocery": "/img/shapes/tomato-slice.svg",
    "tech": "/themes/tech/shapes/wifi.svg",
    "none": null,
    "width": 99.0,
    "height": 96.0
  },
  "footer.tomato-half": {
    "grocery": "/img/shapes/tomato-half.svg",
    "tech": "/themes/tech/shapes/gamepad.svg",
    "none": null,
    "width": 104.0,
    "height": 104.0
  },
  "breadcrumb.pata-xs": {
    "grocery": "/img/shapes/pata-xs.svg",
    "tech": "/themes/tech/shapes/battery.svg",
    "none": null,
    "width": 24.0,
    "height": 23.0
  },
  "breadcrumb.onion": {
    "grocery": "/img/shapes/onion.png",
    "tech": "/themes/tech/shapes/mouse.svg",
    "none": null,
    "width": 144,
    "height": 119
  },
  "breadcrumb.leaf": {
    "grocery": "/img/shapes/leaf.svg",
    "tech": "/themes/tech/shapes/microchip.svg",
    "none": null,
    "width": 76.0,
    "height": 57.0
  },
  "breadcrumb.garlic-white": {
    "grocery": "/img/shapes/garlic-white.png",
    "tech": "/themes/tech/shapes/battery.svg",
    "none": null,
    "width": 99,
    "height": 101
  },
  "breadcrumb.roll-1": {
    "grocery": "/img/shapes/roll-1.png",
    "tech": "/themes/tech/shapes/microchip.svg",
    "none": null,
    "width": 128,
    "height": 137
  },
  "breadcrumb.roll-2": {
    "grocery": "/img/shapes/roll-2.webp",
    "tech": "/themes/tech/shapes/wifi.svg",
    "none": null,
    "width": 100,
    "height": 85
  },
  "breadcrumb.tomato-half": {
    "grocery": "/img/shapes/tomato-half.svg",
    "tech": "/themes/tech/shapes/gamepad.svg",
    "none": null,
    "width": 104.0,
    "height": 104.0
  },
  "breadcrumb.tomato-slice": {
    "grocery": "/img/shapes/tomato-slice.svg",
    "tech": "/themes/tech/shapes/wifi.svg",
    "none": null,
    "width": 99.0,
    "height": 96.0
  },
  "breadcrumb.cauliflower": {
    "grocery": "/img/shapes/cauliflower.png",
    "tech": "/themes/tech/shapes/gamepad.svg",
    "none": null,
    "width": 60,
    "height": 55
  },
  "breadcrumb.leaf-gray": {
    "grocery": "/img/shapes/leaf-gray.png",
    "tech": "/themes/tech/shapes/mouse.svg",
    "none": null,
    "width": 66,
    "height": 77
  },
  "contact.roll-2": {
    "grocery": "/img/shapes/roll-2.webp",
    "tech": "/themes/tech/shapes/wifi.svg",
    "none": null,
    "width": 100,
    "height": 85
  },
  "contact.pata-xs": {
    "grocery": "/img/shapes/pata-xs.svg",
    "tech": "/themes/tech/shapes/battery.svg",
    "none": null,
    "width": 24.0,
    "height": 23.0
  },
  "contact.garlic-white": {
    "grocery": "/img/shapes/garlic-white.png",
    "tech": "/themes/tech/shapes/battery.svg",
    "none": null,
    "width": 99,
    "height": 101
  },
  "contact.roll-1": {
    "grocery": "/img/shapes/roll-1.png",
    "tech": "/themes/tech/shapes/microchip.svg",
    "none": null,
    "width": 128,
    "height": 137
  },
  "contact.leaf": {
    "grocery": "/img/shapes/leaf.svg",
    "tech": "/themes/tech/shapes/microchip.svg",
    "none": null,
    "width": 76.0,
    "height": 57.0
  },
  "about.mango": {
    "grocery": "/img/shapes/mango.png",
    "tech": "/themes/tech/shapes/mouse.svg",
    "none": null,
    "width": 114,
    "height": 114
  },
  "about.hand-icon": {
    "grocery": "/img/icons/hand-icon.svg",
    "tech": "/themes/tech/icons/hand-icon.svg",
    "none": "/img/icons/hand-icon.svg",
    "width": 47.0,
    "height": 50.0
  },
  "about-us.abut-us": {
    "grocery": "/img/abut-us.png",
    "tech": "/themes/tech/banner/login-banner.jpg",
    "none": null,
    "width": 590,
    "height": 551
  },
  "about-us.hand-icon": {
    "grocery": "/img/icons/hand-icon.svg",
    "tech": "/themes/tech/icons/hand-icon.svg",
    "none": "/img/icons/hand-icon.svg",
    "width": 47.0,
    "height": 50.0
  },
  "ability.roll-color": {
    "grocery": "/img/shapes/roll-color.png",
    "tech": "/themes/tech/shapes/microchip.svg",
    "none": null,
    "width": 85,
    "height": 150
  },
  "ability.roll-color-curve": {
    "grocery": "/img/shapes/roll-color-curve.png",
    "tech": "/themes/tech/shapes/wifi.svg",
    "none": null,
    "width": 165,
    "height": 141
  },
  "ability.onion-color": {
    "grocery": "/img/shapes/onion-color.png",
    "tech": "/themes/tech/shapes/mouse.svg",
    "none": null,
    "width": 91,
    "height": 92
  },
  "checkout.circle-half": {
    "grocery": "/img/shapes/circle-half.png",
    "tech": "/img/shapes/circle-half.png",
    "none": "/img/shapes/circle-half.png",
    "width": 178,
    "height": 195
  },
  "ability.icon-1": {
    "grocery": "/img/icons/icon-1.png",
    "tech": "/themes/tech/shapes/microchip.svg",
    "none": null,
    "width": 512,
    "height": 512
  },
  "ability.icon-2": {
    "grocery": "/img/icons/icon-2.png",
    "tech": "/themes/tech/icons/cart-color.svg",
    "none": null,
    "width": 512,
    "height": 512
  },
  "ability.icon-3": {
    "grocery": "/img/icons/icon-3.png",
    "tech": "/themes/tech/icons/icon-3.png",
    "none": "/img/icons/icon-3.png",
    "width": 512,
    "height": 512
  },
  "ability.icon-4": {
    "grocery": "/img/icons/icon-4.png",
    "tech": "/themes/tech/icons/icon-4.png",
    "none": "/img/icons/icon-4.png",
    "width": 512,
    "height": 512
  },
  "auth-banner": {
    "grocery": "/img/banner/login-banner.jpg",
    "tech": "/themes/tech/banner/login-banner.jpg",
    "none": null,
    "width": 1082,
    "height": 1053
  },
  "weekly-banner": {
    "grocery": "/img/banner/vegetables.webp",
    "tech": null,
    "none": null,
    "width": 366,
    "height": 320
  }
};

export function getDecorSrc(theme, slot) {
  return DECOR_SETS[slot]?.[normalizeTheme(theme)] ?? null;
}

export function getWeeklyDealsImage(theme, configuredImage) {
  const configured = typeof configuredImage === "string" ? configuredImage.trim() : "";
  return configured || getDecorSrc(theme, "weekly-banner");
}
