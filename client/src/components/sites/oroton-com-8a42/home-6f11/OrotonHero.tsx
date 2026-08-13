/* Oroton reference clone: full-bleed low-key campaign image with high-contrast editorial lockup and understated CTA. */
export default function OrotonHero() {
  return (
    <section className="hero" id="top">
      <img className="hero__image" src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=2000" alt="Tailored neutral garments in a fashion studio" />
      <div className="hero__veil" />
      <div className="hero__content">
        <p className="eyebrow eyebrow--light">SPRING 25</p>
        <h1>UNCHARTED<br />BEAUTY</h1>
        <p>Rich in texture. Defined by detail.</p>
        <a className="text-link text-link--light" href="#journal">DISCOVER MORE <span>↗</span></a>
      </div>
      <div className="hero__scroll">SCROLL TO EXPLORE <span>↓</span></div>
    </section>
  );
}
