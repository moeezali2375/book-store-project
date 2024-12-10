"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card"; // Adjust the path
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/Select";

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true); // Toggle between login and signup
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "reader",
        biography: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoleChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            role: value,
        }));
    };

    const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLogin) {
            // Login logic here
            console.log("Logging in with:", {
                email: formData.email,
                password: formData.password,
            });
        } else {
            // Signup logic here
            const signupData = {
                ...formData,
                biography: formData.role === "writer" ? formData.biography : undefined,
            };
            console.log("Signing up with:", signupData);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{isLogin ? "Login" : "Signup"}</CardTitle>
                    <CardDescription>
                        {isLogin
                            ? "Sign in to your account"
                            : "Create your account and join us"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAuth} className="space-y-4">
                        {!isLogin && (
                            <>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium">
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium">
                                        Role
                                    </label>
                                    <Select
                                        onValueChange={handleRoleChange}
                                        defaultValue={formData.role}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="reader">Reader</SelectItem>
                                            <SelectItem value="writer">Writer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {formData.role === "writer" && (
                                    <div>
                                        <label
                                            htmlFor="biography"
                                            className="block text-sm font-medium"
                                        >
                                            Biography
                                        </label>
                                        <Input
                                            id="biography"
                                            name="biography"
                                            type="text"
                                            placeholder="Tell us about yourself"
                                            value={formData.biography}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 w-full"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="mt-1 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="mt-1 w-full"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            {isLogin ? "Login" : "Signup"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-center text-muted-foreground">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-500 hover:underline"
                        >
                            {isLogin ? "Signup here" : "Login here"}
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AuthPage;
