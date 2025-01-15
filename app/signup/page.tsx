"use client"

import { useState } from "react"
import { z } from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "Please enter a valid email address"
    )
    .optional()
    .or(z.literal("")),
  contact_number: z
    .string()
    .regex(
      /^\d{10}$/,
      "Please enter a valid 10-digit phone number"
    ),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "City can only contain letters and spaces"),
  state: z
    .string()
    .min(2, "State must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "State can only contain letters and spaces"),
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Country can only contain letters and spaces"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

type FormFields = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const router = useRouter();

  const validateField = (name: keyof FormFields, value: string) => {
    try {
      const fieldSchema = z.object({ [name]: registerSchema.shape[name] });
      fieldSchema.parse({ [name]: value });
      setErrors(prev => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [name]: error.errors[0]?.message || "Invalid input"
        }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof FormFields, value);
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      contact_number: formData.get("contact_number")?.toString() || "",
      address: formData.get("address")?.toString() || "",
      city: formData.get("city")?.toString() || "",
      state: formData.get("state")?.toString() || "",
      country: formData.get("country")?.toString() || "",
    };

    try {
      // Validate all fields
      registerSchema.parse(data);

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormFields, string>> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0] as keyof FormFields] = err.message;
          }
        });
        setErrors(newErrors);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold">AgentHub</h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        <div className="flex space-x-2 bg-gray-50 p-1 rounded-lg">
          <Link href="/login" className="w-1/2 text-center py-2 text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <div className="w-1/2 text-center bg-white py-2 rounded-md shadow-sm">Register</div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter Full Name"
                className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email id"
                className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="contact_number">Contact Number</Label>
              <Input
                id="contact_number"
                name="contact_number"
                type="tel"
                required
                placeholder="Your phone number"
                className={`mt-1 ${errors.contact_number ? "border-red-500" : ""}`}
                onChange={handleInputChange}
              />
              {errors.contact_number && (
                <p className="text-red-500 text-sm mt-1">{errors.contact_number}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                required
                placeholder="Your street address"
                className={`mt-1 ${errors.address ? "border-red-500" : ""}`}
                onChange={handleInputChange}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="Your city"
                  className={`mt-1 ${errors.city ? "border-red-500" : ""}`}
                  onChange={handleInputChange}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  type="text"
                  required
                  placeholder="Your state"
                  className={`mt-1 ${errors.state ? "border-red-500" : ""}`}
                  onChange={handleInputChange}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                type="text"
                required
                placeholder="Your country"
                className={`mt-1 ${errors.country ? "border-red-500" : ""}`}
                onChange={handleInputChange}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter password"
                  className={`mt-1 ${errors.password ? "border-red-500" : ""}`}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
}