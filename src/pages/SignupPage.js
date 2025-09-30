import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AuthPage.css";

const API_BASE_URL = "https://book-club-app-ix0p.onrender.com";

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/books");
    }
  }, [navigate]);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ store token + user
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/books");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Could not connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field name="username" type="text" placeholder="Username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div>
              <Field name="email" type="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Signup"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;