/**
 * JsonLd — injects JSON-LD structured data into any page.
 * Usage:
 *   <JsonLd schema={mySchema} />
 *   <JsonLd schema={[schema1, schema2]} />
 */

type JsonLdSchema = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ schema }: { schema: JsonLdSchema }) {
  const data = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {data.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
