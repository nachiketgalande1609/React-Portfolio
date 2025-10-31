import type { Experience, Project, Skill, SocialLink, TestimonialsData } from "../types";

// Import project images
import livoImage from "../assets/projects/livo.png";
import rippleImage from "../assets/projects/ripple.png";
import streamlineImage from "../assets/projects/streamline.png";
import urbanImage from "../assets/projects/urban.png";
import echoImage from "../assets/projects/echo.png";
import cryptoImage from "../assets/projects/crypto.jpg";
import flappyBirdImage from "../assets/projects/flappybird.png";
import vocabImage from "../assets/projects/vocab.png";
import tetrisImage from "../assets/projects/tetris.png";

// Import tech stack icons
import reactIcon from "../assets/icons/react.png";
import flaskIcon from "../assets/icons/flask.png";
import pythonIcon from "../assets/icons/python.svg";
import mongodbIcon from "../assets/icons/mongodb.svg";
import awsIcon from "../assets/icons/aws.webp";
import materialuiIcon from "../assets/icons/mui.png";
import reactnativeIcon from "../assets/icons/react.png";
import typescriptIcon from "../assets/icons/typescript.png";
import nodejsIcon from "../assets/icons/node.png";
import webrtcIcon from "../assets/icons/webrtc.svg";
import expressIcon from "../assets/icons/express.png";
import openaiIcon from "../assets/icons/openai.webp";
import azureIcon from "../assets/icons/azure.png";
import bootstrapIcon from "../assets/icons/bootstrap.svg";
import socketioIcon from "../assets/icons/socketio.webp";
import streamlitIcon from "../assets/icons/Streamlit.svg";
import pygameIcon from "../assets/icons/python.svg";
import pyttsx3Icon from "../assets/icons/python.svg";
import sqliteIcon from "../assets/icons/SQLite.svg";

// Import testimonial images
import AbhishekProfileImage from "../assets/testimonials/abhishek.jpg";
import SumitProfileImage from "../assets/testimonials/sumit.jpg";
import SudarshanProfileImage from "../assets/testimonials/sudarshan.jpg";

import CognitiveClassLogo from "../assets/certificates/cognitiveclass.png";
import CourseraLogo from "../assets/certificates/coursera.svg";
import GreatLearningLogo from "../assets/certificates/greatlearning.svg";
import HackerRankLogo from "../assets/certificates/hackerrank.png";
import OracleLogo from "../assets/certificates/oracle.png";
import SimpliLearnLogo from "../assets/certificates/simplilearn.svg";
import StudySectionLogo from "../assets/certificates/studySection-logo.png";

// Certificate Images
import AzureAZ900Image from "../assets/certificates/certificate_photos/az900.jpg";
import MongoDBImage from "../assets/certificates/certificate_photos/mongodb.jpg";
import GoogleDataAnalyticsImage from "../assets/certificates/certificate_photos/google-data-analytics.jpeg";
import OracleGenAIImage from "../assets/certificates/certificate_photos/oracle-gen-ai.png";
// import OracleAppIntegrationImage from "../assets/certificates/certificate_photos/oracle-app-integration.jpg";
// import OracleDataManagementImage from "../assets/certificates/certificate_photos/oracle-data-management.jpg";
import OracleAIImage from "../assets/certificates/certificate_photos/oracle-ai.png";
import OracleFoundationsImage from "../assets/certificates/certificate_photos/oracle-foundations.png";
// import OracleOCIFoundationsImage from "../assets/certificates/certificate_photos/oracle-oci-foundations.jpg";
import OraclePlatformIntegrationImage from "../assets/certificates/certificate_photos/oracle-platform-integration.png";
// import OracleArchitectImage from "../assets/certificates/certificate_photos/oracle-architect.jpg";
import AnalyzeDataImage from "../assets/certificates/certificate_photos/analyze-data.jpeg";
import DataDrivenDecisionsImage from "../assets/certificates/certificate_photos/data-driven-decisions.jpeg";
import DataAnalysisRImage from "../assets/certificates/certificate_photos/data-analysis-r.jpeg";
import PrepareDataImage from "../assets/certificates/certificate_photos/prepare-data.jpeg";
import ProcessDataImage from "../assets/certificates/certificate_photos/process-data.jpeg";
import DataVisualizationImage from "../assets/certificates/certificate_photos/data-visualization.jpeg";
import GoogleCapstoneImage from "../assets/certificates/certificate_photos/google-capstone.jpeg";
import DataFoundationsImage from "../assets/certificates/certificate_photos/data-foundations.jpeg";
import SQLFoundationImage from "../assets/certificates/certificate_photos/sql-foundation.png";
import PythonDataScienceImage from "../assets/certificates/certificate_photos/python-data-science.jpg";
import MachineLearningPythonImage from "../assets/certificates/certificate_photos/machine-learning-python.jpg";
import Python101Image from "../assets/certificates/certificate_photos/python-101.jpg";
import SQLDatabasesImage from "../assets/certificates/certificate_photos/sql-databases.jpg";
import DataAnalysisPythonImage from "../assets/certificates/certificate_photos/data-analysis-python.jpg";
import SimpliLearnDataScienceImage from "../assets/certificates/certificate_photos/simplilearn-data-science.jpg";
import JavaScriptBasicImage from "../assets/certificates/certificate_photos/javascript-basic.png";
import PythonBasicImage from "../assets/certificates/certificate_photos/python-basic.png";
import SinglePageWebsiteImage from "../assets/certificates/certificate_photos/single-page-website.jpeg";
import JavaScriptInteractivityImage from "../assets/certificates/certificate_photos/javascript-interactivity.jpeg";
import MongoDBIntroImage from "../assets/certificates/certificate_photos/mongodb-intro.jpg";
import SQLDataScienceImage from "../assets/certificates/certificate_photos/sql-data-science.jpeg";
import AIForEveryoneImage from "../assets/certificates/certificate_photos/ai-for-everyone.jpeg";
import GraphicDesignImage from "../assets/certificates/certificate_photos/graphic-design.jpeg";
import WebDevelopmentImage from "../assets/certificates/certificate_photos/web-development.jpeg";
import MeteorJSImage from "../assets/certificates/certificate_photos/meteor-js.jpeg";
import ResponsiveWebDesignImage from "../assets/certificates/certificate_photos/responsive-web-design.jpeg";
import WebsiteBasicsImage from "../assets/certificates/certificate_photos/website-basics.jpeg";
import WebsiteTutorialImage from "../assets/certificates/certificate_photos/website-tutorial.jpeg";
import WebAppDevelopmentImage from "../assets/certificates/certificate_photos/web-app-development.jpeg";

export const skills: Skill[] = [
    { name: "React", level: 90, category: "frontend" },
    { name: "TypeScript", level: 85, category: "frontend" },
    { name: "JavaScript", level: 95, category: "frontend" },
    { name: "HTML/CSS", level: 95, category: "frontend" },
    { name: "Node.js", level: 80, category: "backend" },
    { name: "Express", level: 75, category: "backend" },
    { name: "MongoDB", level: 70, category: "backend" },
    { name: "Git", level: 90, category: "tools" },
    { name: "AWS", level: 60, category: "tools" },
    { name: "Docker", level: 65, category: "tools" },
];

export const socialLinks: SocialLink[] = [
    { name: "GitHub", url: "https://github.com/nachiketgalande1609", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/nachiketgalande", icon: "linkedin" },
    { name: "Email", url: "mailto:nachiketgalande1609@gmail.com", icon: "email" },
];

export const personalInfo = {
    name: "Nachiket Galande",
    title: "Senior Full Stack Developer",
    location: "Mumbai, India",
    email: "nachiketgalande1609@gmail.com",
    phone: "+91 97649 93023",
    about: "Senior Full Stack Developer with 4.5 years of experience delivering scalable, high-performance web applications, specializing in system architecture, database design, performance optimization, and translating complex requirements into efficient solutions.",
};

export const projectsData = {
    projects: [
        {
            id: 1,
            name: "Workout & Diet Tracker – Livo",
            description:
                "A fitness tracking web application that allows users to manage workouts and diet plans. Features include progress tracking, workout scheduling, meal logging, and personalized dashboards. Backend APIs are built with Flask, while MongoDB stores user activity and nutrition data.",
            techStack: ["React", "Flask", "Python", "MongoDB", "AWS", "Material UI"],
            image: livoImage,
            liveLink: "https://livo.nachiketgalande.com/",
            githubLink: "https://github.com/nachiketgalande1609/dietplanner",
        },
        {
            id: 2,
            name: "Social Media App (Web & Mobile) - Ripple",
            description:
                "A scalable social media platform with real-time messaging, video calls, and expiring stories. Features include push notifications, media sharing, and end-to-end encryption. Deployed on AWS with containerized architecture using Docker.",
            techStack: ["React", "React Native", "TypeScript", "Node.js", "WebRTC", "AWS"],
            image: rippleImage,
            liveLink: "https://ripple.nachiketgalande.com/",
            githubLink: "https://nachiketgalande1609.github.io/ripple-links/",
        },
        {
            id: 3,
            name: "MERN-Based ERP System - Streamline",
            description:
                "Comprehensive ERP system with modules for users, inventory, orders, warehouses, customers, and sales. Provides a unified solution for business management with modern UI and efficient data handling.",
            techStack: ["React", "Node.js", "Express.js", "MongoDB", "Material UI"],
            image: streamlineImage,
            liveLink: "https://streamline.nachiketgalande.com/",
            githubLink: "https://github.com/nachiketgalande1609/Streamline",
        },
        {
            id: 4,
            name: "Generative Intelligence Speech Therapy - GIST",
            description:
                "Platform supporting children with autism through interactive modules and personalized learning experiences. Leverages generative AI for real-time therapist interaction and adaptive learning paths.",
            techStack: ["Flask", "Python", "Open AI", "SQLite"],
            image: "https://github.com/nachiketgalande1609/GIST/blob/main/static/screenshots/profile.png?raw=true",
            githubLink: "https://github.com/nachiketgalande1609/GIST",
        },
        {
            id: 5,
            name: "Gen AI Onboarding Assistant",
            description:
                "AI-powered assistant for project knowledge transfer, featuring document summarization and advanced Q&A capabilities. Deployed on Azure to enhance productivity for new team members with contextual understanding.",
            techStack: ["Flask", "Python", "OpenAI", "Azure"],
            image: "https://github.com/nachiketgalande1609/GenAI-Onboarding-Assistant/blob/main/static/screenshots/snap.png?raw=true",
            githubLink: "https://github.com/nachiketgalande1609/GenAI-Onboarding-Assistant",
        },
        {
            id: 6,
            name: "URBAN E-Commerce Platform",
            description:
                "Full-featured e-commerce platform with user authentication, product management, shopping cart, wishlists, and admin dashboard. Built with Flask and MongoDB for efficient data handling.",
            techStack: ["Flask", "MongoDB", "Bootstrap"],
            image: urbanImage,
            githubLink: "https://github.com/nachiketgalande1609/urban",
        },
        {
            id: 7,
            name: "Echo - Real-Time Chat",
            description:
                "Dynamic chat application with real-time messaging using WebSockets. Features user authentication, chat rooms, and message persistence with MongoDB for seamless communication experience.",
            techStack: ["Flask", "Socket.IO", "MongoDB"],
            image: echoImage,
            githubLink: "https://github.com/nachiketgalande1609/Echo",
        },
        {
            id: 8,
            name: "Cryptocurrency Price Prediction",
            description:
                "Web app for predicting Bitcoin and Ethereum prices using machine learning algorithms. Features data analysis, model training with historical data, and interactive visualizations. Published research in ICACCS 2021 journal.",
            techStack: ["Python", "Streamlit"],
            image: cryptoImage,
            githubLink: "https://github.com/nachiketgalande1609/Cryptocurrency_Price_Prediction_Using_Neural_Networks_and_Deep_Learning",
        },
        {
            id: 9,
            name: "Flappy Bird Game",
            description:
                "Classic Flappy Bird game implementation with Pygame. Features dynamic obstacle generation, collision detection, gravity mechanics, and sound effects for an engaging gaming experience.",
            techStack: ["Python", "Pygame"],
            image: flappyBirdImage,
            githubLink: "https://github.com/nachiketgalande1609/FlappyBird",
        },
        {
            id: 10,
            name: "English Vocabulary Builder",
            description:
                "Web application for vocabulary learning with quizzes and pronunciation features. Includes Barron's GRE word lists, multiple-choice quizzes, and text-to-speech functionality.",
            techStack: ["Flask", "Python", "pyttsx3"],
            image: vocabImage,
            githubLink: "https://github.com/nachiketgalande1609/English-Vocalbulary-Builder",
        },
        {
            id: 11,
            name: "Tetris Game",
            description:
                "Classic Tetris implementation with Pygame. Features smooth controls, shape rotation, collision detection, scoring system, and sound effects for an authentic gaming experience.",
            techStack: ["Python", "Pygame"],
            image: tetrisImage,
        },
    ],
};

export const techIcons: { [key: string]: string } = {
    React: reactIcon,
    Flask: flaskIcon,
    Python: pythonIcon,
    MongoDB: mongodbIcon,
    AWS: awsIcon,
    "Material UI": materialuiIcon,
    "React Native": reactnativeIcon,
    TypeScript: typescriptIcon,
    "Node.js": nodejsIcon,
    WebRTC: webrtcIcon,
    "Express.js": expressIcon,
    "Open AI": openaiIcon,
    Azure: azureIcon,
    Bootstrap: bootstrapIcon,
    "Socket.IO": socketioIcon,
    Streamlit: streamlitIcon,
    Pygame: pygameIcon,
    pyttsx3: pyttsx3Icon,
    SQLite: sqliteIcon,
};

export const experienceData: Experience[] = [
    {
        id: 1,
        company: "AB InBev (Via Accenture)",
        location: "",
        role: "Full Stack Software Developer",
        period: "May 2022 - Present",
        description: [
            "Collaborated directly with AB InBev's product team to develop a financial management solution that automated key workflows, reducing manual work by 30% and operational costs by 10–15%.",
            "Optimized database query performance by 15% on 10M+ records datasets through database optimization techniques.",
            "Reduced frontend load time by 20% using code splitting and lazy loading techniques.",
            "Scaled application performance by over 30% with a microservice architecture, supporting 1500+ concurrent users.",
            "Improved user experience by implementing asynchronous data export actions with Azure Function Apps.",
            "Engineered a 20% performance uplift by migrating large SQL datasets to Azure Databricks for efficient processing and analysis.",
            "Designed CI/CD pipelines on Azure DevOps, enabling automated builds and deployments",
            "Collaborated with stakeholders and UI/UX teams, conducted code reviews, supported UAT and Go-Live activities.",
        ],
        technologies: ["React.js", "Redux", "TypeScript", "Flask", "Databricks", "Azure SQL Server", "Azure DevOps"],
    },
    {
        id: 2,
        company: "Accenture",
        location: "",
        role: "Packaged Application Developer",
        period: "Jul 2021 - May 2022",
        description: [
            "Automated Oracle ERP user provisioning, reducing time from 5–10 hours to under 5 minutes.",
            "Utilized Dash and Plotly to create interactive dashboards for visualizing B2B EDI X12 transactions.",
            "Streamlined employee onboarding by developing a generative AI-powered tool, reducing training time by 30%.",
        ],
        technologies: ["Oracle OCI", "Oracle OIC", "Python", "OpenAI", "Azure"],
    },
];

export const testimonialsData: TestimonialsData = {
    testimonials: [
        {
            quote: "I highly recommend Nachiket, with whom I collaborated on Python-based machine learning and deep learning projects. His strong grasp of cloud technologies, particularly Azure Cloud, has greatly enhanced our project outcomes. Nachiket's passion, adaptability, and eagerness to learn make him a valuable team member. He made a significant impact on our undergraduate projects, driving innovation and achieving objectives. Nachiket's creative problem-solving skills ensure efficient task completion and project success. I confidently endorse Nachiket for any role that matches his skill set and aspirations. He is a talented individual who consistently delivers excellent results.",
            image: "https://media.licdn.com/dms/image/v2/D5603AQHDoPYEUIW5rQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1714244228097?e=2147483647&v=beta&t=JoDgwEkks6bNxrZtVf91hQzdcqziI1N6JMC3ni2PEg8",
            name: "Pratik Kakade",
            role: "Software Engineer | MS-CS Grad | 2x Hackathon Winner | ML | DL | NLP | Cloud | Full Stack | Distributed Systems | MLOps | C++, Java, Python, Spring Boot, React.js, Kubernetes",
        },
        {
            quote: "Nachiket is an exceptional software developer with an innate ability to conceive and deliver elegant and efficient software solutions. His meticulous attention to detail, passion for quality, and mastery of multiple programming languages and frameworks set him apart from his peers. Nachiket is also an excellent communicator and collaborative team player, consistently delivering high-quality work that exceeds expectations. It's been a pleasure to work with Nachiket, and I enthusiastically recommend him for any organization in need of a top-tier software developer.",
            image: SumitProfileImage,
            name: "Sumit Biswas",
            role: "Business Analyst + UX Designer @Canadiv",
        },
        {
            quote: "I highly recommend Nachiket for his exceptional skills and expertise in Data Analysis as well as ML/deployment of ML models. I have had the pleasure of working with him on several projects and have been consistently impressed by his professionalism, attention to detail, and ability to deliver outstanding results. Nachiket is a dedicated team player who is always willing to go above and beyond to ensure the success of the project. He possesses excellent communication skills and is able to work effectively with people from diverse backgrounds and cultures.",
            image: SudarshanProfileImage,
            name: "Sudarshan Sahare",
            role: "Data Integrity Specialist - Supply Chain Intelligence/Digital Solutions",
        },
        {
            quote: "I've known Nachiket since we were both students at MIT. Nachiket was always enthusiastic to broaden his horizons by learning new things. He was always keen to add value to every project he worked on. Going forward, I believe Nachiket will be a valuable asset to organisation he works for. I wish you best of luck for your future endeavours Nachiket",
            image: AbhishekProfileImage,
            name: "Abhishek Golhar",
            role: "Business Development Team - Nippon Steel Trading India Pvt Ltd | Ex - Confederation of Indian Industry B20 G20 India Secretariat | G20YEA - Yi Executive Member | International Affairs",
        },
    ],
};

export const certificatesData = [
    {
        title: "Microsoft Certified: Azure Fundamentals",
        organization: "Microsoft",
        date: "Sep 30, 2023",
        credential_url: "https://www.credly.com/badges/bc8344bd-4101-48cf-b607-f81a26399582/public_url",
        logo: azureIcon,
        image: AzureAZ900Image,
    },
    {
        title: "MongoDB SI Associate Certification",
        organization: "MongoDB",
        date: "Jul 16, 2024",
        credential_url: "https://learn.mongodb.com/c/PwfBrtmvQXO9wzmB5-Z7fQ",
        logo: mongodbIcon,
        image: MongoDBImage,
    },
    {
        title: "Google Data Analytics Professional Certificate",
        organization: "Coursera",
        date: "Apr 5, 2023",
        credential_url: "https://www.coursera.org/account/accomplishments/professional-cert/LPWZUM8BQEAG",
        logo: CourseraLogo,
        image: GoogleDataAnalyticsImage,
    },
    {
        title: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
        organization: "Oracle",
        date: "Jul 4, 2024",
        credential_url:
            "https://catalog-education.oracle.com/pls/certview/sharebadge?id=2145D90D0C304757F1B43473E4EC1A43BDECCFAD36D798E5C0DE748C388FD61D",
        logo: OracleLogo,
        image: OracleGenAIImage,
    },
    {
        title: "Oracle Cloud Infrastructure 2024 Certified Application Integration Professional",
        organization: "Oracle",
        date: "Jul 9, 2024",
        credential_url:
            "https://catalog-education.oracle.com/pls/certview/sharebadge?id=C2F30ED8123DA1CAB971E4FF371EF9D77BDCF25BE1C55357AFB91C0CA6976944",
        logo: OracleLogo,
        // image: OracleAppIntegrationImage
    },
    {
        title: "Oracle Cloud Data Management 2023 Certified Foundations Associate",
        organization: "Oracle",
        date: "Nov 28, 2023",
        credential_url:
            "https://catalog-education.oracle.com/pls/certview/sharebadge?id=6C197560DA45C3B71F7136D58A16C74FEA541507DD3C394EA338C740CB0CEAB4",
        logo: OracleLogo,
        // image: OracleDataManagementImage,
    },
    {
        title: "Oracle Cloud Infrastructure 2023 AI Certified Foundations Associate",
        organization: "Oracle",
        date: "Nov 28, 2023",
        credential_url:
            "https://catalog-education.oracle.com/pls/certview/sharebadge?id=16B0D775DB8BA87C75850CB6A0B10A854A2EF7C9B0F9BAB3BC4B95AFC2EE176A",
        logo: OracleLogo,
        image: OracleAIImage,
    },
    {
        title: "Oracle Cloud Infrastructure 2023 Certified Foundations Associate",
        organization: "Oracle",
        date: "Nov 30, 2023",
        credential_url:
            "https://catalog-education.oracle.com/pls/certview/sharebadge?id=426E14A2281CDA79977F2514577123561471D093120D1FD97BB1A7637F081737",
        logo: OracleLogo,
        image: OracleFoundationsImage,
    },
    {
        title: "Oracle Cloud Infrastructure Foundations 2021 Certified Associate",
        organization: "Oracle",
        date: "Nov 21, 2021",
        credential_url:
            "https://catalog-education.oracle.com/pls/certview/sharebadge?id=7B8D1021641B3EE84501970624D69B1E6E42DC73BD3307AFC930A0A61F31374E",
        logo: OracleLogo,
        // image: OracleOCIFoundationsImage,
    },
    {
        title: "Oracle Cloud Platform Application Integration 2021 Certified Specialist",
        organization: "Oracle",
        date: "Dec 15, 2021",
        credential_url:
            "https://catalog-education.oracle.com/pls/certview/sharebadge?id=E024D36A0627065FC6F4D9D54D785E1B26162076602130366AC1F8F30C614FD3",
        logo: OracleLogo,
        image: OraclePlatformIntegrationImage,
    },
    {
        title: "Oracle Cloud Infrastructure 2022 Certified Architect Associate",
        organization: "Oracle",
        date: "Jul 12, 2023",
        credential_url:
            "https://catalog-education.oracle.com/pls/certview/sharebadge?id=2145D90D0C304757F1B43473E4EC1A43560BCBC8CF24DC4E80D5359E4E5A696E",
        logo: OracleLogo,
        // image: OracleArchitectImage,
    },
    {
        title: "Analyze Data to Answer Questions",
        organization: "Coursera",
        date: "Mar 27, 2023",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/P5LPNYV49ZL5",
        logo: CourseraLogo,
        image: AnalyzeDataImage,
    },
    {
        title: "Ask Questions to Make Data-Driven Decisions",
        organization: "Coursera",
        date: "Mar 17, 2023",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/Z7XV29ARSD47",
        logo: CourseraLogo,
        image: DataDrivenDecisionsImage,
    },
    {
        title: "Data Analysis with R Programming",
        organization: "Coursera",
        date: "Mar 31, 2023",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/UMSMYGRCHARL",
        logo: CourseraLogo,
        image: DataAnalysisRImage,
    },
    {
        title: "Prepare Data for Exploration",
        organization: "Coursera",
        date: "Mar 18, 2023",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/4JXFWMKFLWKH",
        logo: CourseraLogo,
        image: PrepareDataImage,
    },
    {
        title: "Process Data from Dirty to Clean",
        organization: "Coursera",
        date: "Mar 20, 2023",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/NE669VELC2SB",
        logo: CourseraLogo,
        image: ProcessDataImage,
    },
    {
        title: "Share Data Through the Art of Visualization",
        organization: "Coursera",
        date: "Mar 31, 2023",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/TLVGMSSE9SP4",
        logo: CourseraLogo,
        image: DataVisualizationImage,
    },
    {
        title: "Google Data Analytics Capstone: Complete a Case Study",
        organization: "Coursera",
        date: "Mar 31, 2023",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/8XEPB5LXNTQT",
        logo: CourseraLogo,
        image: GoogleCapstoneImage,
    },
    {
        title: "Foundations: Data, Data, Everywhere",
        organization: "Coursera",
        date: "Mar 1, 2023",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/XXHS9U9Z9KRA",
        logo: CourseraLogo,
        image: DataFoundationsImage,
    },
    {
        title: "StudySection - Structured Query Language (SQL) (Foundation)",
        organization: "StudySection",
        date: "Mar 20, 2023",
        credential_url: "https://www.studysection.com/Users/socialMedia/NjQ0NTc2/bmFjaGlrZXQ0MjUxQGdtYWlsLmNvbQ%3D%3D",
        logo: StudySectionLogo,
        image: SQLFoundationImage,
    },
    {
        title: "Great Learning - Python for Data Science",
        organization: "Great Learning",
        date: "Feb 01, 2023",
        credential_url: "https://olympus1.mygreatlearning.com/course_certificate/HCPGUAIK",
        logo: GreatLearningLogo,
        image: PythonDataScienceImage,
    },
    {
        title: "Cognitive Class - Machine Learning with Python",
        organization: "Cognitive Class",
        date: "Feb 03, 2023",
        credential_url: "https://courses.cognitiveclass.ai/certificates/7cbef69a8a384d74a0229a3a15c5ca26",
        logo: CognitiveClassLogo,
        image: MachineLearningPythonImage,
    },
    {
        title: "Cognitive Class - Python 101 for Data Science",
        organization: "Cognitive Class",
        date: "Feb 03, 2023",
        credential_url: "https://courses.cognitiveclass.ai/certificates/755a17778d704809a1317692b3bae079",
        logo: CognitiveClassLogo,
        image: Python101Image,
    },
    {
        title: "Cognitive Class - SQL and Relational Databases 101",
        organization: "Cognitive Class",
        date: "Feb 03, 2023",
        credential_url: "https://courses.cognitiveclass.ai/certificates/36b6172490ea4b15a2e0286a82e4e938",
        logo: CognitiveClassLogo,
        image: SQLDatabasesImage,
    },
    {
        title: "Cognitive Class - Data Analysis with Python",
        organization: "Cognitive Class",
        date: "Jan 29, 2023",
        credential_url: "https://courses.cognitiveclass.ai/certificates/22747ab313a04e43a32c1064d45cff67",
        logo: CognitiveClassLogo,
        image: DataAnalysisPythonImage,
    },
    {
        title: "SimpliLearn - Data Science with Python",
        organization: "SimpliLearn",
        date: "Jan 01, 2023",
        credential_url: "https://simpli-web.app.link/e/OAiLzfsvMXb",
        logo: SimpliLearnLogo,
        image: SimpliLearnDataScienceImage,
    },
    {
        title: "HackerRank - JavaScript (Basic) Certificate",
        organization: "HackerRank",
        date: "Oct 14, 2020",
        credential_url: "https://www.hackerrank.com/certificates/305cdf8f6ccf",
        logo: HackerRankLogo,
        image: JavaScriptBasicImage,
    },
    {
        title: "HackerRank - Python (Basic) Certificate",
        organization: "HackerRank",
        date: "Oct 14, 2020",
        credential_url: "https://www.hackerrank.com/certificates/287468fb067f",
        logo: HackerRankLogo,
        image: PythonBasicImage,
    },
    {
        title: "HTML and CSS: Building a Single-Page Website",
        organization: "Coursera",
        date: "Sep 5, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/PFRAGQE24ULC",
        logo: CourseraLogo,
        image: SinglePageWebsiteImage,
    },
    {
        title: "Interactivity with JavaScript",
        organization: "Coursera",
        date: "Sep 6, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/X5L667WRXSN4",
        logo: CourseraLogo,
        image: JavaScriptInteractivityImage,
    },
    {
        title: "Introduction to MongoDB",
        organization: "Coursera",
        date: "Sep 4, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/MD7S5FKLDRZA",
        logo: CourseraLogo,
        image: MongoDBIntroImage,
    },
    {
        title: "SQL for Data Science",
        organization: "Coursera",
        date: "Sep 1, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/VMFZ3JXKCAMD",
        logo: CourseraLogo,
        image: SQLDataScienceImage,
    },
    {
        title: "AI For Everyone",
        organization: "Coursera",
        date: "Aug 15, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/EMSWP73PWT3D",
        logo: CourseraLogo,
        image: AIForEveryoneImage,
    },
    {
        title: "Graphic Design",
        organization: "Coursera",
        date: "Aug 17, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/QZ2S53FRLJ22",
        logo: CourseraLogo,
        image: GraphicDesignImage,
    },
    {
        title: "HTML, CSS, and Javascript for Web Developers",
        organization: "Coursera",
        date: "Aug 16, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/GBZF82CUZPG8",
        logo: CourseraLogo,
        image: WebDevelopmentImage,
    },
    {
        title: "Introduction to Meteor.js Development",
        organization: "Coursera",
        date: "Aug 29, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/ZNS6SC6SSGC9",
        logo: CourseraLogo,
        image: MeteorJSImage,
    },
    {
        title: "Responsive Web Design",
        organization: "Coursera",
        date: "Aug 24, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/EEUK842BG4T8",
        logo: CourseraLogo,
        image: ResponsiveWebDesignImage,
    },
    {
        title: "Responsive Website Basics: Code with HTML, CSS, and JavaScript",
        organization: "Coursera",
        date: "Aug 23, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/GEWQD398PABX",
        logo: CourseraLogo,
        image: WebsiteBasicsImage,
    },
    {
        title: "Responsive Website Tutorial and Examples",
        organization: "Coursera",
        date: "Aug 30, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/5FVKAKEEJR27",
        logo: CourseraLogo,
        image: WebsiteTutorialImage,
    },
    {
        title: "Web Application Development with JavaScript and MongoDB",
        organization: "Coursera",
        date: "Aug 29, 2020",
        credential_url: "https://www.coursera.org/account/accomplishments/verify/RX6X84T2ZS4F",
        logo: CourseraLogo,
        image: WebAppDevelopmentImage,
    },
];
