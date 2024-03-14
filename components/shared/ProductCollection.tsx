import React from 'react'
import Pagination from './Pagination'
import { Button } from '../ui/button'
import Link from 'next/link'
import { IProduct } from '@/lib/database/models/product.model'
import ProductCard from './ProductCard'

type ProductCollectionProps = {
  data: IProduct[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'All_Products' | 'Sample_Products'
}

const ProductCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: ProductCollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-5">
          <ul className="grid w-full gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-10">
            {data.map((event) => {

              return (
                <li key={event._id} className="flex w-full justify-center">
                    <ProductCard event={event}/>
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && collectionType !== 'Sample_Products' && (
                <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}

          { collectionType === 'Sample_Products' && (
                <Button size="lg" asChild className="button w-full sm:w-fit">
                    <Link href="/products">See More Product</Link>
                </Button>
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )} 
    </>
  )
}

export default ProductCollection