// Inserisce dati strutturati Schema.org (JSON-LD) nel documento.
// Aiuta Google, Bing e le AI a capire cosa è il sito, gli articoli e l'editore.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON serializzato: nessun input utente, contenuto controllato.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
