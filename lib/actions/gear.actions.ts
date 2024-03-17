'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'  
import Gear from '../database/models/gear.model'
import { GearCategory } from '@/lib/database/models/category.model'
import { handleError } from '@/lib/utils'
import { 
    CreateGearsParams, 
    GetAllGearsParams, 
    UpdateGearsParams 
} from '@/types'

const getCategoryByName = async (name: string) => {
    return GearCategory.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateGear = (query: any) => {
    return query
}

// CREATE
export async function createGear({ gear, path }: CreateGearsParams) {
    try {
      await connectToDatabase()
  
      const newGear = await Gear.create({ ...gear, category: gear.categoryId, path })
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(newGear))
    } catch (error) {
      handleError(error)
    }
}
  
// UPDATE
export async function updateGear({ gear, path }: UpdateGearsParams) {
    try {
      await connectToDatabase()
  
      const updatedGear = await Gear.findByIdAndUpdate(
        gear._id,
        { ...gear, path, category: gear.categoryId },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedGear))
    } catch (error) {
      handleError(error)
    }
}

// GET ONE EVENT BY ID
export async function getGearById(gearId: string) {
    try {
      await connectToDatabase()
  
      const gear = await populateGear(Gear.findById(gearId))
  
      if (!gear) throw new Error('Gear not found')
  
      return JSON.parse(JSON.stringify(gear))
    } catch (error) {
      handleError(error)
    }
}

// GET ALL GEARS
export async function getAllGears({ query, limit = 6, category, page }: GetAllGearsParams) {
    try {
      await connectToDatabase()
  
      const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
      const categoryCondition = category ? await getCategoryByName(category) : null
      const conditions = {
        $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
      }

      const skipAmount = (Number(page) - 1) * limit
      const eventsQuery = Gear.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)

      const events = await populateGear(eventsQuery)
      const gearsCount = await Gear.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(gearsCount / limit),
      }
    } catch (error) {
      handleError(error)
    }
  }
  