import { Contract, ProcessingStatus } from "@/types/contract";

// Simulated processing stages for the AI analysis
const processingStages = [
    { stage: "Initializing Document Scanner...", progress: 10 },
    { stage: "Extracting Text from PDF...", progress: 25 },
    { stage: "Analyzing Termination Clauses...", progress: 40 },
    { stage: "Identifying Key Milestones...", progress: 55 },
    { stage: "Extracting Deliverables...", progress: 70 },
    { stage: "Calculating Risk Profiles...", progress: 85 },
    { stage: "Generating Timeline Visualization...", progress: 95 },
    { stage: "Analysis Complete", progress: 100 },
];

// Function to extract text from PDF using browser APIs
async function extractTextFromPDF(file: File): Promise<string> {
    // For now, return a placeholder - actual PDF parsing would require pdf-parse or similar
    // In production, you might want to use a server-side endpoint with pdf-parse
    return `[PDF Content from ${file.name}]`;
}

// Function to call backend Gemini API route
async function callGeminiAPI(pdfText: string, filename: string): Promise<any> {
    try {
        // Call the backend API route
        const response = await fetch("/api/gemini", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileContent: pdfText,
                fileName: filename,
            }),
        });

        if (!response.ok) {
            if (response.status === 408) {
                throw new Error("TIMEOUT");
            }
            const errorData = await response.json();
            throw new Error(errorData.error || "API request failed");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || "Analysis failed");
        }

        return data.data;
    } catch (error: any) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}

// Main function to process contract with Gemini API
export async function processContractWithGemini(
    file: File,
    onProgress?: (status: ProcessingStatus) => void
): Promise<Contract> {
    const contractId = `CNT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const today = new Date();

    try {
        // Progress: Extracting text
        if (onProgress) {
            onProgress(processingStages[0]);
            onProgress(processingStages[1]);
        }

        // Extract PDF text
        const pdfText = await extractTextFromPDF(file);

        // Progress: Analyzing with AI
        if (onProgress) {
            onProgress(processingStages[2]);
        }

        // Call Gemini API via backend
        const analysisData = await callGeminiAPI(pdfText, file.name);

        // Progress through remaining stages
        for (let i = 3; i < processingStages.length; i++) {
            if (onProgress) {
                onProgress(processingStages[i]);
            }
            await new Promise((resolve) => setTimeout(resolve, 200));
        }

        // Build the final contract object
        const contract: Contract = {
            contractId,
            filename: file.name,
            uploadDate: new Date().toISOString(),
            analysis: analysisData,
        };

        // Add IDs to timeline events and calculate days until
        contract.analysis.timelineEvents = contract.analysis.timelineEvents.map((event, index) => {
            const eventDate = new Date(event.date);
            const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            return {
                ...event,
                id: event.id || (index + 1).toString(),
                daysUntil,
            };
        });

        return contract;
    } catch (error) {
        console.error("Error processing contract:", error);
        throw error;
    }
}

// Helper to extract company name from filename
function extractCompanyName(filename: string): string {
    const nameMatch = filename.match(/(?:_|-|\s)([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/);
    return nameMatch ? nameMatch[1] + " Corp." : "Partner Organization";
}

// Export processing stages for UI consumption
export { processingStages };
