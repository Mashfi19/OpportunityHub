import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://opportunityhub-api.onrender.com";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gmsvlzhpphrmzvlccpzn.supabase.co";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://ec.europa.eu https://images.unsplash.com; connect-src 'self' http://localhost:8080 ${apiUrl} ${supabaseUrl} https://api.openai.com; frame-ancestors 'none';`
  },
  {
    key: "X-Frame-Options",
    value: "DENY"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin"
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block"
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload"
  }
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  // Optimize production chunks
  poweredByHeader: false,
  reactStrictMode: true
};

export default nextConfig;
