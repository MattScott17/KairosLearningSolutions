type JsonLdProps = { data: object | object[] };

/** Renders schema.org JSON-LD. `<` is escaped so page text can't close the script tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <>
      {(Array.isArray(data) ? data : [data]).map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
