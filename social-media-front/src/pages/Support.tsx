"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { FileText, Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

function FilePreview({ files }: { files: FileList | null }) {
  if (!files || files.length === 0) return null;

  return (
    <div className="mt-2 space-y-2">
      {Array.from(files).map((file, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <FileText className="h-4 w-4" />
          <span>{file.name}</span>
          <span className="text-xs">
            ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        </div>
      ))}
    </div>
  );
}

// Schema for contact form validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  studentId: z.string().min(5, { message: "Please enter a valid student ID" }),
  program: z.string().min(2, { message: "Please select your program" }),
  year: z.enum(["1st", "2nd", "3rd", "4th", "5th", "graduate"], {
    required_error: "Please select your year of study",
  }),
  category: z.enum(
    [
      "academic",
      "financial",
      "housing",
      "health",
      "counseling",
      "activities",
      "documentation",
      "other",
    ],
    {
      required_error: "Please select a category",
    }
  ),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority level",
  }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters long" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(500, { message: "Message cannot exceed 500 characters" }),
  attachments: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => {
        if (!files) return true;
        return Array.from(files).every((file) => file.size <= 5 * 1024 * 1024);
      },
      {
        message: "Each file must be 5MB or less",
      }
    )
    .refine(
      (files) => {
        if (!files) return true;
        const validTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
        ];
        return Array.from(files).every((file) =>
          validTypes.includes(file.type)
        );
      },
      {
        message:
          "Invalid file type. Please upload PDF, DOC, DOCX, JPG, or PNG files",
      }
    ),
});

// Add a subtle hover effect to form sections
const formSectionClasses =
  "rounded-lg border bg-card text-card-foreground shadow-sm p-6 transition-all duration-200 hover:shadow-md hover:border-primary/20 relative group";

// Add a gradient overlay effect
const gradientOverlayClasses =
  "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-200 rounded-lg pointer-events-none group-hover:opacity-100";

// Update the section number style
const sectionNumberClasses =
  "h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary";

export default function Support() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setReferenceNumber] = useState<string | null>(null);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [isDraftLoading, setIsDraftLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      studentId: "",
      program: "",
      year: "1st",
      category: "academic",
      priority: "medium",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a reference number
      const ref = `SUP-${Date.now().toString(36).toUpperCase()}`;
      setReferenceNumber(ref);

      console.log(values);
      toast.success(
        <div className="flex flex-col gap-1">
          <div>Your message has been sent successfully!</div>
          <div className="text-sm text-muted-foreground">
            Reference number: <span className="font-mono">{ref}</span>
          </div>
        </div>
      );
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form", error);
      toast.error("Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Add reset handler
  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear the form?")) {
      form.reset();
    }
  };

  // Add character count color utility
  const getCharacterCountColor = (length: number) => {
    if (length >= 450) return "text-red-500 font-medium";
    if (length >= 400) return "text-yellow-500";
    if (length >= 350) return "text-orange-500";
    return "text-muted-foreground";
  };

  const saveDraft = () => {
    setIsDraftSaving(true);
    const formData = form.getValues();
    localStorage.setItem("support-form-draft", JSON.stringify(formData));

    toast.success(
      <div className="flex items-center gap-2">
        <span>Draft saved</span>
        <Button
          variant="link"
          className="h-auto p-0 text-primary"
          onClick={() => localStorage.removeItem("support-form-draft")}
        >
          Undo
        </Button>
      </div>
    );

    setIsDraftSaving(false);
  };

  useEffect(() => {
    const savedDraft = localStorage.getItem("support-form-draft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        form.reset(parsedDraft);
        toast.info("Draft restored", {
          description: "Your previous draft has been loaded.",
          action: {
            label: "Clear",
            onClick: () => {
              localStorage.removeItem("support-form-draft");
              form.reset();
            },
          },
        });
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
    setIsDraftLoading(false);
  }, []);

  useEffect(() => {
    const formValues = form.getValues();
    const debouncedSave = setTimeout(() => {
      if (Object.values(formValues).some((value) => value)) {
        localStorage.setItem("support-form-draft", JSON.stringify(formValues));
      }
    }, 1000);

    return () => clearTimeout(debouncedSave);
  }, [form.watch()]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      {/* Update hero section with more dynamic gradient */}
      <>
        <div className="container mx-auto px-4 pt-10">
          <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-black to-white bg-clip-text text-transparent animate-in slide-in-from-left duration-500">
            Contact Support
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed animate-in slide-in-from-left duration-500 delay-150">
            Our dedicated support team is here to help. We typically respond
            within 24-48 business hours. For urgent matters, please mark your
            request as high priority.
          </p>
        </div>
      </>

      {/* Update form sections to use new classes */}
      <div className="container mx-auto px-4 py-12">
        {isDraftLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
              <p className="text-sm text-muted-foreground animate-pulse">
                Loading your form...
              </p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 animate-in fade-in duration-500"
            >
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Left column */}
                <div className="lg:col-span-1 space-y-6">
                  <div className={formSectionClasses}>
                    <div className={gradientOverlayClasses} />
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                      <span className={sectionNumberClasses}>1</span>
                      Personal Information
                    </h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="name">
                              Name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="name"
                                placeholder="Enter your full name"
                                className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="studentId"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="studentId">
                              Student ID <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="studentId"
                                placeholder="Enter your student ID"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="email">
                              Email <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="email"
                                placeholder="your.email@university.edu"
                                type="email"
                                autoComplete="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className={formSectionClasses}>
                    <div className={gradientOverlayClasses} />
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                      <span className={sectionNumberClasses}>2</span>
                      Academic Details
                    </h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="program"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="program">
                              Program <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 hover:border-primary/50 focus:border-primary">
                                  <SelectValue placeholder="Select your program" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="digital&intelligence">
                                  Pole Degital & Intelligence Artificial
                                </SelectItem>
                                <SelectItem value="gestion&commerce">
                                  Pole Gestion & Commerce
                                </SelectItem>
                                <SelectItem value="sante">
                                  Pole Sante
                                </SelectItem>
                                <SelectItem value="tourisme&hotellerie&restauration">
                                  Pole Tourisme, Hotellerie & Restauration
                                </SelectItem>
                                <SelectItem value="industrie">
                                  Pole Industrie
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="year">
                              Year of Study{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1st">1st Year</SelectItem>
                                <SelectItem value="2nd">2nd Year</SelectItem>
                                <SelectItem value="graduate">
                                  Graduate
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Right column - Support Details & Message */}
                <div className="lg:col-span-2 space-y-6">
                  <div className={formSectionClasses}>
                    <div className={gradientOverlayClasses} />
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                      <span className={sectionNumberClasses}>3</span>
                      Support Request
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 mb-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="category">
                              Support Category{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="academic">
                                  Academic Support
                                </SelectItem>
                                <SelectItem value="financial">
                                  Financial Aid
                                </SelectItem>
                                <SelectItem value="housing">
                                  Housing & Accommodation
                                </SelectItem>
                                <SelectItem value="health">
                                  Health Services
                                </SelectItem>
                                <SelectItem value="counseling">
                                  Counseling Services
                                </SelectItem>
                                <SelectItem value="activities">
                                  Student Activities
                                </SelectItem>
                                <SelectItem value="documentation">
                                  Documentation Request
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="priority">
                              Priority <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select priority level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="subject">
                              Subject <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="subject"
                                placeholder="What is this regarding?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="grid gap-2 sm:col-span-2">
                            <FormLabel htmlFor="message">
                              Message Details{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Textarea
                                  id="message"
                                  placeholder="Please provide detailed information about your inquiry..."
                                  className="min-h-[120px] resize-y"
                                  {...field}
                                />
                                <div
                                  className={`absolute bottom-2 right-2 text-xs font-medium ${getCharacterCountColor(
                                    field.value.length
                                  )}`}
                                >
                                  {field.value.length}/500
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className={formSectionClasses}>
                    <div className={gradientOverlayClasses} />
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                      <span className={sectionNumberClasses}>4</span>
                      Attachments
                    </h2>
                    <FormField
                      control={form.control}
                      name="attachments"
                      render={({ field }) => (
                        <FormItem className="grid gap-2 sm:col-span-2">
                          <FormLabel>
                            Attachments{" "}
                            <span className="text-muted-foreground">
                              (Optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              multiple
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => field.onChange(e.target.files)}
                              className="cursor-pointer"
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground">
                            Supported formats: PDF, DOC, DOCX, JPG, PNG (max 5MB
                            each)
                          </p>
                          <FormMessage />
                          <FilePreview files={field.value || null} />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Update footer section */}
              <div className="mt-8 border-t pt-8 animate-in slide-in-from-bottom duration-500">
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <div className="rounded-lg border bg-muted/50 p-6 backdrop-blur-sm transition-all duration-200 hover:shadow-md">
                      <h3 className="font-medium mb-2">Before submitting</h3>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• Ensure all required fields are filled</li>
                        <li>• Check your contact information</li>
                        <li>• Review your message for clarity</li>
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="flex flex-col gap-4">
                      <div className="rounded-lg border bg-muted/50 p-6 backdrop-blur-sm">
                        <p className="text-sm text-muted-foreground">
                          By submitting this form, you agree to our privacy
                          policy and terms of service. Your information will be
                          handled confidentially.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          size="lg"
                          className="flex-1 min-w-[200px] bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending Request
                            </>
                          ) : (
                            "Submit Support Request"
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          onClick={saveDraft}
                          disabled={isDraftSaving}
                        >
                          {isDraftSaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving
                            </>
                          ) : (
                            "Save Draft"
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="lg"
                          onClick={handleReset}
                          disabled={isSubmitting}
                        >
                          Clear Form
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
