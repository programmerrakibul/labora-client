import Container from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldInput,
  FieldTextarea,
  FieldError,
} from "@/components/forms/form-field";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const contactInfo = [
  { icon: Mail, title: "Email", value: "support@labora.com" },
  { icon: Phone, title: "Phone", value: "+880 1234-567890" },
  { icon: MapPin, title: "Location", value: "Dhaka, Bangladesh" },
  { icon: Clock, title: "Hours", value: "Mon-Fri, 9AM - 6PM" },
];

const faqs = [
  { q: "How do I create an account?", a: "Click Sign Up and fill in your details. Choose your role as Job Seeker or Recruiter." },
  { q: "How do I apply for a job?", a: "Navigate to a job listing, click Apply Now, and submit your resume URL and cover letter." },
  { q: "Can I post jobs as a recruiter?", a: "Yes! Sign up as a Recruiter and use the dashboard to post and manage jobs." },
  { q: "Is Labora free to use?", a: "Yes, Labora is free for job seekers. Recruiters can post jobs for free as well." },
];

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    reset();
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a question? We&apos;d love to hear from you.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              {submitted && (
                <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Thank you! Your message has been sent.
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel required>Name</FieldLabel>
                        <FieldInput {...field} error={fieldState.error} />
                        <FieldError error={fieldState.error} />
                      </Field>
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel required>Email</FieldLabel>
                        <FieldInput type="email" {...field} error={fieldState.error} />
                        <FieldError error={fieldState.error} />
                      </Field>
                    )}
                  />
                </div>
                <Controller
                  name="subject"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel required>Subject</FieldLabel>
                      <FieldInput {...field} error={fieldState.error} />
                      <FieldError error={fieldState.error} />
                    </Field>
                  )}
                />
                <Controller
                  name="message"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel required>Message</FieldLabel>
                      <FieldTextarea rows={5} {...field} error={fieldState.error} />
                      <FieldError error={fieldState.error} />
                    </Field>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((info) => (
                  <Card key={info.title}>
                    <CardContent className="flex items-start gap-3 pt-6">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{info.title}</p>
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold">FAQs</h3>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <Card key={i}>
                      <CardContent className="pt-4">
                        <p className="font-medium">{faq.q}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
