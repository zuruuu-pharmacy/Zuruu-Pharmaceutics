
import { BackButton } from "@/components/back-button";
import { DrugClassificationTreeClient } from "./drug-classification-tree-client";

export default function DrugClassificationTreePage() {
  return (
    <div>
      <BackButton />
      <h1 className="text-3xl font-bold mb-2 font-headline">Comprehensive Drug Classification Tree</h1>
      <p className="text-muted-foreground mb-6">
        Explore detailed pharmacology with comprehensive drug information including pharmacokinetics, drug interactions, dosing guidelines, and safety data. Navigate through an interactive classification tree covering all major drug classes.
      </p>
      <DrugClassificationTreeClient />
    </div>
  );
}
