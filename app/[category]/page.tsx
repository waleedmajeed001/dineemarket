import { client } from "@/app/lib/sanity";
import { simplifiedProduct } from "@/app/interface";
import { urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import Link from "next/link";

async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"]{
    _id,
    "imageUrl": images[0].asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data: simplifiedProduct[] = await getData(params.category);

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-8">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {params.category}
        </h1>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <Link
            key={product._id}
            href={`/product/${product.slug}`}
            className="group"
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.categoryName}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 