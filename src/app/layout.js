import "bootstrap/dist/css/bootstrap.min.css"; // Importando o Bootstrap
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
