
import { BackButton } from "@/components/back-button";
import { SopGeneratorClient } from "./sop-generator-client";

export default function SopRepositoryPage() {
  return (
    <div>
      <BackButton />
      <h1 className="text-3xl font-bold mb-2 font-headline">Digital SOP Repository</h1>
      <p className="text-muted-foreground mb-6">
        Generate comprehensive, detailed Standard Operating Procedures with extensive learning objectives, theoretical background, step-by-step procedures, detailed observations, results interpretation, and comprehensive viva voce questions. Perfect for advanced pharmacy education and professional training.
      </p>
      <SopGeneratorClient />
    </div>
  );
}
