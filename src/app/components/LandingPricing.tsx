import { Button } from "@/common/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/common/components/ui/card";

export default function LandingPricing() {
  return (
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
  );
}
