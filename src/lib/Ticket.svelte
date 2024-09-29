<script>
  import CommentSection from './CommentSection.svelte';
  import AddField from './AddField.svelte';
  import Markdown from './Markdown.svelte';
  export let ticket;

  let showAddFieldDialog = false;

  function openAddFieldDialog() {
    showAddFieldDialog = true;
  }

  function closeAddFieldDialog() {
    showAddFieldDialog = false;
  }

  function addField({ name, type, value }) {
    // Add a new field with type and value
    ticket.fields[name] = { type, value };
  }
</script>

<article class="container">
  <header>
    <h2>Ticket Details</h2>
    <p><strong>ID:</strong> {ticket.ticket_id}</p>
  </header>

  <section>
    <h3>Fields</h3>
    <dl class="grid">
      {#each Object.entries(ticket.fields) as [key, field]}
        <div class="field-item">
          <dt><strong>{key}</strong>:</dt>
          <dd>
            {#if field.type === 'string'}
              {field.value}
            {:else if field.type === 'number'}
              {field.value}
            {:else if field.type === 'date'}
              {new Date(field.value).toLocaleDateString()}
            {:else if field.type === 'markdown'}
              <Markdown content={field.value} />
            {/if}
          </dd>
        </div>
      {/each}
    </dl>

    <button on:click={openAddFieldDialog} role="primary">Add Field</button>
    <AddField
      showDialog={showAddFieldDialog}
      onClose={closeAddFieldDialog}
      onAddField={addField}
    />
  </section>

  <section>
    <h3>Comments</h3>
    <CommentSection comments={ticket.comments} />
  </section>
</article>

<style>
  article.container {
    padding: var(--spacing-medium);
    border: 1px solid var(--card-border-color);
    border-radius: var(--radius);
    background-color: var(--card-background);
    margin: var(--spacing-medium) 0;
  }

  dl.grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--spacing-small) var(--spacing-medium);
    margin-bottom: var(--spacing-medium);
  }

  .field-item {
    display: contents; /* Makes dt and dd align correctly in the grid */
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    background: var(--muted-background);
    padding: var(--spacing-small);
    border-radius: var(--radius);
    border: 1px solid var(--card-border-color);
  }

  button[role='primary'] {
    margin-top: var(--spacing-small);
  }
</style>
