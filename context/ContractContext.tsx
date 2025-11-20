'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Contract, ProcessingStatus } from '@/types/contract';
import { processContractWithGemini } from '@/services/geminiProcessor';

interface ContractContextType {
  contracts: Contract[];
  activeContract: Contract | null;
  isProcessing: boolean;
  processingStatus: ProcessingStatus | null;
  uploadContract: (file: File) => Promise<void>;
  deleteContract: (contractId: string) => void;
  setActiveContract: (contract: Contract | null) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [activeContract, setActiveContract] = useState<Contract | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);

  const uploadContract = useCallback(async (file: File) => {
    setIsProcessing(true);
    setProcessingStatus({ stage: 'Starting analysis...', progress: 0 });

    try {
      const processedContract = await processContractWithGemini(file, (status) => {
        setProcessingStatus(status);
      });

      setContracts(prev => [...prev, processedContract]);
      setActiveContract(processedContract);
    } catch (error) {
      console.error('Error processing contract:', error);
    } finally {
      setIsProcessing(false);
      setProcessingStatus(null);
    }
  }, []);

  const deleteContract = useCallback((contractId: string) => {
    setContracts(prev => prev.filter(c => c.contractId !== contractId));
    if (activeContract?.contractId === contractId) {
      setActiveContract(null);
    }
  }, [activeContract]);

  return (
    <ContractContext.Provider
      value={{
        contracts,
        activeContract,
        isProcessing,
        processingStatus,
        uploadContract,
        deleteContract,
        setActiveContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export function useContracts() {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContracts must be used within a ContractProvider');
  }
  return context;
}
