import { BackButton } from "@/components/back-button";
import { AllergyClient } from "./allergy-client";

export default function AllergyCheckerPage() {
  return (
      <div>
        <BackButton />
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 font-headline">AI Allergy Checker</h1>
          <p className="text-muted-foreground mb-4">
            Comprehensive allergy detection and management with smart symptom intake, environmental monitoring, 
            emergency features, and cross-reactivity intelligence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">Smart Intake</h3>
              <p className="text-blue-600 dark:text-blue-400">Voice, text & photo input</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
              <h3 className="font-semibold text-green-700 dark:text-green-300">Environmental</h3>
              <p className="text-green-600 dark:text-green-400">Pollen, pollution & weather</p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
              <h3 className="font-semibold text-red-700 dark:text-red-300">Emergency</h3>
              <p className="text-red-600 dark:text-red-400">SOS & emergency card</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300">Scanner</h3>
              <p className="text-purple-600 dark:text-purple-400">Barcode & ingredient check</p>
            </div>
          </div>
        </div>
        <AllergyClient />
      </div>
  );
}
