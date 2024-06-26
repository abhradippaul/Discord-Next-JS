import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/Theme-provider";
import { cn } from "@/lib/utils";
import ProviderSession from "@/components/providers/ProviderSession";
import UserContext from "@/components/providers/UserContext";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord | Home Page",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, "bg-white dark:bg-[#313338]")}
        suppressContentEditableWarning
      >
        <ProviderSession>
          <UserContext>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              // enableSystem={false}
              // storageKey="discord-theme"
            >
              {children}
            </ThemeProvider>
          </UserContext>
        </ProviderSession>
      </body>
    </html>
  );
}
