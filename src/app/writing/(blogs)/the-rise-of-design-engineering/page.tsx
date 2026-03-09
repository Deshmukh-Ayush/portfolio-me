"use client";

import Container from "@/components/container";
import AnimatedGraphic from "@/components/examples/AnimatedGraphic";
import { ButtonExample } from "@/components/examples/button-example";
import { Footer } from "@/components/footer";
import { BackBtn } from "@/components/ui/back-btn";
import { Heading } from "@/components/ui/heading";
import { Para } from "@/components/ui/para";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { Clock } from "@/components/ui/special-effects/sliding-numbers";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Newsreader } from "next/font/google";

const newsReader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
});

export default function MicroInteractionBlog() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <Clock className="fixed top-4 right-4 hidden md:block" />
      <MusicToggleButton className="fixed right-4 bottom-2 hidden md:block" />
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      <BackBtn href="/writing" />

      <Container className="bg-neutral-100 dark:bg-neutral-950">
        <Heading className="mb-8 text-xl md:text-3xl">
          The Rise of Design Engineering.
        </Heading>
        <Para className="mb-6">
          In this blog we'll discover what design engineering is and why it is
          suddenly becoming so popular. We'll also explore the benefits of
          design engineering and how it can help teams create better products.
        </Para>

        <Para className="mb-6">Okay so let's start....</Para>

        <Para>
          Everyone cares about there product so much and day by day attempts to
          improve it and thus we've got two types of people in a company.
        </Para>
        <Para className="ml-2">1. Who cares about how things look.</Para>
        <Para className="mb-6 ml-2">2. Who cares about how things work.</Para>
        <Para className="mb-8">
          And clearly we've got a GAP and there is a space for improvement.
        </Para>

        <Heading>GAP</Heading>
        <Para className="mb-6">
          Believe me or not this gap is big. Let me try to explain it in simpler
          words.
        </Para>
        <Para className="mb-6">
          When working in a company, there are multiple teams working on
          different aspects of a product. And thus for the sake of this blog
          we'll primarily divide into 3 teams.
        </Para>
        <Para className="ml-2">1. Design Team</Para>
        <Para className="ml-2">1. Frontend Team</Para>
        <Para className="mb-6 ml-2">1. Backend Team</Para>

        <Para className="mb-6">
          So the above terms are self explanatory. But where does the problem
          arise. The problem is how things works, people in design team design
          apps and they primarily focus on the UI/UX and you know figma related
          stuff.
        </Para>

        <Para className="mb-6">
          The people in frontend team are more concerned about how to replicate
          the exact design given by the design team. And also they have this
          constant thing in mind that we also need to lookover for the api's and
          stuff because this is how any app on the internet functions.
        </Para>

        <Para className="mb-6">
          And this is where the problem lies. Both people communicate in
          different languages and contexts. Often times people in frontend
          cannot understand the intent behind the UI Design and thus cannot
          convey the message which design teams intended.
        </Para>
        <Para className="mb-6">
          Same goes for the designers they cannot understand the technical
          constraints and limitations of frontend development. Plus adding
          animations and interations on top of it feels overwhelming for the
          frontend teams.
        </Para>
        <Para className="mb-8">
          And this is where Design Engineering comes in. Design Engineering is
          the new discipline that fills the gap between design and development
          teams.
        </Para>

        <Heading className="mb-6">What do they do?</Heading>
        <Para>We do 2 things</Para>
        <Para>
          We manage/create design systems and as well as code and critique them.
          Yes this is what our job is.
        </Para>
        <Para className="mb-8">
          Our job is to make product look as good as possible by fixing every
          micro-detail and adding life to it by adding interations to make it
          fulfilling.
        </Para>

        <Heading className="">How do we differ?</Heading>
        <Para className="mb-6">
          You might be thinking that!, but how does a design engineer differ
          from a frontend developer, backend developer or a UI designer.
        </Para>
        <Para className="mb-6">
          This is a very interesting question and let me explain. In a company
          there are two teams one of designers and other of frontend devs, when
          designers gives UI to frontend devs they are primarily concerned about
          how to replicate the exact design. And designers also are concered
          about how the design will appear to the user and vice versa but
          clearly there is always a gap between the two teams that stops
          frontend to reach the finest potential of the design. To fill this gap
          we exist.
        </Para>

        <Para className="mb-6">
          Designer gives the design to the frontend devs saying hey can you
          design it? But the frontend devs can replicate the design but they
          lack the "taste" the design engineer have to make the decisions
          themselves .
        </Para>

        <Para className="mb-6">
          They lack that opinionated mindset and push to make things as good as
          possible so they lack the trait which design engineer's have. Yes we
          both focus on building the final product but we care about pushing the
          boudaries and making it as good as possible. We don't have to rely on
          designs as whole to do the job.
        </Para>

        <Para className="mb-6">
          Like full stack developers whose skills are broadly spread out, in the
          similar fashion design engineers also have that broad skillset but we
          got the depth in design, we got that second layer which most people
          don't see that we make sure to get the tiniest interactions feel
          right.
        </Para>

        <Para className="mb-8">
          And designers as well they design in figma but they can't actually
          deliver the final product because you cannot browse a website in figma
          and if you're wondering about no code tools and design to code things,
          brother these are only limited to very basic stuff not a produciton
          grade product. But that's why we exist we cannot only design but can
          convert it into code.
        </Para>

        <Heading className="mb-6">Why do we need them?</Heading>
        <Para className="mb-6">
          So you might be thinking why do we need them? And I'll tell you three
          important reasons that why you need us.
        </Para>

        <Para className="mb-6">1. Slop</Para>
        <Para className="mb-6">
          Nowadays frontend devs and designers are vibe coding and designing a
          lot and they rely on AI a lot more than you can even fathom and in the
          end what AI spits is this below example, A complete utter trash that
          normal people use not because they want to but because they have to.
          Poorly done scroll driven animations, gradients everywhere without
          thinking, bad typography, bad styling, bad layouts are pure examples
          of Slop Overall you can feel that there is no cohesiveness between the
          design. We as design engineers make sure this thing never happens. Our
          job is to make the product differentiate to make a good product also
          look special to people.
        </Para>

        {/* todo: add image */}

        <Para className="mb-6">2. Taste</Para>
        <ButtonExample />
        <Para>
          Ok now try the above thing and do you see the difference between the
          two buttons?
        </Para>
        <Para>
          Notice that both the buttons have three states but the first one is
          skipping the transitions and is feeling abrupt meanwhile the second
          button is shifting/morphing the layout and text to adjust such that it
          is looking very smooth to our eyes and an interaction that sits in
          your mind for a long time. That's taste for you.
        </Para>
        <Para className="mb-6">
          You must've seen the first one in places now just imagine how good
          will it be if replace it with the second one.
        </Para>
        <Para className="mb-6">
          The thing you need to take away is that how I can make this tiny
          interaction into something that people can remember. For refs some
          examples are.... Linear, Resend, Neon, Stripe etc.
        </Para>
        <Para className="mb-6">3. Speed</Para>
        <Para className="mb-6">
          This is something which makes a pillar like difference between other
          devs and design engineers. See the below example (Try hover over it
          and if you're on mobile try clicking it.)
        </Para>
        {/* example */}
        <div className="relative mb-6 flex h-100 w-2xl items-center justify-center rounded-2xl border border-neutral-400">
          <AnimatedGraphic />
        </div>
        <Para className="mb-6">
          As you can see that I've built an SVG hovering Interaction but the
          thing is I've made it in less than 10 mins and yet it looks good, it
          feels good, is responsive and captures a very nice feedback from the
          user. If you're wondering where did I get that SVG from. I created it
          some time before for my product in figma and I wanted to animate it so
          I exported it as SVG and for the animations part I did it with
          Antigravity with opus 4.6 plugged in. And it just took me 3 prompts
          and a bit of adding taste to it and it sums up to 10 minutes in total
          to generate this beautifull interaction.
        </Para>
        <Para className="mb-8">
          Notice the speed, generally to do this type of interaction devs take
          hours sitting and cracking the exact details or simply giving it to AI
          but forgets the taste.
        </Para>

        <Heading className="mb-6">What's taste?</Heading>
        <Para className="mb-6">
          Now I want to discuss more about taste and it is actually very simple
          to understand.
        </Para>
        <Para className="mb-6">
          Rick Robin - He is the guy who's been in the room for a long time but
          the thing is he is a musician but he is not the best selling artist or
          not even near the best title but the thing about him is people like
          Jay Z, Beastie Boyz, Adele and list goes on and on. Why? because
          people respect his opinion people goes to him just to ask for his
          opinion before releasing the song, you know what i mean right!
        </Para>
        <Para>
          The same way design engineers are, people come to us to get that
          opinion because we have that opiniated taste that makes the great
          product feel special.
        </Para>

        <Para className="mb-6">
          Now let's bust a myth that taste is inherited.
        </Para>
        <Para className="mb-6">
          People think that taste is like a some generational wealth type shit
          which only few people have around the world because I've read it on
          reddit, X and also on substack as well. I mean wtf. I'm super against
          this thing and let me show you some ways where you develop taste
          organically.
        </Para>

        <Para className="mb-6">
          1. Follow multiple design engineers on X they regularly share their
          work on X and post very good content which will help you learn by
          watching them. Some of the good ones which I follow are Manu Paaji,
          Emil Kowalski, Jakub, Nitish Khagwal etc.
        </Para>
        <Para className="mb-6">
          2. Start observing the tiniest details on every well
          designed/engineerd websites like resend, linear, vercel etc. Notice
          how they implement things into production
        </Para>
        <Para className="mb-6">
          3. Create Id on everything like Pinterest, Dribble, Behance, Substack
          everything and start looking at people's work before you start yours
          to get an inpiration and also to get that taste in you. You can also
          start sharing your work on these platforms to get feedback from the
          community.
        </Para>

        <Para className="mb-8">
          So now you know how to study and develop the taste in you right?
        </Para>

        <Heading>Verdict</Heading>

        <Para>
          Design Engineering is growing rapidly and you also join the wave if
          you can master a bit of taste because always remember we as design
          engineer exist because we got that special taste which comes from a
          lot of practise and learning. So make sure you do your homework.
        </Para>
        <Para>
          If you're wondering this is the end, no it isn't it's just that I'm
          tired of typing right now and this blog is alredy streched enough so
          probably I'll continue in the next one.
        </Para>
      </Container>

      <Footer />
    </div>
  );
}
