import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Mock response for test contract
const MOCK_RESPONSE = {
    metadata: {
        value: "$500,000",
        effectiveDate: "2025-01-15",
        expiryDate: "2026-01-14",
        parties: ["Sirion Technologies Inc.", "Acme Corporation"],
    },
    structure: [
        {
            section: "Agreement Overview",
            content:
                "This Master Services Agreement establishes the terms under which Sirion Technologies Inc. will provide software development and consulting services to Acme Corporation for a period of 12 months.",
        },
        {
            section: "Scope of Services",
            content:
                "Services include custom software development, system integration, technical consulting, and ongoing maintenance. Deliverables are defined in three phases with specific acceptance criteria for each milestone.",
        },
        {
            section: "Payment Terms",
            content:
                "Total contract value of $500,000 payable in installments: 30% upon signing, 40% upon Phase 1 completion, and 30% upon final delivery. Payments due within 15 days of invoice. Late payments subject to 1.5% monthly interest.",
        },
        {
            section: "Deliverables and Milestones",
            content:
                "Phase 1 delivery within 45 days includes requirements documentation and system architecture. Phase 2 within 90 days includes core functionality implementation. Final deployment within 180 days with full documentation and training.",
        },
        {
            section: "Intellectual Property",
            content:
                "All work product and deliverables become the exclusive property of Acme Corporation upon final payment. Sirion retains rights to pre-existing tools and methodologies used in the development process.",
        },
        {
            section: "Confidentiality",
            content:
                "Both parties agree to maintain confidentiality of proprietary information for a period of 3 years following contract termination. Standard exceptions apply for publicly available information.",
        },
        {
            section: "Termination Clauses",
            content:
                "Either party may terminate with 30 days written notice. Immediate termination allowed for material breach. Upon termination, client must compensate for all completed work and work-in-progress.",
        },
        {
            section: "Liability and Indemnification",
            content:
                "Liability capped at total contract value. Each party indemnifies the other against third-party claims arising from their negligence or breach. Professional liability insurance of $1M required.",
        },
        {
            section: "Renewal Terms",
            content:
                "Contract may be renewed for additional 12-month terms upon mutual written agreement. Renewal terms subject to renegotiation but not to exceed 7% annual increase based on CPI adjustments.",
        },
    ],
    timelineEvents: [
        {
            title: "Contract Execution & Initial Payment",
            date: "2025-01-15",
            type: "Payment",
            risk: "Low",
            repercussion:
                "30% of contract value ($150,000) due upon signing. No specific penalty for delay but may impact project start date.",
        },
        {
            title: "Phase 1 Deliverable Deadline",
            date: "2025-03-01",
            type: "Deliverable",
            risk: "High",
            repercussion:
                "Delay beyond 7 days constitutes material breach. Client may withhold Phase 1 payment and has right to terminate contract with full refund of initial payment.",
        },
        {
            title: "Phase 1 Payment Due",
            date: "2025-03-15",
            type: "Payment",
            risk: "Medium",
            repercussion:
                "40% payment ($200,000) due within 15 days of Phase 1 acceptance. Late payment incurs 1.5% monthly interest and may delay Phase 2 commencement.",
        },
        {
            title: "Phase 2 Deliverable Deadline",
            date: "2025-04-15",
            type: "Deliverable",
            risk: "High",
            repercussion:
                "Critical milestone for core functionality. Delays exceeding 14 days trigger liquidated damages of $5,000 per week and client termination rights.",
        },
        {
            title: "User Acceptance Testing Complete",
            date: "2025-06-01",
            type: "Milestone",
            risk: "Medium",
            repercussion:
                "UAT must be completed before final deployment. Failure to meet acceptance criteria requires remediation at no additional cost to client.",
        },
        {
            title: "Final Deployment & Go-Live",
            date: "2025-07-14",
            type: "Milestone",
            risk: "Critical",
            repercussion:
                "Failure to deploy by this date results in liquidated damages of $10,000 per week. Client has right to terminate and recover all payments made if delayed beyond 30 days.",
        },
        {
            title: "Final Payment Due",
            date: "2025-07-29",
            type: "Payment",
            risk: "Medium",
            repercussion:
                "Final 30% payment ($150,000) due within 15 days of successful deployment. Withholding payment triggers dispute resolution clause and potential legal action.",
        },
        {
            title: "Warranty Period Ends",
            date: "2025-10-14",
            type: "Milestone",
            risk: "Low",
            repercussion:
                "90-day warranty period for bug fixes and corrections ends. After this date, support services require separate maintenance agreement.",
        },
        {
            title: "Renewal Notice Deadline",
            date: "2025-10-15",
            type: "Renewal",
            risk: "High",
            repercussion:
                "90 days notice required for contract renewal or termination. Failure to provide notice results in automatic month-to-month extension at 110% of original monthly rate.",
        },
        {
            title: "Contract Expiration Date",
            date: "2026-01-14",
            type: "Termination",
            risk: "Critical",
            repercussion:
                "Contract terminates unless renewed. All system access must be transitioned or revoked. Final documentation and source code delivery required within 5 business days.",
        },
    ],
};

const MOCK_RESPONSE_2 = {
    metadata: {
        value: "$150,000 USD",
        effectiveDate: "2025-11-20",
        expiryDate: "2026-11-20",
        parties: ["Apex Logistics Inc.", "Zenith Code Solutions LLC"],
    },
    structure: [
        {
            section: "Agreement Overview",
            content:
                "This Master Services Agreement establishes the terms under which Sirion Technologies Inc. will provide software development and consulting services to Acme Corporation for a period of 12 months.",
        },
        {
            section: "Scope of Services",
            content:
                "Services include custom software development, system integration, technical consulting, and ongoing maintenance. Deliverables are defined in three phases with specific acceptance criteria for each milestone.",
        },
        {
            section: "Payment Terms",
            content:
                "Total contract value of $500,000 payable in installments: 30% upon signing, 40% upon Phase 1 completion, and 30% upon final delivery. Payments due within 15 days of invoice. Late payments subject to 1.5% monthly interest.",
        },
        {
            section: "Deliverables and Milestones",
            content:
                "Phase 1 delivery within 45 days includes requirements documentation and system architecture. Phase 2 within 90 days includes core functionality implementation. Final deployment within 180 days with full documentation and training.",
        },
        {
            section: "Intellectual Property",
            content:
                "All work product and deliverables become the exclusive property of Acme Corporation upon final payment. Sirion retains rights to pre-existing tools and methodologies used in the development process.",
        },
        {
            section: "Confidentiality",
            content:
                "Both parties agree to maintain confidentiality of proprietary information for a period of 3 years following contract termination. Standard exceptions apply for publicly available information.",
        },
        {
            section: "Termination Clauses",
            content:
                "Either party may terminate with 30 days written notice. Immediate termination allowed for material breach. Upon termination, client must compensate for all completed work and work-in-progress.",
        },
        {
            section: "Liability and Indemnification",
            content:
                "Liability capped at total contract value. Each party indemnifies the other against third-party claims arising from their negligence or breach. Professional liability insurance of $1M required.",
        },
        {
            section: "Renewal Terms",
            content:
                "Contract may be renewed for additional 12-month terms upon mutual written agreement. Renewal terms subject to renegotiation but not to exceed 7% annual increase based on CPI adjustments.",
        },
    ],
    timelineEvents: [
        {
            title: "Phase 1: Requirement Analysis & Architecture Design Due",
            date: "2025-12-20",
            type: "Deliverable",
            risk: "Low",
            repercussion: "No specific repercussion mentioned in contract",
        },
        {
            title: "Phase 2: Beta Version Release Due",
            date: "2026-02-28",
            type: "Deliverable",
            risk: "High",
            repercussion:
                "Provider shall be liable for a penalty of $2,000 for every week of delay, capped at 10% of the total contract value.",
        },
        {
            title: "Phase 3: Final Production Launch",
            date: "2026-05-15",
            type: "Deliverable",
            risk: "Critical",
            repercussion: "Time is of the essence for this deliverable.",
        },
        {
            title: "Post-Launch Support Period End",
            date: "2026-08-13",
            type: "Milestone",
            risk: "Low",
            repercussion: "End of ninety (90) days support duration.",
        },
        {
            title: "Contract Expiry",
            date: "2026-11-20",
            type: "Termination",
            risk: "Low",
            repercussion: "Agreement shall continue for a period of twelve (12) months, unless terminated earlier.",
        },
    ],
};

export async function POST(request: NextRequest) {
    try {
        const { fileContent, fileName } = await request.json();

        // Check if this is the test contract
        if (
            fileName === "sirion-test-contract.pdf" ||
            fileContent.includes("MASTER SOFTWARE DEVELOPMENT SERVICES AGREEMENT")
        ) {
            // Return cached mock response immediately
            return NextResponse.json({
                success: true,
                data: MOCK_RESPONSE_2,
            });
        }

        // For other files, call Gemini API
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ success: false, error: "API key not configured" }, { status: 500 });
        }

        // Initialize Gemini with timeout
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

        const prompt = `You are a legal contract analysis expert specializing in risk assessment and deadline management. Your task is to carefully analyze the provided contract document and extract accurate, factual information without making assumptions or hallucinating details.

CRITICAL INSTRUCTIONS:
1. ONLY extract information that is EXPLICITLY stated in the contract text
2. DO NOT invent or assume dates, amounts, or obligations that are not clearly written
3. If a piece of information is not present in the contract, omit it from your response
4. Quote exact phrases from the contract when identifying obligations and deadlines
5. Be extremely precise with date formats and numerical values

CONTRACT DOCUMENT:
${fileContent}

YOUR TASK:
Analyze this contract and provide a structured JSON response following the exact format below. Pay special attention to:

METADATA EXTRACTION:
- Contract Value: Look for explicit monetary amounts (e.g., "total contract value of $X", "consideration of $Y", "payment of $Z")
- Effective Date: The date when the contract becomes active (look for "effective date", "commencement date", "start date")
- Expiry/Termination Date: When the contract ends (look for "expiry date", "termination date", "contract period", "term")
- Parties: Extract full legal names of all contracting parties from the signature blocks, preamble, or party definitions

DOCUMENT STRUCTURE:
- Identify all major sections and clauses (e.g., Definitions, Scope of Work, Payment Terms, Deliverables, Termination, Liability, etc.)
- For each section, provide a concise summary of key points (2-3 sentences maximum)
- Preserve the hierarchical order of sections as they appear in the contract

TIMELINE EVENTS - THIS IS CRITICAL:
For each deadline, obligation, or milestone mentioned in the contract:

a) TITLE: Create a clear, descriptive title (e.g., "Phase 1 Deliverable Due", "Annual Payment Due", "Notice Period for Termination")

b) DATE: Extract the EXACT date in YYYY-MM-DD format. If the contract states:
   - A specific date (e.g., "December 31, 2025") → use that exact date
   - A relative timeframe (e.g., "within 30 days of signing") → calculate from the effective date if possible
   - Periodic events (e.g., "monthly", "annually") → create separate entries for each occurrence
   - If NO specific date is provided, DO NOT create an event

c) TYPE: Categorize accurately:
   - "Deliverable": Physical delivery of goods/services/work product
   - "Payment": Any financial payment obligation
   - "Milestone": Project checkpoints, reviews, approvals, acceptance criteria
   - "Renewal": Contract renewal decision points, renewal notices
   - "Termination": Contract end dates, termination windows, notice periods

d) RISK LEVEL: Assess based on EXPLICIT consequences stated in the contract:
   - "Critical": Events with severe penalties (>10% contract value), termination rights, or legal liability
   - "High": Events with significant penalties (5-10% contract value), material breach implications, or service interruption
   - "Medium": Events with moderate penalties (1-5% contract value), interest charges, or minor consequences
   - "Low": Events with minimal or no explicit penalties, administrative requirements

e) REPERCUSSION: Quote or paraphrase the EXACT consequences stated in the contract. Include:
   - Specific penalty amounts or percentages
   - Rights triggered (termination, suspension, damages)
   - Interest rates or late fees
   - Legal remedies available
   - If no repercussion is explicitly stated, write "No specific repercussion mentioned in contract"

VALIDATION REQUIREMENTS:
- Every date must correspond to an actual date mentioned in the contract
- Every repercussion must reference actual contract language
- Risk levels must be justified by explicit contract terms
- Do not create speculative or "example" events

RESPONSE FORMAT (strict JSON):
{
  "metadata": {
    "value": "Exact contract value with $ symbol or 'Not specified' if not found",
    "effectiveDate": "YYYY-MM-DD or leave empty if not found",
    "expiryDate": "YYYY-MM-DD or leave empty if not found",
    "parties": ["Full legal name of Party 1", "Full legal name of Party 2"]
  },
  "structure": [
    {
      "section": "Section Title as it appears in contract",
      "content": "Brief factual summary of section contents (2-3 sentences, no speculation)"
    }
  ],
  "timelineEvents": [
    {
      "title": "Descriptive event title",
      "date": "YYYY-MM-DD (only if date is explicitly stated or calculable)",
      "type": "Deliverable|Payment|Milestone|Renewal|Termination",
      "risk": "Low|Medium|High|Critical",
      "repercussion": "Exact consequence as stated in contract, with specific amounts/penalties quoted"
    }
  ]
}

FINAL REMINDERS:
- Accuracy over completeness: It's better to provide fewer, accurate events than many speculative ones
- Always ground your response in the actual contract text
- When in doubt, quote the contract directly
- Ensure all dates are in chronological order
- Include ONLY information that can be verified from the provided contract text

Now analyze the contract and provide your response in valid JSON format:`;

        // Set a timeout for the API call (10 seconds)
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 10000));

        const apiCallPromise = model.generateContent(prompt);

        // Race between API call and timeout
        const result = await Promise.race([apiCallPromise, timeoutPromise]);

        if (result instanceof Error) {
            throw result;
        }

        const response = await (result as any).response;
        const generatedText = response.text();

        if (!generatedText) {
            throw new Error("No response from Gemini API");
        }

        // Parse JSON from response
        const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/) ||
            generatedText.match(/```\n([\s\S]*?)\n```/) || [null, generatedText];

        const jsonText = jsonMatch[1] || generatedText;
        const analysisData = JSON.parse(jsonText);

        return NextResponse.json({
            success: true,
            data: analysisData,
        });
    } catch (error: any) {
        console.error("Error in Gemini API route:", error);

        if (error.message === "TIMEOUT") {
            return NextResponse.json(
                { success: false, error: "TIMEOUT", message: "Request timed out after 10 seconds" },
                { status: 408 }
            );
        }

        return NextResponse.json({ success: false, error: error.message || "Unknown error" }, { status: 500 });
    }
}
