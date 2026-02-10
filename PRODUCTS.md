# Products Guide

## 1) Add product images

Create a new folder under:

`/Users/omerozen/Documents/New project/atalay/public/components/products/`

Example for the 4th product:

`/Users/omerozen/Documents/New project/atalay/public/components/products/Product-4/`

Required files (SVG placeholders for now):

- `grid.svg` (recommended 1600x2000, 4:5)
- `main.svg` (recommended 2000x2500, 4:5)
- `gallery-1.svg` (recommended 1200x900, 4:3)
- `gallery-2.svg` (recommended 1200x900, 4:3)
- `gallery-3.svg` (recommended 1200x900, 4:3)

## 2) Add product content (TR)

Edit:

`/Users/omerozen/Documents/New project/atalay/content/products-tr.json`

Append a new product block under `products`:

```json
{
  "slug": "yeni-urun-slug",
  "title": "Yeni Ürün Adı",
  "subtitle": "Kısa açıklama",
  "imageUrl": "/components/products/Product-4/grid.svg",
  "detail": {
    "eyebrow": "Seri Adı",
    "title": "Yeni Ürün Adı",
    "body": "Detay açıklaması",
    "bullets": [
      "Madde 1",
      "Madde 2",
      "Madde 3"
    ],
    "buttonText": "Numune iste",
    "mainImageUrl": "/components/products/Product-4/main.svg",
    "gallery": [
      "/components/products/Product-4/gallery-1.svg",
      "/components/products/Product-4/gallery-2.svg",
      "/components/products/Product-4/gallery-3.svg"
    ]
  }
}
```

## 3) Add product content (EN)

Edit:

`/Users/omerozen/Documents/New project/atalay/content/products-en.json`

Append a new product block under `products`:

```json
{
  "slug": "new-product-slug",
  "title": "New Product Name",
  "subtitle": "Short description",
  "imageUrl": "/components/products/Product-4/grid.svg",
  "detail": {
    "eyebrow": "Series Name",
    "title": "New Product Name",
    "body": "Detail description",
    "bullets": [
      "Bullet 1",
      "Bullet 2",
      "Bullet 3"
    ],
    "buttonText": "Request sample",
    "mainImageUrl": "/components/products/Product-4/main.svg",
    "gallery": [
      "/components/products/Product-4/gallery-1.svg",
      "/components/products/Product-4/gallery-2.svg",
      "/components/products/Product-4/gallery-3.svg"
    ]
  }
}
```

## 4) Notes

- Product folders use a simple numeric sequence (`Product-1`, `Product-2`, ...).
- The product list order is the order in the JSON files.
- If you remove a product, also remove its folder to keep things clean.
