import { BackButton } from "@/components/back-button";
import { DietPlannerClient } from "./diet-planner-client";

export default function DietPlannerPage() {
  return (
    <div>
      <BackButton />
      <h1 className="text-3xl font-bold mb-2 font-headline">Simple Diet Planner</h1>
      <p className="text-muted-foreground mb-6">
        Generate a personalized diet plan based on patient health conditions, allergies, and goals.
      </p>
      <DietPlannerClient />
    </div>
  );
}
