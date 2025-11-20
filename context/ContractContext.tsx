"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Contract, ProcessingStatus } from "@/types/contract";
import { processContractWithGemini } from "@/services/geminiProcessor";

interface ContractContextType {
    contracts: Contract[];
    activeContract: Contract | null;
    isProcessing: boolean;
    processingStatus: ProcessingStatus | null;
    showTimeoutModal: boolean;
    uploadContract: (file: File) => Promise<void>;
    deleteContract: (contractId: string) => void;
    setActiveContract: (contract: Contract | null) => void;
    closeTimeoutModal: () => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

const STORAGE_KEY = "sirion_contracts";
const ACTIVE_CONTRACT_KEY = "sirion_active_contract";

export function ContractProvider({ children }: { children: React.ReactNode }) {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [activeContract, setActiveContract] = useState<Contract | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showTimeoutModal, setShowTimeoutModal] = useState(false);

    // Load contracts from localStorage on mount
    useEffect(() => {
        try {
            const storedContracts = localStorage.getItem(STORAGE_KEY);
            const storedActiveId = localStorage.getItem(ACTIVE_CONTRACT_KEY);

            if (storedContracts) {
                const parsedContracts = JSON.parse(storedContracts);
                setContracts(parsedContracts);

                // Restore active contract
                if (storedActiveId) {
                    const active = parsedContracts.find((c: Contract) => c.contractId === storedActiveId);
                    if (active) {
                        setActiveContract(active);
                    }
                }
            }
        } catch (error) {
            console.error("Error loading contracts from cache:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save contracts to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
            } catch (error) {
                console.error("Error saving contracts to cache:", error);
            }
        }
    }, [contracts, isLoaded]);

    // Save active contract ID to localStorage
    useEffect(() => {
        if (isLoaded) {
            try {
                if (activeContract) {
                    localStorage.setItem(ACTIVE_CONTRACT_KEY, activeContract.contractId);
                } else {
                    localStorage.removeItem(ACTIVE_CONTRACT_KEY);
                }
            } catch (error) {
                console.error("Error saving active contract to cache:", error);
            }
        }
    }, [activeContract, isLoaded]);

    const uploadContract = useCallback(async (file: File) => {
        setIsProcessing(true);
        setProcessingStatus({ stage: "Starting analysis...", progress: 0 });

        try {
            const processedContract = await processContractWithGemini(file, (status) => {
                setProcessingStatus(status);
            });

            setContracts((prev) => [...prev, processedContract]);
            setActiveContract(processedContract);
        } catch (error: any) {
            console.error("Error processing contract:", error);

            // Check if it's a timeout error
            if (error.message === "TIMEOUT") {
                setShowTimeoutModal(true);
            }
        } finally {
            setIsProcessing(false);
            setProcessingStatus(null);
        }
    }, []);

    const closeTimeoutModal = useCallback(() => {
        setShowTimeoutModal(false);
    }, []);

    const deleteContract = useCallback(
        (contractId: string) => {
            setContracts((prev) => {
                const updated = prev.filter((c) => c.contractId !== contractId);
                return updated;
            });
            if (activeContract?.contractId === contractId) {
                setActiveContract(null);
            }
        },
        [activeContract]
    );

    const handleSetActiveContract = useCallback((contract: Contract | null) => {
        setActiveContract(contract);
    }, []);

    return (
        <ContractContext.Provider
            value={{
                contracts,
                activeContract,
                isProcessing,
                processingStatus,
                showTimeoutModal,
                uploadContract,
                deleteContract,
                setActiveContract: handleSetActiveContract,
                closeTimeoutModal,
            }}>
            {children}
        </ContractContext.Provider>
    );
}

export function useContracts() {
    const context = useContext(ContractContext);
    if (context === undefined) {
        throw new Error("useContracts must be used within a ContractProvider");
    }
    return context;
}
