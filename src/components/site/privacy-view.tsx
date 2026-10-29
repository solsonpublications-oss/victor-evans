"use client";

import * as React from "react";
import { DiamondDivider } from "./illustrations";

const SECTIONS = [
  {
    h: "What we collect",
    p: "This site collects only the information you voluntarily submit through the contact form: your name, your email address, and the message you write. We do not use third-party analytics scripts, advertising pixels, or social-media trackers. We do not set cookies except those strictly necessary to remember your light/dark theme preference, which is stored in your browser\u2019s local storage and is never transmitted to a server.",
  },
  {
    h: "How we use what you collect",
    p: "Your contact-form submission is used solely to respond to your inquiry. The author reads every message. Replies are not automated. Submissions are not sold, shared, or transferred to any third party except where required by law. If you request a review copy or press inquiry, your information may be retained for the purpose of fulfilling that request and removed thereafter at your written request.",
  },
  {
    h: "Where your data lives",
    p: "Contact-form submissions are received by the site\u2019s own server endpoint. The site is statically generated and hosted on a platform that supports the Next.js runtime. No third-party form-processing service is used. The site does not currently persist submissions to a database \u2014 wiring a delivery mechanism (email, database, or both) is listed as an open item for the owner to confirm before launch.",
  },
  {
    h: "Your rights",
    p: "You may request access to, correction of, or deletion of any personal information you have submitted to this site by writing to the contact address listed below. The site does not profile users, does not make automated decisions about users, and does not engage in any behavioral tracking. If you are located in the European Union, the United Kingdom, or California, you have additional statutory rights under the GDPR and the CCPA respectively, which this policy is intended to honor.",
  },
  {
    h: "What we do not publish",
    p: "This site does not publish the author\u2019s home address or telephone number, both of which appear on the copyright page of the printed book. The site does not publish the addresses or contact details of any other living individual. The historical street address 2905 Mills Avenue N.E., Washington, D.C. appears only as the book\u2019s historical setting, as it does in the book\u2019s title chapters. Family members named on the site are named in full as an act of dignity, consistent with the book\u2019s editorial practice.",
  },
  {
    h: "Children",
    p: "This site is not directed to children under the age of thirteen and does not knowingly collect information from children. If you believe a child has submitted information to this site, please contact us and the submission will be deleted.",
  },
  {
    h: "Changes to this policy",
    p: "This policy may be updated. The date of the most recent revision appears at the bottom of this page. Material changes will be reflected here before they take effect on the live site.",
  },
  {
    h: "Contact",
    p: "Questions about this privacy policy may be sent to the email address listed in the Contact section of this site. The author reads every message. Replies are not automated.",
  },
];

export function PrivacyView() {
  return (
    <section className="pt-28 md:pt-32 pb-24 px-4 sm:px-5 md:px-8" aria-label="Privacy">
      <div className="max-w-[820px] mx-auto">
        <div className="flex items-center gap-3 mb-8 reveal">
          <span className="label-mono-sm" style={{ color: "var(--brick)" }}>
            § Privacy
          </span>
          <span className="label-mono-sm" style={{ color: "var(--text-dim)" }}>
            Plain-language. No legalese where avoidable.
          </span>
        </div>

        <h1
          className="display reveal text-balance"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            color: "var(--text)",
          }}
        >
          Privacy.
        </h1>

        <p
          className="lede reveal mt-6 measure"
          style={{ color: "var(--text)", opacity: 0.85 }}
        >
          This site is built to respect you. No tracking. No advertising. No
          third-party scripts. The only information we hold is what you choose
          to send us.
        </p>

        <div className="mt-12 reveal">
          <DiamondDivider />
        </div>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <article key={s.h} className="reveal">
              <h2
                className="display-italic"
                style={{
                  fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                  color: "var(--brick)",
                  marginBottom: "0.75rem",
                }}
              >
                {s.h}
              </h2>
              <p
                className="body-text measure"
                style={{ color: "var(--text)", opacity: 0.88 }}
              >
                {s.p}
              </p>
            </article>
          ))}
        </div>

        <div
          className="mt-16 pt-6"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <p
            className="label-mono-sm"
            style={{ color: "var(--text-dim)" }}
          >
            Last revised: October 2025
          </p>
        </div>
      </div>
    </section>
  );
}
