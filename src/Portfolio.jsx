import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { SiJavascript, SiPython, SiC, SiReact, SiTailwindcss, SiGithub, SiGit, SiHtml5, SiCss3, SiLaravel, SiBootstrap, SiMysql, SiPhpmyadmin, SiWordpress, SiVercel, SiVite, SiMinutemailer} from "react-icons/si";
import { FaJava, FaLinkedin, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,FaNodeJs } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { HiMenu, HiX } from "react-icons/hi";
import { Typewriter } from "react-simple-typewriter";
import emailjs from "@emailjs/browser";
import ParticleBackground from "./components/ParticleBackground";

// Fade-in animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const formRef = useRef();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- EmailJS Send Function ---
  const sendEmail = (e) => {
    e.preventDefault();

    // Contact notification to yourself
    emailjs.sendForm(
      "service_lwltlie",       // your EmailJS service ID
      "template_cuiuxz8",      // contact template ID
      formRef.current,
      "qxTR9CY7rVw0z4kBp"      // public key
    ).then(
      (result) => {
        console.log("Contact email sent:", result.text);

        // Auto-reply to user
        const autoReplyParams = {
          to_email: e.target.email.value,
          from_name: "Yashwin",
          name: e.target.name.value,
          title: "Contact Form Submission",
        };

        emailjs.send(
          "service_lwltlie",       // same service ID
          "template_ydvh1ce",     // auto-reply template ID
          autoReplyParams,
          "qxTR9CY7rVw0z4kBp"     // public key
        ).then(() => {
          alert("Message sent successfully! Check your email for confirmation.");
        }).catch((err) => {
          console.log("Auto-reply error:", err.text);
        });

        e.target.reset();
      },
      (error) => {
        console.log("Contact email error:", error.text);
        alert("Failed to send message, please try again.");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-purple-900 text-gray-50 font-sans transition-colors duration-500">
      
      <ParticleBackground />

    {/* Fixed Navbar */}
<div
  className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md z-50 shadow-xl font-serif"
  ref={menuRef}
>
  <div className="px-6 py-2 flex justify-between items-center">
    {/* Logo */}
    <h1 className="text-xl font-extrabold text-purple-400 tracking-wider">Yashwin</h1>

    {/* Hamburger Button */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="text-2xl text-gray-50 focus:outline-none"
    >
      {menuOpen ? <HiX /> : <HiMenu />}
    </button>
  </div>

  {/* Dropdown Menu */}
  <div
    className={`overflow-hidden bg-black/90 w-56 absolute right-6 top-full rounded-b-xl shadow-lg transition-all duration-300 ease-in-out
      ${menuOpen ? "max-h-96 py-2" : "max-h-0 py-0"}`}
  >
    <ul className="flex flex-col gap-2 text-base font-medium px-4">
      {/* Navigation Links */}
      {["about", "skills", "projects", "Education", "Achievements", "contact"].map((section) => (
        <li key={section}>
          <a
            href={`#${section}`}
            className="block px-2 py-1 hover:text-pink-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        </li>
      ))}

      {/* Divider */}
      <hr className="my-2 border-purple-700" />

      {/* Email & Phone at the bottom - use same font as links */}
      <li className="flex items-center gap-2 text-purple-300 text-sm hover:text-pink-400 transition -mt-2">
        <i className="fas fa-envelope"></i>
        <a href="mailto:yashwin12114@gmail.com" onClick={() => setMenuOpen(false)}>
          yashwin12114@gmail.com
        </a>
      </li>
    </ul>
  </div>
</div>

    <div className="relative z-10">
      {/* Spacer to prevent content hiding behind fixed navbar */}
      <div className="h-14"></div>

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center p-12 text-center font-mono">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-purple-900 mx-auto mb-7">
            <img src="/myphoto.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-pink-400 font-serif">
            Hi, I'm <span className="text-purple-100">Yashwin Sivakumar</span>
          </h2>
          <p className="text-lg mb-8 font-light text-purple-200 max-w-2xl mx-auto font-sans">
            I am a passionate developer building modern web and mobile applications.
          </p>
          <h2 className="text-xl md:text-2xl font-medium tracking-wide font-serif text-gray-300">
            <Typewriter
              words={[
                "I am an undergraduate student",
                "I build Web Applications",
                "I code with Python and Java",
                "I Learn ~ I Improve ~ I Grow"
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </h2>
          <br />
          <div className="flex flex-row justify-center">
            <a
              href="/Yashwin-CV.pdf"
              download
              className="bg-purple-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-900 transition font-medium tracking-wide font-serif shadow-purple-500/70 hover:shadow-purple-600/90"
              style={{ boxShadow: "0 0 15px 3px rgba(76, 36, 119, 1)" }}
            >
              Download CV
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className="container mx-auto p-12 text-center font-serif"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-extrabold mb-6 tracking-wide text-pink-400 text-center inline-block relative after:content-[''] after:block after:w-1/2 after:mx-auto after:border-b-2 after:border-white after:mt-1">
          About Me
        </h3>
        <p className="max-w-3xl mx-auto leading-relaxed font-light text-purple-200 mt-4 font-sans">
          BSc Computer Science Undergraduate student and web developer, skilled in HTML, CSS, React, Tailwind CSS, and modern JavaScript. 
          Im Passionate about building interactive web and mobile apps, with interests in AI, machine learning, and data science.
        </p>
      </motion.section>

{/* Skills Section */}
<motion.section
  id="skills"
  className="p-6 sm:p-12 text-center font-serif"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
  transition={{ duration: 0.8 }}
>
  <h3 className="text-3xl font-extrabold mb-10 text-center tracking-wide text-pink-400 inline-block relative after:content-[''] after:block after:w-1/2 after:mx-auto after:border-b-2 after:border-white after:mt-1">
    Skills
  </h3>

  {/* Outer Common Card */}
  <div className="bg-black/70 rounded-3xl border-2 border-purple-500 p-6 sm:p-8 mx-auto w-full sm:w-11/12 md:w-4/5 shadow-[0_0_8px_rgba(128,0,128,0.6)]">
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      
      {/* Languages */}
      <div className="bg-black rounded-3xl border border-purple-500 p-6 shadow-[0_0_6px_rgba(128,0,128,0.4)]">
        <h4 className="text-xl font-semibold mb-6 text-center text-purple-400 font-serif">Languages</h4>
        <div className="flex flex-col gap-3 font-mono">
          <div className="flex items-center gap-3"><SiJavascript className="text-yellow-400" /> JavaScript</div>
          <div className="flex items-center gap-3"><FaJava className="text-red-500" /> Java</div>
          <div className="flex items-center gap-3"><SiPython className="text-blue-400" /> Python</div>
          <div className="flex items-center gap-3"><SiC className="text-cyan-400" /> C</div>
        </div>
      </div>

      {/* Frontend */}
      <div className="bg-black rounded-3xl border border-purple-500 p-6 shadow-[0_0_6px_rgba(128,0,128,0.4)]">
        <h4 className="text-xl font-semibold mb-6 text-center text-purple-400 font-serif">Front-End</h4>
        <div className="flex flex-col gap-3 font-mono">
          <div className="flex items-center gap-3"><SiHtml5 className="text-orange-500" /> HTML</div>
          <div className="flex items-center gap-3"><SiCss3 className="text-blue-500" /> CSS</div>
          <div className="flex items-center gap-3"><SiReact className="text-cyan-400" /> React</div>
          <div className="flex items-center gap-3"><SiTailwindcss className="text-sky-400" /> Tailwind CSS</div>
          <div className="flex items-center gap-3"><SiBootstrap className="text-purple-400" /> Bootstrap</div>
          <div className="flex items-center gap-3"><SiWordpress className="text-blue-600" /> WordPress</div>
        </div>
      </div>

      {/* Backend */}
      <div className="bg-black rounded-3xl border border-purple-500 p-6 shadow-[0_0_6px_rgba(128,0,128,0.4)]">
        <h4 className="text-xl font-semibold mb-6 text-center text-purple-400 font-serif">Back-End</h4>
        <div className="flex flex-col gap-3 font-mono">
          <div className="flex items-center gap-3"><SiLaravel className="text-red-400" /> Laravel</div>
          <div className="flex items-center gap-3"><SiMysql className="text-yellow-400" /> MySQL</div>
          <div className="flex items-center gap-3"><SiPhpmyadmin className="text-orange-300" /> PHPMyAdmin</div>
        </div>
      </div>

      {/* Tools */}
      <div className="bg-black rounded-3xl border border-purple-500 p-6 shadow-[0_0_6px_rgba(128,0,128,0.4)]">
        <h4 className="text-xl font-semibold mb-6 text-center text-purple-400 font-serif">Tools</h4>
        <div className="flex flex-col gap-3 font-mono">
          <div className="flex items-center gap-3"><VscCode className="text-blue-400" /> VS Code</div>
          <div className="flex items-center gap-3"><SiGithub className="text-gray-300" /> GitHub</div>
          <div className="flex items-center gap-3"><SiGit className="text-red-400" /> Git</div>
          <div className="flex items-center gap-3"><SiVercel className="text-white" /> Vercel</div>
          <div className="flex items-center gap-3"><FaNodeJs className="text-green-400" /> Node.js</div>
          <div className="flex items-center gap-3"><SiVite className="text-yellow-400" /> Vite</div>
          <div className="flex items-center gap-3"><SiMinutemailer className="text-pink-400" /> EmailJS</div>
        </div>
      </div>

    </div>
  </div>
</motion.section>



{/* Projects Section */}
<motion.section
  id="projects"
  className="p-6 sm:p-12 text-center font-serif"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
  transition={{ duration: 0.8 }}
>
  <h3 className="text-3xl font-extrabold mb-10 text-center tracking-wide text-pink-400 inline-block relative after:content-[''] after:block after:w-1/2 after:mx-auto after:border-b-2 after:border-white after:mt-1">
    Projects
  </h3>

  {/* Outer Common Card */}
  <div className="bg-black/70 rounded-3xl border-2 border-purple-500 p-6 sm:p-8 mx-auto w-full sm:w-11/12 md:w-4/5 shadow-[0_0_8px_rgba(128,0,128,0.6)]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
      {[
        {
          title: "Project Task Manager",
          desc: "A Task Manager Application built with JSON and Tkinter GUI.",
          img: "/projects/taskmanager.png",
          pdf: "/projects/Task Manager.pdf",
          tech: ["Python", "Tkinter", "JSON"],
        },
        {
          title: "Project SDG 3 - Group Project",
          desc: "Responsive web pages promoting awareness and volunteering opportunities for SDG 3. (Splash screen & Volunteer page)",
          img: "/projects/sdg.png",
          pdf: "/projects/SDG_website.pdf",
          tech: ["HTML", "CSS", "JavaScript"],
        },
        {
          title: "Personal Portfolio",
          desc: "A responsive React + Tailwind portfolio deployed on Vercel with GitHub integration.",
          img: "/projects/portfolio.png",
          pdf: "https://portfolioyashwin.vercel.app",
          tech: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
        },
        {
          title: "Mozhii.AI",
          desc: "Sri Lanka’s first Tamil-focused Large Language Model, currently in development, aimed at enabling intelligent Tamil language understanding, generation, and AI-powered applications.",
          img: "/projects/mozhi.png",
          pdf: "https://mozhii.online/",
          tech: ["Python", "TensorFlow", "HuggingFace"],
        },
      ].map((proj, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ duration: 0.3 }}
          className="bg-black rounded-3xl border border-purple-500 p-5 shadow-[0_0_6px_rgba(128,0,128,0.5)] flex flex-col justify-between"
        >
          <div className="w-full h-40 mb-4 overflow-hidden rounded-2xl">
            <img
              src={proj.img}
              alt={proj.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
          <h4 className="text-lg font-semibold mb-2 tracking-wide text-purple-400 font-serif">{proj.title}</h4>
          <p className="mb-4 text-sm text-purple-200 font-mono">{proj.desc}</p>

          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {proj.tech.map((tool, tIdx) => (
              <span
                key={tIdx}
                className="bg-purple-700/30 text-purple-300 border border-purple-500 px-2 py-1 rounded-full text-xs font-semibold"
              >
                {tool}
              </span>
            ))}
          </div>

          <a
            href={proj.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-fit mx-auto bg-purple-800 text-white px-3 py-1 rounded-xl shadow-lg hover:bg-purple-900 transition font-medium tracking-wide font-serif shadow-purple-500/70 hover:shadow-purple-600/90 text-xs"
            style={{ boxShadow: "0 0 15px 3px rgba(76, 36, 119, 1)" }}
          >
            View Project
          </a>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>



{/* Education Section */}
<motion.section
  id="Education"
  className="p-6 sm:p-12 text-center font-serif"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
  transition={{ duration: 0.8 }}
>
  <h3 className="text-3xl font-extrabold mb-10 text-center tracking-wide text-pink-400 inline-block relative after:content-[''] after:block after:w-1/2 after:mx-auto after:border-b-2 after:border-white after:mt-1">
    Education
  </h3>

  {/* Outer Common Card */}
  <div className="bg-black/70 rounded-3xl border-2 border-purple-500 p-6 sm:p-8 mx-auto w-full sm:w-11/12 md:w-4/5 shadow-[0_0_8px_rgba(128,0,128,0.6)]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
      {[
        {
          title: "Secondary Education",
          institution: "Zahira College Matale",
          logo: "/Education/zahira1.jpeg",
          description: "Completed G.C.E. O/L and A/L at Zahira College Matale during (2015–2023).",
        },
        {
          title: "Foundation Education",
          institution: "Informatics Institute of Technology (IIT)",
          logo: "/Achievements/IITlogo.png",
          description:
            "Completed the Foundation programme in Computing at IIT, with practical experience in Python, database management, and fundamental computing and problem-solving skills.",
        },
        {
          title: "Higher Education",
          institution: "Informatics Institute of Technology (IIT)",
          logo: "/Achievements/IITlogo.png",
          description:
            "Pursuing BSc (Hons) Computer Science at IIT, affiliated with the University of Westminster. Focused on web development and data analysis.",
        },
      ].map((edu, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ duration: 0.3 }}
          className="bg-black rounded-3xl border border-purple-500 p-6 flex flex-col items-center text-center shadow-[0_0_6px_rgba(128,0,128,0.5)]"
        >
          <img
            src={edu.logo}
            alt={`${edu.institution} logo`}
            className="w-20 h-20 object-contain rounded-full border border-purple-400 p-2 mb-4"
          />
          <h4 className="text-xl font-semibold mb-2 tracking-wide text-purple-400">{edu.title}</h4>
          <p className="mb-2 font-light text-pink-200 text-sm italic">{edu.institution}</p>
          <p className="text-white text-sm leading-relaxed">{edu.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>



{/* Certifications Section */}
<motion.section
  id="Certifications"
  className="p-6 sm:p-12 text-center font-serif"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
  transition={{ duration: 0.8 }}
>
  <h3 className="text-3xl font-extrabold mb-10 text-center tracking-wide text-pink-400 inline-block relative after:content-[''] after:block after:w-1/2 after:mx-auto after:border-b-2 after:border-white after:mt-1">
    Certifications
  </h3>

  {/* Outer Common Card */}
  <div className="bg-black/70 rounded-3xl border-2 border-purple-500 p-6 sm:p-8 mx-auto w-full sm:w-11/12 md:w-4/5 shadow-[0_0_8px_rgba(128,0,128,0.6)]">
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 font-sans">
      {[
        {
          title: "Python for Beginners",
          org: "University Of Moratuwa",
          link: "/Achievements/UOM.pdf",
          icon: "/Achievements/UOM.png",
        },
        {
          title: "Foundation Certificate in Higher Education",
          org: "Informatics Institute of Technology (IIT)",
          link: "/Achievements/IIT.pdf",
          icon: "/Achievements/IITlogo.png",
        },
        {
          title: "Web Application Design and Development",
          org: "National Institute of Business Management (NIBM)",
          link: "/Achievements/NIBM.pdf",
          icon: "/Achievements/NIBMlogo.jpg",
        },
        {
          title: "Microsoft Azure Machine Learning Fundamentals",
          org: "Linked In Learning",
          link: "/Achievements/LinkedInLearning.jpeg",
          icon: "/Achievements/linkedinlearning.png",
        },
      ].map((cert, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ duration: 0.3 }}
          className="bg-black rounded-3xl border border-purple-500 p-6 flex flex-col items-center justify-between text-center shadow-[0_0_6px_rgba(128,0,128,0.5)]"
        >
          <div className="flex flex-col items-center w-full">
            <img
              src={cert.icon}
              alt={`${cert.title} icon`}
              className="w-20 h-20 object-contain rounded-full border border-purple-400 p-2 mb-4"
            />
            <h4 className="text-lg font-semibold mb-1 tracking-wide text-purple-400">{cert.title}</h4>
            <p className="mb-3 font-light text-pink-200 text-sm italic">Issued by {cert.org}</p>
          </div>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-fit mx-auto bg-purple-800 text-white px-3 py-1 rounded-xl shadow-lg hover:bg-purple-900 transition font-medium tracking-wide font-serif shadow-purple-500/70 hover:shadow-purple-600/90 text-xs"
            style={{ boxShadow: "0 0 15px 3px rgba(76, 36, 119, 1)" }}
          >
            View Certificate
          </a>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>


{/* Contact Section */}
<motion.section
  id="contact"
  className="w-full mx-auto p-6 sm:p-12 text-center font-serif"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
  transition={{ duration: 0.8 }}
>
  <h3 className="text-3xl font-extrabold mb-10 tracking-wide text-pink-400 text-center inline-block relative after:content-[''] after:block after:w-1/2 after:mx-auto after:border-b-2 after:border-white after:mt-1">
    Contact
  </h3>

  {/* Flex container for form + contact info */}
  <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 sm:gap-8 mx-auto w-full sm:w-11/12 max-w-5xl font-sans">
    
    {/* Contact Form Card */}
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex-1 bg-black rounded-3xl border-2 border-purple-500 p-8 shadow-[0_0_8px_rgba(128,0,128,0.6)] flex flex-col justify-center"
    >
      <form ref={formRef} onSubmit={sendEmail} className="space-y-4 w-full font-mono">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full p-3 rounded-xl border border-purple-500 bg-purple-900 text-purple-100 font-light"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full p-3 rounded-xl border border-purple-500 bg-purple-900 text-purple-100 font-light"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          className="w-full p-3 rounded-xl border border-purple-500 bg-purple-900 text-purple-100 h-32 font-light"
        />
        <button
          type="submit"
          className="bg-purple-800 text-white px-5 py-1.5 rounded-full shadow-lg hover:bg-purple-900 transition font-medium tracking-wide font-serif shadow-purple-500/70 hover:shadow-purple-600/90 text-sm"
          style={{ boxShadow: "0 0 15px 3px rgba(76, 36, 119, 1)" }}
        >
          Send
        </button>
      </form>
    </motion.div>

    {/* Contact Info Card */}
<motion.div
  whileHover={{ scale: 1.02 }}
  className="flex-1 bg-black rounded-3xl border-2 border-purple-500 p-8 shadow-[0_0_8px_rgba(128,0,128,0.6)] flex flex-col justify-center text-purple-100 font-sans"
>
  <h4 className="text-2xl font-semibold mb-3 text-purple-400 font-serif">Get In Touch</h4>
  <p className="text-sm text-purple-200 mb-8 font-light">
   "Always up for discussing projects or fresh ideas. Feel free to reach out"
  </p>

  <div className="space-y-6 text-left">
    {/* Location */}
    <div className="flex items-center gap-4">
       <div className="bg-purple-700/30 p-3 rounded-full border border-purple-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,105,180,0.7)] hover:bg-purple-700/50 hover:scale-110">
        <FaMapMarkerAlt className="text-pink-400 text-lg" />
      </div>
      <div>
        <h5 className="text-purple-300 text-sm font-semibold">Location</h5>
        <p className="text-purple-100 text-sm">Matale - Sri Lanka</p>
      </div>
    </div>

    {/* Email */}
    <div className="flex items-center gap-4">
       <div className="bg-purple-700/30 p-3 rounded-full border border-purple-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,105,180,0.7)] hover:bg-purple-700/50 hover:scale-110">
        <FaEnvelope className="text-pink-400 text-lg" />
      </div>
      <div>
        <h5 className="text-purple-300 text-sm font-semibold">Email</h5>
        <p className="text-purple-100 text-sm">yashwin12114@gmail.com</p>
      </div>
    </div>

    {/* Phone */}
    <div className="flex items-center gap-4">
       <div className="bg-purple-700/30 p-3 rounded-full border border-purple-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,105,180,0.7)] hover:bg-purple-700/50 hover:scale-110">
        <FaPhoneAlt className="text-pink-400 text-lg" />
      </div>
      <div>
        <h5 className="text-purple-300 text-sm font-semibold">Phone</h5>
        <p className="text-purple-100 text-sm">+94 76 251 2830</p>
      </div>
    </div>
  </div>

  {/* Socials */}
  <div className="flex justify-center gap-6 mt-10">
    <a
      href="https://www.linkedin.com/in/yashwin01"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-purple-800/30 border border-purple-500 p-3 rounded-full hover:bg-purple-600 transition"
    >
      <FaLinkedin className="text-white" />
    </a>
    <a
      href="https://github.com/yashwinsivakumar"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-purple-800/30 border border-purple-500 p-3 rounded-full hover:bg-purple-600 transition"
    >
      <SiGithub className="text-white" />
    </a>
    <a
      href="https://www.instagram.com/yaash_01._"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-purple-800/30 border border-purple-500 p-3 rounded-full hover:bg-purple-600 transition"
    >
      <FaInstagram className="text-white" />
    </a>
    
  </div>
</motion.div>
  </div>
</motion.section>




      {/* Footer */}
<footer className="p-6 text-center font-sans bg-black/60 backdrop-blur-md mt-12">
  {/* Navigation Links */}
  <div className="mb-6 text-xs sm:text-sm md:text-base font-medium text-purple-300 space-x-1">
    <a href="#about" className="hover:text-pink-400 transition">About</a>
    <span>|</span>
    <a href="#skills" className="hover:text-pink-400 transition">Skills</a>
    <span>|</span>
    <a href="#projects" className="hover:text-pink-400 transition">Projects</a>
    <span>|</span>
    <a href="#Education" className="hover:text-pink-400 transition">Education</a>
    <span>|</span>
    <a href="#Achievements" className="hover:text-pink-400 transition">Achievements</a>
    <span>|</span>
    <a href="#contact" className="hover:text-pink-400 transition">Contact</a>
  </div>

  {/* Social Links */}
  <div className="flex justify-center gap-6 text-2xl text-purple-400 mb-4">
    <a href="https://www.linkedin.com/in/yashwin01" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition"><FaLinkedin /></a>
    <a href="https://github.com/yashwinsivakumar" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition"><SiGithub /></a>
    <a href="https://www.instagram.com/yashwin_01._" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition"><FaInstagram /></a>
  </div>

  {/* Centered Copyright */}
  <p className="tracking-wide font-light text-center text-purple-300">
    © 2025 Yashwin. All Rights Reserved.
  </p>
</footer>
    </div>
</div>
  );
}
