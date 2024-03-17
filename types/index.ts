// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
}
export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
}

// ====== PACKET PARAMS
export type CreatePacketParams = {
    userId: string
    packet: {
      title: string
      description: string
      imageUrl: string
      categoryId: string
      price: string
    }
    path: string
}
export type UpdatePacketParams = {
    userId: string
    packet: {
      _id: string
      title: string
      imageUrl: string
      description: string
      categoryId: string
      price: string
    }
    path: string
}
export type DeletePacketParams = {
    packetId: string
    path: string
}
  
export type GetAllPacketsParams = {
    query: string
    category: string
    limit: number
    page: number
}
export type GetPacketsByUserParams = {
    userId: string
    limit?: number
    page: number
}
export type GetRelatedPacketsByCategoryParams = {
    categoryId: string
    packetId: string
    limit?: number
    page: number | string
}
export type Packet = {
    _id: string
    title: string
    description: string
    price: string
    imageUrl: string
    category: {
      _id: string
      name: string
    }
}
  
// ====== CATEGORY PARAMS
export type CreatePacketCategoryParams = {
    packetCategoryName: string
}
export type CreateProductCategoryParams = {
    productCategoryName: string
}
export type CreateGearCategoryParams = {
    gearCategoryName: string
}

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
    packetTitle: string
    packetId: string
    price: string
    buyerId: string
}
export type CreateOrderParams = {
    stripeId: string
    packetId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
}  
export type GetOrdersByPacketParams = {
    packetId: string
    searchString: string
} 
export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
}
  
// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
} 
export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}  
export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

// ====== PRODUCT PARAMS
export type GetAllProductsParams = {
    query: string
    category: string
    limit: number
    page: number
}
export type CreateProductsParams = {
    product: {
        title: string
        categoryId: string
        description: string
        imageUrl: string
        price: string
        stock: string
    }
    path: string
}
export type UpdateProductsParams = {
    product: {
        _id: string
        title: string
        categoryId: string
        description: string
        imageUrl: string
        price: string
        stock: string
    }
    path: string
}
export type GetRelatedProductsByCategoryParams = {
    categoryId: string
    productId: string
    limit?: number
    page: number | string
}
export type Product = {
    _id: string
    title: string
    categoryId: string
    description: string
    price: string
    imageUrl: string
    stock: string
}


// ====== GEAR PARAMS
export type GetAllGearsParams = {
    query: string
    category: string
    limit: number
    page: number
}
export type CreateGearsParams = {
    gear: {
        title: string
        description: string
        imageUrl: string
        price: string
        stock: string
    }
    path: string
}
export type UpdateGearsParams = {
    gear: {
        _id: string
        title: string
        description: string
        imageUrl: string
        price: string
        stock: string
    }
    path: string
}
export type Gear = {
    _id: string
    title: string
    description: string
    price: string
    imageUrl: string
    stock: string
}