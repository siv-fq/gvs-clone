import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
// Collections
import { Pages } from "@/collections/pages";
import { Blogs } from "@/collections/blogs";
import { Media } from "@/collections/media";
import { Testimonials } from "@/collections/testimonials";
import { Users } from "@/collections/users";
import { Authors } from "@/collections/authors";

export default buildConfig({
  editor: lexicalEditor(),

  collections: [Blogs, Pages, Media, Testimonials, Users, Authors],
  admin: {
    meta: {
      title: "Greenvan",
      description: "Greenvan Dashboard",
      icons: [
        {
          rel: "icon",
          url: "/favicon.ico",
        },
      ],
    },
    components: {
      graphics: {
        Icon: "@/components/payload/customLogo",
        Logo: "@/components/payload/customLogo",
      },
    },
  },
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: {
          disableLocalStorage: true,
          generateFileURL: ({ filename }) => {
            console.log(
              "Blob storage Url:",
              `${process.env.BLOB_BASE_URL}/${filename}`
            );
            return `${process.env.BLOB_BASE_URL}/${filename}`;
          },
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
