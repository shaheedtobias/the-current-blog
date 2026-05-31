import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  name: 'the-current-blog',
  title: 'The Current Blog',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'q427jo03',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S: any) =>
        S.list()
          .title('Blog')
          .items([
            S.documentTypeListItem('post').title('Posts'),
            S.documentTypeListItem('series').title('Series'),
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('author').title('Authors'),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item: any) => item.getId() && !['post', 'series', 'category', 'author'].includes(item.getId()!),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schema.types,
  },
})
