import { useState } from "react";
import { Check, DownloadSimple, Copy, ArrowRight } from "@phosphor-icons/react";
import Modal from "./Modal.jsx";
import { Action } from "./UI.jsx";
import { contactEmail } from "../data.js";

export function Enquiry({ onClose, initialService }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: initialService || "",
    budget: "",
    message: "",
  });
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const update = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const text = `M² LABS — PROJECT ENQUIRY\n\nName: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nBudget: ${form.budget || "Let’s discuss"}\n\nProject details:\n${form.message}\n`;
    setBrief(text);
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "m2-labs-project-brief.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <Modal title="Start a project" onClose={onClose} className="enquiry-modal">
      <span className="eyebrow">THE NEXT CHAPTER STARTS HERE</span>
      <h2>
        Let’s make
        <br />
        <span>something matter.</span>
      </h2>
      {brief ? (
        <div className="brief-result">
          <div className="success-mark">
            <Check size={28} />
          </div>
          <h3>Your brief is ready.</h3>
          <p>
            {contactEmail
              ? "Open your email app to send it to our studio, or keep a copy for yourself."
              : "Download or copy your brief to share with M² Labs. Your details have not been sent or stored."}
          </p>
          <pre>{brief}</pre>
          <div className="brief-actions">
            {contactEmail && (
              <Action
                href={`mailto:${contactEmail}?subject=${encodeURIComponent(`Project enquiry: ${form.service}`)}&body=${encodeURIComponent(brief)}`}
              >
                Open email to send
              </Action>
            )}
            <button className="button button-secondary" onClick={download}>
              <DownloadSimple size={19} />
              Download brief
            </button>
            <button className="button button-secondary" onClick={copy}>
              <Copy size={19} />
              {copied ? "Copied" : "Copy brief"}
            </button>
          </div>
          <p role="status">
            {copied
              ? "Project brief copied to your clipboard."
              : copyError
                ? "Clipboard unavailable. You can select the brief above or download it."
                : ""}
          </p>
          <button className="text-button" onClick={() => setBrief("")}>
            Edit your details <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <div className="form-row">
            <label>
              Your name
              <input
                name="name"
                value={form.name}
                onChange={update}
                autoComplete="name"
                placeholder="Your full name"
                required
                maxLength={120}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                autoComplete="email"
                placeholder="you@company.com"
                required
                maxLength={160}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              What do you have in mind?
              <select
                name="service"
                value={form.service}
                onChange={update}
                required
              >
                <option value="">Choose a service</option>
                <option>Digital experiences</option>
                <option>Connected operations</option>
                <option>Brands with momentum</option>
                <option>Your next breakthrough</option>
                <option>A bit of everything</option>
              </select>
            </label>
            <label>
              Project budget <span className="optional">(optional)</span>
              <select name="budget" value={form.budget} onChange={update}>
                <option value="">Let’s discuss</option>
                <option>Under $1,000 USD</option>
                <option>$1,000 – $5,000 USD</option>
                <option>$5,000 – $15,000 USD</option>
                <option>$15,000+ USD</option>
              </select>
            </label>
          </div>
          <label>
            A little about your idea
            <textarea
              name="message"
              value={form.message}
              onChange={update}
              placeholder="What are you working on, who is it for, and what would you like to improve?"
              required
              minLength={10}
              maxLength={5000}
              rows={4}
            />
          </label>
          <div className="form-bottom">
            <p>
              {contactEmail
                ? "We’ll prepare an email for you to review and send."
                : "Build a brief you can save and share with our studio."}
            </p>
            <Action>Prepare my brief</Action>
          </div>
        </form>
      )}
    </Modal>
  );
}
export function ProjectDetails({ project, onClose, startProject }) {
  return (
    <Modal
      title={`${project.title} concept`}
      onClose={onClose}
      className="project-modal"
    >
      <div className={`project-modal-image ${project.id}`}>
        <img
          src={project.image}
          alt={
            project.id === "forma"
              ? "Sculptural architectural study in warm stone"
              : "A blue sculptural study of connected forms"
          }
        />
        <span>{project.id === "forma" ? "forma®" : "orbit®"}</span>
      </div>
      <div className="project-modal-copy">
        <span className="eyebrow">STUDIO EXPLORATION · CONCEPT ONLY</span>
        <h2>{project.title}</h2>
        <p className="project-summary">{project.summary}</p>
        <div className="project-detail-columns">
          <div>
            <h3>The idea</h3>
            <p>{project.brief}</p>
          </div>
          <div>
            <h3>The approach</h3>
            <p>{project.approach}</p>
          </div>
        </div>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Action onClick={startProject}>Create something like this</Action>
      </div>
    </Modal>
  );
}
