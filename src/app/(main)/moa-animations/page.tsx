
import { BackButton } from "@/components/back-button";
import { MoaAnimationClient } from "./moa-animation-client";

export default function MoaAnimationPage() {
  return (
    <div>
      <BackButton />
      <h1 className="text-3xl font-bold mb-2 font-headline">MOA Animation Search</h1>
      <p className="text-muted-foreground mb-6">
        Search for drug mechanism of action animations from trusted educational platforms and websites.
      </p>
      <MoaAnimationClient />
    </div>
  );
}
