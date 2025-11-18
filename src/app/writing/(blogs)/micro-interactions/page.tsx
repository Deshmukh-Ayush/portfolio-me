"use client";

import Container from "@/components/container";
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
          Micro-Interactions
        </Heading>

        <Para className="mb-6">
          Hi! I am Ayush. I am writing this very first blog of mine on Micro
          Interactions. I hope you&apos;ll get to learn a thing or two. This
          blog is focused on beginner, however you can anyways read it.
        </Para>

        <Para
          className={`${newsReader.className} md:text-md text-md mb-6 border-l-4 border-neutral-300 pl-4 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400`}
        >
          &quot;Microinteractions are the small, purposeful moments in digital
          products that guide, reassure, and engage users. They&apos;re the
          little details that help you feel in control, make things clearer, and
          turn actions into feedback—like a button lighting up when clicked or a
          progress bar growing as a task completes.&quot; — Dan Saffer.
        </Para>

        <Para className="mb-6">
          Starting with this beautiful quote by Dan Saffer, if you read this
          quote carefully you&apos;ll understand exactly what micro-interactions
          are….
        </Para>

        <Heading className="mt-12 mb-6 text-lg md:text-2xl">
          Why micro-interactions matter?
        </Heading>

        <Para className="mb-4">
          To make the digital space look good feel good! Right? Actually
          it&apos;s an incomplete answer.
        </Para>

        <Para className="mb-4">
          Micro-interactions are not just made to make things look more good and
          interactive. They are made to grab the user&apos;s attention and make
          them feel they are in complete control of whatever the task they are
          doing. Example when you complete a payment a green tick appears that
          assures you the payment is actually been successful and before the
          tick you see a loading animation which make you feel that actually
          some process is happening behind the scene in the backend, it feels
          like the bank is actually transferring the money. Right? That&apos;s
          what you feel! Those are known as micro-interactions.
        </Para>

        <Para className="mb-4">
          <span
            className={`${newsReader.className} text-md text-neutral-800 md:text-lg dark:text-neutral-200`}
          >
            To summarize this Micro-interactions are not just design they are:
          </span>
        </Para>

        <Para className="mb-2 ml-6">
          Signal System status (meaning you know something is happening).
        </Para>
        <Para className="mb-2 ml-6">
          Give Feedback (You know if your action is succeeded or failed).
        </Para>
        <Para className="mb-2 ml-6">Help users feel they are in control.</Para>
        <Para className="mb-6 ml-6">Make the experience memorable.</Para>

        <Heading className="mt-12 mb-6 text-lg md:text-2xl">
          The Anatomy of micro-interactions.
        </Heading>

        <Para className="mb-4">
          <span
            className={`${newsReader.className} text-md text-neutral-800 md:text-lg dark:text-neutral-200`}
          >
            Now I want you to focus on this part very well.
          </span>
        </Para>

        <Para className="mb-4">
          Micro-interactions have four simple parts. Whenever you add one think
          about these:
        </Para>

        <Para className="mb-2 ml-6">
          <span className="font-semibold text-neutral-800 dark:text-neutral-100">
            Trigger
          </span>{" "}
          - What starts it? (click, hover, timer, swipe, gesture).
        </Para>
        <Para className="mb-2 ml-6">
          <span className="font-semibold text-neutral-800 dark:text-neutral-100">
            Rules
          </span>{" "}
          - What happens and when? (conditional logics).
        </Para>
        <Para className="mb-2 ml-6">
          <span className="font-semibold text-neutral-800 dark:text-neutral-100">
            Feedback
          </span>{" "}
          - How does the system respond (Visual, haptic, audio).
        </Para>
        <Para className="mb-6 ml-6">
          <span className="font-semibold text-neutral-800 dark:text-neutral-100">
            Loops & Modes
          </span>{" "}
          - (Does it repeat or change over time?).
        </Para>

        <Para className="mb-6">
          Keep this model in mind it helps you design purposeful, not random,
          motion.
        </Para>

        <Heading className="mt-12 mb-6 text-lg md:text-2xl">
          How to create them on web.
        </Heading>

        <Para className="mb-4">
          Now how do you create these kind of animations.
        </Para>

        <Para className="mb-4">
          You can create these animations on web with css and javascript.
          Nowadays motion.dev is one of the most popular animation library out
          there for react or react based framework (it even works with plain
          html, css and js). The difference between all these are,
        </Para>

        <Para className="mb-4">
          CSS animations use declarative styles (@keyframes, transition) to
          handle visual changes like fades, slides, and simple transforms. They
          are ideal for lightweight, performance-friendly effects tied to state
          changes—such as hovering, focusing, or transitioning simple UI
          elements. Over the time it becomes hard to manage large number of
          animations using just css. Some of the common examples are hovering a
          link underlines it. Hovering a button changes the button&apos;s color
          etc.
        </Para>

        <Para className="mb-4">
          Now moving to javascript based animations, these are the kind of
          animations where you have programmatic control over animation
          sequences. In simple terms if you have a chain of animations and you
          want to perform certain animation one at a time that&apos;s called
          animation sequence. These are useful if you want to trigger, update,
          and chain complex effects, respond to user input, and use physics or
          highly interactive motion logic. That&apos;s where CSS falls behind
          and javascript comes into the picture. But writing direct javascript
          code is just too tiring and redundant task so take help with other
          people&apos;s code by using library into out projects.
        </Para>

        <Para className="mb-4">
          There are popular javascript based animation frameworks out there, my
          personal favorites are (motion.dev, GSAP and anime.js).
        </Para>

        <Para className="mb-6">
          You can use any of the above animation methods because in the end it
          all comes to what it looks, feels and experience that it gives to the
          user. Remember always micro-interactions are used in order to seek
          feedback from users not to just make things look fancy. Fanciness
          should come with it like a free package.
        </Para>

        <Para className="mb-4">
          I&apos;ll present some of the beautiful examples which some of the
          best tech companies uses. The micro-interactions they use are always
          to enhance the UX.
        </Para>

        <Para className="mb-4">
          You can visit the apple&apos;s official website and if you click on
          any products let&apos;s say iPhone you&apos;ll start noticing tons of
          interactions and animations, which doesn&apos;t feel overdone and make
          us want to buy that product.
        </Para>

        <Para className="mb-4">
          <span
            className={`${newsReader.className} md:text-md text-md text-neutral-800 dark:text-neutral-200`}
          >
            Always keep your design such that it should sell. Design is looses
            it&apos;s shine when everyone likes it no one wants to invest their
            money in it.
          </span>
        </Para>

        <Para className="mb-4">
          Another popular example, you might have used Airbnb, just scroll their
          landing page and you&apos;ll notice how smoothly their navbar shrinks,
          if you hover over any icon of theirs the icon itself animates that is
          the power of micro-interaction.
        </Para>

        <Para className="mb-6">
          They are so subtle that it makes your apps feel really good at the
          same time it is named micro because many of the times users will not
          even notice they&apos;ll just say something in this website is really
          nice.
        </Para>

        <Para className="mb-4">
          Most popular tool nowadays for creating micro-interactions on the web
          is motion.dev. You can use it too it is very easy to learn as compared
          to GSAP or anime.js.
        </Para>

        <Para className="mb-6">
          Some modern technologies have been developed to make these kind of
          interactions easier to make for developers like (Rive, Jitter,
          lottiefiles, etc). These tools saves a lot of time. You can just
          create interactions and animations out of the box without writing a
          single line of code. These are great because ultimately their
          developer experience is good and they are easy to integrate as well.
        </Para>

        <Para className="mb-4">
          Micro-Interactions plays a major role in converting a visitor to your
          daily user. It multiplies the user experience, web design is simply
          incomplete without interactions. Both need each other to make your web
          look aesthetic and pleasing to eyes.
        </Para>

        <Para className="mb-4">
          You just don&apos;t have to overdo it as I said earlier.
        </Para>

        <Para className="mb-6">
          <span
            className={`${newsReader.className} text-md text-neutral-800 md:text-lg dark:text-neutral-200`}
          >
            Knowing when to add an animation, how, and why, can drastically
            change how your product is perceived and felt.
          </span>
        </Para>

        <Para className="mt-6 mb-4">
          Thank you for reading this blog. I hope this blog will help you
          kickstart your journey towards mastering micro-interactions.
        </Para>

        <Para className="mb-20">
          Well if you are interested in UI/UX, Web Animations and Design
          Engineering. You can follow me for more. In the upcoming blogs
          I&apos;ll be diving deep into User Interfaces.
        </Para>
      </Container>

      <Footer className="fixed bottom-0 z-9" />
    </div>
  );
}
