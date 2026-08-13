import Container from "@/components/shared/container";
import InfoRow from "@/components/shared/info-row";
import Seo from "@/components/shared/seo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEnumByValue, USER_ROLE_CONFIG } from "@/constants/enum-configs";
import useAuth from "@/stores/auth";
import { Mail, MapPin, Pencil, Phone, User } from "lucide-react";
import { useState } from "react";
import EditProfileDialog from "../components/edit-profile-dialog";

const ProfilePage = () => {
  const user = useAuth((s) => s.user);
  const role = getEnumByValue(USER_ROLE_CONFIG, user?.role);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <Container className="py-8">
      <Seo title={user?.name ? `${user.name}'s Profile` : "Profile"} noindex />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <Button onClick={() => setEditOpen(true)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 text-xl font-bold">
              {user?.image ? (
                <AvatarImage
                  src={user.image}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <AvatarFallback>
                  {user?.name.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              {role && (
                <Badge variant="secondary" className={role.color}>
                  {role.label}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow icon={Mail} className="gap-3">
            {user?.email || "N/A"}
          </InfoRow>
          <InfoRow icon={Phone} className="gap-3">
            {user?.phoneNumber || "Not provided"}
          </InfoRow>
          <InfoRow icon={MapPin} className="gap-3">
            {[user?.city, user?.country].filter(Boolean).join(", ") ||
              "Not provided"}
          </InfoRow>
          {user?.address && (
            <InfoRow icon={User} className="gap-3">
              {user.address}
            </InfoRow>
          )}
        </CardContent>
      </Card>

      <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} />
    </Container>
  );
};

export default ProfilePage;
