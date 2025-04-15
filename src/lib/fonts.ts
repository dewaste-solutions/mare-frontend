import localFont from 'next/font/local'

export const fontTTCommons = localFont({
  src: [
    {
      path: "/fonts/TTCommons-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/TTCommons-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/TTCommons-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-tt-commons",
})
