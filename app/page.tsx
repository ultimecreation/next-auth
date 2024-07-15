
import { LoginButton } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["800"]
})
export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-500" >
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>Auth</h1>
        <p className="text-white text-lg">A simple auth service</p>
      </div>
      <div className="my-3" >
        <LoginButton>

          <Button variant={"secondary"} size={"lg"}>SignIn</Button>
        </LoginButton>
      </div>
    </main>
  );
}
