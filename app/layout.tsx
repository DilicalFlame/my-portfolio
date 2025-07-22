import React from "react"

export default function RootLayout({
      children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js App Layout Example</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
                                   }