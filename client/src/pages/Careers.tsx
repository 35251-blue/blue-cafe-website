import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Loader2, Upload, CheckCircle2, Briefcase, DollarSign, Clock, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Careers() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    previousJob1: "",
    previousJob2: "",
    experience: "",
    availability: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyMutation = trpc.careers.submitApplication.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success("Application submitted successfully! 🎉");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit application. Please try again.");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Resume file must be less than 5MB");
        return;
      }
      // Check file type
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      
      applyMutation.mutate({
        ...formData,
        resumeData: base64,
        resumeFileName: resumeFile.name,
        resumeFileType: resumeFile.type,
      });
    };
    reader.readAsDataURL(resumeFile);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-background border-4 border-foreground neo-shadow p-8 md:p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-accent rounded-full border-4 border-foreground flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-foreground" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="font-display font-black text-4xl md:text-5xl uppercase">
                Application Received!
              </h1>
              <p className="font-sans text-lg text-muted-foreground">
                Thank you for applying to Blue Cafe Miami. We'll review your application and get back to you within 3-5 business days.
              </p>
            </div>

            <div className="pt-4">
              <a href="/" className="inline-block">
                <Button className="h-12 px-8 text-lg font-bold bg-primary text-primary-foreground border-2 border-foreground neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-none">
                  Back to Home
                </Button>
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-secondary to-accent py-16 md:py-24 border-b-4 border-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-block bg-accent px-4 py-2 border-2 border-foreground neo-shadow -rotate-2">
                <span className="font-display font-bold text-foreground uppercase tracking-widest">Join Our Team</span>
              </div>
              <h1 className="font-display font-black text-5xl md:text-7xl leading-tight text-white">
                WE'RE <span className="text-foreground">HIRING!</span>
              </h1>
              <p className="font-sans text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Be part of Miami's coolest cafe experience. We're looking for passionate people to join the Blue Cafe family.
              </p>
            </div>
          </div>
        </section>

        {/* Job Listing */}
        <section className="py-16 md:py-20 border-b-4 border-foreground">
          <div className="container max-w-4xl">
            <div className="bg-background border-4 border-foreground neo-shadow p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary border-2 border-foreground flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display font-black text-3xl md:text-4xl uppercase mb-2">
                    Cashier / Customer Service
                  </h2>
                  <p className="text-muted-foreground font-sans text-lg">Full-time • Miami, FL</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 p-4 bg-accent/10 border-2 border-accent">
                  <DollarSign className="w-6 h-6 text-accent" />
                  <div>
                    <div className="font-bold">Competitive Pay</div>
                    <div className="text-sm text-muted-foreground">+ Tips</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/10 border-2 border-secondary">
                  <Clock className="w-6 h-6 text-secondary" />
                  <div>
                    <div className="font-bold">Flexible Hours</div>
                    <div className="text-sm text-muted-foreground">Full-time</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary/10 border-2 border-primary">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-bold">Great Team</div>
                    <div className="text-sm text-muted-foreground">Fun environment</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="font-display font-bold text-xl mb-3 text-primary">What We're Looking For</h3>
                  <ul className="space-y-2 font-sans text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Fluent in English</strong> - excellent communication skills required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Customer service experience</strong> - previous cashier or hospitality experience preferred</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Friendly & energetic</strong> - positive attitude and team player</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Reliable</strong> - punctual and responsible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Fast learner</strong> - able to work in a fast-paced environment</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl mb-3 text-secondary">Responsibilities</h3>
                  <ul className="space-y-2 font-sans text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold">•</span>
                      <span>Process customer orders and payments accurately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold">•</span>
                      <span>Provide excellent customer service with a smile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold">•</span>
                      <span>Maintain cleanliness and organization of work area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold">•</span>
                      <span>Answer customer questions about menu items</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold">•</span>
                      <span>Work collaboratively with team members</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase mb-4">
                Apply <span className="text-primary">Now</span>
              </h2>
              <p className="font-sans text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you soon!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-background border-4 border-foreground neo-shadow p-8 md:p-12 space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-2xl uppercase border-b-2 border-primary pb-2">
                  Personal Information
                </h3>
                
                <div>
                  <label className="block font-bold mb-2">Full Name *</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-12 border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-2">Email *</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2">Phone *</label>
                    <Input
                      type="tel"
                      placeholder="(305) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-2xl uppercase border-b-2 border-secondary pb-2">
                  Work Experience
                </h3>
                
                <div>
                  <label className="block font-bold mb-2">Previous Job #1 (Most Recent) *</label>
                  <Input
                    type="text"
                    placeholder="e.g., Cashier at Starbucks (2022-2024)"
                    value={formData.previousJob1}
                    onChange={(e) => setFormData({ ...formData, previousJob1: e.target.value })}
                    className="h-12 border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2">Previous Job #2</label>
                  <Input
                    type="text"
                    placeholder="e.g., Server at Local Restaurant (2020-2022)"
                    value={formData.previousJob2}
                    onChange={(e) => setFormData({ ...formData, previousJob2: e.target.value })}
                    className="h-12 border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2">Tell us about your customer service experience *</label>
                  <Textarea
                    placeholder="Describe your experience working with customers, handling payments, and working in a team..."
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="min-h-32 border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2">Availability *</label>
                  <Textarea
                    placeholder="When are you available to work? (e.g., Weekdays 9am-5pm, Weekends, Flexible)"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="min-h-24 border-2 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary resize-none"
                    required
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-2xl uppercase border-b-2 border-accent pb-2">
                  Resume
                </h3>
                
                <div>
                  <label className="block font-bold mb-2">Upload Resume (PDF or Word) *</label>
                  <div className="border-2 border-dashed border-foreground p-6 text-center space-y-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <div className="flex flex-col items-center gap-3">
                      <Upload className="w-12 h-12 text-muted-foreground" />
                      {resumeFile ? (
                        <div className="space-y-2">
                          <p className="font-bold text-primary">{resumeFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(resumeFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No file selected</p>
                      )}
                    </div>
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-accent text-accent-foreground border-2 border-foreground neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-none"
                    >
                      {resumeFile ? "Change File" : "Choose File"}
                    </Button>
                    <p className="text-xs text-muted-foreground">Max file size: 5MB</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={applyMutation.isPending}
                  className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground border-2 border-foreground neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applyMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
