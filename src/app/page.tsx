import Container from "@/components/container";
import { Header } from "@/components/header";
import { Now } from "@/components/now";
import { Grid } from "@/components/ui/grid";
import { Clock } from "@/components/ui/special-effects/sliding-numbers";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full dark:bg-neutral-950">
      <Clock className="fixed top-4 right-4" />
      <Container>
        <Header />
        <Grid />
        <Now />
      </Container>
    </div>
  );
}
