"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { data } from "autoprefixer";

const Login_component = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="flex w-full justify-center p-4 flex-col items-center gap-4 max-h-dvh min-h-[500px]">
      <div className="flex flex-col items-center mb-5">
        <div className="text-xl font-medium">Welcome Back</div>
        <div className="tex-small text-default-500">
          Please log in to continue
        </div>
      </div>

      <Card className="w-[90%] max-w-[400px]">
        <CardBody>
          <div className="flex gap-4 flex-col items-center">
            <Input type="email" label="Email" placeholder="Enter your email" />
            <Input
              type="password"
              label="Password"
              placeholder="Enter the password"
            />
          </div>
        </CardBody>
      </Card>

      <Button
        color="primary"
        size="md"
        className="w-[90%] max-w-[400px]"
        onPress={() => {
          router.push("/");
        }}
      >
        Log in
      </Button>
      <Divider orientation="horizontal" className="w-[90%] max-w-[400px]" />
      <Button
        color="primary"
        variant="bordered"
        className="w-[90%] max-w-[400px]"
        onClick={() => {
          signIn("google");
        }}
      >
        SSO
      </Button>
      <p className="text-default-500 text-xs">
        Need an acount? <Link className=" text-xs text-blue-500"> Sign up</Link>
      </p>
    </div>
  );
};

export default Login_component;
