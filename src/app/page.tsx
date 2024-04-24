import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center" href="#">
          <PaperclipIcon className="h-6 w-6" />
          <span className="ml-2 text-lg font-medium">RequestStuff</span>
        </Link>
        <nav className="hidden lg:flex gap-6">
          <Link className="text-sm font-medium hover:underline" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#">
            Contact
          </Link>
        </nav>
        <Button variant="default">Get Started</Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Simplify File Requests with RequestStuff
              </h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Create unique, secure links to request files from others. Easily
                fulfill requests and share files through our intuitive platform.
              </p>
              <div className="flex gap-4">
                <Button variant="default">Get Started</Button>
                <Button variant="secondary">Learn More</Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                alt="RequestStuff Hero"
                className="rounded-lg"
                height="400"
                src="/hero.webp"
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width="600"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32" id="features">
          <div className="container px-4 md:px-6 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Features that Make File Requests Easy
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                RequestStuff provides a seamless experience for creating,
                sharing, and fulfilling file requests.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <PaperclipIcon className="h-8 w-8 text-primary-500" />
                <h3 className="text-lg font-semibold">Create Requests</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Easily create customizable file requests with unique links to
                  share with others.
                </p>
              </div>
              <div className="space-y-4">
                <LinkIcon className="h-8 w-8 text-primary-500" />
                <h3 className="text-lg font-semibold">Secure Sharing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Share files securely through the provided request links,
                  ensuring privacy and control.
                </p>
              </div>
              <div className="space-y-4">
                <FolderIcon className="h-8 w-8 text-primary-500" />
                <h3 className="text-lg font-semibold">Easy Fulfillment</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Fulfill file requests quickly and conveniently through the
                  intuitive platform.
                </p>
              </div>
              <div className="space-y-4">
                <SignalIcon className="h-8 w-8 text-primary-500" />
                <h3 className="text-lg font-semibold">Real-time Updates</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Stay informed about the status of your file requests with
                  real-time notifications.
                </p>
              </div>
              <div className="space-y-4">
                <GaugeIcon className="h-8 w-8 text-primary-500" />
                <h3 className="text-lg font-semibold">Customizable</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Personalize your file requests with custom branding and
                  settings.
                </p>
              </div>
              <div className="space-y-4">
                <ShieldIcon className="h-8 w-8 text-primary-500" />
                <h3 className="text-lg font-semibold">Secure by Design</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Rely on our robust security measures to protect your sensitive
                  files.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full py-20 md:py-32 bg-gray-50 dark:bg-gray-900"
          id="pricing"
        >
          <div className="container px-4 md:px-6 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Pricing to Fit Your Needs
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Choose the plan that works best for your file request needs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>Get started for free</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="ml-1 text-gray-500 dark:text-gray-400">
                        /month
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Perfect for individual users or small teams.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">$9</span>
                      <span className="ml-1 text-gray-500 dark:text-gray-400">
                        /month
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Unlock advanced features for your team.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">$99</span>
                      <span className="ml-1 text-gray-500 dark:text-gray-400">
                        /month
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Tailored solutions for your business needs.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32" id="contact">
          <div className="container px-4 md:px-6 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Get in Touch
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Have questions or need help? Contact our team and we'll be happy
                to assist you.
              </p>
            </div>
            <div className="flex justify-center">
              <form className="w-full max-w-md space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" type="text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={5}
                  />
                </div>
                <Button className="w-full" type="submit" variant="default">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center">
            <PaperclipIcon className="h-6 w-6" />
            <span className="ml-2 text-lg font-medium">RequestStuff</span>
          </div>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <Link className="text-sm font-medium hover:underline" href="#">
              Terms
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Privacy
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function GaugeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function LinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function PaperclipIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

function SignalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 4v16" />
    </svg>
  );
}
