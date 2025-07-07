import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import ThemeToggle from "./components/ThemeToggle";

export const metadata = {
  title: "Quote Generator",
  description: "A modern, accessible quote generator app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen font-sans">
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
