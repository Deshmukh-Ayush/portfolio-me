import AnimatedGraphic from "@/components/examples/AnimatedGraphic";
import { Heading } from "@/components/ui/heading";
import { Para } from "@/components/ui/para";

export const BlocksInteractionShowcase = () => {
  return (
    <div>
      <div className="relative mt-10 mb-4 flex h-100 w-2xl items-center justify-center rounded-2xl border border-neutral-400">
        <AnimatedGraphic />
      </div>
      <div className="flex items-center justify-between pr-4">
        <Heading className="text-lg">Interactive Blocks Interaction.</Heading>
        <Para>Hover</Para>
      </div>
    </div>
  );
};
