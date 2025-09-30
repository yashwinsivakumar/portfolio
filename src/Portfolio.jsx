import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { SiJavascript, SiPython, SiC, SiReact, SiTailwindcss, SiGithub, SiHtml5, SiCss3, SiLaravel, SiBootstrap, SiMysql, SiPhpmyadmin, SiWordpress } from "react-icons/si";
import { FaJava, FaLinkedin, FaInstagram } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { HiMenu, HiX } from "react-icons/hi";
import { Typewriter } from "react-simple-typewriter";
import emailjs from "@emailjs/browser";

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
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-purple-800 text-gray-50 font-sans transition-colors duration-500">
      
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md z-50 shadow-xl font-serif" ref={menuRef}>
        <div className="px-6 py-2 flex justify-between items-center">
          <h1 className="text-xl font-extrabold text-purple-400 tracking-wider">Yashwin</h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-gray-50 focus:outline-none"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
        <div
          className={`overflow-hidden bg-black/90 w-56 absolute right-6 top-full rounded-b-xl shadow-lg transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-64 py-2" : "max-h-0 py-0"}`}
        >
          <ul className="flex flex-col gap-2 text-base font-medium">
            {["about", "skills", "projects", "Achievements", "contact"].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className="block px-4 py-2 hover:text-pink-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

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
              href="/CV.pdf"
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
          I'm a software developer with skills in React, Tailwind CSS, and modern
          JavaScript. I enjoy building interactive, responsive, and user-friendly
          applications. I’m also interested in AI, mobile development with Flutter,
          and cloud technologies.
        </p>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="p-12 text-center font-serif"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-extrabold mb-10 text-center tracking-wide text-pink-400 inline-block relative after:content-[''] after:block after:w-1/2 after:mx-auto after:border-b-2 after:border-white after:mt-1">
          Skills
        </h3>

        <div className="flex flex-col gap-8 container mx-auto max-w-xl md:max-w-4xl font-sans">
          {/* Languages */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-black rounded-3xl border-2 border-purple-500 p-6 w-4/5 md:w-3/5 mx-auto shadow-[0_0_6px_rgba(128,0,128,0.6)]"
          >
            <h4 className="text-xl font-semibold mb-6 text-center text-purple-400 font-serif">
              Languages
            </h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiJavascript className="text-yellow-400 text-xl" />
                <span>JavaScript</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <FaJava className="text-red-500 text-xl" />
                <span>Java</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiPython className="text-blue-400 text-xl" />
                <span>Python</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiC className="text-cyan-400 text-xl" />
                <span>C</span>
              </div>
            </div>
          </motion.div>

          {/* Frontend */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-black rounded-3xl border-2 border-purple-500 p-6 w-4/5 md:w-3/5 mx-auto shadow-[0_0_6px_rgba(128,0,128,0.6)]"
          >
            <h4 className="text-xl font-semibold mb-6 text-center text-purple-400 font-serif">
              Front-End
            </h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiHtml5 className="text-orange-500 text-xl" />
                <span>HTML</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiCss3 className="text-blue-500 text-xl" />
                <span>CSS</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiReact className="text-cyan-400 text-xl" />
                <span>React</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiTailwindcss className="text-sky-400 text-xl" />
                <span>Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiBootstrap className="text-purple-400 text-xl" />
                <span>Bootstrap</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiWordpress className="text-blue-600 text-xl" />
                <span>WordPress</span>
              </div>
            </div>
          </motion.div>

          {/* Back-End */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-black rounded-3xl border-2 border-purple-500 p-6 w-4/5 md:w-3/5 mx-auto shadow-[0_0_6px_rgba(128,0,128,0.6)]"
          >
            <h4 className="text-xl font-semibold mb-6 text-center text-purple-400 font-serif">
              Back-End
            </h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiLaravel className="text-red-400 text-xl" />
                <span>Laravel</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiMysql className="text-yellow-400 text-xl" />
                <span>MySQL</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiPhpmyadmin className="text-orange-300 text-xl" />
                <span>PHPMyAdmin</span>
              </div>
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-black rounded-3xl border-2 border-purple-500 p-6 w-4/5 md:w-3/5 mx-auto shadow-[0_0_6px_rgba(128,0,128,0.6)]"
          >
            <h4 className="text-xl font-semibold mb-6 text-center text-purple-400 font-serif">
              Tools
            </h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <VscCode className="text-blue-400 text-xl" />
                <span>VS Code</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-4 py-2 rounded-3xl border border-purple-500">
                <SiGithub className="text-gray-300 text-xl" />
                <span>GitHub</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="p-12 text-center font-serif"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-extrabold mb-10 text-center tracking-wide text-pink-400 inline-block relative after:content-[''] after:block after:w-1/2 after:mx-auto after:border-b-2 after:border-white after:mt-1">
          Projects
        </h3>

        <div className="flex flex-col gap-8 container mx-auto max-w-xl md:max-w-4xl font-sans">
          {[
            {
              title: "Project Task Manager",
              desc: "A Task Manager Application built with JSON and Tkinter GUI.",
              img: "/projects/sdg.png",
              pdf: "/projects/Task Manager.pdf",
            },
            {
              title: "Project Two",
              desc: "Mobile app made with Flutter.",
              img: "/projects/project2.png",
              pdf: "/projects/project2.pdf",
            },
            {
              title: "Project Three",
              desc: "Machine learning project using Python.",
              img: "/projects/project3.png",
              pdf: "/projects/project3.pdf",
            },
          ].map((proj, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group bg-black rounded-3xl border-2 border-purple-500 p-6 w-4/5 md:w-3/5 mx-auto shadow-[0_0_6px_rgba(128,0,128,0.6)] flex flex-col justify-between"
            >
              <div className="w-full h-48 mb-4 overflow-hidden rounded-2xl">
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-semibold mb-2 tracking-wide text-purple-400 font-serif">
                    {proj.title}
                  </h4>
                  <p className="mb-4 font-light text-purple-200 text-sm font-mono">
                    {proj.desc}
                  </p>
                </div>
                <div className="flex justify-center">
                  <a
                    href={proj.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-fit bg-purple-500 text-white px-2 py-1 rounded-xl hover:bg-purple-600 font-medium text-sm font-sans mt-2"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Achievements Section */}
     <motion.section
        id="Achievements"
        className="p-12 text-center font-serif"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-extrabold mb-10 text-center tracking-wide text-pink-400 inline-block relative after:content-[''] after:block after:w-1/2 after:mx-auto after:border-b-2 after:border-white after:mt-1">
          Achievements
        </h3>
        <div className="flex flex-col gap-8 container mx-auto max-w-xl md:max-w-4xl font-sans">
          {[
            // 💡 Added an 'icon' property for the image source
            { title: "python for beginners", org: "University Of Moratuwa", link: "/public/Achievements/UOM.pdf", icon: "/public/UOM.png" },
            { title: "Foundation Certificate in Higher Education", org: "Informatics Institute of Technology (IIT)", link: "/public/Achievements/IIT.pdf", icon: "/public/IITlogo.png" },
            { title: "Web Application Design and Development", org: "National institute of Business Management (NIBM)", link: "/public/Achievements/NIBM.pdf", icon: "/public/NIBMlogo.jpg" }
          ].map((cert, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-black rounded-3xl border-2 border-purple-500 p-6 w-4/5 md:w-3/5 mx-auto shadow-[0_0_6px_rgba(128,0,128,0.6)]"
            >
              {/* 💡 Flex container for image and text content */}
              <div className="flex items-center space-x-4 md:space-x-6 text-left">
                {/* 💡 Image/Icon Placeholder */}
                <div className="flex-shrink-0">
                  <img
                    src={cert.icon}
                    alt={`${cert.title} icon`}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border border-purple-400 p-1" // Stylistic classes for the icon
                  />
                </div>
                
                {/* 💡 Text Details */}
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold mb-1 tracking-wide text-purple-400">{cert.title}</h4>
                  <p className="mb-2 font-light text-pink-200 text-sm">Issued by {cert.org}</p>
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-purple-400 hover:underline font-medium text-sm transition duration-300"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="container mx-auto p-12 text-center font-serif"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-extrabold mb-6 tracking-wide text-pink-400 text-center inline-block relative after:content-[''] after:block after:w-1/2 after:mx-auto after:border-b-2 after:border-white after:mt-1">
          Contact
        </h3>
        <div className="w-4/5 md:w-3/5 mx-auto">
          <div className="bg-black rounded-3xl border-2 border-purple-500 p-8 shadow-[0_0_6px_rgba(128,0,128,0.6)] font-sans">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4 w-full">
              <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 rounded-xl border border-purple-500 bg-purple-900 text-purple-100 font-light font-mono" />
              <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 rounded-xl border border-purple-500 bg-purple-900 text-purple-100 font-light font-mono" />
              <textarea name="message" placeholder="Your Message" required className="w-full p-3 rounded-xl border border-purple-500 bg-purple-900 text-purple-100 h-32 font-light font-mono" />
              <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-full shadow hover:bg-purple-700 transition font-medium font-serif">
                Send
              </button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="p-6 text-center font-sans bg-black/60 backdrop-blur-md mt-12">
        <div className="mb-6 text-sm md:text-base font-medium text-purple-300 space-x-2">
          <a href="#about" className="hover:text-pink-400 transition">About</a>
          <span>|</span>
          <a href="#skills" className="hover:text-pink-400 transition">Skills</a>
          <span>|</span>
          <a href="#projects" className="hover:text-pink-400 transition">Projects</a>
          <span>|</span>
          <a href="#Achievements" className="hover:text-pink-400 transition">Achievements</a>
          <span>|</span>
          <a href="#contact" className="hover:text-pink-400 transition">Contact</a>
        </div>
        <div className="flex justify-center gap-6 text-2xl text-purple-400 mb-4">
          <a href="https://www.linkedin.com/in/yashwin01" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition"><FaLinkedin /></a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition"><SiGithub /></a>
          <a href="https://www.instagram.com/yashwin_01._?igsh=MXdtMDgyb252MzBlMw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition"><FaInstagram /></a>
        </div>
        <p className="tracking-wide font-light text-purple-300">© 2025 Yashwin. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
