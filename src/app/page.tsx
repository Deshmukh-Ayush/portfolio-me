import { Connect } from "@/components/connect";
import Container from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Now } from "@/components/now";
import { Grid } from "@/components/ui/grid";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { Clock } from "@/components/ui/special-effects/sliding-numbers";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <Clock className="fixed top-4 right-4" />
      <MusicToggleButton className="fixed right-4 bottom-2" />
      <ThemeToggle className="fixed right-18 bottom-2 cursor-pointer" />
      <Container className="bg-neutral-100 dark:bg-neutral-950">
        <Header />
        <Grid />
        <Now />
        <Connect />
      </Container>
      <Footer />
    </div>
  );
}
