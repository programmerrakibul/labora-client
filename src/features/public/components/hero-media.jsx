import heroImg from "@/assets/labora-hero.png";
import { Card, CardContent } from "@/components/ui/card";

const HeroMedia = () => {
  return (
    <Card className="overflow-visible rounded-2xl shadow-xl">
      <CardContent className="p-0">
        <div className="relative rounded-2xl bg-card p-6 shadow-md">
          <div className="overflow-hidden rounded-xl">
            <img
              src={heroImg}
              alt="Hero"
              className="block w-full max-w-full object-cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroMedia;
