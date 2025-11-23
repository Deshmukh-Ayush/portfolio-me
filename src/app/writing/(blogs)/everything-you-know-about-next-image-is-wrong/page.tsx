"use client";

import Container from "@/components/container";
import { Footer } from "@/components/footer";
import { BackBtn } from "@/components/ui/back-btn";
import { CodeBlock } from "@/components/ui/code-block";
import { Heading } from "@/components/ui/heading";
import { Para } from "@/components/ui/para";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { Clock } from "@/components/ui/special-effects/sliding-numbers";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Newsreader } from "next/font/google";
import Image from "next/image";

const newsReader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
});

export default function MicroInteractionBlog() {
  const firstSnip = `import Image from 'next/image';
 
export default function Page() {
  return (
    <Image
      src="/shady.png"
      width={500}
      height={500}
      alt="The real slim shady"
    />
  );
}`;
  const secondSnip = `<img 
  alt="Example"
  loading="lazy" 
  width="500" 
  height="500" 
  decoding="async" 
  data-nimg="1" 
  style="color:transparent" 
  srcset="/_next/image?url=%2Fimages%2Fexample.jpg&amp;w=640&amp;q=75 1x, 
      /_next/image?url=%2Fimages%2Fexample.jpg&amp;w=1080&amp;q=75 2x" 
  src="/_next/image?url=%2Fimages%2Fexample.jpg&amp;w=1080&amp;q=75"
>`;

  const thirdSnip = `img,
video {
  max-width: 100%;
  height: auto;
}`;
  const fourthSnip = `module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};`;
  const fifthSnip = `import Image from 'next/image';
import em from './shady.png';

export default function TheRealSlimShady() {
  return (
    <>
      {/* Using absolute path */}
      <Image src="/shady.png" width={500} height={500} alt="The real slim shay" />
      {/* Using imported image via relative path */}
      <Image src={em} alt="Em" />
    </>
  );
}
`;
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <Clock className="fixed top-4 right-4 hidden md:block" />
      <MusicToggleButton className="fixed right-4 bottom-2 hidden md:block" />
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      <BackBtn href="/writing" />

      <Container className="bg-neutral-100 dark:bg-neutral-950">
        <Heading className="mb-8 text-xl md:text-3xl">
          Everything you think you know about{" "}
          <span className={`${newsReader.className} italic`}>next/image</span>{" "}
          is wrong!
        </Heading>
        <Image
          src="/blogs/everything-next-image/image-front.png"
          alt="Cover image"
          height={500}
          width={500}
          className="w-full rounded-lg"
        />
        <Para className="py-6">
          Everyone uses next/image, but very few actually understand what
          happens behind the scenes. And this lack of understanding often leads
          to confusion, myths, and even performance issues. In this blog, I
          break down exactly how next/image works under the hood — without the
          boring documentation tone.
        </Para>
        <Para className="mb-6">
          Let’s start with this very basic snippet, which I believe everyone
          reading this is familiar with:
        </Para>
        <CodeBlock
          language="tsx"
          filename="page.tsx"
          highlightLines={[1]}
          code={firstSnip}
        />
        <Para className="mb-6">
          (you can directly paste this snippet in your codebase, just change the
          image of your liking.)
        </Para>
        <Heading className="mb-6 text-xl md:text-3xl">
          This is Magic, but how?
        </Heading>
        <Para className="mb-6">
          This is all the front part which you enjoy writing the code because it
          is seamless to integrate, but there is a solid foundation and lots of
          hard work has been put under the hood to make it work like this. In
          this blog I’ll talking in-depth about next/image and also try to clear
          some of the misconceptions surrounding it.
        </Para>
        <Heading className="mb-6 text-xl md:text-3xl">
          Core Architecture
        </Heading>
        <Para className="mb-6">
          The core architecture of next/image is primarily made up of three
          components.
        </Para>
        <Image
          src="/blogs/everything-next-image/next-component-breakdown.png"
          alt="Cover image"
          height={500}
          width={500}
          className="w-full rounded-lg"
        />
        <Para className="mb-6">Core Architecture breakdown</Para>
        <Para className="mb-6">
          <ol>
            <li>1. React Component</li>
            <li>2. Image API</li>
            <li>3. Image Optimizer</li>
          </ol>
        </Para>
        <Para className="mb-6">Now let’s breakdown everything.</Para>
        <Heading className="mb-6 text-xl md:text-3xl">React Component</Heading>
        <Para className="mb-6">
          next/image is nothing but a react component and its primary function
          is to generate correct HTML image output based on the properties
          provided and also it constructs multiple URLs which points to
          different sized versions of the same image, you can call optimized
          variants.
        </Para>
        <Para className="mb-6">
          Basically it next/image doesn’t just output one img tag with a single
          src . Instead it generates multiple versions of the same image with
          different sizes and constructs the appropriate HTML to serve the best
          possible version for each device.
        </Para>
        <Para className="mb-6">
          The component generates optimized image URLs for different resolutions
          and populate them in the srcset and src attributes of the final HTML
          img element, so browsers can load the right image size for each device
          automatically. here is the example code which is output of Next Image
          component.
        </Para>
        <CodeBlock
          language="tsx"
          filename="page.tsx"
          highlightLines={[1, 9, 10, 11]}
          code={secondSnip}
        />
        <Para className="py-6">
          Now let’s take a closer look at the generated URL:
        </Para>
        <Para className={`${newsReader.className} mb-6 md:text-xl`}>
          /_next/image?url=/images/example.jpg&w=640&q=75
        </Para>
        <Para className="mb-6">
          This encoded URL accepts two parameters w and q which stands for width
          and quality respectively, which are more visible in the decoded
          version. Now you might have observed there is no h height attribute,
          for now just keep this in mind I’ll connect the dot ahead.
        </Para>
        <Heading className="mb-6 text-xl md:text-3xl">Image API</Heading>
        <Para className="mb-6">
          The next image api serves as an image proxy, meaning nextjs stands
          between your app and the original image source — it fetches,
          optimizes, caches and serves the image on your behalf. It is very
          similar to IPX. It perform these tasks.
        </Para>
        <Para className="mb-6">
          <ol>
            <li>1. Accepts an image URL, width and quality.</li>
            <li>2. Validates parameters</li>
            <li>3. Determine cache control policies</li>
            <li>4. Process the image</li>
            <li>
              5. Serves the image in a format supported by the user’s browser
            </li>
          </ol>
        </Para>
        <Para className="mb-6">
          Now at this point, things are started to take a shape or started
          making sense. Now let’s jump to the final piece of the puzzle.
        </Para>
        <Heading className="mb-6 text-xl md:text-3xl">Image Optimizer</Heading>
        <Para className="mb-6">
          Next Image utilizes different image optimization libraries such as
          Sharp or Squoosh, depending on certain conditions.
        </Para>
        <Para className="mb-6">
          Sharp is a fast and efficient image optimization library library for
          node.js that makes use of the Native libvips library.
        </Para>
        <Para className="mb-6">
          Squoosh is a fully node-based image optimization solution. It’s slower
          than the Sharp, but it doesn’t require any additional libraries to be
          installed on a machine. For this reason, Sharp is recommended for
          production use, whereas Squoosh is used by default in local
          environments.
        </Para>
        <Para className="mb-6">
          Both are quite similar, both having their pros and cons. I would
          suggest to use Sharp in local environments as well. However sharp’s
          image optimizing algorithms can lead to slight color degradation, more
          that squoosh. This may result in visually different behaviours between
          production and local enviornments, Specially when trying to match the
          background colors of image with the page’s background. If you have
          also experienced this, now you the reason why.
        </Para>
        <Heading className="mb-6 text-xl md:text-3xl">Results</Heading>
        <Para className="mb-6">
          Now you know what is the primary architecture behind the next/image .
          Now we can debunk common misconceptions and glean more insights on how
          to utilize it more effectively.
        </Para>
        <Heading className="mb-6 text-xl md:text-3xl">
          next/image does not crop.
        </Heading>
        <Para className="mb-6">
          A common misconception among devs is that next/image can crop their
          images. This question arises because you can pass width, height and
          fill properties to the component, which may create an impression that
          the image is being cropped. But in reality this isn’t the case. The
          next image component primarily requires the width and height for
          assigning to the img tag to prevent layout shifts.
        </Para>
        <Para className="mb-6">
          Now connecting the dot of that height attribute that I talked about
          above in the React Component. The Image API does not accept the height
          parameter because it currently isn’t possible to change the original
          image’s aspect ratio, which means. If you don’t use the fill property,
          the image will simply stretch or shrink in cases of width–height
          mismatches.
        </Para>
        <Para className="mb-6">
          However there is an exception if you’re using tailwindcss, it behaves
          differently due its default global css rule. This makes layout shifts
          issues harder to detect, here is the snippet of the rule.
        </Para>
        <CodeBlock
          language="tsx"
          filename="page.tsx"
          highlightLines={[1, 9, 10, 11]}
          code={thirdSnip}
        />
        <Heading className="mb-6 text-xl md:text-3xl">
          Displayed Image width ≠ global image width
        </Heading>
        <Para className="mb-6">
          Another potential point of confusion is that the width property passed
          to next/image doesn't represent the actual width to which the image
          will be resized when the screen will be subjected to a lower width
          scenerio. As we noted from the example at the start of the blog,
          passing width={500} to a component will result in the image being
          resized to a width of 640px, as evident in the generated URL:
        </Para>
        <Para className={`${newsReader.className} mb-6 md:text-xl`}>
          /_next/image?url=/images/example.jpg&w=640&q=75
        </Para>
        <Para className="mb-6">
          If you expect the x2 retina version to utilize an image width of
          1000px or 1280px, you’re in for a surprise. The actual width used will
          be 1080px. Naturally, naturally you might wonder where these numbers
          are coming from.
        </Para>
        <Image
          src="/blogs/everything-next-image/image-blog-img-re.png"
          alt="Cover image"
          height={500}
          width={500}
          className="w-full rounded-lg"
        />
        <Para className="mb-6">
          Next.js resizes images to the closest size from an array ofdeviceSizes
          and imageSizes that you can define in next.config.js. By default,
          these are:
        </Para>
        <CodeBlock
          language="tsx"
          filename="page.tsx"
          highlightLines={[1, 9, 10, 11]}
          code={fourthSnip}
        />
        <Para className="mb-6">
          What’s crucial to note here is that using the default configuration
          can negatively impact performance, leading to a reduced score in
          Lighthouse’s Page Speed Insights. This becomes particularly evident
          when you attempt to display large images on a page. For instance, if
          you want to render an image with a width of 1250px, the actual loaded
          image width will be 1920px. The discrepancy between the required size
          and the actual loaded size becomes even greater for x2 retina
          versions, as these will be resized to 3840px. However, you can remedy
          this by adding more sizes to the deviceSizes or imageSizes arrays.
        </Para>
        <Heading className="mb-6">
          Image optimization can be used without the next/image component
        </Heading>
        <Para className="mb-6">
          I already discussed about the image api above, with this understanding
          of the core architecture, it’s very obvious that you can use Image API
          without necessarily using next/image . But is this really a good
          option? Let’s find out and see some scenarios in which this can be
          useful.
        </Para>
        <Para className="mb-6">
          First, you can render optimized images inside a canvas. Regardless of
          whether you’re loading images onto a canvas from external sources or
          from local storage, you can pass the correct URL to the API and have
          it work seamlessly.
        </Para>
        <Para className="mb-6">
          First, you can render optimized images inside a canvas. Regardless of
          whether you’re loading images onto a canvas from external sources or
          from local storage, you can pass the correct URL to the API and have
          it work seamlessly.
        </Para>
        <Para className={`${newsReader.className} mb-6 md:text-xl`}>
          /_next/image?url=/images/example.jpg&w=640&q=75
        </Para>
        <Para className="mb-6">
          Always remember, the width parameter is checked by the API and can
          only be a number sourced from either the deviceSizes or imageSizes
          configuration.
        </Para>
        <Heading className="mb-6">Use import for local images</Heading>
        <Para className="mb-6">
          In next/image , there are two ways by which you load local images:
        </Para>
        <CodeBlock
          language="tsx"
          filename="page.tsx"
          highlightLines={[1, 9, 10, 11]}
          code={fifthSnip}
        />
        <Para className="mb-6">
          Using an absolute path for local images is pretty common — you’ll see
          it in examples, tutorials, and even open-source projects. And it’s
          easy to assume the only difference is that Next.js won’t auto-assign
          the width and height. But nope, there is a real difference. When you
          load images using an absolute path from the public folder, Next.js
          follows the cache headers of the server, which defaults to a 30-day
          cache instead of public,max-age=31536000,immutable. And yeah, that
          30-day cache can actually hurt your Lighthouse score quite a bit.
        </Para>
        <Heading className="mb-6">Conclusions</Heading>
        <Para className="mb-6">
          I am sure at this point, you’re also exhausted like I am. Well then
          let’s draw the conclusion and end this blog.
        </Para>
        <Para className="mb-6">
          Image optimization (next/image) provides significant advantages and
          simplifies image management, it could benefit from additional features
          like advanced cropping and precise resizing, similar to third-party
          solutions.
        </Para>
        <Para className="mb-6">
          Well personally in my opinion, for most use case, the developer
          experience and efficiency of Next Image will be more than enough.
        </Para>
        <Para className="mb-6">
          Ending this blog with lot’s of love. If you like this blog please
          share it with your friends. You can always suggest me some topics in
          comments or DM me. I will try my best to make an article out of it.
        </Para>
        <Para className="mb-6">
          I am dropping below all the resources which made it possible for me to
          write this blog. And I really appreciate all the work they’ve done.
        </Para>
        <Para className="mb-6">Thank You!</Para>
      </Container>

      <Footer />
    </div>
  );
}
