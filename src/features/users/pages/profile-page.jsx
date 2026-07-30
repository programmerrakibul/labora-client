import useAuth from "@/stores/auth";
import Container from "@/components/shared/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { USER_ROLE } from "@/constants/enums";
import { getEnumByValue } from "@/constants/enums";
import { Link } from "react-router";
import { User, Mail, Phone, MapPin, Pencil } from "lucide-react";

const ProfilePage = () => {
  const user = useAuth((s) => s.user);
  const role = getEnumByValue(USER_ROLE, user?.role);

  return (
    <Container className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <Button asChild>
          <Link to="/dashboard/update-profile">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <CardTitle className="text-xl">{user?.name || "User"}</CardTitle>
              {role && (
                <Badge variant="secondary" className={role.color}>
                  {role.label}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{user?.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{user?.phoneNumber || "Not provided"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>
              {[user?.city, user?.country].filter(Boolean).join(", ") || "Not provided"}
            </span>
          </div>
          {user?.address && (
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{user.address}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
