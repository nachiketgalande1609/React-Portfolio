export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl?: string;
    image: string;
}

export interface Skill {
    name: string;
    level: number;
    category: "frontend" | "backend" | "tools";
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface Experience {
    id: number;
    company: string;
    location: string;
    role: string;
    period: string;
    description: string[];
    technologies: string[];
}

export interface Testimonial {
    quote: string;
    image: string;
    name: string;
    role: string;
}

export interface TestimonialsData {
    testimonials: Testimonial[];
}

export interface ReconmendationCardProps {
    testimonial: Testimonial;
    index: number;
    currentCard: number;
    totalCards: number;
}
