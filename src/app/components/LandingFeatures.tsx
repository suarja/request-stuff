import FolderIcon from "@/common/icons/FolderIcon";
import GaugeIcon from "@/common/icons/GaugeIcon";
import LinkIcon from "@/common/icons/LinkIcon";
import PaperclipIcon from "@/common/icons/PaperClipIcon";
import ShieldIcon from "@/common/icons/ShieldIcon";
import SignalIcon from "@/common/icons/SignalIcon";

export default function LandingFeatures() {
  return (
    <section className="w-full py-20 md:py-32" id="features">
      <div className="container px-4 md:px-6 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Features that Make File Requests Easy
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            RequestStuff provides a seamless experience for creating, sharing,
            and fulfilling file requests.
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
              Share files securely through the provided request links, ensuring
              privacy and control.
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
              Personalize your file requests with custom branding and settings.
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
  );
}
