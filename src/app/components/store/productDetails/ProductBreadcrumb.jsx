import Link from "next/link";

// Slim one-line breadcrumb for product pages (the big decorative page banner pushed the product
// below the first screen on mobile). Home › Products › Category › Product.
const ProductBreadcrumb = ({ name, category }) => {
  const sep = (
    <span className="mx-2 text-muted" aria-hidden="true">
      ›
    </span>
  );
  return (
    <nav aria-label="breadcrumb" className="container pt-3 pb-2">
      <ol className="list-unstyled d-flex align-items-center mb-0 small" style={{ minWidth: 0 }}>
        <li className="flex-shrink-0">
          <Link href="/" className="text-muted">
            Home
          </Link>
        </li>
        <li className="flex-shrink-0 d-flex align-items-center">
          {sep}
          <Link href="/products" className="text-muted">
            Products
          </Link>
        </li>
        {category?.name && (
          <li className="flex-shrink-0 d-flex align-items-center">
            {sep}
            <Link href={category.href} className="text-muted">
              {category.name}
            </Link>
          </li>
        )}
        {name && (
          <li className="d-flex align-items-center text-truncate" style={{ minWidth: 0 }} aria-current="page">
            {sep}
            <span className="text-truncate fw-medium text-dark">{name}</span>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default ProductBreadcrumb;
