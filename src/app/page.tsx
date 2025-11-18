import { Connect } from "@/components/connect";
import Container from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Now } from "@/components/now";
import { Grid } from "@/components/ui/grid";
import { Boxes } from "@/components/ui/special-effects/background-boxes";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { Clock } from "@/components/ui/special-effects/sliding-numbers";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <div className="relative z-50">
        <Clock className="fixed top-4 right-4 hidden md:block" />
        <MusicToggleButton className="fixed right-4 bottom-2 hidden md:block" />
        <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      </div>

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="relative h-full w-full">
          <Boxes />
        </div>
      </div>

      <Container className="pointer-events-none relative z-10 bg-transparent">
        <div className="pointer-events-auto">
          <Header />
          <Grid />
          <Now />
          <Connect />
        </div>
      </Container>

      <div className="pointer-events-auto relative z-10">
        <Footer />
      </div>
    </div>
  );
}
