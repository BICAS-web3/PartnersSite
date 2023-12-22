import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512.png"
        />
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/Apple180.webp" /> */}
        <link rel="apple-touch-icon" sizes="180x180" href="/Apple180.png" />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="16x16"
          href="/favicon16.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="/favicon32.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="48x48"
          href="/favicon48.ico"
        />{" "}
        <meta property="og:url" content="https://game.greekkeepers.io/" />
        <title>GreekKeepers | Affiliates</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
