import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Target, Award, Shield, Handshake } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: "Ahmed Al-Rashid",
      position: "CEO & Founder",
      positionAr: "الرئيس التنفيذي والمؤسس",
      description: "Leading Arab Auto with vision and passion for automotive excellence.",
      descriptionAr: "يقود عرب أوتو برؤية وشغف لتميز السيارات.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Sarah Al-Zahra",
      position: "Sales Director",
      positionAr: "مديرة المبيعات",
      description: "Expert in luxury automotive sales with over 10 years of experience.",
      descriptionAr: "خبيرة في مبيعات السيارات الفاخرة مع أكثر من 10 سنوات خبرة.",
      image: "https://pixabay.com/get/g7bcf2f331bd85b16820b71631f9b94efa2435cfe5c3502c33ddf47ac3b409dd4d4c7133d724ffb34f0f3a2a38b559e372df4e2ad0735f67612940149f0545ecd_1280.jpg"
    },
    {
      name: "Omar Al-Mansouri",
      position: "Service Manager",
      positionAr: "مدير الخدمة",
      description: "Ensuring every customer receives exceptional service and support.",
      descriptionAr: "يضمن حصول كل عميل على خدمة ودعم استثنائي.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-about-title">
            {t('about.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-about-subtitle">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <img 
              src="https://pixabay.com/get/g7f193d0e902e0f2e7b60886d230d85a5e02ef99df43acaee87374b99368000a84443e69aecd4d8fa992dbec8d5dd9aa562574625f37563360eff131a99077c56_1280.jpg" 
              alt="Arab Auto Showroom" 
              className="rounded-lg shadow-lg w-full"
              data-testid="img-showroom"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="text-story-title">
              {t('about.story.title')}
            </h2>
            <p className="text-muted-foreground mb-4" data-testid="text-story-p1">
              {t('about.story.p1')}
            </p>
            <p className="text-muted-foreground mb-6" data-testid="text-story-p2">
              {t('about.story.p2')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-primary" data-testid="text-years-experience">15+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.experience')}</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-primary" data-testid="text-happy-customers">5000+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.customers')}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          <Card className="h-full">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Eye className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4" data-testid="text-vision-title">
                {t('about.vision.title')}
              </h3>
              <p className="text-muted-foreground" data-testid="text-vision-desc">
                {t('about.vision.desc')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Target className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4" data-testid="text-mission-title">
                {t('about.mission.title')}
              </h3>
              <p className="text-muted-foreground" data-testid="text-mission-desc">
                {t('about.mission.desc')}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-team-title">
              {t('about.team.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                      data-testid={`img-team-member-${index}`}
                    />
                    <h3 className="text-xl font-semibold mb-2" data-testid={`text-member-name-${index}`}>
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground mb-2" data-testid={`text-member-position-${index}`}>
                      {member.position}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-member-desc-${index}`}>
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
