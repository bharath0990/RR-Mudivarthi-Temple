import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Upload, FileSpreadsheet, Camera, Loader } from 'lucide-react';

interface TicketSaveStatusProps {
  show: boolean;
  onComplete: () => void;
}

const TicketSaveStatus: React.FC<TicketSaveStatusProps> = ({ show, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { icon: <Camera className="h-5 w-5" />, text: "Generating ticket image...", duration: 1500 },
    { icon: <Upload className="h-5 w-5" />, text: "Uploading to cloud storage...", duration: 1000 },
    { icon: <FileSpreadsheet className="h-5 w-5" />, text: "Saving to Google Sheets...", duration: 1500 },
    { icon: <CheckCircle className="h-5 w-5" />, text: "Successfully saved!", duration: 1000 }
  ];

  useEffect(() => {
    if (!show) return;

    let timeoutId: NodeJS.Timeout;

    const processStep = (stepIndex: number) => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        
        timeoutId = setTimeout(() => {
          if (stepIndex === steps.length - 1) {
            setIsComplete(true);
            setTimeout(() => {
              onComplete();
            }, 1000);
          } else {
            processStep(stepIndex + 1);
          }
        }, steps[stepIndex].duration);
      }
    };

    processStep(0);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileSpreadsheet className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Saving Ticket Details</h3>
          <p className="text-gray-600 text-sm">
            We're saving your ticket information to our records
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                index < currentStep
                  ? 'bg-green-50 text-green-700'
                  : index === currentStep
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-gray-50 text-gray-400'
              }`}
            >
              <div className={`flex-shrink-0 ${
                index < currentStep
                  ? 'text-green-600'
                  : index === currentStep
                  ? 'text-blue-600'
                  : 'text-gray-400'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : index === currentStep ? (
                  <div className="animate-spin">
                    <Loader className="h-5 w-5" />
                  </div>
                ) : (
                  step.icon
                )}
              </div>
              <span className="text-sm font-medium">{step.text}</span>
            </div>
          ))}
        </div>

        {isComplete && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">All data saved successfully!</span>
            </div>
            <p className="text-green-600 text-xs mt-2">
              Your ticket details have been recorded in our Google Sheets database
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketSaveStatus;