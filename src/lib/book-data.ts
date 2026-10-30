// Source-truthed book content. Every fact, name, and date in this file is drawn
// directly from "The Generational Curse Breaker" by Victor L. Evans (manuscript).
// Date ambiguities are flagged inline. See OPEN-ITEMS at the bottom of the page.

export type TimelineEvent = {
  date: string;
  rawYear?: string;
  chapter: string;
  title: string;
  summary: string;
  ambiguity?: string;
};

// The Timeline — vertical thread, brass fills with scroll progress.
// All dates are quoted from the manuscript's relevant chapter. Ambiguities
// are noted where the manuscript contains date conflicts (e.g., 1995 vs 1996).
export const TIMELINE: TimelineEvent[] = [
  {
    date: "1950s–early 1960s",
    chapter: "Ch. 1",
    title: "The home is bought",
    summary:
      "James William Evans Sr., a Navy veteran, worked as a transmission mechanic for the Greyhound Bus Company. He and Carrie Viola Evans purchase the brick row house at 2905 Mills Avenue N.E., in the Langdon neighborhood of Washington, D.C. They raise seven children inside its walls. The family survives through work — never on food stamps or welfare.",
  },
  {
    date: "May 15, 1960",
    chapter: "Ch. 2",
    title: "The twins are born",
    summary:
      "Phillip Leer Evans and Phyllis Lorraine Evans are born at Freedman's Hospital in Washington, D.C. Phillip is the physically dominant twin. Phyllis does not walk until she is three. She will be diagnosed with hemiplegia and right-hemisphere brain injury.",
  },
  {
    date: "circa 1969",
    chapter: "Ch. 1",
    title: "Victor enlists in the Army",
    summary:
      "At nineteen, the author enlists in the United States Army. He will earn two master's degrees — Public Administration and Human Resources Management — and a career built on documentation, regulation, and persistence.",
  },
  {
    date: "1980",
    chapter: "Ch. 1",
    title: "James Evans Sr. dies",
    summary:
      "James William Evans Sr., Navy veteran and skilled transmission mechanic for the Greyhound Bus Company from the late 1950s through the 1970s, dies. Built on hard-won self-sufficiency without welfare or food stamps, the house at 2905 Mills Avenue transfers to Carrie Viola Evans — owned free and clear. No mortgage. No landlord.",
  },
  {
    date: "Date unrecorded",
    chapter: "Ch. 4",
    title: "The fire at Mills Avenue",
    summary:
      "A fire displaces Carrie and Phyllis from 2905 Mills Avenue. There is no insurance, or insufficient insurance. Surraya Richardson offers shelter at 1912 Hamlin Street N.E., four blocks away.",
    ambiguity:
      "The fire's date is not specified in the manuscript. The Foreword references the will being drafted in 1995; Chapter 5 references 1996. Confirm with the author.",
  },
  {
    date: "1995 / 1996",
    chapter: "Ch. 5",
    title: "The will is drafted",
    summary:
      "Under Surraya's roof, a brother-in-law attorney — Surraya's relative, not Carrie's — drafts a will that disinherits six of Carrie's seven children and leaves everything to Phyllis. A second will routes the estate from Phyllis to Simone C. Evans.",
    ambiguity:
      "The Foreword cites 1995; Chapter 5 cites 1996 for the will. Logged in OPEN-ITEMS for the author to confirm.",
  },
  {
    date: "Fall 1996",
    chapter: "Ch. 8",
    title: "Dwight Landers Evans dies",
    summary:
      "Dwight Landers Evans dies on kidney dialysis, three months before his mother. He is buried without a proper headstone. The author pledges to place a stone on his brother's grave.",
  },
  {
    date: "December 1996",
    chapter: "Ch. 6",
    title: "Carrie Viola Evans passes",
    summary:
      "Carrie Evans dies in the ICU at Providence Hospital, two weeks after exploratory surgery the author says was authorized by Phyllis, who he documents lacks the cognitive capacity to make medical decisions. She is buried at Fort Lincoln Cemetery.",
  },
  {
    date: "1996 onward",
    chapter: "Ch. 7",
    title: "The isolation begins",
    summary:
      "Within weeks of Carrie's death, the author says, control of Phyllis and the estate reorients. A Power of Attorney established in 1996 grants formal authority over Phyllis's affairs. The author documents that his calls go unanswered and his access is severed.",
  },
  {
    date: "Date unrecorded",
    chapter: "Ch. 8",
    title: "James Evans Jr. dies in the family home",
    summary:
      "James William Evans Jr. is found dead at 2905 Mills Avenue after what the author describes as a fatal drug overdose following a robbery. The author learns of his brother's death three weeks later, from a stranger on the street.",
  },
  {
    date: "Date unrecorded",
    chapter: "Ch. 8",
    title: "Phillip Leer Evans dies",
    summary:
      "The author's twin dies after a brain tumor the author says was missed in January and not caught until August, when he was found stuck in his bathtub. The author intervened to stop surgery that, given Phillip's advanced HIV, he says would have been fatal. Phillip died days later. The author was told eight days late by a family friend.",
  },
  {
    date: "September 5, 2017",
    chapter: "Ch. 10",
    title: "The FBI complaint",
    summary:
      "The author files a formal criminal complaint with the FBI. The Washington Field Office reviews it and does not identify a violation of federal criminal law. The Financial Crimes Section at Headquarters concurs. The author documents the response in writing.",
  },
  {
    date: "May 2025",
    chapter: "Foreword",
    title: "The petition to Congress",
    summary:
      "The author petitions the United States Congress for an investigation into the systemic failure of federal and District of Columbia agencies to protect his sister Phyllis from decades of exploitation. The book is published the same year.",
  },
];

// The Family — In Memoriam wall. Cards with a name, role, and one line from the book.
export type FamilyMember = {
  name: string;
  role: string;
  years?: string;
  line: string;
  chapter: string;
};

export const FAMILY: FamilyMember[] = [
  {
    name: "James William Evans Sr.",
    role: "Father · Navy veteran · Greyhound transmission mechanic.",
    years: "d. 1980",
    line: "Navy veteran and skilled transmission mechanic for the Greyhound Bus Company from the late 1950s and 1960s through the 1970s — a major technical achievement. Never relying on food stamps or welfare, he paid off 2905 Mills Avenue in full with his own hands. Yet with that achievement came the immense frustration of a proud Black man navigating a white-dominated society that denied respect and fair advancement.",
    chapter: "Ch. 1",
  },
  {
    name: "Carrie Viola Evans",
    role: "Mother. Matriarch. Keeper of the home.",
    years: "d. December 1996",
    line: "She raised seven children through independence and faith — never on food stamps or welfare. She prayed the way other people breathed, continuously, without announcement, as a condition of being alive.",
    chapter: "Ch. 1",
  },
  {
    name: "James Evans Jr.",
    role: "Oldest brother. Veteran.",
    line: "He sat me down and talked to me. He told me what it would do. I never touched the things he warned me about. That was his gift to me.",
    chapter: "Ch. 1, Ch. 8",
  },
  {
    name: "Tyrone Eric Evans",
    role: "Brother. Father of Simone C. Evans.",
    line: "He watched Surraya Richardson build her position around Phyllis. He saw the documents being drafted. He knew the will was wrong. He carried that knowledge to his grave.",
    chapter: "Ch. 1",
  },
  {
    name: "Dwight Landers Evans",
    role: "Brother.",
    years: "d. Fall 1996",
    line: "My brother lies in the ground without the marker his life earned. I will fix that.",
    chapter: "Ch. 1, Ch. 8",
  },
  {
    name: "Phillip Leer Evans",
    role: "Victor's twin. Recovering. Fighter.",
    years: "d. 2022",
    line: "He got clean. He entered recovery. He did the hard, grinding, unglamorous work of rebuilding a life that addiction had tried to destroy. He was still trying.",
    chapter: "Ch. 8",
  },
  {
    name: "Phyllis Lorraine Evans",
    role: "Twin sister of Phillip. Born May 15, 1960 at Freedman's Hospital.",
    line: "She is not a spectacle. She is a sister and a person. The author documents that she has spent nearly three decades under the control of people who are not her family.",
    chapter: "Ch. 2",
  },
];

// The System — Deaf Ears and Blind Eyes.
// Each card states what the author says he sent and what he says came back.
// All statements are framed as the author's documented account.
export type InstitutionCard = {
  name: string;
  sent: string;
  received: string;
  chapter: string;
};

export const INSTITUTIONS: InstitutionCard[] = [
  {
    name: "Metropolitan Police Department",
    sent: "Eighteen years of police wellness-check requests filed with the 5th District.",
    received:
      "Officers knocked, asked if Phyllis was fine, and left. One lieutenant noted that Phyllis appeared easily influenced and that Simone was positioning herself as family. The observation sat in a file. The author says he was told, at headquarters: We only do stabbings and shootings here.",
    chapter: "Ch. 10",
  },
  {
    name: "Adult Protective Services",
    sent: "Complaints documenting Phyllis's congenital brain injury, the will, the property transfer, and thirty years of isolation.",
    received:
      "The agency concluded Phyllis appeared to be a competent adult who had made her own choices. The author says APS then informed the perpetrators a complaint had been filed.",
    chapter: "Ch. 10",
  },
  {
    name: "Federal Bureau of Investigation",
    sent: "A formal criminal complaint filed September 5, 2017, with documentation of the property transfer, the will, and the chain of authority.",
    received:
      "The Washington Field Office reviewed the complaint and, in writing, did not identify a violation of federal criminal law. The Financial Crimes Section at Headquarters concurred.",
    chapter: "Ch. 10",
  },
  {
    name: "Department of Veterans Affairs",
    sent: "Twenty-three years of correspondence seeking correction of an incorrect disability rating.",
    received:
      "The VA maintained a 60 percent rating for twenty-three years, despite a 100 percent rating issued by the Secretary of the Army in 1992. The author is a member of the Monk v. United States class action filed March 29, 2024.",
    chapter: "Ch. 10",
  },
  {
    name: "D.C. & Maryland legal channels",
    sent: "Retainers paid to two attorneys and a complaint filed with the D.C. Bar Counsel.",
    received:
      "The author says one attorney took $2,500 and disappeared. Another took $2,500 and told him he had no intention of reviewing the case. The Bar Counsel produced no meaningful sanction.",
    chapter: "Ch. 10, Ch. 11",
  },
  {
    name: "United States Congress",
    sent: "A petition for congressional investigation, filed May 2025.",
    received:
      "Pending. The author has addressed the petition to Representative Jasmine Crockett and, through her office, to the Department of Justice, the FBI, APS, and the Council of the Inspectors General on Integrity and Efficiency.",
    chapter: "Foreword, Ch. 12",
  },
];

// The Six Demands — verbatim intent from Chapter 12.
// Each card expands on click. All language is drawn from the manuscript.
export type Demand = {
  number: string;
  title: string;
  short: string;
  body: string;
  authority: string;
};

export const DEMANDS: Demand[] = [
  {
    number: "01",
    title: "An independent guardian for Phyllis",
    short:
      "Court-appointed, expert in developmental disability, accountable to the court, with quarterly assessments.",
    body: "The guardian must not be chosen from the network of the people who have controlled Phyllis. The guardian must be selected by the court, with expertise in acquired and congenital brain injury, and must have the legal authority and practical capacity to protect Phyllis's interests — including access to her medical, financial, and legal records, and the authority to remove her from any environment determined to be harmful, regardless of her expressed preference to remain.",
    authority: "Court-appointed guardianship",
  },
  {
    number: "02",
    title: "A protective order and neutral guardianship",
    short:
      "All contact severed — in person, by phone, by mail, by electronic communication, through third parties.",
    body: "A permanent protection order against Surraya Richardson, Simone C. Evans, Michael Evans, Victoria L. Evans, and any associates acting in coordination with them. The order must prohibit all contact with Phyllis and any decision-making on her behalf. The grounds are documented in thirty years of correspondence, complaints, and filings, and in the deaths of two brothers in the house the named individuals controlled.",
    authority: "Court-issued protection order",
  },
  {
    number: "03",
    title: "A complete financial audit",
    short:
      "Every transaction on 2905 Mills Avenue N.E. and the forty acres in North Carolina since 1996.",
    body: "A comprehensive legal investigation into the management of both properties since 1996 — every mortgage payment, refinancing, home-equity loan, property tax bill, insurance claim, and transfer of ownership. The author asks that the fraudulent transfer be voided under Beaucar v. Bristol (1969), that both properties be restored to the estate of James and Carrie Evans, and that remaining equity be distributed to all heirs.",
    authority: "Court-supervised estate professional",
  },
  {
    number: "04",
    title: "Dignified burials and headstone restoration",
    short:
      "A headstone for Dwight. The parents' marker updated to include every child.",
    body: "Dwight Landers Evans needs a headstone. The author's parents' marker must be updated to include the names and dates of all their children — including James Jr. and Phillip, whose remains the author asks be located, identified, and properly interred. These are not monuments. They are markers. The basic recognition that these people lived.",
    authority: "Family + court coordination",
  },
  {
    number: "05",
    title: "Accountability from the Department of Veterans Affairs",
    short:
      "Compensation for twenty-three years of an incorrect rating. Restoration of Schedule A Veteran status.",
    body: "VA Case 30-262-166. For twenty-three years, the VA maintained a 60 percent disability rating the Army itself had overridden with a 100 percent rating in 1992. The author requests compensation for the economic bondage the error imposed, restoration of his Schedule A Veteran status, and a VA Vocational Rehabilitation ticket. He is a member of the Monk v. United States class action (filed March 29, 2024).",
    authority: "Department of Veterans Affairs",
  },
  {
    number: "06",
    title: "Congressional oversight",
    short:
      "Of the DOJ, FBI, APS, and the Council of the Inspectors General on Integrity and Efficiency.",
    body: "Addressed to Representative Jasmine Crockett and, through her office, to the Departments of Justice, the FBI, APS, and CIGIE. Three oversight departments failed: DOJ through the FBI's refusal to investigate, VA through twenty-three years of an incorrect rating, and HHS through APS's dismissal of documented exploitation. The author asks Congress to examine the systemic conditions that produced these failures — not only for his family, but for every Black family that depends on government institutions for protection.",
    authority: "United States Congress",
  },
];

// Read Inside — three excerpts under 150 words each, attributed by chapter.
// Chosen from the opening of Chapter 1, the Prologue's Arithmetic of Loss, and
// the Epilogue's "I didn't forget." Avoids profanity and any passage that
// names a living private individual in an accusatory way.
export type Excerpt = {
  attribution: string;
  label: string;
  text: string;
};

export const EXCERPTS: Excerpt[] = [
  {
    attribution: "Chapter 1 — The Greyhound Transmission Mechanic: Achievement, Frustration, and Survival",
    label: "The opening of the book",
    text: "My father, James William Evans Sr., was a Navy veteran. He served his country, came home, and went to work at the Greyhound Bus Lines terminal in Washington, D.C. He started as a cook in the terminal cafeteria. Later he moved to the maintenance shop, where he worked as a mechanic. This was steady work. It paid enough to support a wife and eventually seven children in a house on Mills Avenue in Northeast Washington.\n\nIn the world my father inhabited, a Black man with a steady job and a paid-off house had achieved something substantial.",
  },
  {
    attribution: "Prologue — The Arithmetic of Loss",
    label: "The arithmetic",
    text: "My mother's final wish was simple. She wanted her disabled daughter protected. She wanted the family home preserved. She wanted her children to care for one another the way she had cared for all of them — imperfectly, with strain, but without stopping. It was oral. It was clear. It was heard by me and by Aunt Frances. It should have been enough.\n\nIt was not enough.",
  },
  {
    attribution: "Epilogue — What Justice Looks Like from Here",
    label: "The closing line",
    text: "There is something I intend to do when this is over. When Phyllis is safe. When the estate is recovered. I intend to go back to 2905 Mills Avenue. I intend to stand on the front steps of that house — the steps my father built, the steps my mother swept, the steps my brothers sat on during the summers of their lives.\n\nThe walls remember. I didn't forget.",
  },
];

// Interactive table of contents — Parts and Chapters as an accordion.
export type Part = {
  number: string;
  title: string;
  chapters: { n: string; title: string }[];
};

export const CONTENTS: Part[] = [
  {
    number: "Front matter",
    title: "Prologue · Author's Notes · Foreword",
    chapters: [
      { n: "Prologue", title: "The Arithmetic of Loss" },
      { n: "Author's Note", title: "I am not asking anyone to take my word for it." },
      { n: "Author's Note on Sources", title: "On statutes, letters, memory, and names." },
      { n: "Foreword", title: "A Letter That Should Never Have Been Written" },
    ],
  },
  {
    number: "Part One",
    title: "Foundations and Fault Lines",
    chapters: [
      { n: "Ch. 1", title: "The Greyhound Transmission Mechanic: Achievement, Frustration, and Survival" },
      { n: "Ch. 2", title: "The Twins and the Burden of Hemiplegia" },
      { n: "Ch. 3", title: "The Stranger in Langdon Park" },
    ],
  },
  {
    number: "Part Two",
    title: "The Net Tightens",
    chapters: [
      { n: "Ch. 4", title: "Displacement and the Opportunists" },
      { n: "Ch. 5", title: "A Will Under Duress" },
      { n: "Ch. 6", title: "The Tragic End of Carrie Evans" },
    ],
  },
  {
    number: "Part Three",
    title: "The Era of Isolation and Tragedy",
    chapters: [
      { n: "Ch. 7", title: "The Puppeteers Take Control" },
      { n: "Ch. 8", title: "Casualties of Neglect: The Brothers' Demise" },
      { n: "Ch. 9", title: "The Illusion of Companionship" },
    ],
  },
  {
    number: "Part Four",
    title: "The Fight for Accountability",
    chapters: [
      { n: "Ch. 10", title: "Deaf Ears and Blind Eyes: The Systemic Failure" },
      { n: "Ch. 11", title: "The Legal Battlefield: Coercion vs. Free Will" },
      { n: "Ch. 12", title: "The Generational Curse Breaker" },
    ],
  },
  {
    number: "Back matter",
    title: "Epilogue · Acknowledgments",
    chapters: [
      { n: "Epilogue", title: "What Justice Looks Like from Here" },
      { n: "Acknowledgments", title: "On documentation, memory, and the discipline of the record." },
    ],
  },
];

// The Balance Sheet — what the system gave back for thirty years of input.
export const BALANCE_SHEET = [
  { value: 30, suffix: " years", label: "of documentation" },
  { value: 7, suffix: "", label: "children in one row house" },
  { value: 6, suffix: "", label: "demands for justice" },
  { value: 12, suffix: "", label: "chapters" },
];

// Signature phrases available for reuse — all from the manuscript.
export const SIGNATURES = {
  readRecord: "Read the record.",
  arithmetic: "The Arithmetic of Loss.",
  balance: "Thirty years. Thousands of pages. Hundreds of letters. Zero meaningful interventions.",
  audit: "This book is the audit.",
  walls: "The walls remember.",
  didntForget: "I didn't forget.",
  hope: "Hope is a discipline.",
} as const;
