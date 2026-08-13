/* Oroton reference clone: an airy commerce-editorial homepage that follows the source section order and content tone. */
import OrotonHeader from "@/components/sites/oroton-com-8a42/home-6f11/OrotonHeader";
import OrotonHero from "@/components/sites/oroton-com-8a42/home-6f11/OrotonHero";
import OrotonProductRail from "@/components/sites/oroton-com-8a42/home-6f11/OrotonProductRail";
import OrotonEditorial from "@/components/sites/oroton-com-8a42/home-6f11/OrotonEditorial";
import OrotonFooter from "@/components/sites/oroton-com-8a42/home-6f11/OrotonFooter";

export default function Home() {
  return (
    <div className="oroton-site">
      <OrotonHeader />
      <main>
        <OrotonHero />
        <section className="story-links" aria-label="Featured edits">
          <a className="story-link story-link--wide" href="#new-in"><span>NEW EVERYDAY COLLECTION</span><strong>Everyday, considered.</strong><span className="story-link__cta">SHOP THE EDIT</span></a>
          <a className="story-link" href="#journal"><span>FATHER&apos;S DAY GIFT GUIDE</span><strong>For the man in motion.</strong><span className="story-link__cta">DISCOVER MORE</span></a>
          <a className="story-link" href="#new-in"><span>NEW BAGS</span><strong>Carry something considered.</strong><span className="story-link__cta">SHOP BAGS</span></a>
        </section>
        <OrotonProductRail />
        <OrotonEditorial />
      </main>
      <OrotonFooter />
    </div>
  );
}

