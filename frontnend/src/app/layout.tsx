import type { Metadata } from "next";
import { Lora, Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { AuthProvider } from "./dashboard/context/ContentProvider";

// Define Google Fonts
const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "700", "600"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900", "100"],
});

export const metadata: Metadata = {
  title: "Blog - I am Jayasriraam",
  description:
    "Welcome to my blog, where I, Jayasriraam, share insights, stories, and thoughts on a variety of topics ranging from personal development to travel experiences. Join me as I delve into the ultimate adventures of life, exploring new ideas and connecting with readers through engaging content. Whether you're seeking inspiration or just a good read, there's something here for everyone. Enjoy the journey!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.className} ${roboto.className}`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
