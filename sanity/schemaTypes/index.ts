import { type SchemaTypeDefinition } from 'sanity'
import heroImages from './heroImages'
import prodect from './prodect'
import categary from './categary'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroImages,
    prodect,
    categary
  ],
}
