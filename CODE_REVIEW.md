# E-Commerce App - Comprehensive Code Review

## 🔴 CRITICAL ISSUES

### 1. **Hardcoded API URLs**
**Files:** `client/src/api/authApi.js`, `client/src/api/axiosInstance.js`, `client/src/api/cartApi.js`

**Issue:** API URLs are hardcoded to production Render URL instead of using environment variables.
```javascript
// ❌ WRONG (authApi.js, line 3)
const API_URL = "https://e-com-app-hjey.onrender.com/api/users";

// ✅ CORRECT
const API_URL = import.meta.env.VITE_API_BASE || "http://localhost:7000/api/users";
```
**Impact:** Cannot switch between development and production easily. Production URL exposed in frontend code.

---

### 2. **Exposed Database Connection String**
**File:** `server/config/db.js`

**Issue:** `MONGO_URI` is read from `.env` but not validated. If `.env` is accidentally committed, credentials exposed.

**Fix:** Add validation and consider using connection pooling:
```javascript
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is required in environment variables");
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
};
```

---

### 3. **No Input Validation**
**Multiple Files:** Controllers across backend lack validation

**Issue:** No input validation for user inputs. Example - userController.js:
```javascript
const { name, email, password, role } = req.body;
// ❌ No validation - could be undefined, empty, invalid email format
```

**Fix:** Add validation library:
```bash
npm install joi
```

```javascript
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").optional(),
});

const registerUser = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // ... rest of code
};
```

---

### 4. **JWT Secret Not Protected**
**File:** `server/controllers/userController.js`

**Issue:** JWT expires in 1 day only. No refresh token mechanism.
```javascript
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
```

**Fix:** Implement refresh tokens:
```javascript
// Access token - short lived (15 minutes)
const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { 
  expiresIn: "15m" 
});

// Refresh token - long lived (7 days)
const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { 
  expiresIn: "7d" 
});

res.json({ accessToken, refreshToken, user: userSafe });
```

---

### 5. **Password Hashing Issues**
**File:** `server/package.json`

**Issue:** Both `bcrypt` and `bcryptjs` are installed (redundant). Using `bcryptjs` in controller but importing `bcrypt`:
```json
"bcrypt": "^6.0.0",
"bcryptjs": "^3.0.2",
```

**Fix:** Use only `bcryptjs`:
```bash
npm uninstall bcrypt
```

---

### 6. **Missing CORS Configuration**
**File:** `server/app.js`

**Issue:** CORS is enabled for all origins with default settings - security risk:
```javascript
app.use(cors())  // ❌ Allows requests from ANY origin
```

**Fix:**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```

---

### 7. **Weak Admin Authorization**
**File:** `server/middleware/adminMiddlware.js` and `server/routes/productRoutes.js`

**Issue:** Anyone with `role: "admin"` in user object can create products. Frontend localStorage can be tampered with.

**Fix:** Verify admin status in database:
```javascript
const adminOnly = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  
  // ✅ Verify role from database, not from token
  const user = await User.findById(req.user._id);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
```

---

## 🟠 HIGH PRIORITY ISSUES

### 8. **No Error Response Standardization**
**Multiple Files:** All controllers

**Issue:** Inconsistent error responses. Some return errors with `.message`, some without.

**Fix:** Create error handler middleware:
```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { error: err.stack }),
  });
};

module.exports = errorHandler;

// In app.js
app.use(errorHandler);
```

---

### 9. **Missing Request Body Validation Middleware**
**File:** `server/app.js`

**Issue:** No size limits on JSON payloads - potential DoS attack:
```javascript
app.use(express.json());  // ❌ No size limit
```

**Fix:**
```javascript
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
```

---

### 10. **Password Not Excluded from User Responses**
**File:** `server/controllers/userController.js`

**Issue:** In `getUsers()`, passwords are returned:
```javascript
const getUsers = async (req, res) => {
  const users = await User.find();  // ❌ Includes passwords!
  res.status(httpStatus.OK).json(users);
};
```

**Fix:**
```javascript
const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(httpStatus.OK).json(users);
};
```

---

### 11. **Missing Rate Limiting**
**File:** `server/app.js`

**Issue:** No rate limiting on endpoints - brute force attacks possible.

**Fix:**
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Apply to all routes
app.use(limiter);

// Stricter limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts
});

app.use("/api/users/login", authLimiter);
app.use("/api/users/register", authLimiter);
```

---

### 12. **Missing HTTPS Enforcement**
**File:** Production deployment

**Issue:** CORS allows HTTP in development only.

**Fix:** Add in production:
```javascript
const httpsRedirect = (req, res, next) => {
  if (process.env.NODE_ENV === "production" && req.header("x-forwarded-proto") !== "https") {
    return res.redirect(`https://${req.header("host")}${req.url}`);
  }
  next();
};

app.use(httpsRedirect);
```

---

### 13. **No Logging System**
**File:** All files

**Issue:** Using `console.log()` for everything - difficult to manage in production.

**Fix:** Add logging library:
```bash
npm install winston
```

```javascript
// utils/logger.js
const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
```

---

### 14. **Frontend: useAuth Hook Not Implemented**
**File:** `client/src/hooks/useAuth.js`

**Issue:** File is empty but good practice pattern.

**Fix:**
```javascript
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  
  return context;
};
```

---

### 15. **Frontend: No Token Expiration Handling**
**File:** `client/src/context/AuthContext.jsx`

**Issue:** Token stored in localStorage doesn't refresh automatically. User session dies silently.

**Fix:**
```javascript
import { createContext, useState, useEffect } from "react";
import { loginUser } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  // Setup token refresh
  useEffect(() => {
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;

      if (timeUntilExpiration > 0) {
        const timeout = setTimeout(() => {
          handleLogout();
          // Show notification to user
        }, timeUntilExpiration - 60000); // Logout 1 minute before expiry

        return () => clearTimeout(timeout);
      }
    }
  }, [token]);

  const handleLogin = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      const token = data?.token;
      const user = data?.user;

      if (token) {
        setToken(token);
        localStorage.setItem("token", token);
      }

      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

### 16. **Frontend: Duplicate Routes**
**File:** `client/src/routes/AppRoutes.jsx`

**Issue:** `/cart` route is defined twice (lines 50 and 92).

**Fix:** Remove duplicate.

---

### 17. **Frontend: No Error Boundary**
**File:** `client/src/App.jsx`

**Issue:** App will crash if any component throws error.

**Fix:** Add Error Boundary:
```jsx
// components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center">
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// In App.jsx
<ErrorBoundary>
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
</ErrorBoundary>
```

---

### 18. **No SQL Injection Protection (NoSQL)**
**File:** Multiple controllers

**Issue:** User input directly passed to queries without sanitization.

**Example:**
```javascript
const user = await User.findOne({ email: email });  // Vulnerable
```

**Fix:** Use Mongoose built-in protection and validate inputs:
```javascript
// Already protected by Mongoose, but add validation layer
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email format" });
}
```

---

## 🟡 MEDIUM PRIORITY ISSUES

### 19. **Missing Validators File**
**File:** `client/src/utils/validators.js` is empty

**Fix:** Add validation functions:
```javascript
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateForm = (email, password) => {
  const errors = {};
  if (!validateEmail(email)) errors.email = "Invalid email";
  if (!validatePassword(password)) errors.password = "Password must be 6+ characters";
  return errors;
};
```

---

### 20. **Missing Environment File Template**
**Issue:** No `.env.example` file for setup instructions.

**Fix:** Create `.env.example`:
```
# Backend
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key
REFRESH_TOKEN_SECRET=your_refresh_token_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=7000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Frontend
VITE_API_BASE=http://localhost:7000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

---

### 21. **No Tests**
**Issue:** No test files in project.

**Fix:** Add test setup:
```bash
npm install --save-dev jest supertest
```

Create `server/__tests__/auth.test.js`:
```javascript
const request = require("supertest");
const app = require("../app");

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user");
  });
});
```

---

### 22. **Missing Null/Undefined Checks**
**File:** `server/routes/userRoutes.js`

**Issue:** `/me` route uses `req.user` without checking if auth middleware ran.

**Current:**
```javascript
router.get("/me", auth, (req, res) => {
  res.json(req.user);  // What if req.user is undefined?
});
```

**Fix:**
```javascript
router.get("/me", auth, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not found" });
  }
  res.json(req.user);
});
```

---

### 23. **No Pagination for Products/Orders**
**File:** `server/controllers/productController.js`, `orderController.js`

**Issue:** `getProducts()` and `getOrders()` return ALL records - scalability issue.

**Fix:**
```javascript
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate("category_id", "name")
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments();

    res.status(httpStatus.OK).json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
```

---

### 24. **Missing TypeScript**
**Issue:** JavaScript project prone to type errors.

**Recommendation:** Consider migrating to TypeScript or add JSDoc type hints:
```javascript
/**
 * Create a new product
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @returns {Promise<void>}
 */
const createProduct = async (req, res) => {
  // ...
};
```

---

### 25. **Frontend: No Loading States**
**File:** `client/src/pages/Auth/Login.jsx`

**Issue:** No loading indicator while login request is in progress.

**Fix:**
```jsx
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const user = await handleLogin(form);
    if (user.role?.toLowerCase() === "admin") {
      navigate("/adminpage");
    } else {
      navigate("/products");
    }
  } catch (err) {
    setError("Invalid credentials. Please try again.");
  } finally {
    setLoading(false);
  }
};

// In JSX
<Button type="submit" disabled={loading}>
  {loading ? "Logging in..." : "Login"}
</Button>
```

---

### 26. **No API Error Interceptor Response Handler**
**File:** `client/src/api/axiosInstance.js`

**Issue:** Only handles request interceptor, not response errors.

**Fix:**
```javascript
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

---

### 27. **Email Configuration Hardcoded**
**File:** `server/utils/sendEmail.js`

**Issue:** Uses hardcoded Gmail configuration. What if email service changes?

**Fix:** Make it more flexible:
```javascript
const sendEmail = async ({ to, subject, html, from }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: from || `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};
```

---

## 🟢 LOW PRIORITY / CODE QUALITY

### 28. **Inconsistent Naming**
- **`cartCotroller.js`** - Typo (should be `cartController.js`)
- **`adminMiddlware.js`** - Typo (should be `adminMiddleware.js`)

### 29. **Commented Code**
Multiple files have large blocks of commented code - clean this up or remove.

### 30. **Missing Comments**
Add JSDoc comments to complex functions.

### 31. **No .gitignore Entries**
**Missing:**
```
node_modules/
.env
.env.local
.env.*.local
dist/
build/
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*
```

### 32. **Frontend Redux Not Used**
`client/package.json` includes Redux but not used. Remove if not needed:
```bash
npm uninstall redux
```

### 33. **No API Documentation**
Add Swagger/OpenAPI documentation:
```bash
npm install swagger-ui-express swagger-jsdoc
```

---

## 📋 SUMMARY OF FIXES NEEDED

| Priority | Count | Category |
|----------|-------|----------|
| 🔴 Critical | 7 | Security, Authentication, Validation |
| 🟠 High | 11 | Error Handling, Authorization, DoS Protection |
| 🟡 Medium | 6 | Code Organization, Functionality |
| 🟢 Low | 10 | Code Quality, Naming |

**Total Issues: 34**

---

## ✅ QUICK START FIXES (Top 10)

```bash
# 1. Install security packages
npm install joi express-rate-limit

# 2. Add error handler middleware
# 3. Add input validation to all controllers
# 4. Fix CORS configuration
# 5. Implement refresh tokens
# 6. Remove bcrypt (keep only bcryptjs)
# 7. Add rate limiting
# 8. Fix hardcoded URLs in frontend
# 9. Add error boundary in React
# 10. Create .env.example file
```

---

## 🎯 NEXT STEPS

1. **Immediate (Today):** Fix critical security issues (#1-7)
2. **Short-term (This Week):** Implement high-priority fixes (#8-18)
3. **Medium-term (Next Sprint):** Add tests and improve code quality
4. **Long-term:** Consider TypeScript migration and advanced features

