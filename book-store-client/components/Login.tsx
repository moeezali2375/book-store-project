
import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card"; // Update the import path as needed
import { Input } from "@/components/ui/Input"; // Replace with your Input component
import { Button } from "@/components/ui/button"; // Replace with your Button component

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform login logic here
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 w-full"
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button onClick={handleLogin} className="w-full">
                        Login
                    </Button>
                    <p className="text-sm text-center text-muted-foreground">
                        Forgot your password?{" "}
                        <a href="/forgot-password" className="text-blue-500 hover:underline">
                            Click here
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginComponent;
