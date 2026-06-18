const http = require("http");
const { spawn } = require("child_process");
const path = require("path");

console.log("Starting backend security and performance audit...");

// Spawn Express server
const serverProcess = spawn("node", ["server.js"], {
  cwd: __dirname,
  env: {
    ...process.env,
    PORT: "9000",
    NODE_ENV: "production",
    JWT_SECRET: "test_jwt_secret_key_12345!",
    CORS_ORIGIN: "http://localhost:3000",
    DATABASE_URL: "postgresql://postgres:pass@localhost:5432/postgres" // mock connection URL
  }
});

let serverOutput = "";
serverProcess.stdout.on("data", (data) => {
  serverOutput += data.toString();
});

serverProcess.stderr.on("data", (data) => {
  console.error("Server Error:", data.toString());
});

// Wait for server to boot, then run assertions
setTimeout(() => {
  console.log("Querying server endpoints for security audits...");

  // Test 1: Check security headers
  const req = http.get("http://localhost:9000/health", (res) => {
    const headers = res.headers;
    let passed = true;

    console.log("\n--- Audit 1: Security Headers ---");
    const required = ["x-frame-options", "x-content-type-options", "content-security-policy", "strict-transport-security"];
    
    required.forEach(h => {
      if (headers[h]) {
        console.log(`[PASS] ${h}: ${headers[h]}`);
      } else {
        console.log(`[FAIL] Missing security header: ${h}`);
        passed = false;
      }
    });

    // Test 2: Rate Limiting
    console.log("\n--- Audit 2: Rate Limiting ---");
    let requestsCount = 0;
    const maxRequests = 105;
    let rateLimitPassed = false;

    function sendLimiterRequest() {
      if (requestsCount >= maxRequests) {
        serverProcess.kill();
        process.exit(passed && rateLimitPassed ? 0 : 1);
        return;
      }

      requestsCount++;
      const r = http.get("http://localhost:9000/api/opportunities", (response) => {
        if (response.statusCode === 429) {
          console.log(`[PASS] Rate limiting triggered successfully on request #${requestsCount} (Status 429)`);
          rateLimitPassed = true;
          serverProcess.kill();
          process.exit(passed ? 0 : 1);
        } else {
          // Keep sending requests until we hit 429
          sendLimiterRequest();
        }
      });
      r.on("error", (e) => {
        // Mock connection errors (e.g. DB connection fail) don't affect rate limiting middleware check
        if (response && response.statusCode === 429) {
          rateLimitPassed = true;
        }
        sendLimiterRequest();
      });
    }

    sendLimiterRequest();
  });

  req.on("error", (err) => {
    console.error("Failed to connect to local test server:", err.message);
    serverProcess.kill();
    process.exit(1);
  });
}, 3000);
