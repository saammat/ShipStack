// source.config.ts
import { defineDocs, defineCollections } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content/docs"
});
var blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog"
  // add required frontmatter properties
  // schema: frontmatterSchema.extend({
  //   author: z.string(),
  //   date: z.string().date().or(z.date()),
  // }),
});
export {
  blogPosts,
  docs
};
