import getSections from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/sections"
import getSettings from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/settings"
import getLayout from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/layout"
import getPages from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/pages"
import getBlogPosts from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/blog-posts"
import getExtraPages from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/extra-pages"
import getWidgets from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/widgets"

export default options => {
  options.layout = getLayout(options)
  if (options.layout && options.layout.files && options.layout.files.length) {
    options.layout.files.map(file => {
      if (file && file.name === 'header') {
        file.fields.push({
          label: 'Lista de sku para proibição',
          name: 'filter-list',
          widget: 'object',
          icon: 'https://api.iconify.design/mdi:copyright.svg',
          required: false,
          fields: [
            {
                label: 'Produtos',
                name: 'products',
                widget: 'list',
                field: {
                  label: 'SKU do produto',
                  name: 'product_id',
                  widget: 'select',
                  options: options.state.routes
                    .filter(({ sku }) => typeof sku === 'string')
                    .map(({ _id, sku }) => ({
                      label: sku,
                      value: _id
                    }))
                }
              }
          ]
      })
      }
      return file
    })
  }


  return {
    backend: {
      name: "git-gateway",
      branch: "master",
      commit_messages: {
        create: "Create {{collection}} “{{slug}}”",
        update: "Update {{collection}} “{{slug}}”",
        delete: "Delete {{collection}} “{{slug}}”",
        uploadMedia: "Upload “{{path}}”",
        deleteMedia: "[skip ci] Delete “{{path}}”",
        openAuthoring: "{{message}}"
      }
    },
    logo_url: "https://ecom.nyc3.digitaloceanspaces.com/storefront/cms.png",
    locale: "pt",
    load_config_file: Boolean(window.CMS_LOAD_CONFIG_FILE),
    media_folder: `${options.baseDir}template/public/img/uploads`,
    public_folder: "/img/uploads",
    slug: {
      encoding: "ascii",
      clean_accents: true,
      sanitize_replacement: "-"
    },
    collections: [
      getSettings(options),
      getPages(options),
      options.layout,
      getBlogPosts(options),
      getExtraPages(options),
      getWidgets(options)
    ]
  }
}