import { defineDocs, defineCollections, frontmatterSchema } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs',
});

export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  // add required frontmatter properties
  // schema: frontmatterSchema.extend({
  //   author: z.string(),
  //   date: z.string().date().or(z.date()),
  // }),
});