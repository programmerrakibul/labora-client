import Logo from "@/components/shared/logo";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-5 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Logo />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Labora. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
