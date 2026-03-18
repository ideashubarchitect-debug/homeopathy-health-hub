import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import drGeeta from "@/assets/dr-geeta.jpg";
import { Award, BookOpen, Heart, Users } from "lucide-react";

const credentials = [
  { icon: BookOpen, title: "BHMS", desc: "Bachelor of Homeopathic Medicine & Surgery (5.5 years), graduated 2015 from Homeopathic Medical College & Hospital, Chandigarh, India" },
  { icon: Award, title: "RAHom", desc: "Registered with the Alberta Homeopathic Association as a licensed practitioner" },
  { icon: Heart, title: "Clinical Training", desc: "One year of supervised clinical training under experienced practitioners, plus hands-on experience at Dr. Kent Homoeo Clinic, Sirsa under Dr. Davinder Singh Jhandu" },
  { icon: Users, title: "Specializations", desc: "Women's health, children's health, and care for individuals of all ages and backgrounds" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Image */}
            <div className="relative">
              <div className="w-full max-w-md mx-auto lg:mx-0 aspect-[3/4] overflow-hidden shadow-lg">
                <img
                  src={drGeeta}
                  alt="Geeta — Clinical Homeopath"
                  className="w-full h-full object-cover object-top scale-125"
                />
              </div>
              <div className="mt-6 text-center lg:text-left">
                <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Clinical Homeopathy
                </p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-primary mb-4">
                Meet Your Homeopath
              </p>
              <h1 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] text-foreground mb-2">
                Geeta
              </h1>
              <p className="font-mono-ui text-sm text-muted-foreground mb-8">
                BHMS, RAHom
              </p>

              <div className="space-y-6 font-body text-base leading-relaxed text-muted-foreground">
                <p>
                  Geeta is a licensed homeopath with the Alberta Homeopathic Association. She completed her 5.5-year Bachelor of Homeopathic Medicine and Surgery (BHMS) in 2015 from a Homeopathic Medical College and Hospital in Chandigarh, India, which included one year of supervised clinical training under experienced practitioners.
                </p>
                <p>
                  She also gained valuable hands-on experience at Dr. Kent Homoeo Clinic in Sirsa under the guidance of Dr. Davinder Singh Jhandu.
                </p>
                <p>
                  One of her notable accomplishments includes achieving significant symptom regression, effectively reversing a patient's clinical presentation. Geeta is driven by a vision to make homeopathy accessible to those seeking natural treatment options without harsh side effects, helping her patients benefit from her deep knowledge and passion for homeopathy.
                </p>
                <p>
                  As a busy working mother, Geeta has a strong understanding of women's and children's health concerns. At the same time, she provides care to a diverse patient base, serving individuals of all ages and backgrounds.
                </p>
              </div>

              <div className="mt-10">
                <a
                  href="https://calendly.com/naazhomeowellness/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-primary text-primary-foreground text-sm font-body font-medium tracking-wide hover:bg-accent hover:text-accent-foreground border border-primary transition-all duration-200"
                >
                  Book a Consultation with Dr. Geeta
                </a>
              </div>
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            {credentials.map((c) => (
              <div key={c.title} className="p-8 border border-border hover:border-primary/30 transition-colors duration-200">
                <c.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">{c.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
