import ProgressBarProvider from "@/providers/ProgressBarProvider";
import Header from "@/components/Header/Header";
import "./globals.css";
import { AttributionCtxProvider } from "@/store/attribution";
import Attribution from "@/components/UI/Attribution";

export default async function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body>
        <ProgressBarProvider>
          <AttributionCtxProvider>
            <Header />
            <div id="selected-image-modal" />
            {modal}
            <Attribution />
            {children}
          </AttributionCtxProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
