"use client";

import * as React from "react";
import { DiamondDivider } from "./illustrations";

export function ClosingCTA() {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = React.useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot — if filled, silently succeed.
    if ((formData.get("company") as string)?.trim() !== "") {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(data.error || "Submission failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again or email the author directly.");
    }
  };

  return (
    <section
      id="contact"
      className="bg-ink-grain relative pt-20 md:pt-24 pb-24 md:pb-32 px-5 md:px-8"
      aria-label="Closing and contact"
      style={{ color: "var(--on-ink)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal">
          <DiamondDivider />
        </div>

        <div className="text-center my-12 reveal" data-reveal-delay="80">
          <p className="label-mono-sm mb-5" style={{ color: "var(--brass)" }}>
            The closing line
          </p>
          <h2
            className="display text-balance"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              color: "var(--on-ink)",
              lineHeight: 1,
            }}
          >
            I didn&apos;t forget.
          </h2>
          <p
            className="lede mt-6 mx-auto"
            style={{ color: "var(--on-ink)", opacity: 0.78, maxWidth: "55ch" }}
          >
            The author intends to stand on the front steps of 2905 Mills Avenue.
            The steps his father built. The steps his mother swept. The steps his
            brothers sat on during the summers of their lives.
          </p>
        </div>

        <div
          className="reveal flex flex-wrap justify-center gap-3 mb-16"
          data-reveal-delay="160"
        >
          <a href="#book" className="btn btn-brick">
            Get the Book
          </a>
          <a href="mailto:contact@victorlevans.com" className="btn btn-outline-paper">
            Press and Media
          </a>
        </div>

        {/* contact form */}
        <div
          className="reveal grid md:grid-cols-12 gap-10"
          data-reveal-delay="220"
        >
          <div className="md:col-span-5">
            <h3
              className="display"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                color: "var(--on-ink)",
              }}
            >
              Contact
            </h3>
            <p
              className="body-text mt-4"
              style={{ color: "var(--on-ink)", opacity: 0.78, maxWidth: "40ch" }}
            >
              For permissions, press inquiries, and review-copy requests. The
              author&apos;s home address and phone number are not published on
              this site. Use the form, or the email placeholder below.
            </p>
            <p className="label-mono-sm mt-6" style={{ color: "var(--brass)" }}>
              Email — placeholder, pending author confirmation
            </p>
            <p
              className="body-text mt-1"
              style={{ color: "var(--on-ink)", opacity: 0.7, fontSize: "0.92rem" }}
            >
              <a
                href="mailto:contact@victorlevans.com"
                className="link-draw"
                style={{ color: "var(--on-ink)" }}
              >
                contact@victorlevans.com
              </a>
            </p>
          </div>

          <form
            className="md:col-span-7 space-y-4"
            onSubmit={onSubmit}
            aria-label="Contact form"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="label-mono-sm" style={{ color: "var(--fg-muted)" }}>
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={status === "submitting"}
                  autoComplete="name"
                  className="w-full mt-2 p-3"
                  style={{
                    background: "rgba(20, 17, 15, 0.6)",
                    border: "1px solid rgba(184, 145, 63, 0.25)",
                    color: "var(--on-ink)",
                    fontFamily: "var(--font-newsreader), serif",
                    fontSize: "1rem",
                  }}
                />
              </label>
              <label className="block">
                <span className="label-mono-sm" style={{ color: "var(--fg-muted)" }}>
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={status === "submitting"}
                  autoComplete="email"
                  className="w-full mt-2 p-3"
                  style={{
                    background: "rgba(20, 17, 15, 0.6)",
                    border: "1px solid rgba(184, 145, 63, 0.25)",
                    color: "var(--on-ink)",
                    fontFamily: "var(--font-newsreader), serif",
                    fontSize: "1rem",
                  }}
                />
              </label>
            </div>

            <label className="block">
              <span className="label-mono-sm" style={{ color: "var(--fg-muted)" }}>
                Message
              </span>
              <textarea
                name="message"
                required
                disabled={status === "submitting"}
                rows={5}
                className="w-full mt-2 p-3"
                style={{
                  background: "rgba(20, 17, 15, 0.6)",
                  border: "1px solid rgba(184, 145, 63, 0.25)",
                  color: "var(--on-ink)",
                  fontFamily: "var(--font-newsreader), serif",
                  fontSize: "1rem",
                  resize: "vertical",
                }}
              />
            </label>

            {/* honeypot — hidden from humans, catches bots */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              <label>
                Leave this field empty
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="submit"
                className="btn btn-brick"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send"}
              </button>
              <span className="label-mono-sm" style={{ color: "var(--fg-muted)" }}>
                No third-party scripts · honeypot protected
              </span>
            </div>

            {/* success / error states */}
            {status === "success" && (
              <p
                role="status"
                className="label-mono-sm mt-4 p-3"
                style={{
                  color: "var(--brass-2)",
                  background: "rgba(184, 145, 63, 0.08)",
                  border: "1px solid rgba(184, 145, 63, 0.4)",
                }}
              >
                Thank you. The author will read every message. Replies are not
                automated.
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                className="label-mono-sm mt-4 p-3"
                style={{
                  color: "var(--stamp)",
                  background: "rgba(179, 38, 30, 0.08)",
                  border: "1px solid rgba(179, 38, 30, 0.4)",
                }}
              >
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
