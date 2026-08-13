/* Oroton reference clone: asymmetric editorial modules with a black campaign panel and tactile, image-first story grid. */
const editorial = [
  { id: "journal", eyebrow: "EVERYDAY SPRING 25 COLLECTION", title: "Everyday, artfully made.", text: "This season’s Everyday Collection builds on the idea that the clothes in your wardrobe should work across the week and across seasons, artful yet accessible.", cta: "READ MORE", image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1500" },
  { eyebrow: "SPRING PREVIEW", title: "Uncharted beauty.", text: "Rich in texture and defined by detail, the collection explores archival lace, haberdashery accents and sculptural bags through a lens of modern ease.", cta: "READ MORE", image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { eyebrow: "EVERYDAY DENIM", title: "The ease of every day.", text: "New denim styles, crafted in 100% cotton and designed with everyday ease in mind.", cta: "SHOP THE COLLECTION", image: "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=1200" },
];

export default function OrotonEditorial() {
  return (
    <div className="editorial-wrap">
      <section className="campaign-motion">
        <div className="campaign-motion__image"><img src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Editorial garments in a warm neutral fashion studio" /><span className="campaign-motion__play">▶</span></div>
        <div className="campaign-motion__copy"><p className="eyebrow eyebrow--light">CAMPAIGN IN MOTION</p><h2>Uncharted<br />Beauty</h2><p>Watch our Spring 25 Campaign.</p><a className="text-link text-link--light" href="#journal">DISCOVER MORE <span>↗</span></a></div>
      </section>
      <section className="editorial-grid" aria-label="Oroton journal">
        {editorial.map((story, index) => <article className={`editorial-card editorial-card--${index + 1}`} key={story.eyebrow} id={story.id}>
          <div className="editorial-card__image"><img src={story.image} alt="" /></div>
          <div className="editorial-card__copy"><p className="eyebrow">{story.eyebrow}</p><h3>{story.title}</h3><p>{story.text}</p><a className="text-link" href="#read">{story.cta} <span>↗</span></a></div>
        </article>)}
      </section>
    </div>
  );
}
