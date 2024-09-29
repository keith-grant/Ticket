<script>
  import CommentSection from './CommentSection.svelte';
  import AddField from './AddField.svelte';
  import EditField from './EditField.svelte';
  import Markdown from './Markdown.svelte';
  export let ticket;

  let showAddFieldDialog = false;
  let showEditFieldDialog = false;
  let editingField = null;

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

  function openEditFieldDialog(fieldKey) {
    editingField = { ...ticket.fields[fieldKey], name: fieldKey };
    showEditFieldDialog = true;
  }

  function closeEditFieldDialog() {
    showEditFieldDialog = false;
  }

  function saveField({ name, type, value }) {
    delete ticket.fields[editingField.name]; // Remove the old field if renamed
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
    {#each Object.entries(ticket.fields) as [key, field]}
      <div role="group" class="ticket-field">
        <strong class="field-label">{key}:</strong>
        <span
          class={field.type === 'markdown'
            ? 'field-value-markdown'
            : 'field-value'}
        >
          {#if field.type === 'string'}
            {field.value}
          {:else if field.type === 'number'}
            {field.value}
          {:else if field.type === 'date'}
            {new Date(field.value).toLocaleDateString()}
          {:else if field.type === 'markdown'}
            <Markdown content={field.value} />
          {/if}
        </span>
        <span class="field-buttons"
          ><button
            class="outline small edit"
            on:click={() => openEditFieldDialog(key)}
            aria-label="Edit field"
          >
            <i class="bi bi-pencil-square"></i>
          </button>
        </span>
      </div>
    {/each}

    <button on:click={openAddFieldDialog} role="primary">Add Field</button>
    <AddField
      showDialog={showAddFieldDialog}
      onClose={closeAddFieldDialog}
      onAddField={addField}
    />
    <EditField
      showDialog={showEditFieldDialog}
      fieldName={editingField?.name}
      fieldType={editingField?.type}
      fieldValue={editingField?.value}
      onClose={closeEditFieldDialog}
      onSave={saveField}
    />
  </section>

  <section>
    <h3>Comments</h3>
    <CommentSection comments={ticket.comments} />
  </section>
</article>

<style>
  section {
    outline: black;
    outline-width: 1px;
    outline-style: solid;
    padding: 10px;
  }
  article.container {
    padding: var(--spacing-medium);
    border: 1px solid var(--card-border-color);
    border-radius: var(--radius);
    background-color: var(--card-background);
    margin: var(--spacing-medium) 0;
  }

  button[role='primary'] {
    margin-top: var(--spacing-small);
  }

  .ticket-field {
    display: flex;
    align-items: start;
    margin-bottom: 5px;
  }

  .field-label {
    margin-right: 5px;
    white-space: nowrap;
    flex: 0 0 auto; /* Ensure label takes only necessary space */
  }

  .field-value {
    flex: 0 1 auto;
    align-self: center;
  }

  .field-value-markdown {
    flex: 1;
    margin-right: 5px;
    align-self: start;
  }

  .field-buttons {
    outline: none;
  }

  .edit {
    flex: 0.5 0 10px;
    padding: 0;
    border-color: transparent;
  }
</style>
