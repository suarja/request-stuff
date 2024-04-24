"use client";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

export default function LandingContact() {
  return (
    <section className="w-full py-20 md:py-32 bg-tertiary" id="contact">
      <div className="container px-4 md:px-6 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Get in Touch
          </h2>
          <p className="text-gray-500 dark:text-gray-700 max-w-md mx-auto">
            Have questions or need help? Contact our team and we'll be happy to
            assist you.
          </p>
        </div>
        <div className="flex justify-center">
          <form className="w-full max-w-md space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                className="bg-primary"
                id="name"
                placeholder="John Doe"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="bg-primary"
                id="email"
                placeholder="john@example.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                className="bg-primary"
                id="message"
                placeholder="How can we help you?"
                rows={5}
              />
            </div>
            <Button className="w-full bg-tertiaryalt" type="submit" variant="default">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
