import "./globals.css";

export const metadata = {
  title: "Rohit Prajapati | Full Stack Developer",
  description:
    "Full Stack Developer skilled in React.js, Node.js, and MongoDB. Building scalable, high-performance web applications. Based in Jhalawar, Rajasthan.",
  keywords: [
    "Rohit Prajapati",
    "Full Stack Developer",
    "React Developer",
    "Node.js",
    "MongoDB",
    "JavaScript",
    "Next.js",
    "Web Developer",
    "Jhalawar",
    "Rajasthan",
    "Portfolio",
    "frontend",
    "backend",
    "REST API",
  ],
  authors: [{ name: "Rohit Prajapati" }],
  openGraph: {
    title: "Rohit Prajapati | Full Stack Developer",
    description:
      "Building scalable web applications with React.js, Node.js, and MongoDB. Open to work — 2025.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ backgroundColor: "#0a0a0a" }}>
      <body
        className="grain-overlay"
        style={{ backgroundColor: "#0a0a0a", overflowX: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}
