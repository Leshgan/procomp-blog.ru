'use strict';

const slug = require('url-slug');

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const dirname = node.frontmatter.category
      ? slug(node.frontmatter.category)
      : getNode(node.parent).relativeDirectory;

    let value;
    if (typeof node.frontmatter.link !== 'undefined') {
      value = node.frontmatter.link;
    } else if (typeof node.frontmatter.slug !== 'undefined') {
      value = `/${dirname}/${node.frontmatter.slug}`;
    } else {
      value = `/${dirname}/${slug(node.frontmatter.title)}`;
    }
    createNodeField({
      node,
      name: 'slug',
      value
    });

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map((tag) => `/tag/${slug(tag)}/`);
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
    }

    if (node.frontmatter.category) {
      const categorySlug = node.frontmatter.category.map((category) => `/category/${slug(category)}/`);
      createNodeField({ node, name: 'categorySlug', value: categorySlug });
    }
  }
};

module.exports = onCreateNode;
