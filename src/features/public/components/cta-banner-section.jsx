import Container from "@/components/shared/container";
import { Upload, Users } from "lucide-react";

const CtaBannerSection = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-6 overflow-hidden rounded-2xl border bg-linear-to-br from-primary/10 via-background to-secondary/10 shadow-sm lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6 p-8 lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Looking to hire top 1% talent?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Post a job in minutes and connect with thousands of vetted
                professionals ready to make an impact.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 border-t p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
              <Upload className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Looking for your next career move?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Create your profile and let recruiters find you. Your dream job
                is one click away.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CtaBannerSection;
