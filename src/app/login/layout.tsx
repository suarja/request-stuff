export const metadata = {
  title: "RequestStuff",
  description:
    "RequestStuff: Streamline Your File Requests Without the High Costs. RequestStuff allows seamless file uploads via a simple link, directly storing each file securely in our database. Designed for businesses, educators, and freelancers seeking an efficient, affordable solution for managing document submissions. Experience streamlined file sharing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <main className="flex min-h-screen w-full flex-col gap-12 items-center justify-start px-4 py-24  ">
      {children}
    </main>
  );
}
