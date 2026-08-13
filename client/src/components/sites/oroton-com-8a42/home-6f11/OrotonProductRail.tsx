/* Oroton reference clone: warm four-up product discovery rail with restrained hover motion and real source-derived product names. */
const products = [
  { name: "Mica Mini Bowler", detail: "Canvas / Cashew", price: "$499.00", image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Olivia Day Bag", detail: "Leather / Black", price: "$699.00", image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Etta Shoulder Bag", detail: "Leather / Lava", price: "$599.00", image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Spot Scarf Print", detail: "Silk / Spot", price: "$229.00", image: "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=900" },
];

export default function OrotonProductRail() {
  return (
    <section className="product-section" id="new-in">
      <div className="section-heading">
        <div><p className="eyebrow">NEW IN</p><h2>New arrivals, considered.</h2></div>
        <a className="text-link" href="#new">VIEW ALL <span>↗</span></a>
      </div>
      <div className="product-rail">
        {products.map((product) => (
          <article className="product-card" key={product.name}>
            <a className="product-card__media" href="#product" aria-label={`View ${product.name}`}>
              <img src={product.image} alt={`${product.name} in ${product.detail.split(" / ")[1]}`} />
              <span className="product-card__quick">QUICK VIEW</span>
            </a>
            <div className="product-card__meta"><div><h3>{product.name}</h3><p>{product.detail}</p></div><strong>{product.price}</strong></div>
          </article>
        ))}
      </div>
    </section>
  );
}
