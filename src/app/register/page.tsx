'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { registerSchema, RegisterFormData } from "@/schemas/auth";
import Link from "next/link";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
    };

    return (
        <div className="min-h-screen bg-green-800 flex items-center justify-center p-4 relative">

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 py-4 relative z-10"
            >
                <div className="text-center space-y-1">
                    <img src="/photos/logo.png" alt="Logo" className="mx-auto h-12 w-15" />
                    <p className="text-gray-500">Create an account</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <Label htmlFor="fname">First Name</Label>
                        <Input id="fname" type="text" placeholder="Enter your first name" {...register("firstName")} />
                        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="lname">Last Name</Label>
                        <Input id="lname" type="text" placeholder="Enter your last name" {...register("lastName")} />
                        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="userType">Type of User</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select user type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="resident">Resident</SelectItem>
                                <SelectItem value="worker">Waste Worker</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="guest">Guest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter email address" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input id="password" type={showPassword ? "text" : "password"} placeholder="Choose password" {...register("password")} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                            <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                    </div>

                    <Button type="submit" className="w-full bg-green-500 text-white hover:bg-green-600">
                        Create an Account
                    </Button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm">Already have an account? <Link href="/" className="text-green-500 hover:text-green-600 font-medium">Log in</Link></p>
                </div>
            </motion.div>
        </div>
    );
}
