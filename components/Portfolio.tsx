"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Send,
  X,
  MapPin,
  ExternalLink,
} from "lucide-react";
import {
  achievements,
  education,
  experience,
  profile,
  projects,
  skills,
} from "@/data/portfolio";

const nav = ["Home", "About", "Skills", "Experience", "Projects","Achievements", "Contact"];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[.22em] text-violet-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-5 leading-7 text-zinc-400">{text}</p>}
    </div>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("Home");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[number] | null
  >(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

async function submit(e: React.SubmitEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.currentTarget;

  const formData = new FormData(form);

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    setSent(true);
    form.reset();

    setTimeout(() => {
      setSent(false);
    }, 4000);
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
  }
}

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-violet-500"
        style={{ scaleX }}
      />
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/45 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
          <a href="#home" className="text-lg font-bold tracking-tight">
            SS<span className="text-violet-400">.</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm transition ${active === item ? "text-white" : "text-zinc-500 hover:text-zinc-200"}`}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a
              href="/Subham_Sinha_Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium transition hover:border-violet-400/50 hover:bg-violet-500/10"
            >
              <Download size={15} /> Resume
            </a>
          </div>
          <button
            aria-label="Open menu"
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/5 bg-black/90 md:hidden"
            >
              <div className="flex flex-col px-5 py-4">
                {nav.map((item) => (
                  <a
                    onClick={() => setMenu(false)}
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="border-b border-white/5 py-4 text-sm text-zinc-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section
          id="home"
          className="relative flex min-h-screen items-center overflow-hidden px-5 pt-20 lg:px-8"
        >
          <div className="grid-bg absolute inset-0 -z-10" />
          <div className="absolute left-1/2 top-20 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[100px]" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-14 py-20 lg:grid-cols-[1.15fr_.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{" "}
                Available for opportunities
              </div>
              <p className="mb-4 text-lg text-zinc-400">Hi, I&apos;m</p>
              <h1 className="text-5xl font-black tracking-[-.04em] text-white sm:text-7xl">
                Subham Sinha<span className="text-violet-400">.</span>
              </h1>
              <h2 className="mt-4 text-2xl font-semibold text-zinc-300 sm:text-3xl">
                Full Stack Developer
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
                I build modern, responsive and scalable web applications using
                JavaScript, React, Node.js and MongoDB.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                >
                  View Projects{" "}
                  <ArrowUpRight
                    size={17}
                    className="transition group-hover:rotate-45"
                  />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-400/50 hover:bg-violet-500/10"
                >
                  Contact Me
                </a>
                <a
                  href="/Subham_Sinha_Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:text-white"
                >
                  <Download size={16} /> Resume
                </a>
              </div>
              <div className="mt-8 flex items-center gap-4 text-zinc-500">
                <a
                  href={profile.github}
                  aria-label="GitHub"
                  className="transition hover:text-white"
                >
                  <Github />
                </a>
                <a
                  href={profile.linkedin}
                  aria-label="LinkedIn"
                  className="transition hover:text-white"
                >
                  <Linkedin />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="transition hover:text-white"
                >
                  <Mail />
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative mx-auto w-full max-w-[420px] lg:justify-self-end"
            >
              <div className="absolute -inset-5 rounded-[2.2rem] bg-violet-500/10 blur-2xl" />
              <div className="glass relative overflow-hidden rounded-[2rem] p-2 shadow-glow">
                <Image
                  src="/profile.png"
                  alt="Subham Sinha"
                  width={800}
                  height={800}
                  priority
                  className="aspect-square w-full rounded-[1.5rem] object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/65 px-4 py-3 backdrop-blur-xl">
                  <div>
                    <p className="text-xs text-zinc-500">Currently</p>
                    <p className="text-sm font-semibold">
                      Full Stack Developer Intern
                    </p>
                  </div>
                  <BriefcaseBusiness size={20} className="text-violet-300" />
                </div>
              </div>
            </motion.div>
          </div>
          <a
            href="#about"
            className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-zinc-500 md:flex"
          >
            Scroll to explore <ArrowDown size={14} />
          </a>
        </section>

        <section
          id="about"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 lg:px-8"
        >
          <Reveal>
            <SectionTitle
              eyebrow="01 / About"
              title="Building things that work."
              text="I enjoy turning product ideas and requirements into clean, reliable web experiences."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <div className="glass h-full rounded-3xl p-7 sm:p-9">
                <p className="text-lg leading-8 text-zinc-300">
                  I&apos;m a Full Stack Developer focused on the MERN ecosystem.
                  I work across the frontend and backend, from responsive React
                  interfaces and reusable components to REST APIs,
                  authentication and database workflows.
                </p>
                <p className="mt-5 leading-7 text-zinc-500">
                  Currently, I&apos;m working as a Full Stack Developer Intern
                  at BookMyWarehouse, contributing to a real-world on-demand
                  retail staffing platform. I enjoy problem solving, learning
                  new technologies and building products with a strong user
                  experience.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass h-full rounded-3xl p-7">
                <MapPin className="mb-8 text-violet-400" />
                <p className="text-sm text-zinc-500">Based in</p>
                <p className="mt-1 text-xl font-semibold">{profile.location}</p>
                <div className="my-7 h-px bg-white/10" />
                <p className="text-sm text-zinc-500">DSA Practice</p>
                <p className="mt-1 text-3xl font-bold">
                  200<span className="text-violet-400">+</span>
                </p>
                <p className="text-sm text-zinc-600">
                  LeetCode / HackerRank problems
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="skills"
          className="scroll-mt-24 border-y border-white/5 bg-white/[.015] px-5 py-24 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionTitle eyebrow="02 / Skills" title="Tools I work with." />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(skills).map(([category, list], i) => (
                <Reveal key={category} delay={i * 0.06}>
                  <div className="glass h-full rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/25">
                    <h3 className="mb-5 font-semibold text-white">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {list.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/8 bg-white/[.03] px-3 py-1.5 text-xs text-zinc-400"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 lg:px-8"
        >
          <Reveal>
            <SectionTitle
              eyebrow="03 / Experience"
              title="Where I'm growing."
            />
          </Reveal>
          <div className="relative ml-3 border-l border-white/10 pl-8 sm:ml-6 sm:pl-10">
            <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-violet-400 ring-8 ring-violet-400/10" />
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.1}>
                <div className="glass rounded-3xl p-7 sm:p-9">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <p className="text-sm font-medium text-violet-400">
                        {job.period}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold">{job.role}</h3>
                      <p className="mt-1 text-zinc-400">
                        {job.company} · {job.project}
                      </p>
                    </div>
                    <BriefcaseBusiness className="hidden text-zinc-600 sm:block" />
                  </div>
                  <ul className="mt-7 space-y-3">
                    {job.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 text-sm leading-7 text-zinc-400"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-1 shrink-0 text-violet-400"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="scroll-mt-24 border-y border-white/5 bg-white/[.015] px-5 py-24 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionTitle
                eyebrow="04 / Projects"
                title="Selected work."
                text="A few full-stack applications I've built from idea to implementation."
              />
            </Reveal>
            <div className="grid gap-5 lg:grid-cols-2">
              {projects.map((project, i) => (
                <Reveal key={project.title} delay={i * 0.1}>
                  <article className="group relative overflow-hidden rounded-3xl border border-white/8 bg-[#0d0d0f] p-7 transition duration-500 hover:-translate-y-1 hover:border-violet-400/25 hover:shadow-glow sm:p-9">
                    <div className="mb-14 flex items-start justify-between">
                      <div>
                        <span className="text-xs font-medium uppercase tracking-[.18em] text-violet-400">
                          0{i + 1}
                        </span>
                        <h3 className="mt-3 text-3xl font-bold">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-500">
                          {project.subtitle}
                        </p>
                      </div>
                      <div className="rounded-full border border-white/10 p-3 text-zinc-500 transition group-hover:text-white">
                        <ExternalLink size={18} />
                      </div>
                    </div>
                    <p className="max-w-xl leading-7 text-zinc-400">
                      {project.description}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-white/[.04] px-3 py-1.5 text-xs text-zinc-400"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-9 flex gap-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-sm font-semibold text-white underline-offset-4 hover:underline"
                      >
                        View Details
                      </button>
                     
                      <a
                        href={project.demo}
                        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white"
                      >
                        Live Demo <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

                <section
          id="achievements"
          className="scroll-mt-24 border-y border-white/5 bg-white/[.015] px-5 py-24 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionTitle
                eyebrow="05 / Achievements"
                title="Milestones I'm proud of."
                text="Achievements that reflect my consistency, discipline and ability to perform in competitive environments."
              />
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2">
              {achievements.map((achievement, i) => (
                <Reveal key={achievement.title} delay={i * 0.1}>
                  <div className="glass h-full rounded-3xl p-7 sm:p-9 transition duration-300 hover:-translate-y-1 hover:border-violet-400/25">
                    <div className="mb-6 flex items-start justify-between">
                      <div className="rounded-2xl bg-violet-500/10 p-4 text-violet-300">
                        <CheckCircle2 size={24} />
                      </div>

                      <span className="text-xs font-medium uppercase tracking-[.18em] text-violet-400">
                        Achievement
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      {achievement.title}
                    </h3>

                    <p className="mt-4 leading-7 text-zinc-400">
                      {achievement.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="education"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 lg:px-8"
        >
          <Reveal>
            <SectionTitle
              eyebrow="06 / Education"
              title="My academic foundation."
            />
          </Reveal>
          <div className="glass flex flex-col gap-5 rounded-3xl p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="flex gap-5">
              <div className="rounded-2xl bg-violet-500/10 p-4 text-violet-300">
                <GraduationCap />
              </div>
              <div>
                <h3 className="text-xl font-bold">{education.degree}</h3>
                <p className="mt-1 text-zinc-400">{education.institution}</p>
                <p className="mt-2 text-sm text-zinc-600">{education.period}</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs uppercase tracking-widest text-zinc-600">
                Percentage
              </p>
              <p className="mt-1 text-3xl font-bold">{education.result}</p>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-24 border-t border-white/5 px-5 py-24 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionTitle
                eyebrow="07 / Contact"
                title="Let's build something."
                text="Have a role, project or idea in mind? Send me a message and I'll get back to you."
              />
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
              <Reveal>
                <div className="glass rounded-3xl p-7 sm:p-9">
                  <p className="text-sm text-zinc-500">Get in touch</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-2 block break-all text-lg font-semibold hover:text-violet-300"
                  >
                    {profile.email}
                  </a>
                  <div className="mt-8 space-y-3 text-sm text-zinc-400">
                    <a
                      href={profile.github}
                      className="flex items-center gap-3 hover:text-white"
                    >
                      <Github size={18} /> GitHub
                    </a>
                    <a
                      href={profile.linkedin}
                      className="flex items-center gap-3 hover:text-white"
                    >
                      <Linkedin size={18} /> LinkedIn
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <form
                  onSubmit={submit}
                  className="glass rounded-3xl p-7 sm:p-9"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm text-zinc-400">
                      Name
                      <input
                        required
                        name="name"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-white outline-none transition focus:border-violet-400/60"
                        placeholder="Your name"
                      />
                    </label>
                    <label className="text-sm text-zinc-400">
                      Email
                      <input
                        required
                        type="email"
                        name="email"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-white outline-none transition focus:border-violet-400/60"
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>
                  <label className="mt-5 block text-sm text-zinc-400">
                    Message
                    <textarea
                      required
                      name="message"
                      rows={5}
                      className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-white outline-none transition focus:border-violet-400/60"
                      placeholder="Tell me a little about your opportunity..."
                    />
                  </label>
                  <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5">
                    <Send size={16} /> Send Message
                  </button>
                  {sent && (
                    <p className="mt-4 text-sm text-emerald-400">
                      Thanks! Your message is ready — connect the form to your
                      preferred email service to send it.
                    </p>
                  )}
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-sm text-zinc-600 sm:flex-row">
          <p>© {new Date().getFullYear()} Subham Sinha. Built with Next.js.</p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 hover:text-white"
          >
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111113] p-7 shadow-2xl sm:p-9"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[.18em] text-violet-400">
                    Project
                  </p>
                  <h3 className="mt-2 text-3xl font-bold">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-white/10 p-2 text-zinc-500 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="mt-7 leading-8 text-zinc-400">
                {selectedProject.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {selectedProject.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/8 bg-white/[.03] px-3 py-1.5 text-xs text-zinc-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
