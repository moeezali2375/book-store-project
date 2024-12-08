import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card"; // Adjust the path as per your project structure
import { Input } from "@/components/ui/Input"; // Ensure you have an Input component
import { Button } from "@/components/ui/button"; // Ensure you have a Button component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"; // Replace with your Select component

const SignupPage: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("reader");
    const [bio, setBio] = useState<string>("");

    const handleSignup = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        // Add signup logic here
        const userData = {
            name,
            email,
            password,
            role,
            ...(role === "writer" && { biography: bio }),
        };
        console.log("Signup data:", userData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>Create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">
                                Name
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 w-full"
                            />
                        </div>
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
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium">
                                Role
                            </label>
                            <Select
                                onValueChange={(value) => setRole(value)}
                                defaultValue={role}
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
                        {role === "writer" && (
                            <div>
                                <label htmlFor="biography" className="block text-sm font-medium">
                                    Biography
                                </label>
                                <Input
                                    id="biography"
                                    type="text"
                                    placeholder="Tell us about yourself"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="mt-1 w-full"
                                />
                            </div>
                        )}
                        <Button type="submit" className="w-full">
                            Signup
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-center text-muted-foreground">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login here
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignupPage;
