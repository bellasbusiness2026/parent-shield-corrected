import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "5mb" }));

// Lazy GoogleGenAI client
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Requests requiring AI will use fallback rule-based advocacy generators.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "dummy-key",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const MANDATORY_DISCLAIMER = "ParentShield is a parental-support tool that provides legal information, documentation, and communication drafting—not formal legal counsel or representation. Outcomes depend on your facts and court orders. Consult a licensed Texas family law attorney for active litigation or court deadlines.";

const PARENTSHIELD_SYSTEM_INSTRUCTION = `You are "ParentShield," an expert AI Legal Advocate and Case Buffer for parents interacting with Child Protective Services (specifically the Texas Department of Family and Protective Services - DFPS).

You are an administrative and civil rights parental-support buffer, not an attorney. Your mission is to help preserve parental rights, support procedural due process, prevent involuntary admissions, eliminate vague demands, and create a durable audit trail. Always include the mandatory disclaimer. Do not promise case outcomes.

### 1. CORE LEGAL FOUNDATION
Operate strictly under the following legal authorities:
* U.S. Constitution:
  - 4th Amendment: No warrantless entry or seizures absent exigent circumstances (immediate life-threatening harm). Refusing entry to a home is a constitutional right.
  - 14th Amendment: Substantive and procedural due process; Troxel v. Granville (presumption of parental fitness, state cannot substitute its judgment for fit parents); Santosky v. Kramer (clear-and-convincing evidentiary floor for termination of parental rights).
* Texas Family Code (TFC) § 261.307 (HB 730 Mandatory Disclosures):
  - Caseworkers MUST give verbal and written notice of rights at initial contact:
    1. Right to assistance of an attorney;
    2. Right to audio/video record any interview;
    3. Right to refuse entry into the home;
    4. Right to withhold child or records;
    5. Right to refuse drug testing.
  - If required verbal and written notices under § 261.307 are missing, information obtained (and derivative information) may be inadmissible in civil proceedings. This is not a universal criminal bar or automatic case dismissal.
* TFC § 261.303: Refusal of entry without a court order is generally protected; outcomes are fact-specific. Exceptions (warrant, exigency, other lawful authority) can apply. The Department may petition for an "Order in Aid of Investigation."
* TFC § 262.201: Generally a 14-day Adversary Hearing requirement post-removal (subject to statutory exceptions).
* TFC § 263.401: Generally a 1-year dismissal deadline ("The Drop-Dead Date") for DFPS suits, subject to statutory exceptions including a possible one-time 180-day extension.

### 2. OPERATING RULES & DIRECTIVES
1. RADICAL DE-ESCALATION & EMOTIONAL STRIPPING: Strip all anger, fear, defensiveness, or pleading. Produce calm, precise, legally neutral prose. Never yell, threaten, or apologize.
2. WRITING AUDIT TRAIL ("The Paper Trail Rule"): Advise the parent to follow every verbal, in-person, or phone exchange with a formal confirmation email ("Confirming our conversation today at [Time]...").
3. VOLUNTARY VS. MANDATORY DISTINCTION: Identify whether any DFPS request is voluntary administrative pressure or a legally binding court order. Always ask: "Is there a signed judicial order, or is this an agency request?"
4. PRESERVE THE BURDEN OF PROOF: Never draft language where the parent tries to disprove an unverified allegation. Keep the legal burden on the state. Never submit explanations of unproven claims.
5. EXCLUSIONARY AUDIT: Constantly check if the investigator delivered verbal/written § 261.307 disclosures upon first contact.

### 3. OUTPUT CONSTRAINTS
* For Draft Responses: Always output polished, copy-paste-ready emails/letters with clear bracketed placeholders: [Caseworker Name], [Date], [Time], [Parent Name], etc.
* For Case Reviews: Group analyses into:
  (a) Immediate Rights/Risks
  (b) Voluntary vs. Mandatory Demands
  (c) Action Checklist
* For Disclaimers: Always include this exact single grounded sentence at the conclusion:
  "${MANDATORY_DISCLAIMER}"
`;

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    service: "ParentShield Texas DFPS Case Buffer",
  });
});

// Case Review Endpoint
app.post("/api/advocate/review-case", async (req, res) => {
  try {
    const { situation, caseworkerDemands, initialContactDetails, courtOrderPresent } = req.body;

    if (!situation && !caseworkerDemands) {
      res.status(400).json({ error: "Missing situation or caseworker demands description." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // High-quality deterministic fallback if no API key is provided
      const fallbackAnalysis = generateFallbackReview({
        situation,
        caseworkerDemands,
        courtOrderPresent: !!courtOrderPresent,
      });
      res.json(fallbackAnalysis);
      return;
    }

    const prompt = `Analyze this parent's CPS/DFPS situation under Texas Family Code and Constitutional protections:
Parent's Situation Description:
${situation || "Not provided"}

Caseworker Demands / Pressure:
${caseworkerDemands || "Not provided"}

Court Order Status: ${courtOrderPresent ? "Parent states there is a court order" : "No court order reported; administrative agency request"}
Initial Contact Context: ${initialContactDetails || "Standard initial or ongoing contact"}

Please provide a comprehensive Case Review adhering to ParentShield rules. Return a JSON object with the following fields:
{
  "immediateRightsRisks": [
    "string analyzing immediate constitutional/statutory rights and risk points (4th Amend, 14th Amend, TFC § 261.307, TFC § 261.303, Troxel v. Granville)"
  ],
  "voluntaryVsMandatory": [
    {
      "demand": "demand description",
      "type": "Voluntary Administrative Request" or "Mandatory Court Order",
      "legalBasis": "statute/amendment explanation (e.g., TFC § 261.303, TFC § 261.307, 4th Amend)",
      "parentShieldGuidance": "firm guidance on how to respond without admitting guilt or shifting burden"
    }
  ],
  "actionChecklist": [
    "step-by-step sequential actions parent must take now (e.g. record, send confirmation email, request written specifications)"
  ],
  "auditTrailDraft": "Full copy-paste-ready formal confirmation/response letter or email with bracketed placeholders like [Caseworker Name], [Date], [Time], [Parent Name], [Case ID if known]. Stripped of emotion, strictly neutral and asserting statutory rights.",
  "disclaimer": "${MANDATORY_DISCLAIMER}"
}`;

    const ai = getAi();
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: PARENTSHIELD_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    try {
      const parsed = JSON.parse(text);
      if (!parsed.disclaimer) {
        parsed.disclaimer = MANDATORY_DISCLAIMER;
      }
      res.json(parsed);
    } catch {
      res.json({
        rawAnalysis: text,
        disclaimer: MANDATORY_DISCLAIMER,
      });
    }
  } catch (error: any) {
    console.error("Error in review-case:", error);
    res.status(500).json({ error: error.message || "Failed to process case review." });
  }
});

// Emotional Stripper & De-escalation Endpoint
app.post("/api/advocate/strip-emotion", async (req, res) => {
  try {
    const { rawText, messageContext, targetRecipient } = req.body;

    if (!rawText) {
      res.status(400).json({ error: "Missing raw text to strip." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback deterministic transformer
      const fallbackClean = generateFallbackEmotionalStrip(rawText, messageContext);
      res.json(fallbackClean);
      return;
    }

    const prompt = `Perform Radical De-escalation & Emotional Stripping on this parent's draft communication:
Context: ${messageContext || "Communication to Texas DFPS/CPS caseworker or supervisor"}
Recipient: ${targetRecipient || "Caseworker"}
Parent's Raw / Emotional Draft:
"""${rawText}"""

TASK:
1. Strip all anger, anxiety, fear, defensiveness, explanations disproving unproven claims, apologies, and pleas.
2. Produce a calm, legally precise, neutral, and assertive response under Texas Family Code and constitutional standards.
3. Preserve the burden of proof strictly on the State of Texas / DFPS.
4. Enforce the Paper Trail Rule ("Confirming our conversation today at [Time]...").
5. Include bracketed placeholders [Caseworker Name], [Date], [Time], [Parent Name].
6. Identify the specific traps/admissions removed from the parent's draft.

Return JSON:
{
  "polishedDraft": "Clean, copy-paste-ready formal text with placeholders",
  "subjectLine": "RE: Texas DFPS Case - Written Confirmation of Communication [Date]",
  "trapsRemoved": [
    "Explanation of why a specific allegation was stripped to prevent involuntary admissions or burden-shifting"
  ],
  "legalSafeguardsApplied": [
    "Specific safeguards (e.g. 4th Amendment preservation, TFC § 261.303 confirmation of lack of court order, TFC § 261.307 record notice)"
  ],
  "disclaimer": "${MANDATORY_DISCLAIMER}"
}`;

    const ai = getAi();
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: PARENTSHIELD_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    try {
      const parsed = JSON.parse(text);
      if (!parsed.disclaimer) {
        parsed.disclaimer = MANDATORY_DISCLAIMER;
      }
      res.json(parsed);
    } catch {
      res.json({
        polishedDraft: text,
        disclaimer: MANDATORY_DISCLAIMER,
      });
    }
  } catch (error: any) {
    console.error("Error in strip-emotion:", error);
    res.status(500).json({ error: error.message || "Failed to de-escalate message." });
  }
});

// Interactive Advocate Chat Endpoint
app.post("/api/advocate/chat", async (req, res) => {
  try {
    const { messages, activeCaseContext } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Messages array is required." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const lastMsg = messages[messages.length - 1]?.content || "";
      const reply = generateFallbackChatResponse(lastMsg);
      res.json({ reply, disclaimer: MANDATORY_DISCLAIMER });
      return;
    }

    const formattedContents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    let contextNote = "";
    if (activeCaseContext) {
      contextNote = `\n[System Context: Active Case Details: Caseworker: ${activeCaseContext.caseworkerName || "Unknown"}, Initial Disclosures Given: ${activeCaseContext.disclosuresGiven ? "Yes" : "No"}, Order Present: ${activeCaseContext.courtOrderPresent ? "Yes" : "No"}]\n`;
    }

    const ai = getAi();
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: formattedContents,
      config: {
        systemInstruction: PARENTSHIELD_SYSTEM_INSTRUCTION + contextNote,
      },
    });

    const reply = response.text || "I am ready to assist you in defending your parental rights.";
    res.json({
      reply,
      disclaimer: MANDATORY_DISCLAIMER,
    });
  } catch (error: any) {
    console.error("Error in advocate chat:", error);
    res.status(500).json({ error: error.message || "Failed to process chat message." });
  }
});

// HB 730 § 261.307 Exclusionary Audit Endpoint
app.post("/api/advocate/hb730-audit", async (req, res) => {
  try {
    const {
      verbalDisclosuresGiven,
      writtenFormProvided,
      advisedOfAttorneyRight,
      advisedOfRecordingRight,
      advisedOfRightToRefuseEntry,
      advisedOfRightToRefuseDrugTest,
      advisedOfRightToWithholdRecords,
      caseworkerName,
      initialContactDate,
      firstContactLocation,
    } = req.body;

    const violations: string[] = [];
    if (!verbalDisclosuresGiven) violations.push("Missing required verbal notification of statutory rights at first contact (TFC § 261.307(a)).");
    if (!writtenFormProvided) violations.push("Missing required written notice under § 261.307 (TFC § 261.307(a)).");
    if (!advisedOfAttorneyRight) violations.push("Failure to disclose the right to assistance of legal counsel prior to interview or inspection (TFC § 261.307(a)(1)).");
    if (!advisedOfRecordingRight) violations.push("Failure to disclose statutory right to audio/video record all interactions and interviews (TFC § 261.307(a)(2)).");
    if (!advisedOfRightToRefuseEntry) violations.push("Failure to disclose right to refuse entry without a court order (TFC § 261.307(a)(3) & § 261.303).");
    if (!advisedOfRightToRefuseDrugTest) violations.push("Failure to disclose right to refuse voluntary substance/drug screening absent judicial warrant (TFC § 261.307(a)(4)).");
    if (!advisedOfRightToWithholdRecords) violations.push("Failure to disclose right to withhold medical, school, and psychological records absent court order (TFC § 261.307(a)(5)).");

    const isExclusionaryBarTriggered = violations.length > 0;

    let formalViolationNotice = "";
    if (isExclusionaryBarTriggered) {
      formalViolationNotice = `Date: ${initialContactDate || "[Date]"}
TO: ${caseworkerName || "[Caseworker Name]"}, Investigator / Caseworker
CC: Texas DFPS Regional Supervision / Office of Consumer Affairs
RE: FORMAL NOTICE OF STATUTORY NON-COMPLIANCE & ASSERTION OF EXCLUSIONARY BAR
Statutory Authority: Texas Family Code § 261.307 (HB 730) & U.S. Const. Amends. IV, XIV

Dear ${caseworkerName || "[Caseworker Name]"},

This correspondence serves as formal written notice and documentation that during your initial contact with the undersigned parent on ${initialContactDate || "[Date]"} at ${firstContactLocation || "[Location]"}, the Department failed to provide mandatory statutory disclosures required by Texas Family Code § 261.307 (enacted via HB 730).

Specifically, the following mandatory statutory notices were omitted:
${violations.map((v, i) => `${i + 1}. ${v}`).join("\n")}

Under Texas law and established civil rights precedent:
1. Texas Family Code § 261.307 generally requires that before conducting any interview, home inspection, or requesting voluntary cooperation, the Department deliver both verbal and required written notice of parental rights under § 261.307.
2. Under TFC § 261.307, if required verbal and written notices were missing, information obtained (and derivative information) may be inadmissible in civil proceedings. This is not a universal criminal bar or automatic case dismissal; consult counsel regarding your facts.
3. The undersigned parent asserts all constitutional protections under the Fourth and Fourteenth Amendments to the United States Constitution, the presumption of parental fitness under Troxel v. Granville, 530 U.S. 57 (2000), and all protections under Texas Family Code § 261.303.
4. All future communications must be conducted in writing via email to preserve a complete administrative audit trail. The parent exercises their statutory right to record any oral communication and to be accompanied by counsel.

Please confirm in writing your receipt of this notice and provide copies of any intake documents or supervisory authorizations in your file.

Respectfully,

[Parent Signature]
[Parent Printed Name]
[Contact Email / Phone]`;
    }

    res.json({
      isExclusionaryBarTriggered,
      violationsCount: violations.length,
      violations,
      statusAssessment: isExclusionaryBarTriggered
        ? "STATUTORY NOTICE GAP DETECTED: Caseworker omitted required HB 730 / TFC § 261.307 verbal and/or written notices at initial contact. Information obtained may be inadmissible in civil proceedings—not a criminal bar or automatic win."
        : "FULL INITIAL COMPLIANCE RECORDED: Written and verbal disclosures were reportedly delivered in accordance with TFC § 261.307.",
      formalViolationNotice,
      disclaimer: MANDATORY_DISCLAIMER,
    });
  } catch (error: any) {
    console.error("Error in hb730-audit:", error);
    res.status(500).json({ error: error.message || "Failed to evaluate HB 730 audit." });
  }
});

// Deterministic Fallback Review Generator for seamless operation
function generateFallbackReview({
  situation,
  caseworkerDemands,
  courtOrderPresent,
}: {
  situation: string;
  caseworkerDemands: string;
  courtOrderPresent: boolean;
}) {
  const voluntaryOrMandatory = courtOrderPresent
    ? {
        demand: caseworkerDemands || "Judicial orders or investigator directives",
        type: "Court-Ordered Mandatory",
        legalBasis: "Signed judicial order subject to TFC § 262 and Chapter 263 requirements.",
        parentShieldGuidance: "Obtain a certified copy of the signed order immediately. Do not exceed the literal four corners of what the judge signed. Consult litigation counsel.",
      }
    : {
        demand: caseworkerDemands || "Agency request for entry, drug testing, or interviews",
        type: "Voluntary Administrative Request",
        legalBasis: "Texas Family Code § 261.303 & 4th Amendment U.S. Constitution.",
        parentShieldGuidance: "Refusal of entry or testing absent a court order is lawful. Request that all agency inquiries be submitted in writing. Do not sign voluntary PCSPs without legal review.",
      };

  const draftResponse = `Date: [Date]
Time: [Time]
To: [Caseworker Name], Texas DFPS Investigator / Caseworker
From: [Parent Name]
RE: Written Confirmation & Administrative Response Regarding Case Inquiries

Dear [Caseworker Name],

I am writing to confirm our recent communication on [Date] at approximately [Time]. To ensure clarity, transparency, and an accurate administrative audit trail, I am memorializing the matters discussed.

1. Administrative Nature of Request:
You requested [specify request: e.g., entry into my residence / execution of releases / drug screening]. You confirmed that there is currently no signed judicial order compelling these actions. As you are aware, under the Fourth Amendment to the United States Constitution and Texas Family Code § 261.303, refusal to permit warrantless administrative entry or inspection absent a court order or exigent circumstances is entirely lawful.

2. Texas Family Code § 261.307 (HB 730) Mandatory Rights:
I formally reserve and assert all statutory and constitutional rights, including:
- The right to consult and be represented by legal counsel before participating in interviews or signing administrative forms;
- The right to audio or video record any verbal interview or inspection in accordance with TFC § 261.307;
- The right to inspect and withhold confidential medical, educational, and personal records absent a tailored judicial subpoena.

3. Written Communication Protocol:
To prevent misunderstandings and maintain a complete written record, please submit any specific questions, factual inquiries, or official Department requests in writing to this email address. I will review all written communications promptly.

Respectfully,

[Parent Name]
[Parent Contact Info]`;

  return {
    immediateRightsRisks: [
      "4th Amendment Protection: Warrantless entry into your home by DFPS caseworkers or law enforcement without emergency exigent circumstances is unconstitutional.",
      "Presumption of Parental Fitness: Under Troxel v. Granville (530 U.S. 57), the State cannot substitute its judgment for a fit parent's decisions without clear legal grounds.",
      "Right to Refuse Voluntary Safety Plans: 'Parental Child Safety Placements' (PCSPs) are voluntary administrative contracts. Signing one can forfeit physical custody without a court hearing.",
      "Burden of Proof: The Department bears the legal burden of proof. You are not required to disprove unverified allegations or provide self-incriminating statements.",
    ],
    voluntaryVsMandatory: [voluntaryOrMandatory],
    actionChecklist: [
      "Ask directly: 'Is this an agency request, or do you have a signed court order signed by a judge?'",
      "Do not permit entry into your residence unless the worker shows a signed 'Order in Aid of Investigation' or search warrant.",
      "Send a formal written confirmation email memorializing the conversation under the Paper Trail Rule.",
      "Audit whether the investigator provided verbal and written § 261.307 disclosures upon first contact.",
      "Request all future questions and demands in writing via email.",
    ],
    auditTrailDraft: draftResponse,
    disclaimer: MANDATORY_DISCLAIMER,
  };
}

function generateFallbackEmotionalStrip(rawText: string, context?: string) {
  return {
    subjectLine: "RE: Texas DFPS Case Communication - Written Confirmation [Date]",
    polishedDraft: `Date: [Date]
Time: [Time]
To: [Caseworker Name], Texas DFPS
From: [Parent Name]
RE: Written Memorialization of Case Discussion

Dear [Caseworker Name],

Confirming our conversation today, [Date], at approximately [Time]. 

Regarding the matters discussed:
1. I am requesting that all formal Department inquiries, allegations, and proposed action items be provided in writing via email to preserve a precise administrative record.
2. Under Texas Family Code § 261.307 and § 261.303, I maintain all constitutional rights under the Fourth and Fourteenth Amendments, including the right to legal counsel prior to executing releases or providing interviews, and the right to record any oral communication.
3. I am prepared to review any specific, written requests provided by the Department.

Please confirm receipt of this email for the case file.

Respectfully,

[Parent Name]
[Parent Contact Information]`,
    trapsRemoved: [
      "Removed defensive rebuttals attempting to disprove unverified allegations (maintains state's burden of proof).",
      "Stripped emotional expressions, anger, and anxiety to prevent caseworker from misinterpreting stress as instability.",
      "Replaced verbal concessions with formal written communication requirement.",
    ],
    legalSafeguardsApplied: [
      "Paper Trail Rule: Establishes a timestamped written record of agency contact.",
      "TFC § 261.307 & § 261.303 statutory reservation of rights.",
      "Protection against involuntary administrative waivers.",
    ],
    disclaimer: MANDATORY_DISCLAIMER,
  };
}

function generateFallbackChatResponse(lastMsg: string) {
  const lower = lastMsg.toLowerCase();
  if (lower.includes("door") || lower.includes("home") || lower.includes("entry") || lower.includes("inside")) {
    return `**IMMEDIATE 4TH AMENDMENT & TFC § 261.303 GUIDANCE:**

1. **You Are Not Required to Open Your Door or Permit Entry:**
Under the 4th Amendment to the U.S. Constitution and Texas Family Code § 261.303, DFPS caseworkers cannot force entry into your private residence without either:
- A signed judicial **"Order in Aid of Investigation"** issued by a judge upon probable cause; or
- Genuine, immediate life-threatening emergency (exigent circumstances).

2. **What to Say Through the Closed Door:**
*"I am exercising my constitutional rights and Texas Family Code § 261.303. I do not consent to a warrantless search or entry into my home. If you have a signed court order, please slide it under the door or email it to me. Otherwise, please provide your business card and send all inquiries in writing."*

3. **Record the Interaction:**
In Texas, if you are part of a conversation, Penal Code § 16.02 generally lets you record it without the other person’s consent (one-party consent). For DFPS contact, Family Code § 261.307 also addresses the right to record interactions or interviews, and a recording may later be disclosed under a court order. Extra rules can apply to alleged-perpetrator interviews (§ 261.3027), including limits on posting identifying recordings online. This is general information, not legal advice—ask a Texas attorney about your situation. Start recording immediately if lawful for your situation.

4. **Send a Paper Trail Confirmation Immediately After:**
Once they leave, send an immediate confirmation email:
*[Date] [Time] - Confirming you visited my residence today without a court order...*`;
  }

  if (lower.includes("drug") || lower.includes("test") || lower.includes("screen") || lower.includes("urine") || lower.includes("hair")) {
    return `**SUBSTANCE TESTING DEMAND ANALYSIS (TFC § 261.307 / 4th AMENDMENT):**

1. **Voluntary vs. Mandatory:**
Ask the caseworker: *"Do you have a signed judicial order compelling me to submit to drug testing, or is this an agency request?"*
- Without a signed court order, drug screening is generally treated as a voluntary administrative request under Texas law (confirm with counsel for your facts).
- DFPS cannot legally compel you to submit bodily fluids without a court order.

2. **The Risk of 'Vague Voluntary Demands':**
Caseworkers frequently imply that refusal proves guilt or that immediate compliance will 'close the case.' In reality, voluntary hair follicle or urine tests can yield false positives or be used to substantiate allegations without procedural due process.

3. **Recommended Neutral Written Response:**
*"Confirming your verbal request today at [Time] for voluntary drug screening. As there is no judicial order compelling this request, and pursuant to Texas Family Code § 261.307(a)(4), I decline voluntary testing at this time pending consultation with legal counsel."*`;
  }

  return `I am ParentShield, your Texas DFPS case buffer and administrative rights advocate.

**Three Core Principles for Your Interaction Today:**
1. **Demand Written Specifics:** Never rely on verbal statements. Follow every conversation with a confirmation email ("The Paper Trail Rule").
2. **Distinguish Voluntary vs. Court Orders:** Always establish: *"Is there a signed judicial order, or is this an agency request?"*
3. **Preserve the Burden of Proof:** Never attempt to disprove unverified rumors or over-explain. The state bears the legal burden.

Tell me what the caseworker said or demanded, or share what you are preparing to send, and I will strip all emotional vulnerabilities and construct a legally protective response.`;
}

// Vite middleware / production static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const cwdDist = path.join(process.cwd(), "dist");
    const distPath = fs.existsSync(path.join(cwdDist, "index.html"))
      ? cwdDist
      : typeof __dirname !== "undefined"
      ? __dirname
      : cwdDist;

    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ParentShield server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal error during server startup:", err);
  process.exit(1);
});
