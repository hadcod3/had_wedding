'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'  
import { ProductCategory } from '@/lib/database/models/category.model'
import Product from '../database/models/product.model'
import { handleError } from '@/lib/utils'
import { 
    CreateProductsParams, 
    GetAllProductsParams, 
    GetRelatedProductsByCategoryParams, 
    UpdateProductsParams 
} from '@/types'

const getCategoryByName = async (name: string) => {
    return ProductCategory.findOne({ name: { $regex: name, $options: 'i' } })
} 

const populateProduct = (query: any) => {
    return query
}

// CREATE
export async function createProduct({ product, path }: CreateProductsParams) {
    try {
      await connectToDatabase()
  
      const newProduct = await Product.create({ ...product, category: product.categoryId, path })
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(newProduct))
    } catch (error) {
      handleError(error)
    }
}
  
// UPDATE
export async function updateProduct({ product, path }: UpdateProductsParams) {
    try {
      await connectToDatabase()
  
      const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        { ...product, path, category: product.categoryId },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedProduct))
    } catch (error) {
      handleError(error)
    }
}

// GET ONE EVENT BY ID
export async function getProductById(productId: string) {
    try {
      await connectToDatabase()
  
      const product = await populateProduct(Product.findById(productId))
  
      if (!product) throw new Error('Product not found')
  
      return JSON.parse(JSON.stringify(product))
    } catch (error) {
      handleError(error)
    }
}

// GET ALL PRODUCTS
export async function getAllProducts({ query, limit = 6, category, page }: GetAllProductsParams) {
    try {
      await connectToDatabase()
  
      const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
      const categoryCondition = category ? await getCategoryByName(category) : null
      const conditions = {
        $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
      }

      const skipAmount = (Number(page) - 1) * limit
      const eventsQuery = Product.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)

      const events = await populateProduct(eventsQuery)
      const productsCount = await Product.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(productsCount / limit),
      }
    } catch (error) {
      handleError(error)
    }
}

// GET RELATED PRODUCT: PRODUCT WITH SAME CATEGORY
export async function getRelatedProductsByCategory({
    categoryId,
    productId,
    limit = 3,
    page = 1,
  }: GetRelatedProductsByCategoryParams) {
    try {
      await connectToDatabase()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = { $and: [{ category: categoryId }, { _id: { $ne: productId } }] }
  
      const productsQuery = Product.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const product = await populateProduct(productsQuery)
      const productCount = await Product.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(product)), totalPages: Math.ceil(productCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }
    